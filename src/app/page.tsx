"use server";

// React
import { Suspense } from "react";

// Components
import { Header } from "./components/Header";
import { SpinLoader } from "./components/SpinLoader";
import { PostsList } from "./components/PostsList";
import { Container } from "./components/Container";

export default async function Home() {
  return (
    <Container>
      <Header />
      <Suspense
        fallback={
          <SpinLoader SpinLoaderContainerClass="h-[calc(100vh-64px)]" />
        }
      >
        <PostsList />
      </Suspense>
    </Container>
  );
}
