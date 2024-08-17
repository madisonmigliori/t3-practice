import type { Metadata } from "next";
import ListingCard from "~/components/listings/ListingCard";
import BuyingCard from "~/components/setting/buying/BuyingCard";

export const metadata: Metadata = {
  title: "Liked Listings",
};

export default function Buying({ params }: { params: { id: number } }) {
  const id = Number(params.id);

  return (
    <div>
      <BuyingCard id={id} />
    </div>
  );
}
