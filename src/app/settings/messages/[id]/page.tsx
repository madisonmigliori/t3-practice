"use client";

//CLIENT BC OF FORM :/

import type { Message } from "@prisma/client";
import { now } from "next-auth/client/_utils";
import React from "react";
import MessageOutline from "~/components/setting/message/MessageOutline";
import TopicMessage from "~/components/setting/message/TopicMessage";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";

export default function TopicSelected({ params }: { params: { id: string } }) {
  //   const topicSelected = await api.message.getSingleTopic({ id });
  const id = params.id;

  const topicSelected = api.message.getSingleTopic.useQuery({ id });
  const topicMsgs = api.message.getTopicMessages.useQuery({ id });
  const comments = api.message.getComments.useQuery({});

  return (
    <div>
      <div className="m-5">
        <ScrollArea>
          <div>
            <h1 className="text-2xl font-semibold">
              {topicSelected.data?.title ? topicSelected.data.title : "General"}
            </h1>
          </div>
          <div>
            <div className="mb-2 mt-5 grid grid-flow-row items-center">
              <div className="grid w-full gap-2">
                <TopicMessage
                  id={
                    topicSelected.data?.id ? topicSelected.data?.id : "General"
                  }
                  parentId=""
                />
              </div>
              <div>
                {topicMsgs.data?.message.map((topicMsg) => (
                  <MessageOutline
                    key={topicMsg.id ? topicMsg.id : "General"}
                    message={topicMsg.message}
                    id={topicMsg.id ? topicMsg.id : "General"}
                    parentId={""}
                    userId={topicMsg.userId}
                    topicId={topicSelected.data?.id ?? "General" ?? ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
