"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

//if deleted on [id] page it should push the router to home but if deleted on settings it should just pop the listing from the stack ask steven how to create the conditional

export default function DeleteButton({ id }: { id: number }) {
  const utils = api.useUtils();
  const router = useRouter();

  const deleteListing = api.listing.deleteListing.useMutation({
    onSuccess: async () => {
      await utils.listing.invalidate();
      router.refresh();
    },
  });

  const handleDelete = (id: number) => {
    deleteListing.mutate({ id });
    router.push("/");
  };

  return (
    <div>
      <Button
        onClick={() => handleDelete(id)}
        type="button"
        className={`hover ? variant="ghost" : variant:"outline"`}
      >
        <Trash />
      </Button>
    </div>
  );
}
