// Config
import { configDotenv } from "dotenv";
configDotenv({ path: "./.env.local" });

// Drizzle
import { drizzle } from "drizzle-orm/node-postgres";

// PostgreSQL
import { Pool } from "pg";

// Schemas
import { postsTable } from "./schemas";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

export const drizzleDatabase = drizzle(pool, {
  schema: {
    posts: postsTable,
  },
  logger: false,
});
