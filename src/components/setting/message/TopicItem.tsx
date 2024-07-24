/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Topic } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface TopicItemProps {
  topic: Topic;
}
export default function TopicItem({ topic }: TopicItemProps) {
  return (
    <div className=" border-b-2 p-2">
      <Link href={`/settings/messages/${topic.id}`}>
        <div className="flex flex-row justify-between">
          <div>{topic.title}</div> <ChevronRight />
        </div>
      </Link>
    </div>
  );
}
