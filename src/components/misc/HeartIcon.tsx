"use client";
import { Heart } from "lucide-react";
import { utils } from "prettier/doc.js";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function HeartIcon( {id }: { id: number }) {
  const utils = api.useUtils();

  const like = api.listing.likeListing.useMutation({
    onSuccess: async () => {
      await utils.listing.invalidate();
    },
  });
  const unlike = api.listing.unlikeListing.useMutation({
    onSuccess: async () => {
      await utils.listing.invalidate();
    },
  });

  const isLiked = api.listing.isLiked.useQuery({ id });

  const handleLike = () => {
    if (isLiked) {
      unlike.mutate({ id });
    } else {
      like.mutate({ id });
    }
  };
  return (
    <div>
      <Button variant="ghost" onClick={() => handleLike()}>
        {isLiked ? <Heart fill="true" /> : <Heart />}
      </Button>
    </div>
  );
}
