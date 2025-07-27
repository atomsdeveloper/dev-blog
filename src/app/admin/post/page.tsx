import { findAllPostCache } from "@/lib/post/queries/admin";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function PostPage() {
  const posts = await findAllPostCache();

  return (
    <div className="py-16 text-xl">
      <h1>Posts Page</h1>
      {posts.map((post) => {
        return <div key={post.id}>{post.title}</div>;
      })}
    </div>
  );
}
