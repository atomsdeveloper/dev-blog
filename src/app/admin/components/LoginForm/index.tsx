"use client";

// Components
import { Button } from "@/app/components/Button";
import { InputText } from "@/app/components/InputText";

// Next
import { useRouter } from "next/navigation";

// Hook
import { useActionState, useEffect } from "react";

// Toast
import { toast } from "react-toastify";

export type LoginActionState = {
  username?: string;
  error: string;
  success: string;
};

export type LoginActionType = (
  state: void | LoginActionState,
  formData: FormData
) => Promise<void | LoginActionState>;

export const LoginForm = ({
  LoginAction,
}: {
  LoginAction: LoginActionType;
}) => {
  const router = useRouter();

  const initialState: LoginActionState = {
    username: "",
    error: "",
    success: "",
  };

  const [state, action, isPending] = useActionState(LoginAction, initialState);

  // Error
  useEffect(() => {
    if (state?.error !== "") {
      toast.dismiss();
      toast.error(`${state?.error}`);
      return;
    }
  }, [state]);

  // Success
  useEffect(() => {
    if (state?.success !== "") {
      toast.dismiss();
      toast.success(`${state?.success}`);

      router.push("/admin/post");
    }
  }, [state, router]);

  return (
    <div className="flex items-center flex-col justify-center max-w-[300px] mx-auto">
      <form action={action} className="flex-1 flex flex-col gap-4 w-full">
        <InputText
          type="text"
          labelText="Usuário"
          name="username"
          defaultValue={state?.username}
          disabled={isPending}
          autoComplete="username"
        />
        <InputText
          type="password"
          labelText="Senha"
          name="password"
          defaultValue={""}
          autoComplete="current-password"
          disabled={isPending}
        />

        <Button
          variant="default"
          type="submit"
          disabled={isPending}
          size="md"
          className="mt-4"
        >
          Entrar Blog
        </Button>
      </form>

      <>
        {!!state?.error ? (
          <span className="text-red-500 text-sm mt-4"> {state.error} </span>
        ) : (
          <span className="text-yellow-600 text-sm mt-4">
            Digite os dados para fazer login.
          </span>
        )}
      </>
    </div>
  );
};
