import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { SessionProvider } from "next-auth/react";
import NavBar from "~/components/misc/NavBar";
import { Pagination } from "~/components/ui/pagination";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "T3 Practice",
  description: "Practice T3 app",
  icons: [{ rel: "icon", url: "/shopping-icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={`flex w-full flex-col bg-slate-100`}>
        <NavBar />
        <TRPCReactProvider> {children} </TRPCReactProvider>
      </body>
    </html>
  );
}
