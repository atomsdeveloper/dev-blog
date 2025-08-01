"use server";

// Database
import { drizzleDatabase } from "@/db/drizzle";

// Queries Cache Admin
import { findPostByIdCache } from "@/lib/post/queries/admin";

// SQL Queries
import { eq } from "drizzle-orm";

// Schemas
import { postsTable } from "@/db/drizzle/schemas";

// Repositories
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
  if (!id || typeof id !== "string") {
    return {
      error: true,
      message: "Invalid post ID.",
    };
  }

  const post = await findPostByIdCache(id).catch(() => undefined);
  if (!post) {
    return {
      error: true,
      message: "Post not found.",
    };
  }

  // Mover para o repositório
  await drizzleDatabase.delete(postsTable).where(eq(postsTable.id, id));

  revalidateTag("posts");
  revalidateTag(`post-${post.slug}`);

  return {
    error: false,
    message: "Post deleted successfully.",
  };
}
