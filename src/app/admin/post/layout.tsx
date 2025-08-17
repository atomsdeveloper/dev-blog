// Components
import { ToastContainer } from "react-toastify";
import { Nav } from "../components/Nav";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <>
      <Nav />
      {children}
      <ToastContainer />
    </>
  );
}
