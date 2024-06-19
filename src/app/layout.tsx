import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between px-4 py-4">
      <div>
        <img src="/public/shopping-icon.png"></img>
        <span>Dealonomy </span>
        <span>Listing </span>
        <span>Settings </span>
      </div>
      <div>
        <span>Profile</span>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={`gap -4 flex flex-col`}>
        <TopNav />
      </body>
    </html>
  );
}
