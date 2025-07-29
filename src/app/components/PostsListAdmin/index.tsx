// Queries Cache
import { findAllPublishTrueCache } from "@/lib/post/queries/published";

// Components
import { PostModel } from "@/model/post/post-model";

// Next
import Link from "next/link";

// Icons
import { Trash2Icon } from "lucide-react";

export async function PostsListAdmin() {
  const posts: PostModel[] = (await findAllPublishTrueCache()) ?? [];

  if (!posts || posts.length === 0) {
    return <div className="p-4">No posts available.</div>;
  }

  return (
    <section className="mb-16">
      {posts.map((post) => {
        const { id, published } = post;

        const wasPublished = !published && "bg-slate-300";

        return (
          <section
            key={id}
            className={`${wasPublished} flex gap-2 items-center justify-between`}
          >
            <Link href={`/admin/post/${id}`} />
            {!wasPublished && (
              <span className="text-xs text-slate-600 italic">
                (Post não publicado.)
              </span>
            )}

            <button
              title="Apagar post"
              aria-label="Apagar post."
              className="text-red-500 cursor-pointer transition hover:scale-125 hover:text-red-600 [&_svg]:w-4 [&_svg]:h-4"
            >
              <Trash2Icon />
            </button>
          </section>
        );
      })}
    </section>
  );
}
