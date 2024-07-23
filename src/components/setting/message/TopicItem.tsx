/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Topic } from "@prisma/client";
import React from "react";

interface TopicItemProps {
  topic: Topic;
}
export default function TopicItem({ topic }: TopicItemProps) {
  return <div>{topic.title}</div>;
}
