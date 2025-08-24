import { ALLOW_LOGIN_VARIABLE } from "@/lib/constants";
import { LoginForm } from "../components/LoginForm";
import { ToastifyContainer } from "../components/ToastifyContainer";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login() {
  if (!ALLOW_LOGIN_VARIABLE) {
    return (
      <ErrorMessage
        title="Not permited."
        text="Login está temporariamente fora do ar."
      />
    );
  }

  return (
    <div className="py-16 text-6xl">
      <LoginForm />
      <ToastifyContainer /> {/* Para possível popup de toast se necessário*/}
    </div>
  );
}
