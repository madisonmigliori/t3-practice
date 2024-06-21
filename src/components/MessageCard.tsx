"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MessageItem from "~/components/MessageItem";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { SquarePen } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function BuyingCard() {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="mt-2">Messages</CardTitle>
        <Button variant="ghost">
          <SquarePen />
        </Button>
      </CardHeader>
      <ScrollArea>
        <CardContent>
          <div className="mx-5 grid grid-flow-row-dense gap-4">
            <MessageItem />
            <MessageItem />
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
