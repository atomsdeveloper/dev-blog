import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/drizzle/migrations",
  schema: "./src/db/drizzle/schemas.ts",
  dialect: process.env.DB_DIALECT,
  dbCredentials: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  ssl: {
    rejectUnauthorized: false,
  },
});
