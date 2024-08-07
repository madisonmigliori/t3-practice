"use client";

import type { Listing } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React from "react";
import ListingCard from "~/components/listings/ListingCard";
import Search from "~/components/misc/Search";
import { api } from "~/trpc/react";

interface SearchPageProps {
  input: string;
}

export default function SearchPage() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  console.log(searchQuery);

  const searching = api.listing.searchListing.useQuery({
    text: searchQuery ?? "",
  });
  const searchSize = searching.data?.length;

  console.log("Searching", searching);

  return (
    <div>
      <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
        <div className="column-1 items-center px-5 text-center">
          <div className="text-left">
            <h1 className="px-10 pt-10 text-3xl font-bold">
              {searchSize !== 0 ? (
                <>Search Results for &quot;{searchQuery}&quot;</>
              ) : (
                `No Results for "${searchQuery}"`
              )}
            </h1>
            <div className="px-10 py-2 text-xl font-semibold">
              {searchSize} results
            </div>
          </div>
        </div>
        <div>
          <div className="mr-10 mt-4 flex items-center gap-4 pr-10 ">
            <Search placeholder="Search.." />
          </div>
        </div>
      </div>
      <div className="mx-10">
        {searchSize !== 0 ? (
          <div className="mx-10  grid grid-flow-row-dense gap-2">
            {searching.data?.map((search) => (
              <>
                <ListingCard key={search.id} listing={search} />
              </>
            ))}{" "}
          </div>
        ) : (
          "Search for a business or location"
        )}
      </div>
    </div>
  );
}
