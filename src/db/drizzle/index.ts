// Drizzle
import { drizzle } from "drizzle-orm/node-postgres";

// PostgreSQL
import { Pool } from "pg";

// Schemas
import { postsTable } from "./schemas";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const drizzleDatabase = drizzle(pool, {
  schema: {
    posts: postsTable,
  },
  logger: false,
});
