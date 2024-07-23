import type { Message } from "@prisma/client";
import React from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/react";

interface MessageProps {
  message: Message;
}

export default function Messages({ message }: MessageProps) {
  return (
    <div>
      <Avatar>{/* <AvatarImage src={null} /> */}</Avatar>
      <div></div>
    </div>
  );
}
