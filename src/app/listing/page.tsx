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

import { getServerAuthSession } from "~/server/auth";

// const [listings, setListings] = useState<Listing[]>([]);

export async function getListings() {
  const listings = await db.listing.findMany();
  return listings;
}
export default async function Listing() {
  const listings = await getListings();
  const session = await getServerAuthSession();

  return (
    <div>
      <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
        <div className="column-1 items-center px-5 text-center">
          <div className="text-left">
            <h1 className="px-10 py-10 text-3xl font-bold">All Listings</h1>
          </div>
        </div>
        <div className="mr-10 mt-4 flex items-center justify-between gap-4 pr-10 ">
          <Search placeholder="Search Business..." />

          {session && (
            <>
              <Link href="/listing/addListing">
                <Button variant="outline">
                  <Plus />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="mx-10">
        {(await getListings()) ? (
          <div className="mx-20  grid grid-flow-row-dense grid-cols-2 grid-rows-5 gap-4">
            {listings.map((listing) => (
              <>
                <ListingCard key={listing.id} listing={listing} />
              </>
            ))}{" "}
          </div>
        ) : (
          "No Listings Yet"
        )}
      </div>
      {/* <ListingPagination /> */}
    </div>
  );
}
