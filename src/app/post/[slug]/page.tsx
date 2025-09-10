// React
import { Suspense } from "react";

// Components
import { SinglePost } from "@/app/components/SinglePost";
import { SpinLoader } from "@/app/components/SpinLoader";

// Query Cache
import { findPostBySlugCache } from "@/lib/post/queries/published";

// Next
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

type PostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostBySlugCache(slug);

  if (!post || !slug) {
    throw new Error("Post or Slug can be not exists.");
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// Note: params is a Promise, so we need to await it
// If you are using a framework that provides params directly,
// you might not need to await it.
// For example, in Next.js, params is already resolved.
// Here, we assume params is a Promise that resolves to an object with a slug property
export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  if (!slug) {
    redirect("/");
  }

  const post = await findPostBySlugCache(slug).catch(() => undefined);
  if (!post) {
    notFound();
  }

  const createdAtFormat = new Date(post?.createdAt);

  return (
    <Suspense
      fallback={<SpinLoader SpinLoaderContainerClass="h-[calc(100vh-64px)]" />}
    >
      <SinglePost
        slug={slug}
        title={post?.title}
        author={post?.author}
        createdAt={createdAtFormat}
        altCoverImageUrl={post?.title}
        coverImageUrl={post?.coverImageUrl}
        excerpt={post?.excerpt}
        content={post?.content}
      />
    </Suspense>
  );
}
