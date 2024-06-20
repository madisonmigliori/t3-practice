import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import NavBar from "~/components/NavBar";
import { Pagination } from "~/components/ui/pagination";
import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={`flex flex-col bg-slate-100`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
