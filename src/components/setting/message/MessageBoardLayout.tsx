"use client";
import { Button } from "~/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { PlusIcon, SquarePen } from "lucide-react";

import AddTopic from "~/components/setting/message/AddTopic";
import Topic from "~/components/setting/message/Topic";
import TopicList from "~/components/setting/message/TopicList";
import TopicMessage from "~/components/setting/message/TopicMessage";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export default function MessageBoardLayout() {
  const handleClick = () => {
    <AddTopic />;
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="mt-2">Message Board</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border-2 border-slate-300">
          <div className=" flex flex-row gap-4">
            <div className="basis-1/4 border-r-2">
              <div className="m-5 flex flex-auto justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Topics</h1>
                </div>
                <div className=" flex flex-row">
                  <Button variant="ghost" onClick={handleClick}>
                    <PlusIcon /> New
                  </Button>
                </div>
              </div>
              <div className="m-2 border-b-2 p-2"></div>
              <AddTopic />
            </div>

            <div></div>
            <div className="basis-3/4">
              <Topic />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
