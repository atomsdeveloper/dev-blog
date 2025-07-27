export const dynamic = "force-dynamic";

type PostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostIdPage({ params }: PostIdPageProps) {
  const { id } = await params;

  return <div className="py-16 text-6xl">Post Page Id: {id}</div>;
}
