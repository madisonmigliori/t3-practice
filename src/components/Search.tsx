/* eslint-disable @typescript-eslint/unbound-method */

import { api } from "~/trpc/react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { db } from "~/server/db";

const searchSchema = z.object({
  entry: z.string().min(1),
});

export default function Search({ placeholder }: { placeholder: string }) {
  const router = useRouter();

  const searchBar = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      entry: "",
    },
  });

  const listing = ctx.db.listing.getListing();

  const search = api.listing.searchListing.useQuery({
    listing: searchBar.watch(),
  });

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    search.data.find({
      name: values.entry,
      location: values.entry,
      askingPrice: values.entry,
      grossRev: values.entry,
      adjCashFlow: values.entry,
    });
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <Form {...searchBar}>
        <form onSubmit={searchBar.handleSubmit(onSubmit)}>
          <FormField
            control={searchBar.control}
            name={"entry"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="sr-only">Search</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-grey peer block w-full rounded-md border border-gray-200 bg-white py-[9px] pl-10 text-sm outline-2"
                      placeholder={placeholder}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
