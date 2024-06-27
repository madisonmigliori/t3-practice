"use client";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";

export default function HeartIcon() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
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
