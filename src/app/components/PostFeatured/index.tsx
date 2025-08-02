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
    <section className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 group">
      <PostCoverImage
        image={{
          src: coverImageUrl,
          alt: `Cover Image ${title}`,
        }}
        link={{ href: `/posts/${slug}` }}
      />

      <PostSummary
        as="h2"
        link={{ href: `/posts/${slug}` }}
        createdAt={createdAt}
        title={title}
        excerpt={excerpt}
      />
    </section>
  );
}
