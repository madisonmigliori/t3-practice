/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";

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
import { api } from "~/trpc/server";

const addListingSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  location: z.string().min(1, "Location is required"),
  askingPrice: z.number().min(0).optional(),
  grossRev: z.number().min(0).optional(),
  adjCashFlow: z.number().min(0).optional(),
});

export default function AddListingCard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [grossRev, setGrossRev] = useState("");
  const [adjCashFlow, setAdjCashFlow] = useState("");

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

  const onSubmit = (values: z.infer<typeof addListingSchema>) => {
    console.log(values);
  };
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
                          <Input type="number" {...field} autoComplete="off" />
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
                          <Input type="number" {...field} autoComplete="off" />
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
                          <Input type="number" autoComplete="off" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
          </form>
        </Form>
        <div className="mx-10 my-5 flex grid grid-flow-row-dense grid-cols-2">
          <div className="basis-1/8">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
