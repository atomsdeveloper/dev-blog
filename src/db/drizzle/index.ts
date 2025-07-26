// Path
import { resolve } from "path";

// Drizzle
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

// Schemas
import { postsTable } from "./schemas";

const sqliteDatabasePath = resolve(process.cwd(), "./db.sqlite3");
const sqliteDatabase = new Database(sqliteDatabasePath);

export const drizzleDatabase = drizzle(sqliteDatabase, {
  schema: {
    posts: postsTable,
  },
  logger: false,
});
