"use client";

import type { Listing } from "@prisma/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

interface SellingItemProps {
  selling: Listing;
}

export default function SellingItem({ selling }: SellingItemProps) {
  const utils = api.useUtils();

  const deleteListing = api.listing.deleteListing.useMutation();

  const handleDelete = async (id: number) => {
    deleteListing.mutate({ id: Number(id) });
    await utils.listing.invalidate();
  };

  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between">
          <div className="flex flex-col">
            <Link href={`/listing/${selling.id}`}>
              <CardTitle className="my-2">{selling.name}</CardTitle>
              <CardDescription>{selling.location}</CardDescription>
            </Link>
          </div>
          <div className="flex flex-row gap-4">
            <Link
              href={`/listing/${selling.id}/editListing`}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Pencil />
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">
                  <Trash />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete Listing</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this listing?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => handleDelete(selling.id)}
                    type="button"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="columns-3">
            <div>
              <p>{formatPrice.format(Number(selling.askingPrice))}</p>
              <p className="font-semibold">Asking Price</p>
            </div>
            <div>
              <p>{formatPrice.format(Number(selling.grossRev))}</p>
              <p className="font-semibold">Gross Revenue</p>
            </div>
            <div>
              <p>{formatPrice.format(Number(selling.adjCashFlow))}</p>
              <p className="font-semibold">Adjusted Cash Flow</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
