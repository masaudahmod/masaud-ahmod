import dotenv from "dotenv";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.ts";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

function getDatabaseLabel() {
  const url = process.env.DATABASE_URL;
  if (!url) return "unknown";

  try {
    const parsed = new URL(url);
    const database = parsed.pathname.replace(/^\//, "").split("?")[0];
    const host = parsed.hostname;
    const port = parsed.port || "5432";
    return `${database} @ ${host}:${port}`;
  } catch {
    return "unknown";
  }
}

export async function connectDatabase() {
  const label = getDatabaseLabel();
  console.log(`[DB] Connecting to PostgreSQL (${label})...`);

  try {
    await prisma.$connect();
    console.log(`[DB] Connected successfully`);
  } catch (err) {
    console.error(`[DB] Connection failed: ${err.message}`);
    throw err;
  }
}
