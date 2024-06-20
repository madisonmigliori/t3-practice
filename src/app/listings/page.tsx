import ListingCard from "~/components/ListingCard";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export default function Listing() {
  return (
    <div>
      <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
        <div className="column-1 items-center px-5 text-center">
          <div className="text-left">
            <h1 className="px-10 py-10 text-3xl font-bold">All Listings</h1>
          </div>
        </div>
        <div className="mx-3 my-3 border">
          <Command>
            <CommandInput placeholder="Search businesses..." />
          </Command>
        </div>
      </div>
      <div className="mx-20 my-10 grid grid-flow-row-dense grid-cols-2 grid-rows-5 gap-4">
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}