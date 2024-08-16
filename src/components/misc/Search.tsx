/* eslint-disable @typescript-eslint/unbound-method */
"use client";

import { api } from "~/trpc/react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import SearchPage from "~/app/(app)/search/page";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const searchSchema = z.object({
  entry: z.string().min(1),
});

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const searchBar = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      entry: "",
    },
  });

  type SearchBarType = z.infer<typeof searchSchema>;

  const searching = api.listing.searchListing.useQuery({ text: searchQuery });

  const onSubmit = (formData: SearchBarType) => {
    const encodedSearchQuery = encodeURI(formData.entry);
    router.push(`/search?q=${encodedSearchQuery}`);
    setSearchQuery(formData.entry);

    <SearchPage />;
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
                      type="search"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
      <MagnifyingGlassIcon className="top absolute left-3 top-7 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
