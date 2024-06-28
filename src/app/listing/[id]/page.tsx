import React from "react";
import SingleListing from "~/components/listings/SingleListing";
import { api } from "~/trpc/server";

//TODO: Not working :(

export default async function SingleListingPage({
  params,
}: {
  params: { id: number };
}) {
  const getListing = await api.listing.getListing({ id: params.id });

  return (
    <div>
      <div>{getListing.name}</div>
      <SingleListing
        id={Number(getListing?.id)}
        name={getListing?.name}
        location={getListing?.location}
        askingPrice={getListing?.askingPrice}
        grossRev={getListing?.grossRev}
      />
    </div>
  );
}
