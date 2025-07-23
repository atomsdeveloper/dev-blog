// Metadatas
import type { Metadata } from "next";

// Styles Global
import "./globals.css";

// Components
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Home | Dev Blog",
    template: "%s | Dev Blog",
  },
  description: "A blog about web development, programming, and technology.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-br">
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
