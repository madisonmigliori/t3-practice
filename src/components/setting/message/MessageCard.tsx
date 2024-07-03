"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MessageItem from "~/components/setting/message/MessageItem";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { SquarePen } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function BuyingCard() {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="mt-2">Messages</CardTitle>
        <Popover className="w-full">
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <SquarePen />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <div
              className="grid grid-flow-row
             gap-4"
            >
              <div className="space-y-2">
                <h4 className="font-medium leading-none">New Message</h4>
              </div>
              <div className="grid grid-flow-col gap-2">
                <div className=" gap-4">
                  <Label htmlFor="recipient">
                    To:
                    <Input
                      id="recipient"
                      type="text"
                      className="col-span-2 h-8"
                    />
                  </Label>
                </div>

                <div className="grid grid-flow-row  items-center gap-4">
                  <Label htmlFor="message">{}</Label>
                  <Input type="text" id="message" className="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
