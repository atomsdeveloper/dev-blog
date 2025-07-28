// Queries Cache
import { findAllPublishTrueCache } from "@/lib/post/queries/published";

// Components
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { PostModel } from "@/model/post/post-model";

export async function PostsListAdmin() {
  const posts: PostModel[] = ((await findAllPublishTrueCache()) ?? []).slice(1);

  if (!posts || posts.length === 0) {
    return <div className="p-4">No posts available.</div>;
  }

  return (
    <section className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {posts.map((post) => {
        const { id, coverImageUrl, title, slug, createdAt, excerpt } = post;

        return (
          <div key={id} className="flex flex-col gap-4 group">
            <PostCoverImage
              image={{
                width: 1200,
                height: 720,
                src: `${coverImageUrl}`,
                alt: `Cover Image ${title}`,
              }}
              link={{ href: `/post/${slug}` }}
            />

            <PostSummary
              as="h2"
              link={{ href: `/post/${slug}` }}
              createdAt={createdAt}
              title={title}
              excerpt={excerpt}
            />
          </div>
        );
      })}
    </section>
  );
}
