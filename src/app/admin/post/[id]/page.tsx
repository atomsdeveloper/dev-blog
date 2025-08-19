import { findPostBySlugPublishedTrueCache } from "@/lib/post/queries/published";
import { Form } from "../../components/Form";
import { notFound } from "next/navigation";
import { postDataTransferObjectFn } from "@/dto/post/dto";

export const dynamic = "force-dynamic";

type PostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostIdPage({ params }: PostIdPageProps) {
  const { id } = await params;

  const post = await findPostBySlugPublishedTrueCache(id).catch();

  if (!post) {
    return notFound();
  }

  // Data Transfer Object
  const postDataTransferObject = postDataTransferObjectFn(post);

  return (
    <div className="py-16 text-6xl">
      <h1 className="text-xs">Editar Post</h1>
      <Form post={postDataTransferObject} />
    </div>
  );
}
