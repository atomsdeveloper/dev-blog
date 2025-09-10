import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/drizzle/migrations",
  schema: "./src/db/drizzle/schemas.ts",
  dialect: "postgresql",
  host: "ep-young-firefly-adkvr26s-pooler.c-2.us-east-1.aws.neon.tech",
  port: 5432,
  database: "neondb",
  user: "neondb_owner",
  password: "npg_ZO0wIaXml7fq",
  ssl: {
    rejectUnauthorized: false,
  },
});
