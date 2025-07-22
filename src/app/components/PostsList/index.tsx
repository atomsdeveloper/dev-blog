"use server";

// Repositories
import { jsonPostRepository } from "@/repositories/post";

// Components
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";

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

          <PostSummary
            as="h2"
            link={{ href: `/posts/${post.slug}` }}
            createdAt={post.createdAt}
            title={post.title}
            excerpt={post.excerpt}
          />
        </div>
      ))}
    </section>
  );
}
