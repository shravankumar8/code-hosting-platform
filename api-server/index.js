const express = require("express");
const { ECSClient, RunTaskCommand } = require(`@aws-sdk/client-ecs`);
const { generateSlug } = require("random-word-slugs");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { userRoutes } = require("../api-server/routes/userRoutes");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const prisma = new PrismaClient();
dotenv.config();
const PORT = 9000;
const app = express();
const ecsClient = new ECSClient({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});
const config = {
  clusterARN: "arn:aws:ecs:ap-southeast-2:471112564764:cluster/build-cluster",
  taskArn:
    "arn:aws:ecs:ap-southeast-2:471112564764:task-definition/builder-image-task",
};

async function middleware1(req, res, next) {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"
    console.log(token)

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, "JWT_SECRET");

    req.user = decoded;

    next();
    console.log("auth done _________________");
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid", error: err.message });
  }
}

app.use(cors());
app.use(express.json());
app.post("/project", middleware1, async (req, res) => {
  console.log
  try {
    const { gitUrl, projectslug } = req.body;
    const proj = projectslug || generateSlug();
    console.log("Project slug:", projectslug);

    const userId = req.user.userId;
    console.log("User ID:", userId);

    // Validate inputs
    if (!gitUrl) {
      return res.status(400).json({ error: "Git URL is required." });
    }

    const command = new RunTaskCommand({
      cluster: config.clusterARN,
      taskDefinition: config.taskArn,
      launchType: "FARGATE",
      count: 1,
      networkConfiguration: {
        awsvpcConfiguration: {
          assignPublicIp: "ENABLED",
          subnets: [
            "subnet-0bae46fea65542006",
            "subnet-0679f9dea06d1c9de",
            "subnet-02b5281c8d3d2db1e",
          ],
          securityGroups: ["sg-0d126cfa8efc140fb"],
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: "build-image",
            environment: [
              {
                name: "GIT_REPOSITORY_URL",
                value: gitUrl,
              },
              {
                name: "PROJECT_ID",
                value: proj,
              },
            ],
          },
        ],
      },
    });

    // Send command to ECS
    await ecsClient.send(command);

    // Respond with success
    return res.json({
      status: "queued",
      data: { projectslug: proj, url: `http://${proj}.localhost:8000` },
    });
  } catch (error) {
    console.error("Error creating project:", error);

    // Respond with a meaningful error message
    if (error instanceof SomeSpecificError) {
      return res.status(500).json({ error: "Specific error message" });
    }

    return res
      .status(500)
      .json({ error: "An error occurred while creating the project." });
  }
});


app.post("/usersignup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  console.log(req.body);
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ c: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        firstname,
        lastname,
        password: hashedPassword, // Ensure password is properly hashed
      },
      select: {
        id: true, // Select only the fields you want to return
        email: true,
        firstname: true,
        lastname: true,
        password: false, // Exclude the password from the result
      },
    });

    const token = jwt.sign(
      { userId: newUser.id, email },
      "JWT_SECRET",
      { expiresIn: "1h" } // Token expiration time
    );

    res
      .status(200)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
});
app.get("/userme", middleware1, async (req, res) => {
  res.send("user successfully signed in");
});

app.post("/usersignin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "JWT_SECRET",
      { expiresIn: "1h" } // Token expiration time
    );
    console.log(token);
    res.status(200).json({
      token,
      msg: "Sign-in successful",
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("server is listening on port 9000"); //yellow
});
