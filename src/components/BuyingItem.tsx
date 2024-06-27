import { Heart } from "lucide-react";
import Link from "next/link";
import HeartIcon from "~/components/HeartIcon";
import ListingCard from "~/components/ListingCard";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function BuyingItem() {
  return (
    <div>
      {/* <Link href={`/listing/${listing.id}`}> */}
      <Card>
        <CardHeader className="flex justify-between">
          <div className="flex flex-col">
            <CardTitle className="my-2">
              Cartwright, Herman, and Murazik
            </CardTitle>
            <CardDescription>Lillieshire, North Carolina</CardDescription>
          </div>
          <HeartIcon />
        </CardHeader>
        <CardContent>
          <div className="columns-3">
            <div>
              <p>$8,703,01705</p>
              <p className="font-semibold">Asking Price</p>
            </div>
            <div>
              <p>$8,703,01705</p>
              <p className="font-semibold">Gross Revenue</p>
            </div>
            <div>
              <p>$8,703,01705</p>
              <p className="font-semibold">Adjusted Cash Flow</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
}
