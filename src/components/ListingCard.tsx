/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/server";

export default function ListingCard() {
  // const createListing = api.listing.create.useMutation();

  return (
    <Link href="/listing/card">
      <Card>
        <CardHeader className="flex flex-col">
          <CardTitle>Cartwright, Herman, and Murazik</CardTitle>
          <CardDescription>Lillieshire, North Carolina</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="columns-3">
            <div>
              <p>$8,703,01705</p>
              <p>Asking Price</p>
            </div>
            <div>
              <p>$8,703,01705</p>
              <p>Gross Revenue</p>
            </div>
            <div>
              <p>$8,703,01705</p>
              <p>Adjusted Cash Flow</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
