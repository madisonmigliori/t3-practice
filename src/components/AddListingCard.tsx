/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

import { error } from "console";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const addListingSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  location: z.string().min(1, "Location is required"),
  askingPrice: z.coerce.number().min(0),
  grossRev: z.coerce.number().min(0),
  adjCashFlow: z.coerce.number().min(0),
});

export default function AddListingCard() {
  const router = useRouter();

  const addListing = useForm<z.infer<typeof addListingSchema>>({
    resolver: zodResolver(addListingSchema),
    defaultValues: {
      name: "",
      location: "",
      askingPrice: 0,
      grossRev: 0,
      adjCashFlow: 0,
    },
  });

  const createListing = api.listing.create.useMutation({
    onSuccess: () => {
      router.refresh();
      router.push("/");
      addListing.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof addListingSchema>) => {
    console.log(values);
    createListing.mutate({
      name: values.name,
      location: values.location,
      askingPrice: values.askingPrice,
      grossRev: values.grossRev,
      adjCashFlow: values.adjCashFlow,
    });
  };
  console.log(addListing.formState.errors);
  return (
    <Card>
      <CardHeader className="mt-2">
        <CardTitle>Add Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...addListing}>
          <form onSubmit={addListing.handleSubmit(onSubmit)}>
            <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
              <div>
                <FormField
                  control={addListing.control}
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
                  control={addListing.control}
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
                  control={addListing.control}
                  name={"askingPrice"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Asking Price</FormLabel>
                        <FormControl>
                          <Input
                            prefix={"$ "}
                            type="number"
                            {...field}
                            min={0}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"grossRev"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Gross Revenue</FormLabel>
                        <FormControl>
                          <Input
                            prefix={"$ "}
                            type="number"
                            {...field}
                            min={0}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"adjCashFlow"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Adjusted Cash Flow</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            prefix={"$ "}
                            {...field}
                            min={0}
                          />
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
