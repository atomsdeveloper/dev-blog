"use client";

// React
import { useEffect } from "react";

// Components
import { ErrorMessage } from "@/app/components/ErrorMessage";

type ErrorSlugProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorSlug({ error }: ErrorSlugProps) {
  useEffect(() => {
    // console.log(error);
  }, [error]);
  return (
    <ErrorMessage
      title="Internal Server Error"
      text="An error has occured in which the application cannot run. Please Try Again!"
    />
  );
}
