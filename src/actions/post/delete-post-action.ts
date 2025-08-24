"use server";

// Repositories
import { revalidateTag } from "next/cache";
import { deletePostAdmin } from "@/lib/post/queries/admin";
import { checkLoginSession } from "@/lib/login/manage-login";

export async function deletePostAction(id: string) {
  // TODO: Check if user logged.
  const hasUserLogged = checkLoginSession();

  if (!hasUserLogged) {
    return {
      errors: ["Faça login novamente"],
    };
  }

  if (!id || typeof id !== "string") {
    return {
      error: true,
      message: "Invalid post ID.",
    };
  }

  let postId;
  try {
    postId = await deletePostAdmin(id);
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
