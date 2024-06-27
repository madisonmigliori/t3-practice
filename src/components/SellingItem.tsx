import type { Listing } from "@prisma/client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

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
import { api } from "~/trpc/react";

interface SellingItemProps {
  selling: Listing;
}

export default function SellingItem({ selling }: SellingItemProps) {
  const deleteListing = api.listing.deleteListing.useMutation();

  const handleDelete = (id: number) => {
    deleteListing.mutate({ id: Number(id) });
  };

  return (
    <div>
      <Card>
        <Link href={`/listing/${selling.id}`}>
          <CardHeader className="flex justify-between">
            <div className="flex flex-col">
              <CardTitle className="my-2">{selling.name}</CardTitle>
              <CardDescription>{selling.location}</CardDescription>
            </div>
            <div className="flex flex-row gap-4">
              <Button variant="ghost">
                <Pencil />
              </Button>
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
                      asChild
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
                <p>{selling.askingPrice}</p>
                <p className="font-semibold">Asking Price</p>
              </div>
              <div>
                <p>{selling.grossRev}</p>
                <p className="font-semibold">Gross Revenue</p>
              </div>
              <div>
                <p>{selling.adjCashFlow}</p>
                <p className="font-semibold">Adjusted Cash Flow</p>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
