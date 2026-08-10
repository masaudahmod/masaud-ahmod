import dotenv from "dotenv";
dotenv.config();

const fromEnv = (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const allowedOrigins =
    fromEnv.length > 0
        ? fromEnv
        : [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:3001",
            "https://admin.trucarehealingcentre.com",
        ];

const corsOptions = {
    origin: (origin, callback) => {
        console.log("[CORS] Incoming origin:", origin);

        if (!origin) {
            return callback(null, true);
        }

        const allowed = allowedOrigins.includes(origin);

        if (allowed) {
            return callback(null, true);
        }

        console.warn("[CORS] Rejected origin:", origin);
        return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
        "ngrok-skip-browser-warning",
    ],
    credentials: true,
};

export default corsOptions;
