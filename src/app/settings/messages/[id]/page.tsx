"use client";

//CLIENT BC OF FORM :/

import { Edit, Pencil } from "lucide-react";

import React, { useState } from "react";
import DeleteTopic from "~/components/misc/DeleteTopic";
import EditTopic from "~/components/setting/messages/EditTopic";
import MessageOutline from "~/components/setting/messages/MessageOutline";
import TopicMessage from "~/components/setting/messages/TopicMessage";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";

export default function TopicSelected({ params }: { params: { id: string } }) {
  //   const topicSelected = await api.message.getSingleTopic({ id });
  const id = params.id === "General" ? "" : params.id;
  const msg = api.message.getManyMsg.useQuery({ id });
  const me = api.user.me.useQuery();

  const topicMsgs = api.message.getTopicMessages.useQuery({ id });
  const msgPids = msg.data?.filter((msgPid) => msgPid.parentId === "");

  const [edit, setEdit] = useState(false);
  const truth = topicMsgs.data?.userId !== me.data?.id;

  return (
    <div>
      <div>
        <div className="mt-5 flex flex-row justify-between">
          <h1 className="text-2xl font-semibold">
            {edit ? (
              <>
                <EditTopic id={id} />
              </>
            ) : (
              <>{id === "" ? "General" : topicMsgs.data?.title} </>
            )}
          </h1>
          <div className="flex flex-row">
            {truth ? (
              <></>
            ) : (
              <>
                {" "}
                {!edit ? (
                  <>
                    <Button variant="ghost" onClick={() => setEdit(true)}>
                      <Pencil />
                    </Button>
                    <DeleteTopic id={id ?? ""} />{" "}
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setEdit(false)}>
                    Save
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        <div>
          <div className=" mt-5 grid grid-flow-row items-center">
            <div className="grid w-full gap-2">
              <TopicMessage id={topicMsgs.data?.id ?? ""} parentId="" />
            </div>
            <div>
              <ScrollArea className="h-[600px] w-[auto] px-5">
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
