import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>T3 Practice Loading..</div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return <div></div>;
}
