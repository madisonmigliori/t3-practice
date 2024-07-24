"use client";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Topic } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import AddTopic from "~/components/setting/message/AddTopic";
import TopicItem from "~/components/setting/message/TopicItem";

import { api } from "~/trpc/react";

export default function TopicList() {
  const topics = api.message.getManyTopics.useQuery();

  return (
    <div>
      <div>
        <div className=" border-b-2 p-2">
          <Link href={`/settings/messages/General`}>
            <div className="flex flex-row justify-between">
              <div>General</div> <ChevronRight />
            </div>
          </Link>
        </div>
        {topics.data?.map((topic: Topic) => (
          <TopicItem key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
