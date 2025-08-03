// Queries Cache
import { findAllPublishedTrueCache } from "@/lib/post/queries/published";

// Model
import { PostModel } from "@/model/post/post-model";

// Components
import { ButtonDeletePostAdmin } from "../ButtonDeletePostAdmin";
import { ErrorMessage } from "@/app/components/ErrorMessage";

// Next
import Link from "next/link";

export async function PostsListAdmin() {
  const posts: PostModel[] = (await findAllPublishedTrueCache()) ?? [];

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
            className={`${wasPublished} mt-1 flex gap-2 items-start justify-between p-2 mb-2 border-gray-200 hover:bg-gray-50 transition rounded`}
          >
            <Link
              href={`/admin/post/${id}`}
              className="w-full flex justify-between pr-6"
            >
              <h1 className="text-sm">{title}</h1>
              {!wasPublished && (
                <span className="text-xs text-slate-600 italic">
                  (Post não publicado.)
                </span>
              )}
            </Link>
            <ButtonDeletePostAdmin title={title} id={id} />
          </section>
        );
      })}
    </section>
  );
}
