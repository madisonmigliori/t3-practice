"use client";
import { Heart } from "lucide-react";
import { utils } from "prettier/doc.js";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface HeartIconProps {
  id: number;
  liked: boolean;
}
export default function HeartIcon({ id, liked }: HeartIconProps) {
  const heart = api.listing.isLiked.useQuery({ id });
  const showHeart = heart.data !== null ? true : false;

  const [isLiked, setIsLiked] = useState(showHeart);

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

  const handleLike = () => {
    if (isLiked ?? showHeart === null) {
      unlike.mutate({ id });
      setIsLiked(false);
      liked = false;
    } else {
      like.mutate({ id });
      setIsLiked(true);
      liked == true;
    }
  };
  return (
    <div>
      <Button
        variant="ghost"
        className="hover:bg-transparent"
        onClick={() => handleLike()}
      >
        {showHeart ? <Heart fill="true" /> : <Heart />}
      </Button>
    </div>
  );
}
