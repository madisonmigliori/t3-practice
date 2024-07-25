import type { Message } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import React from "react";
import { date } from "zod";

import TopicMessage from "~/components/setting/message/TopicMessage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
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
  const createdBy = api.message.createdByMessage.useQuery({
    messageId: id,
  });
  const comments = api.message.getComments.useQuery({ parentId: id });
  const commentSize = comments.data?.length;
  const parentID = createdBy.data?.parentId;

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
        <div className=" flex flex-row justify-start gap-3">
          <Avatar>
            <AvatarImage
              src={
                createdBy.data?.users.image
                  ? createdBy.data?.users.image
                  : "/public/user-profile.png"
              }
            />
          </Avatar>
          <div>
            <div className="text-md">{createdBy.data?.users.firstName}</div>
            <div className="text-sm text-slate-400">
              {parseDate ? parseDate : ""}, {parseYear ? parseYear : ""}{" "}
              {parseTime ? parseTime : ""}
            </div>
            <div>
              <div className="mt-2 text-sm">{createdBy.data?.message}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-end  gap-4 text-sm">
          <div>
            <Accordion type="single" collapsible className="w-full">
              <div className="mt-3 flex flex-row gap-4 text-sm">
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className="mb-2"
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

                  <AccordionContent>
                    <div className="border-l-4 border-slate-300 p-10">
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
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Reply</AccordionTrigger>

                  <AccordionContent>
                    <TopicMessage
                      id={createdBy.data?.topicId ?? ""}
                      parentId={createdBy.data?.id ?? ""}
                    />
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
