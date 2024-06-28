import type { Listing } from "@prisma/client";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteButton from "~/components/misc/DeleteButton";
import HeartIcon from "~/components/misc/HeartIcon";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ListingItemProps {
  listing: Listing;
}

export default function SingleListing({ listing }: ListingItemProps) {
  return (
    <div>
      <Button variant="secondary" className="m-6">
        <Link href="/listing">
          {" "}
          <ArrowLeft />
        </Link>
      </Button>
      <div className="mx-10">
        <Card>
          <CardHeader className="flex justify-between">
            <div className="flex flex-col">
              <CardTitle>{listing.name}</CardTitle>
              <CardDescription>{listing.location}</CardDescription>
            </div>
            <HeartIcon />
            <DeleteButton {...(listing = { ...listing })} />
          </CardHeader>
          <CardContent>
            <div className="columns-3">
              <div>
                <p>{listing.askingPrice}</p>
                <p className="font-semibold">Asking Price</p>
              </div>
              <div>
                <p>{listing.grossRev}</p>
                <p className="font-semibold">Gross Revenue</p>
              </div>
              <div>
                <p>{listing.adjCashFlow}</p>
                <p className="font-semibold">Adjusted Cash Flow</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
