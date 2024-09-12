const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const router = express.Router();
const prisma = new PrismaClient();

// Middleware


// POST /api/users/signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // Use CommonJS syntax for exporting
