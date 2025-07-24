"use server";

// React
import { Suspense } from "react";

// Components
import { SpinLoader } from "./components/SpinLoader";
import { PostsList } from "./components/PostsList";
import { PostFeatured } from "./components/PostFeatured";

export default async function Home() {
  return (
    <>
      <Suspense
        fallback={
          <SpinLoader SpinLoaderContainerClass="h-[calc(100vh-64px)]" />
        }
      >
        <PostFeatured />
        <PostsList />
      </Suspense>
    </>
  );
}
