/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type Listing } from "@prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { db } from "~/server/db";

import ListingCard from "~/components/listings/ListingCard";
import Search from "~/components/misc/Search";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getServerAuthSession } from "~/server/auth";

// const [listings, setListings] = useState<Listing[]>([]);

export default async function Listing() {
  const session = await getServerAuthSession();
  const listings = await db.listing.findMany();
  const listingSize = listings.length;

  return (
    <div>
      <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
        <div className="column-1 items-center px-5 text-center">
          <div className="px-10 py-10 text-left ">
            <h1 className="pb-2 text-3xl font-bold">All Listings</h1>
            <h2 className="text-lg">Showing {listingSize} listings</h2>
          </div>
        </div>
        <div>
          <div className="mr-10 mt-4 flex items-center gap-4 pr-10 ">
            {listingSize !== 0 && <Search placeholder="Search.." />}

            {session && (
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/listing/addListing">
                        <Button variant="outline">
                          <Plus />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Listing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mx-10">
        {listingSize !== 0 ? (
          <div className="mx-10 my-4 grid grid-flow-row-dense gap-2">
            {listings.map((listing: Listing) => (
              <>
                <div className="mx-20 my-2 rounded-lg">
                  <ListingCard key={listing.id} listing={listing} />
                </div>
              </>
            ))}{" "}
          </div>
        ) : (
          "No Listings Yet. Add a listing"
        )}
      </div>
      {/* <ListingPagination /> */}
    </div>
  );
}
