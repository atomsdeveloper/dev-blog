"use client";

// Queries Cache
import { findAllPublishTrueCache } from "@/lib/post/queries/published";

// Model
import { PostModel } from "@/model/post/post-model";

// Components
import { ButtonDeletePostAdmin } from "../ButtonDeletePostAdmin";

// Next
import Link from "next/link";
import { ErrorMessage } from "@/app/components/ErrorMessage";

export async function PostsListAdmin() {
  const posts: PostModel[] = (await findAllPublishTrueCache()) ?? [];

  if (!posts || posts.length <= 0) {
    return (
      <ErrorMessage
        title="Nenhum post encontrado."
        text={<Link href="/admin/post/new">Criar novo post</Link>}
      />
    );
  }

  return (
    <section className="mb-16">
      {posts.map((post) => {
        const { id, published, title } = post;

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

            <ButtonDeletePostAdmin title={title} id={id} />
          </section>
        );
      })}
    </section>
  );
}
