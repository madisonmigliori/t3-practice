/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Listing } from "@prisma/client";
import Link from "next/link";
import type { Key } from "react";
import { z } from "zod";
import SellingItem from "~/components/setting/selling/SellingItem";

import { Button } from "~/components/ui/button";

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
import { db } from "~/server/db";
import { api } from "~/trpc/react";

export default function SellingCard() {
  const sellings = api.listing.getSelling.useQuery();
  const sellingSize = sellings.data?.length;

  return (
    <Card>
      <CardHeader className="mt-2">
        <CardTitle>Selling</CardTitle>
      </CardHeader>
      <CardContent>
        {sellingSize !== 0 ? (
          <div className="mx-5 grid grid-flow-row-dense grid-cols-1 gap-4">
            {sellings.data?.map((selling: Listing) => (
              <>
                <SellingItem key={selling.id} selling={selling} />
              </>
            ))}
          </div>
        ) : (
          <>
            Add a listing to see here on your selling page{" "}
            <Link href="/listing/addListing" className="text-underline">
              here
            </Link>
            !
          </>
        )}
      </CardContent>
    </Card>
  );
}
