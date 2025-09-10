"use server";

// Constants
import {
  ALLOW_LOGIN_VARIABLE,
  LOGIN_PASS_VARIABLE,
  LOGIN_USER_VARIABLE,
} from "@/lib/constants";

// Login Checks
import { checkPassword, createLoginSession } from "@/lib/login/manage-login";
import { asyncDelay } from "@/utils/async-delay";

type LoginActionProps = {
  username?: string;
  error: string;
  success: string;
};

export async function LoginAction(
  state: LoginActionProps | void,
  formData: FormData
): Promise<LoginActionProps | void> {
  if (!ALLOW_LOGIN_VARIABLE) {
    return {
      username: "",
      error: "Login não permitido",
      success: "",
    };
  }

  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      ...state,
      error: "Dados inválidos",
      success: "",
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
      success: "",
    };
  }

  // Valid datas received with pass hash.
  const userIsValid = username === LOGIN_USER_VARIABLE;
  const passIsValid = await checkPassword(pass, LOGIN_PASS_VARIABLE);

  if (!userIsValid && !passIsValid) {
    return {
      ...state,
      username,
      error: "Usuário ou senha inválidos",
      success: "",
    };
  }

  // Generate cookies for user logged.
  await createLoginSession(username);

  return {
    ...state,
    username,
    error: "",
    success: "Usuário logado com sucesso.",
  };
}
