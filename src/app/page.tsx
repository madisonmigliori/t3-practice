/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, Fullscreen, LogIn } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import { type GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

export default async function Home() {
  const User = () => {
    const { data: session } = useSession();

    if (!session) {
      // Handle unauthenticated state, e.g. render a SignIn component
      return <LogIn />;
    }
  };
  return (
    <main>
      <div className="column-1 items-center px-5 text-center">
        <div className="text-left">
          <h1 className="px-10 py-10 text-3xl font-bold">Home</h1>
        </div>
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.listing.getLatest();

//   return <div></div>;
// }ctx: anyctx: unknown
