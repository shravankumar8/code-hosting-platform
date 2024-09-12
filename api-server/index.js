const express = require("express");
const { ECSClient, RunTaskCommand } = require(`@aws-sdk/client-ecs`);
const { generateSlug } = require("random-word-slugs");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { userRoutes } = require("../api-server/routes/userRoutes");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

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

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, "JWT_SECRET");

    req.user = decoded;

    next();
    console.log("auth done _________________")
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid", error: err.message });
  }
}


app.use(express.json());
app.post("/project", middleware1, async (req, res) => {
  const { gitUrl, projectslug } = req.body;
  // const projectslug =  generateSlug();
  const proj = projectslug || generateSlug;
  console.log("deded",projectslug)
  const userId=req.user.userId;
  console.log(projectslug,userId)
  console.log("userId ==",userId)
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
              value: projectslug,
            },
          ],
        },
      ],
    },
  });

  await ecsClient.send(command);
  return res.json({
    status: "queued",
    data: { projectslug, url: `http://${projectslug}.localhost:8000` },
  });
});

app.post("/usersignup", async (req, res) => {
  const {  email, password, firstname, lastname } = req.body;
  console.log(req.body);
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
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
        email,
        firstname,
        lastname,
        password: hashedPassword,
      },
    });

    res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
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
