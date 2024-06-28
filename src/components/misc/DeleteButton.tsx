"use client";

import type { Listing } from "@prisma/client";

import React from "react";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

//if deleted on [id] page it should push the router to home but if deleted on settings it should just pop the listing from the stack ask steven how to create the conditional

export default function DeleteButton(listing: Listing) {
  const utils = api.useUtils();

  const deleteListing = api.listing.deleteListing.useMutation({
    onSuccess: () => {
      void utils.listing.getListing.invalidate();
    },
  });

  const handleDelete = (id: number) => {
    deleteListing.mutate({ id: Number(id) });
  };

  return (
    <div>
      <Button
        asChild
        onClick={() => handleDelete(listing.id)}
        type="button"
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
}
