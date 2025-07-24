// Next
import Image from "next/image";

// Components
import { PostHeading } from "../PostHeading";
import { PostDate } from "../PostDate";
import { SafeMarkdonw } from "../SafeMarkDown";

type SinglePostProps = {
  coverImageUrl: string;
  altCoverImageUrl: string;
  title: string;
  slug: string;
  author: string;
  createdAt: string;
  excerpt: string;
  content: string;
};

export function SinglePost({
  coverImageUrl,
  altCoverImageUrl,
  title,
  slug,
  author,
  createdAt,
  excerpt,
  content,
}: SinglePostProps) {
  return (
    <article className="mb-16">
      <header className="group flex flex-col gap-4 mb-4">
        <Image
          className="rounded-xl"
          src={coverImageUrl}
          alt={altCoverImageUrl}
          width={1200}
          height={720}
        />

        <PostHeading as="h1" link={{ href: `/post/${slug}` }}>
          {title}
        </PostHeading>

        <p>
          {author} | <PostDate createdAt={createdAt} />
        </p>

        <p className="text-xl italic text-slate-600 mb-4 ">{excerpt}</p>

        <SafeMarkdonw markdown={content} />
      </header>
    </article>
  );
}
