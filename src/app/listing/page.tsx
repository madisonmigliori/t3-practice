/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type Listing } from "@prisma/client";
import { List } from "@radix-ui/react-tabs";
import { Plus } from "lucide-react";
import Link from "next/link";
import ListingCard from "~/components/ListingCard";
import Search from "~/components/Search";
import { Button } from "~/components/ui/button";
import { db } from "~/server/db";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { Input } from "~/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

// const [listings, setListings] = useState<Listing[]>([]);

async function getListings() {
  const listings = await db.listing.findMany();
  return listings;
}
export default async function Listing() {
  const listings = await getListings();

  return (
    <div>
      <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
        <div className="column-1 items-center px-5 text-center">
          <div className="text-left">
            <h1 className="px-10 py-10 text-3xl font-bold">All Listings</h1>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Business..." />
          <Link href="/listing/addListing">
            <Button variant="outline">
              <Plus />
            </Button>
          </Link>
        </div>
      </div>
      <div className="mx-20 my-10 grid grid-flow-row-dense grid-cols-2 grid-rows-5 gap-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* <ListingPagination /> */}
    </div>
  );
}
