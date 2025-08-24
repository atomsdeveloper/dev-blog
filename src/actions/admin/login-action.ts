import { asyncDelay } from "@/utils/async-delay";

type LoginActionProps = {
  username: string;
  error: string;
};

export async function LoginAction(state: LoginActionProps, formData: FormData) {
  asyncDelay(5000);

  console.log("User" + state.username, "Error" + state.error);

  return {
    username: "",
    error: "",
  };
}
