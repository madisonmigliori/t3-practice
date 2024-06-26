import type { Listing } from "@prisma/client";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

export default async function ListingComponent({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const getListing = await api.listing.getListing({ id });

  return (
    <div className="m-6">
      <div>
        <Link href="/listing">
          <Button className="m-5" type="submit">
            Back to Listings
          </Button>
        </Link>
        <Link href="/settings/buying">
          <Button className="m-5" type="submit">
            Back to Buying
          </Button>
        </Link>
      </div>
      {getListing ? (
        <Card>
          <CardHeader className="flex flex-col">
            <CardTitle>{getListing.name}</CardTitle>
            <CardDescription>{getListing.location}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        "No Listing Found :("
      )}
    </div>
  );
}
