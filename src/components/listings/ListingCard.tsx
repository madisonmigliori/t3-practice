/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type Listing, type Session } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "~/components/misc/HeartIcon";
import { buttonVariants } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Card className="duration:200 rounded-lg shadow-md transition-all group-hover:scale-105">
      <div className="flex justify-stretch ">
        <div className="basis-1/4">
          <Image
            width={300}
            height={300}
            style={{ width: "100%", height: "auto" }}
            src={listing.img ? listing.img : "/business.jpg"}
            alt={""}
            quality={100}
          ></Image>
        </div>

        <div className="basis-3/4">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle className="flex flex-row">{listing.name}</CardTitle>
              <CardDescription>{listing.location}</CardDescription>
            </div>
            <div className="flex flex-row">
              <HeartIcon id={listing.id} liked={listing.liked} />
              {}
              <Link
                href={`/listing/${listing.id}`}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                {" "}
                View Details
              </Link>
            </div>
          </CardHeader>

          <CardContent className="align-bottom">
            <div className="text-ellipsis text-balance">
              {listing.description}
            </div>
            <div className="mt- flex flex-row justify-between">
              <div>
                <p>{formatPrice.format(Number(listing.askingPrice))}</p>
                <p className="font-semibold">Asking Price</p>
              </div>
              <div>
                <p>{formatPrice.format(Number(listing.grossRev))}</p>
                <p className="font-semibold">Gross Revenue</p>
              </div>
              <div>
                <p>{formatPrice.format(Number(listing.adjCashFlow))}</p>
                <p className="font-semibold">Adjusted Cash Flow</p>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
