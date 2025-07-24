// Next
import { Metadata } from "next";

// Components
import { ErrorMessage } from "./components/ErrorMessage";

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <ErrorMessage
      title="404 - Page Not Found"
      text="Sorry, the page you are looking for does not exist."
    />
  );
}
