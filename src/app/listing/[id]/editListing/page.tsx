import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Router from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import EditListingCard from "~/components/listings/EditListingCard";
import BackButton from "~/components/misc/BackButton";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function EditListing({
  params,
}: {
  params: { id: number };
}) {
  const id = Number(params.id);
  const getListing = await api.listing.getListing({ id });

  return (
    <div>
      <BackButton />
      <div className="mx-10">
        {getListing ? (
          <EditListingCard id={getListing.id} />
        ) : (
          "Nothing here :/"
        )}
      </div>
    </div>
  );
}
