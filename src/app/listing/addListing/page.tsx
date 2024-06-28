import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import AddListingCard from "~/components/listings/AddListingCard";
import { Button } from "~/components/ui/button";

export default function addListing() {
  return (
    <div>
      <Button variant="secondary" className="m-6">
        <Link href="/listing">
          {" "}
          <ArrowLeft />
        </Link>
      </Button>
      <div className="mx-10">
        <AddListingCard />
      </div>
    </div>
  );
}
