import BuyingCard from "~/components/setting/buying/BuyingCard";
import { api } from "~/trpc/server";

export default function Buying({ params }: { params: { id: number } }) {
  const id = Number(params.id);

  return (
    <div>
      <BuyingCard id ={id}
      />
    </div>
  );
}
