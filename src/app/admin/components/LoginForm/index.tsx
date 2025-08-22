// Components
import { LoginAction } from "@/actions/admin/login-action";
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
    <div className="flex items-center justify-center max-w-sm mt-16 mb-32 mx-auto">
      <form action={action} className="flex-1 flex flex-col gap-6">
        <InputText
          type="text"
          labelText="username"
          defaultValue={state.username}
          disabled={isPending}
        />
        <InputText
          type="text"
          labelText="password"
          defaultValue=""
          disabled={isPending}
        />
      </form>

      <Button variant="default" disabled={isPending} size="md" className="mt-4">
        Entrar
      </Button>

      {!!state.error ? (
        <span className="text-red-500 text-sm"> {state.error} </span>
      ) : (
        ""
      )}
    </div>
  );
};
