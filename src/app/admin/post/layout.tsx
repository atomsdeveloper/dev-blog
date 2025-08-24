// Components
import { ToastContainer } from "react-toastify";
import { Nav } from "../components/Nav";
import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  await requireLoginSessionOrRedirect();
  return (
    <>
      <Nav />
      {children}
      <ToastContainer />
    </>
  );
}
