"use server";

// Repositories
import { revalidateTag } from "next/cache";
import { InstancePostRepository } from "@/repositories/post";

export async function deletePostAction(id: string) {
  // TODO: Check if user logged.

  if (!id || typeof id !== "string") {
    return {
      error: true,
      message: "Invalid post ID.",
    };
  }

  let postId;
  try {
    postId = await InstancePostRepository.deletePost(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: e.message,
      };
    }
    return {
      errors: "Erro desconhecido",
    };
  }

  // Revalidate Tags for update data cache in page.
  revalidateTag("posts");
  revalidateTag(`post-${postId.slug}`);

  return {
    error: false,
    message: "Post deleted successfully.",
  };
}
