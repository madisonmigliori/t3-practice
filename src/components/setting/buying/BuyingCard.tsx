/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, number, z } from "zod";
import Search from "~/components/misc/Search";

import BuyingItem from "~/components/setting/buying/BuyingItem";
import { Button } from "~/components/ui/button";

import type { Listing } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { User } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { api } from "~/trpc/react";

export default function BuyingCard({ id }: { id: number }) {
  const listings = api.listing.isLikedList.useQuery();
  console.log("listings", listings);
  const likeListingCount = listings.data?.length;

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="mt-2">
          <CardTitle>Buying</CardTitle>
        </div>
        {likeListingCount !== 0 ? (
          <div>
            <div className="flex gap-4 align-middle">
              <Search placeholder={""} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </CardHeader>
      <ScrollArea>
        <CardContent>
          {likeListingCount !== 0 ? (
            <div className=" grid grid-flow-row-dense gap-4">
              {listings.data?.map((listing) => (
                <BuyingItem key={listing.id} buying={listing} />
              ))}
            </div>
          ) : (
            <div>
              There are no listings here yet! Like some listing to add to your
              buying list.
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
