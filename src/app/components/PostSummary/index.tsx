"use client";

// Components
import Link from "next/link";
import { PostHeading } from "../PostHeading";

// Utils
import { formatDateWithHours, formatDistanceToNow } from "@/utils/format-date";

type PostSummaryProps = {
  link: React.ComponentProps<typeof Link>;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  createdAt: Date | string;
  title: string;
  excerpt: string;
};

export function PostSummary({
  link,
  as,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <section className="flex flex-col gap-4 sm:justify-center">
      <time
        className="text-slate-600 text-sm/tight block"
        dateTime="2025-07-20"
        title={formatDistanceToNow(new Date())}
      >
        {formatDateWithHours(createdAt)}
      </time>

      <PostHeading as={as} link={link}>
        {title}
      </PostHeading>

      <p>
        {excerpt ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
      </p>
    </section>
  );
}
