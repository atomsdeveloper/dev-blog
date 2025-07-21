"use server";

// Repositories
import { jsonPostRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";

export async function PostsList() {
  const posts = await jsonPostRepository.findAll();

  if (!posts || posts.length === 0) {
    return <div className="p-4">No posts available.</div>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col sm:flex-row gap-4 mb-8 group"
        >
          <PostCoverImage
            image={{
              src: `/images/${post.coverImage}`,
              alt: `Cover Image ${post.title}`,
            }}
            link={{ href: `/posts/${post.slug}` }}
          />

          <div className="flex flex-col gap-4 sm:justify-center">
            <time
              className="text-slate-600 text-sm/tight block"
              dateTime="2025-07-20"
            >
              {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </time>

            <PostHeading as="h3" link={{ href: `/posts/${post.slug}` }}>
              {post.title}
            </PostHeading>

            <p>
              {post.excerpt ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
