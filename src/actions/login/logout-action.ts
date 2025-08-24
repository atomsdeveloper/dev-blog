"user server";

// Manage Login
import { deleteLoginSession } from "@/lib/login/manage-login";

//Next
import { redirect } from "next/navigation";

export async function LogoutAction() {
  await deleteLoginSession();
  redirect("/");
}
