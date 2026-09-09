// ======================================================
// File: server.js
// Description: Main Server File
// ======================================================

import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "./cors.config.js";
import { connectDatabase } from "./source/lib/prisma.js";

import authRouter from "./source/routes/auth/auth.routes.js";
import adminRoutes from "./source/routes/admin/index.adminRoutes.js";
import publicRoutes from "./source/routes/public/index.publicRoutes.js";

import notFound from "./source/errors/notFound.js";
import globalErrorHandler from "./source/errors/globalErrorHandler.js";

const app = express();

const port = Number(process.env.PORT) || 5006;

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.static("public"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
  limit: "50mb",
  extended: true,
}));

// ======================================================
// Routes
// ======================================================

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/public", publicRoutes);

// ======================================================
// Health
// ======================================================

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend server is running successfully.",
  });
});

// ======================================================
// Root
// ======================================================

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Server</title>
      </head>

      <body>
        <h1>Backend API Ready.</h1>
        <p>Server is running successfully.</p>
      </body>
    </html>
  `);
});

// ======================================================
// Error Handling
// ======================================================

app.use(notFound);
app.use(globalErrorHandler);

// ======================================================
// Server
// ======================================================

async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, "0.0.0.0", () => {
      console.log(
        `[Server] Running on 0.0.0.0:${port}`
      );

      console.log(
        `[Env] NODE_ENV=${process.env.NODE_ENV ?? "development"}`
      );
    });
  } catch (err) {
    console.error("[Startup] Failed:", err);
    process.exit(1);
  }
}

startServer();