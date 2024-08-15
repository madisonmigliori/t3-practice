import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import AddListingCard from "~/components/listings/AddListingCard";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "Add Listing",
  description: "",
};

export default function addListing() {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <Button variant="secondary" className="m-6">
          <Link href="/listing">
            {" "}
            <ArrowLeft />
          </Link>
        </Button>
        <div className="m-10">
          <AddListingCard />
        </div>
      </div>
    </div>
  );
}
