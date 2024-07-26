"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { ChevronRight, Cross, PlusIcon, ScrollIcon, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SettingsNavBar from "~/components/misc/SettingsNavBar";
import AddTopic from "~/components/setting/messages/AddTopic";
import AddTopicButton from "~/components/setting/messages/AddTopicButton";
import SearchTopics from "~/components/setting/messages/SearchTopics";
import TopicList from "~/components/setting/messages/TopicList";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [add, setAdd] = useState(false);
 

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
                      <div className="mx-5 mt-5 flex flex-auto justify-between">
                        <div>
                          <h1 className="text-2xl font-semibold">Topics</h1>
                        </div>
                        <div className=" flex flex-row">
                          {!add ? (
                            <Button
                              variant="ghost"
                              onClick={() => setAdd(true)}
                            >
                              <PlusIcon /> New
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                onClick={() => setAdd(false)}
                              >
                                <X />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className=" border-b-2 p-2">
                        <div className="mb-2 flex flex-row justify-center">
                          <div>
                            <SearchTopics placeholder="" />
                          </div>
                        </div>
                      </div>
                      <div className=" border-b-2 p-2">
                        <Link href={`/settings/messages/General`}>
                          <div className="before:[content] m-3 flex flex-row justify-between">
                            <div>General</div>{" "}
                            <ChevronRight className="hover:backdrop-blur-xl" />{" "}
                          </div>
                        </Link>
                      </div>
                      {add ? (
                        <>
                          <div className=" border-b-2 p-2">
                            <div className="flex flex-row justify-between">
                              <AddTopic />
                              <Button
                                variant="ghost"
                                className="my-2"
                                onClick={() => setAdd(false)}
                              >
                                <X className=" text-sm" />
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div>
                        <ScrollArea className="h-[600px] w-auto">
                          <TopicList />
                        </ScrollArea>
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
