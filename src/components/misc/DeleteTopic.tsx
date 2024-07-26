"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

//if deleted on [id] page it should push the router to home but if deleted on settings it should just pop the listing from the stack ask steven how to create the conditional

export default function DeleteTopic({ id }: { id: string }) {
  const utils = api.useUtils();
  const router = useRouter();

  const deleteTopic = api.message.deleteTopic.useMutation({
    onSuccess: async () => {
      await utils.message.invalidate();
      router.refresh();
    },
  });

  const handleDelete = (id: string) => {
    deleteTopic.mutate({ id });
    router.push("/settings/messages/General");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Trash />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deleting Topic</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this topic?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={() => handleDelete(id)}
              type="button"
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
