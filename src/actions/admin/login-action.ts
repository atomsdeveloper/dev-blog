import { asyncDelay } from "@/utils/async-delay";

type LoginActionProps = {
  username: string;
  error: string;
};

export async function LoginAction({ username, error }: LoginActionProps) {
  asyncDelay(5000);

  console.log("User" + username, "Error" + error);

  return {
    username: "",
    error: "",
  };
}
