import type { Message } from "@prisma/client";
import { ChevronDown, Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { date } from "zod";
import EditMessage from "~/components/setting/messages/EditMessage";

import TopicMessage from "~/components/setting/messages/TopicMessage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";

interface MessageProps {
  id: string;
  parentId: string;
  userId: string;
  topicId: string;
  message: string;
}

export default function MessageOutline({
  id,
  parentId,
  userId,
  topicId,
  message,
}: MessageProps) {
  const utils = api.useUtils();
  const createdBy = api.message.createdByMessage.useQuery({
    messageId: id,
  });
  const deleteTopic = api.message.deleteMessage.useMutation({
    onSuccess: async () => {
      await utils.message.invalidate();
    },
  });

  const handleDelete = () => {
    deleteTopic.mutate({ id });
  };
  const comments = api.message.getComments.useQuery({ parentId: id });
  const commentSize = comments.data?.length;
  const parentID = createdBy.data?.parentId;
  const [edit, setEdit] = useState(false);

  const parseDate = createdBy.data?.createdAt
    .toDateString()
    .split("")
    .splice(4, 6);
  const parseYear = createdBy.data?.createdAt.getFullYear().toString();
  const parseTime = createdBy.data?.createdAt.toLocaleTimeString([], {
    timeStyle: "short",
  });

  return (
    <div>
      <div className="mb-10">
        <div className="flex flex-row gap-2">
          <div className="basis-1">
            <Avatar>
              <AvatarImage
                src={
                  createdBy.data?.users.image
                    ? createdBy.data?.users.image
                    : "/public/user-profile.png"
                }
              />
            </Avatar>
          </div>
          <div className="basis-11/12">
            <div className="flex flex-row justify-between">
              <div className=" flex flex-row justify-start gap-3">
                <div className="grid-col grid justify-start">
                  <div className="text-md">
                    <div>
                      <div className="text-md">
                        {createdBy.data?.users.firstName}
                      </div>
                      <div className="text-sm text-slate-400">
                        {parseDate ? parseDate : ""},{" "}
                        {parseYear ? parseYear : ""}{" "}
                        {parseTime ? parseTime : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {createdBy ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis className="size-auto text-slate-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setEdit(true)}>
                        {" "}
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete()}>
                        {" "}
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              {edit ? (
                <>
                  {" "}
                  <div className="mt-4 text-sm">
                    <EditMessage
                      id={id}
                      setEdit={setEdit}
                      message={createdBy.data?.message ?? ""}
                    />
                  </div>
                </>
              ) : (
                <div className="mt-4 text-sm">{createdBy.data?.message}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Accordion type="single" collapsible className="w-full gap-2">
          <div className="mt-3 gap-4 text-sm">
            <AccordionItem value="item-2">
              <AccordionTrigger className="float-end mb-2 mr-2 flex">
                Reply
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <div className=" mt-5 grid grid-flow-row items-center">
                  <div className="grid w-full gap-2">
                    <div className="grid w-full grid-flow-row px-10 pt-2">
                      <TopicMessage
                        id={createdBy.data?.topicId ?? ""}
                        parentId={createdBy.data?.id ?? "NONE"}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="float-end mb-2 mr-2 flex"
                disabled={commentSize === 0}
              >
                {commentSize === 1 ? (
                  <>
                    {commentSize} Comment{" "}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </>
                ) : (
                  <>
                    {commentSize} Comments{" "}
                    {commentSize !== 0 ? (
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    ) : (
                      ""
                    )}
                  </>
                )}
              </AccordionTrigger>

              <AccordionContent className="w-full place-items-center">
                <div className=" mt-5 grid grid-flow-row items-center">
                  <div className=" block">
                    <div className="grid grid-flow-row border-l-4 border-slate-100 px-10 pt-5">
                      {comments.data?.map((comment) => (
                        <MessageOutline
                          key={comment.id}
                          id={comment.id}
                          parentId={comment.parentId ?? ""}
                          userId={comment.userId}
                          topicId={createdBy.data?.topicId ?? "General"}
                          message={comment.message}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
