// Components
import { Form } from "../../components/Form";

// DTO
import { dtoPost } from "@/dto/post/dto";

// Next
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Query
import { findPostByIdCache } from "@/lib/post/queries/admin";

export const dynamic = "force-dynamic";

// Metadata
export const metadata: Metadata = {
  title: "Editar Post",
};

type PostIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostIdPage({ params }: PostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdCache(id).catch(() => undefined);

  if (!post) {
    return notFound();
  }
  // TODO: Convert comments from portuguese for english.
  // Data Transfer Object
  // Neste caso estou passando o post que busco do banco de dados por isso é necessário converter os os dados para serem retornados somente os dados necessários.
  const dtoPostSecurity = dtoPost(post);

  return (
    <>
      <h1 className="text-3xl font-bold mt-6">Editar Post</h1>
      <Form post={dtoPostSecurity} />
    </>
  );
}
