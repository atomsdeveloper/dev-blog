// Queries Cache
import { findAllPublishedTrueCache } from "@/lib/post/queries/published";

// Components
import { PostModel } from "@/model/post/post-model";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { ErrorMessage } from "../ErrorMessage";

export async function PostFeatured() {
  const posts: PostModel[] = (await findAllPublishedTrueCache()) ?? [];
  const featuredPost: PostModel = posts[0];

  if (!featuredPost) {
    return (
      <ErrorMessage
        title="Nenhum post encontrado."
        text={"Ainda não há posts publicados."}
      />
    );
  }

  const { coverImageUrl, title, slug, createdAt, excerpt } = featuredPost;

  return (
    // DONE - TO DO: Check beacuse by clicking on the cover image or post title, it does not redirect to the post.
    // DONE - Caution: This occurent only post featured, not in the post list.
    <section className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 group">
      <PostCoverImage
        image={{
          src: coverImageUrl,
          alt: `Cover Image ${title}`,
        }}
        link={{ href: `/post/${slug}` }} // Ensure the link is correct from `posts` to `post`.
      />

      <PostSummary
        as="h2"
        link={{ href: `/post/${slug}` }} // Ensure the link is correct from `posts` to `post`.
        createdAt={createdAt}
        title={title}
        excerpt={excerpt}
      />
    </section>
  );
}
