import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./cors.config.js";
import { connectDatabase } from "./source/lib/prisma.js";
import authRouter from "./source/routes/auth/auth.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5006;

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
app.use("/api/v1/auth", authRouter);

// app.get("/", (req, res) => {
//   res.send(
//     " This Response is from server. sit tight and wait for the next update ",
//   );
// });

// Auth routes - Separated for client and admin (uncomment when routers exist)
// app.use("/api/v1/admin/auth", adminAuthRouter);
// app.use("/api/v1/admin/blog", adminBlogRouter);
// app.use("/api/v1/client/blog", clientBlogRouter);

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Backend Server</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Inter,Segoe UI,sans-serif;
}

body{

background:
radial-gradient(circle at top,#1E293B 0%,#0F172A 45%,#020617 100%);
height:100vh;
display:flex;
justify-content:center;
align-items:center;
overflow:hidden;
color:#F8FAFC;

}

/* Animated background */

body::before{

content:"";
position:absolute;
width:600px;
height:600px;
background:#2563EB22;
filter:blur(130px);
top:-180px;
left:-180px;

}

body::after{

content:"";
position:absolute;
width:500px;
height:500px;
background:#06B6D422;
filter:blur(120px);
bottom:-180px;
right:-150px;

}

.container{

position:relative;
width:700px;
padding:45px;
border:1px solid rgba(255,255,255,.08);
background:rgba(15,23,42,.70);
backdrop-filter:blur(16px);
border-radius:22px;
box-shadow:
0 0 50px rgba(37,99,235,.15),
0 20px 60px rgba(0,0,0,.5);

}

.status{

display:inline-flex;
align-items:center;
gap:10px;
padding:8px 18px;
background:#22C55E22;
border:1px solid #22C55E55;
border-radius:999px;
color:#22C55E;
font-size:14px;
font-weight:600;

}

.dot{

width:10px;
height:10px;
border-radius:50%;
background:#22C55E;
box-shadow:0 0 12px #22C55E;
animation:pulse 1.5s infinite;

}

h1{

margin-top:28px;
font-size:48px;
font-weight:700;
line-height:1.2;

}

.highlight{

color:#3B82F6;

}

p{

margin-top:18px;
font-size:17px;
line-height:1.8;
color:#CBD5E1;

}

.code{

margin-top:35px;
background:#020617;
padding:18px;
border-radius:14px;
border:1px solid #334155;
font-family:Consolas,monospace;
color:#22C55E;
font-size:15px;
overflow:auto;

}

.footer{

margin-top:30px;
display:flex;
justify-content:space-between;
align-items:center;
color:#94A3B8;
font-size:14px;

}

.badge{

padding:10px 18px;
border-radius:10px;
background:#2563EB22;
border:1px solid #2563EB55;
color:#60A5FA;

}

@keyframes pulse{

0%{
transform:scale(1);
opacity:1;
}

50%{
transform:scale(1.4);
opacity:.4;
}

100%{
transform:scale(1);
opacity:1;
}

}

</style>

</head>

<body>

<div class="container">

<div class="status">

<div class="dot"></div>

Server Online

</div>

<h1>
Backend API
<span class="highlight">Ready.</span>
</h1>

<p>
Your Express.js server is running successfully and is ready to accept
incoming requests. Build scalable APIs, authenticate users, connect
databases, and deploy with confidence.
</p>

<div class="code">

GET / → 200 OK

</div>

<div class="footer">

<span>⚡ Powered by Node.js & Express</span>

<div class="badge">
Production Ready
</div>

</div>

</div>

</body>

</html>
`);
});

import notFound from "./source/errors/notFound.js";
import globalErrorHandler from "./source/errors/globalErrorHandler.js";

// unknown route handler
app.use(notFound)

// global error handler
app.use(globalErrorHandler) 

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

