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
  const id = params.id === "General" ? "" : params.id;
  const msg = api.message.getManyMsg.useQuery({ id });
  console.log("msg", msg.data);

  const topicMsgs = api.message.getTopicMessages.useQuery({ id });
  const msgPids = msg.data?.filter((msgPid) => msgPid.parentId === "");

  return (
    <div>
      <div>
        <div>
          <h1 className="mt-5 text-2xl font-semibold">
            {id === "" ? "General" : topicMsgs.data?.title}
          </h1>
        </div>
        <div>
          <div className=" mt-5 grid grid-flow-row items-center">
            <div className="grid w-full gap-2">
              <TopicMessage id={topicMsgs.data?.id ?? ""} parentId="" />
            </div>
            <div>
              <ScrollArea className="w-[auto h-[600px] p-5">
                <>
                  {" "}
                  {msgPids ? (
                    <>
                      {msgPids?.map((msgPid) => (
                        <MessageOutline
                          key={msgPid.id ?? ""}
                          message={msgPid.message}
                          id={msgPid.id ?? ""}
                          parentId={msgPid.parentId}
                          userId={msgPid.userId}
                          topicId={topicMsgs.data?.id ?? ""}
                        />
                      ))}{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
