"use server";

// Queries Cache
import { findAllPublishTrueCache } from "@/lib/post/queries";

// Components
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { PostModel } from "@/model/post/post-model";

export async function PostsList() {
  const posts: PostModel[] = ((await findAllPublishTrueCache()) ?? []).slice(1);

  if (!posts || posts.length === 0) {
    return <div className="p-4">No posts available.</div>;
  }

  return (
    <section className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {posts.map((post) => {
        return (
          <div key={post?.id} className="flex flex-col gap-4 group">
            <PostCoverImage
              image={{
                width: 1200,
                height: 720,
                src: `${post?.coverImageUrl}`,
                alt: `Cover Image ${post?.title}`,
              }}
              link={{ href: `/post/${post?.slug}` }}
            />

            <PostSummary
              as="h2"
              link={{ href: `/post/${post?.slug}` }}
              createdAt={post?.createdAt}
              title={post?.title}
              excerpt={post?.excerpt}
            />
          </div>
        );
      })}
    </section>
  );
}
