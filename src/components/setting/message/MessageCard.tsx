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
import { Textarea } from "~/components/ui/textarea";

export default function BuyingCard() {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="mt-2">Messages</CardTitle>
        <Popover>
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
              <div>
                <div className="row row-auto">
                  <Label htmlFor="recipient">
                    To:
                    <div className=" m-2">
                      <Input
                        id="recipient"
                        type="text"
                        className="col-span-2 h-8"
                      />
                    </div>
                  </Label>
                </div>
                <div className="mb-2 mt-5 grid grid-flow-col items-center">
                  <Label htmlFor="message">{}</Label>

                  <div className="grid w-full gap-2">
                    <Textarea placeholder="Type your message here." />
                    <Button>Send message</Button>
                  </div>
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
