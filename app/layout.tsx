import "./globals.css";
import { Nav } from "@/components/layout/header/nav";
import { Providers } from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jira but better",
  description:
    "Collaborative task management with intuitive drag-and-drop. Perfect for teams who want clarity without complexity",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
