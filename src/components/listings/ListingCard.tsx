/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type Listing } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Link href={`/listing/${listing.id}`}>
      <Card>
        <div className="flex-col-3 flex">
          <Image
            width={100}
            height={100}
            src={listing.img ? listing.img : "/business.jpg"}
            alt={""}
            quality={100}
          ></Image>
          <div className="flex-col-2 flex">
            <div>
              <CardHeader className="flex flex-col justify-between">
                <div></div>
                <div>
                  <CardTitle>{listing.name}</CardTitle>
                  <CardDescription>{listing.location}</CardDescription>
                </div>
              </CardHeader>
            </div>
            <div>
              <CardContent>
                <div className="row-3 mt-2">
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
        </div>
      </Card>
    </Link>
  );
}
