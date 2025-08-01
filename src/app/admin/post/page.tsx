// Components
import { PostsListAdmin } from "@/app/admin/components/PostsListAdmin";
import { SpinLoader } from "@/app/components/SpinLoader";
import { ToastContainer } from "react-toastify";

// Next
import { Metadata } from "next";

// React
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function PostPage() {
  return (
    <>
      <Suspense
        fallback={
          <SpinLoader SpinLoaderContainerClass="h-[calc(100vh-64px)]" />
        }
      >
        <PostsListAdmin />
      </Suspense>
      <ToastContainer />
    </>
  );
}
