import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/store/store-provider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import SessionEndedToast from "@/components/ui/session-ended-toast";
import ReactQueryProvider from "@/components/react-query-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        <ReactQueryProvider>
          <ThemeProvider attribute="class">
            <StoreProvider>
              {children}
              <Toaster />
              <SessionEndedToast />
            </StoreProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
