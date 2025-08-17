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
  // TODO: Check if user logged.

  if (!id || typeof id !== "string") {
    return {
      error: true,
      message: "Invalid post ID.",
    };
  }

  // Get post per Id received.
  const post = await findPostByIdCache(id).catch(() => undefined);

  if (!post) {
    return {
      error: true,
      message: "Post not found.",
    };
  }

  // TODO: Move action that manipulate the removing of posts. /repositories/post/drizzle-post-repository.ts
  await drizzleDatabase.delete(postsTable).where(eq(postsTable.id, id));

  // Revalidate Tags for update data cache in page.
  revalidateTag("posts");
  revalidateTag(`post-${post.slug}`);

  return {
    error: false,
    message: "Post deleted successfully.",
  };
}
