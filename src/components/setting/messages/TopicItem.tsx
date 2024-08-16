/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Topic } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface TopicItemProps {
  id: string;
  topic: Topic;
}
export default function TopicItem({ topic, id }: TopicItemProps) {
  return (
    <div className="border-b-2 p-2">
      <Link href={`/settings/forum/${topic.id}`}>
        <div className="m-3 flex flex-row justify-between">
          <div>{topic.title}</div> <ChevronRight />
        </div>
      </Link>
    </div>
  );
}
