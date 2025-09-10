// Drizzle
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

// src/db/drizzle/schemas.ts
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: text("id").primaryKey(), // você pode usar 'uuid' se quiser gerar UUIDs
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(), // corrigido 'excert' -> 'excerpt'
  author: text("author").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_img_url").notNull(),
  published: boolean("published").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type PostTableSelectMode = InferSelectModel<typeof postsTable>;
export type PostTableInsertMode = InferInsertModel<typeof postsTable>;
