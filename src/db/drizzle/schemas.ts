// Drizzle
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const postsTable = sqliteTable("posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excert").notNull(),
  author: text("author").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("coverImageUrl").notNull(),
  published: integer("published", { mode: "boolean" }).notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export type PostTableSelectMode = InferSelectModel<typeof postsTable>;
export type PostTableInsertMode = InferInsertModel<typeof postsTable>;
