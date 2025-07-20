"use server";

// Repositories
import { jsonPostRepository } from "@/repositories/post";

export async function PostsList() {
  const posts = await jsonPostRepository.findAll();

  if (!posts || posts.length === 0) {
    return <div className="p-4">No posts available.</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="p-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
        </div>
      ))}
    </>
  );
}
