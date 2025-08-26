"use client";

// Components
import { LoginAction } from "@/actions/login/login-action";
import { Button } from "@/app/components/Button";
import { InputText } from "@/app/components/InputText";

// Hook
import { useActionState, useEffect } from "react";

// Toast
import { toast } from "react-toastify";

export const LoginForm = () => {
  const initialState = {
    username: "",
    error: "",
  };

  const [state, action, isPending] = useActionState(LoginAction, initialState);

  useEffect(() => {
    if (state.error !== "") {
      toast.dismiss();
      toast.error("Usuário ou Senha inválidos.");
    }
  }, [state]);

  return (
    <div className="flex items-center flex-col justify-center max-w-[300px] mx-auto">
      <form action={action} className="flex-1 flex flex-col gap-4 w-full">
        <InputText
          type="text"
          labelText="Usuário"
          name="username"
          defaultValue={state.username}
          disabled={isPending}
        />
        <InputText
          type="password"
          labelText="Senha"
          name="password"
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
        {!!state.error ? (
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
