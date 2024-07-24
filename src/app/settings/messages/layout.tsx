import { PlusIcon } from "lucide-react";
import React from "react";
import SettingsNavBar from "~/components/misc/SettingsNavBar";
import AddTopic from "~/components/setting/message/AddTopic";
import TopicList from "~/components/setting/message/TopicList";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <main>
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="mt-2">Message Board</CardTitle>
            </CardHeader>

            <CardContent>
              <div>
                {" "}
                <div className="rounded-md border-2 border-slate-300">
                  <div className=" flex flex-row gap-4">
                    <div className="basis-1/4 border-r-2">
                      <div className="m-5 flex flex-auto justify-between">
                        <div>
                          <h1 className="text-2xl font-semibold">Topics</h1>
                        </div>
                        <div className=" flex flex-row">
                          <Button variant="ghost">
                            <PlusIcon /> New
                          </Button>
                        </div>
                      </div>
                      <div className="m-2 border-b-2 p-2">
                        <TopicList />
                        <AddTopic />
                      </div>
                    </div>

                    <div className="mr-2 basis-3/4">{children}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}