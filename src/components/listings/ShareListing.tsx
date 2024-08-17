"use client";
import React from "react";
import { ShareSocial } from "react-share-social";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface ShareListingProps {
  id: number;
}

export default function ShareListing({ id }: ShareListingProps) {
  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline"> Share Business</Button>
        </PopoverTrigger>
        <PopoverContent>
          <ShareSocial
            url={`localhost:3000/listing/${id}`}
            socialTypes={[
              "facebook",
              "twitter",
              "whatsapp",
              "reddit",
              "linkedin",
              "email",
            ]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
