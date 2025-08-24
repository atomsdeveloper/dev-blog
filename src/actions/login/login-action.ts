"use server";

// Constants
import {
  ALLOW_LOGIN_VARIABLE,
  LOGIN_PASS_VARIABLE,
  LOGIN_USER_VARIABLE,
} from "@/lib/constants";

// Login Checks
import { checkPassword, createLoginSession } from "@/lib/login/manage-login";

// Next
import { redirect } from "next/navigation";

type LoginActionProps = {
  username?: string;
  error: string;
};

export async function LoginAction(state: LoginActionProps, formData: FormData) {
  if (!ALLOW_LOGIN_VARIABLE) {
    return {
      username: "",
      error: "Login não permitido",
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      ...state,
      error: "Dados inválidos",
    };
  }

  const username = formData.get("username")?.toString().trim();
  const pass = formData.get("password")?.toString().trim();

  // Check datas form received exists.
  if (!username || !pass) {
    return {
      ...state,
      username,
      error: "Dígite o usuário e a senha",
    };
  }

  // Valid datas received with pass hash.
  const userIsValid = username === LOGIN_USER_VARIABLE || "";
  const passIsValid = await checkPassword(pass, LOGIN_PASS_VARIABLE || "");

  if (!userIsValid && !passIsValid) {
    return {
      ...state,
      username,
      error: "Usuário ou senha inválidos",
    };
  }

  // Generate cookies for user logged.
  await createLoginSession(username);

  // Redirect user to pages from admin.
  redirect("/admin/post");
}
