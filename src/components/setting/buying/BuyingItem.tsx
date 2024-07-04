import type { Listing } from "@prisma/client";
import { Heart } from "lucide-react";
import Link from "next/link";
import HeartIcon from "~/components/misc/HeartIcon";

import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface BuyingItemProps {
  buying: Listing;
}

export default function BuyingItem({ buying }: BuyingItemProps) {
  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      {/* <Link href={`/listing/${listing.id}`}> */}
      <Card>
        <CardHeader className="flex justify-between">
          <div className="flex flex-col">
            <CardTitle className="my-2">{buying.name}</CardTitle>
            <CardDescription>{buying.location} </CardDescription>
          </div>
          <HeartIcon id={buying.id} liked={buying.liked} />
        </CardHeader>
        <CardContent>
          <div className="columns-3">
            <div>
              <p>{formatPrice.format(Number(buying.askingPrice))}</p>
              <p className="font-semibold">Asking Price</p>
            </div>
            <div>
              <p>{formatPrice.format(Number(buying.grossRev))}</p>
              <p className="font-semibold">Gross Revenue</p>
            </div>
            <div>
              <p>{formatPrice.format(Number(buying.adjCashFlow))}</p>
              <p className="font-semibold">Adjusted Cash Flow</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
}
