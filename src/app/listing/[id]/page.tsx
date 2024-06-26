import type { Listing } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
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
            <CardHeader className="flex flex-col">
              <CardTitle>{getListing.name}</CardTitle>
              <CardDescription>{getListing.location}</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          "No Listings Found :("
        )}
      </div>
    </div>
  );
}
