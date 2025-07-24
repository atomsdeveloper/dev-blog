"use server";

// Queries Cache
import { findAllPublishTrueCache } from "@/lib/post/queries";

// Components
import { PostModel } from "@/model/post/post-model";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";

export async function PostFeatured() {
  const posts: PostModel[] = (await findAllPublishTrueCache()) ?? [];
  const featuredPost: PostModel = posts[0];

  if (!featuredPost) {
    return;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 group">
      <PostCoverImage
        image={{
          src: featuredPost.coverImageUrl,
          alt: `Cover Image ${featuredPost.title}`,
        }}
        link={{ href: `/posts/${featuredPost.slug}` }}
      />

      <PostSummary
        as="h2"
        link={{ href: `/posts/${featuredPost.slug}` }}
        createdAt={featuredPost.createdAt}
        title={featuredPost.title}
        excerpt={featuredPost.excerpt}
      />
    </section>
  );
}
