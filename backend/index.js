import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./cors.config.js";
import { connectDatabase } from "./lib/prisma.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5006;


app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cors(corsOptions));
app.use(cookieParser());

// Session configuration
// Session duration: Can be set via SESSION_MAX_AGE_DAYS (default: 1 day = 24 hours)
// Examples:
// - 1 day = 1
// - 7 days = 7
// - 30 days = 30
// - 0.5 day (12 hours) = 0.5
const sessionMaxAgeDays = parseFloat(process.env.SESSION_MAX_AGE_DAYS || "1");
const sessionMaxAgeMs = sessionMaxAgeDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds

// app.use(
//   session({
//     secret:
//       process.env.SESSION_SECRET || "your-secret-key-change-in-production",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production (HTTPS)
//       httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
//       maxAge: sessionMaxAgeMs, // Session duration in milliseconds
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // CSRF protection
//     },
//   }),
// );

// Initialize Passport (must be after session middleware)
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send(
    " This Response is from server. sit tight and wait for the next update ",
  );
});

// Auth routes - Separated for client and admin (uncomment when routers exist)
// app.use("/api/v1/admin/auth", adminAuthRouter);
// app.use("/api/v1/admin/blog", adminBlogRouter);
// app.use("/api/v1/client/blog", clientBlogRouter);

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`[Server] Running at http://localhost:${port}`);
    console.log(`[Env] NODE_ENV=${process.env.NODE_ENV ?? "development"}`);
  });
}

startServer().catch((err) => {
  console.error("[Startup] Failed:", err.message);
  process.exit(1);
});
