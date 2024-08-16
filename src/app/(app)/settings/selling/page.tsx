import type { Metadata } from "next";
import SellingCard from "~/components/setting/selling/SellingCard";

export const metadata: Metadata = {
  title: "Selling",
  description: "",
};

export default function Selling() {
  return (
    <div>
      <SellingCard />
    </div>
  );
}
