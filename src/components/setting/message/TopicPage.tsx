import type { Topic } from "@prisma/client";
import React from "react";
import TopicMessage from "~/components/setting/message/TopicMessage";

interface TopicItemProps {
  topic: Topic;
}

export default function TopicPage({ topic }: TopicItemProps) {
  return (
    <div>
      <h1>{topic.title}</h1>
      <div>
        <TopicMessage />
      </div>
    </div>
  );
}
