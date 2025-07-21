// Components
import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";

export function PostFeatured() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 group">
      <PostCoverImage
        image={{ src: "/images/bryen_0.png", alt: "Cover Image Last Post" }}
        link={{ href: "#" }}
      />

      <div className="flex flex-col gap-4 sm:justify-center">
        <time
          className="text-slate-600 text-sm/tight block"
          dateTime="2025-07-20"
        >
          20/07/2025 10:00
        </time>

        <PostHeading as="h1" link={{ href: "#" }}>
          Titulo do post
        </PostHeading>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </section>
  );
}
