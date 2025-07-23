"use server";

// Next
import { redirect } from "next/navigation";

type PostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  // Note: params is a Promise, so we need to await it
  // If you are using a framework that provides params directly,
  // you might not need to await it.
  // For example, in Next.js, params is already resolved.
  // Here, we assume params is a Promise that resolves to an object with a slug property
  const { slug } = await params;

  if (!slug) {
    redirect("/");
  }

  return (
    <div className="h-full bg-slate-500">
      <h1>post/{slug}</h1>
      <p>This is the post page content for {slug}.</p>
    </div>
  );
}
