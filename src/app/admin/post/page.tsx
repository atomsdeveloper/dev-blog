import { PostsListAdmin } from "@/app/components/PostsListAdmin";
import { SpinLoader } from "@/app/components/SpinLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function PostPage() {
  return (
    <Suspense
      fallback={<SpinLoader SpinLoaderContainerClass="h-[calc(100vh-64px)]" />}
    >
      <PostsListAdmin />
    </Suspense>
  );
}
