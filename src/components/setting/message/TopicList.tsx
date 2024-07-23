"use client";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Topic } from "@prisma/client";
import React from "react";
import AddTopic from "~/components/setting/message/AddTopic";
import TopicItem from "~/components/setting/message/TopicItem";

import { db } from "~/server/db";

export default function TopicList() {
  // const topics = await db.topic.findMany();
  // const topicList = topics.length;

  return (
    <div>
      {topicList !== 0 ? (
        <div className="m-10 gap-2">
          {topics.map((topic: Topic) => (
            <TopicItem key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        ""
      )}

      <AddTopic />
    </div>
  );
}
