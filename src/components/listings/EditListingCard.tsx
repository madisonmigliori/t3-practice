/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

//TODO: Does not allow decimal values, or allow for one field to update
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const editListingSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  location: z.string().min(1, "Location is required"),
  askingPrice: z.coerce.number().min(0),
  grossRev: z.coerce.number().min(0),
  adjCashFlow: z.coerce.number().min(0),
});

export default function EditListingCard({ id }: { id: number }) {
  const router = useRouter();
  const utils = api.useUtils();

  const listing = api.listing.getListing.useQuery({ id });

  const editListing = useForm<z.infer<typeof editListingSchema>>({
    resolver: zodResolver(editListingSchema),
    defaultValues: {
      name: listing?.data?.name,
      location: listing?.data?.location,
      askingPrice: listing?.data?.askingPrice ?? undefined,
      grossRev: listing?.data?.grossRev ?? undefined,
      adjCashFlow: listing?.data?.adjCashFlow ?? undefined,
    },
  });

  console.log("listing", undefined);

  const updateListing = api.listing.update.useMutation({
    onSuccess: async () => {
      await utils.listing.invalidate();
      router.refresh();
      router.back();
    },
  });

  const onSubmit = async (values: z.infer<typeof editListingSchema>) => {
    updateListing.mutate({
      name: values.name,
      location: values.location,
      askingPrice: values.askingPrice,
      grossRev: values.grossRev,
      adjCashFlow: values.adjCashFlow,
      id: id,
    });
  };

  return (
    <Card>
      <CardHeader className="mt-2">
        <CardTitle>Edit Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...editListing}>
          <form onSubmit={editListing.handleSubmit(onSubmit)}>
            <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
              <div>
                <FormField
                  control={editListing.control}
                  name={"name"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} autoComplete="off" />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={editListing.control}
                  name={"location"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Location*</FormLabel>
                        <FormControl>
                          <Input type="text" autoComplete="on" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={editListing.control}
                  name={"askingPrice"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Asking Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} min={0} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={editListing.control}
                  name={"grossRev"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Gross Revenue</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} min={0} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={editListing.control}
                  name={"adjCashFlow"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Adjusted Cash Flow</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} min={0} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="mx-10 my-5 grid grid-flow-row-dense grid-cols-2">
                <div className="basis-1/8">
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
