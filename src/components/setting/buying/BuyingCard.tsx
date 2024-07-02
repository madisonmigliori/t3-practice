/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { number, z } from "zod";
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
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";

export default function BuyingCard({ id }: { id: number }) {
  const likeListings = api.listing.isLikedList.useQuery({ id });
  const listings = api.listing.getListing.useQuery({ id });
  console.log("listing", listings);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="mt-2">
          <CardTitle>Buying</CardTitle>
        </div>
        <div className="flex gap-4 align-middle">
          <Search placeholder={""} />
        </div>
      </CardHeader>
      <ScrollArea>
        <CardContent>
          <div className=" grid grid-flow-row-dense gap-4">
            {listings.data?.map((listing: Listing) => (
              <BuyingItem key={listing.id} buying={listing} />
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
