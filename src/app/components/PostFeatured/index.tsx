// Components
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";

export function PostFeatured() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 group">
      <PostCoverImage
        image={{ src: "/images/bryen_0.png", alt: "Cover Image Last Post" }}
        link={{ href: "#" }}
      />

      <PostSummary
        as="h2"
        link={{ href: "#" }}
        createdAt={"2025-07-20 00:00:00"}
        title={"Title of the Featured Post"}
        excerpt={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      />
    </section>
  );
}
