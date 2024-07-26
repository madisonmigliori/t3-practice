"use client";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Topic } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import AddTopic from "~/components/setting/messages/AddTopic";
import TopicItem from "~/components/setting/messages/TopicItem";

import { api } from "~/trpc/react";

export default function TopicList() {
  const topics = api.message.getManyTopics.useQuery();

  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  const searching = api.message.searchTopic.useQuery({
    title: searchQuery ?? "",
  });

  const searchSize = searching.data?.length;

  // const topicsFilter = topics.data?.filter((topic) => topic.title === search);
  console.log("Searching", searching);

  return (
    <div>
      <div>
        {searchSize !== 0 ? (
          <>
            {searching.data?.map((topic: Topic) => (
              <TopicItem key={topic.id} topic={topic} id={topic.id} />
            ))}{" "}
          </>
        ) : (
          <>
            {topics.data?.map((topic: Topic) => (
              <TopicItem key={topic.id} topic={topic} id={topic.id} />
            ))}{" "}
          </>
        )}
      </div>
    </div>
  );
}
