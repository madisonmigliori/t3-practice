import type { Listing } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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

import { api } from "~/trpc/server";

export default async function ListingComponent({
  params,
}: {
  params: { id: number };
}) {
  const id = Number(params.id);
  const getListing = await api.listing.getListing({ id });

  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <Button variant="secondary" className="m-6">
        <Link href="/listing">
          {" "}
          <ArrowLeft />
        </Link>
      </Button>
      <div className="mx-10">
        {getListing ? (
          <Card>
            <CardHeader className="flex justify-between">
              <div className="flex flex-col">
                <CardTitle>{getListing.name}</CardTitle>
                <CardDescription>{getListing.location}</CardDescription>
              </div>
              <div>
                <HeartIcon />
                <DeleteButton id={getListing.id} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="columns-3">
                <div>
                  <p>{formatPrice.format(Number(getListing.askingPrice))}</p>
                  <p className="font-semibold">Asking Price</p>
                </div>
                <div>
                  <p>{formatPrice.format(Number(getListing.grossRev))}</p>
                  <p className="font-semibold">Gross Revenue</p>
                </div>
                <div>
                  <p>{formatPrice.format(Number(getListing.adjCashFlow))}</p>
                  <p className="font-semibold">Adjusted Cash Flow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          "No Listings Found :("
        )}
      </div>
    </div>
  );
}
