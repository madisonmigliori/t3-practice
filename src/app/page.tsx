import { Fullscreen } from "lucide-react";
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

export default async function Home() {
  return (
    <main>
      <div className="h-700 w-full fill-current"></div>
      <div>
        <head>
          <link rel="icon" href="/shopping-icon.png" />
          <title>T3 Practice</title>
        </head>
      </div>
      <div className="column-1 items-center px-5 text-center">
        <div className="text-left">
          <h1 className="px-10 py-10 text-3xl font-bold">Home</h1>
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return <div></div>;
}
