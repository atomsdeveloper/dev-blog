"use client";

// Next
import Link from "next/link";

// Components
import { PostHeading } from "../PostHeading";
import { PostDate } from "../PostDate";

type PostSummaryProps = {
  link: React.ComponentProps<typeof Link>;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  createdAt: Date | string;
  title: string;
  excerpt: string;
};

export function PostSummary({
  link = { href: "#" },
  as,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <section className="flex flex-col gap-4 sm:justify-center">
      <PostHeading as={as} link={link}>
        {title}
      </PostHeading>

      <PostDate createdAt={createdAt} />

      <p>
        {excerpt ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
      </p>
    </section>
  );
}
