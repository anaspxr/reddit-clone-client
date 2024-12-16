import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import StoreProvider from "@/lib/store/store-provider";

export const metadata: Metadata = {
  title: "Reddit",
  description: "A reddit clone with most of it's basic functionalities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
