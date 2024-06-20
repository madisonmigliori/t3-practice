import Link from "next/link";
import ListingCard from "~/components/ListingCard";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function ListingComponent() {
  return (
    <div className="m-6">
      <Card>
        <div>
          <Link href="/listings">
            <Button className="m-5" type="submit">
              Back to Listings
            </Button>
          </Link>
        </div>
        <CardHeader className="flex flex-col">
          <CardTitle>Cartwright, Herman, and Murazik</CardTitle>
          <CardDescription>Lillieshire, North Carolina</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
