/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type Listing } from "@prisma/client";
import Link from "next/link";
import type {
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { listingRouter } from "~/server/api/routers/listing";
import { api } from "~/trpc/server";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  //const createListing = api.listing.create.useMutation();

  return (
    <Link href="/listing/card">
      <Card>
        <CardHeader className="flex flex-col">
          <CardTitle>{listing.name}</CardTitle>
          <CardDescription>{listing.location}</CardDescription>
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
    </Link>
  );
}
