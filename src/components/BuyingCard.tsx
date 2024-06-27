

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BuyingItem from "~/components/BuyingItem";
import Search from "~/components/Search";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getServerAuthSession } from "~/server/auth";

export default async function BuyingCard() {
  const session = await getServerAuthSession();

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="mt-2">
          <CardTitle>Buying</CardTitle>
        </div>
        <div className="flex flex-row gap-4">
          <Button variant="outline">Sort</Button>
          <Search placeholder={""} />
        </div>
      </CardHeader>
      <ScrollArea>
        <CardContent>
          {(await getListings()) ? (
            <div className=" grid grid-flow-row-dense gap-4">
              {listings.map((listing) => (
                <>
                  <BuyingItem key={listing.id} listing={listing} />
                </>
              ))}{" "}
            </div>
          ) : (
            "No Listings Yet :("
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
