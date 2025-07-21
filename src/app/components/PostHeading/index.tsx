// Next
import Link from "next/link";
import React from "react";

type PostHeadingProps = {
  children: React.ReactNode;
  link: React.ComponentProps<typeof Link>;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function PostHeading({ children, link, as: Heading }: PostHeadingProps) {
  const classMapping = {
    h1: "text-4xl/tight font-extrabold mb-4 sm:text-5xl/tight",
    h2: "text-3xl/tight bold mb-4 sm:text-4xl/tight",
    h3: "text-2xl/tight mb-4 sm:text-3xl/tight",
    h4: "text-xl/tight mb-4 sm:text-2xl/tight",
    h5: "text-lg/tight mb-4 sm:text-xl/tight",
    h6: "text-base/tight mb-4 sm:text-lg/tight",
  };
  return (
    <Heading className={classMapping[Heading]}>
      <Link
        {...link}
        {...(link.className ? { className: link.className } : {})}
        className="group:hover:text-slate-700"
      >
        {children || "Title of the post"}
      </Link>
    </Heading>
  );
}

// Component extensive for future use and flexibility
