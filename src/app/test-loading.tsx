"use server";

// Components
import { SpinLoader } from "./components/SpinLoader";

export default async function LoadingRoot() {
  return <SpinLoader SpinLoaderContainerClass="min-h-screen min-w-screen" />;
}

// This component is used to show a loading spinner while the main content is being fetched.
// It can be used in the root layout or any other place where you want to show a loading state.
// The `SpinLoader` component is a Server Component. because it is used in the `loading.tsx` file, which is a Server Component.
// All components of app can be used in the `loading.tsx` forever that page loading is not finished.
