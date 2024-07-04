"use client";
import { Heart } from "lucide-react";
import { utils } from "prettier/doc.js";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function HeartIcon(
  { id }: { id: number },
  { liked }: { liked: boolean },
) {
  const [isLiked, setIsLiked] = useState(false);

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

  const showHeart = api.listing.isLiked.useQuery({ id });
  const handleLike = () => {
    if (isLiked ?? showHeart === null) {
      liked = false;
      unlike.mutate({ id });
      setIsLiked(false);
      console.log("showheart", showHeart);
    } else {
      liked = true;
      like.mutate({ id });
      setIsLiked(true);
      console.log("showheart", showHeart);
    }
  };
  return (
    <div>
      <Button variant="ghost" onClick={() => handleLike()}>
        {showHeart.data !== null || liked === true ? (
          <Heart fill="true" />
        ) : (
          <Heart />
        )}
      </Button>
    </div>
  );
}
