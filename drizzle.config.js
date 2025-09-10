// Config
import { defineConfig } from "drizzle-kit";

import { configDotenv } from "dotenv";
configDotenv({ path: "./.env.local" });

module.exports = defineConfig({
  schema: "./src/db/drizzle/schemas.ts",
  out: "./src/db/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  ssl: { rejectUnauthorized: false },
});
