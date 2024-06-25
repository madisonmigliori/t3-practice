"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const addListingSchema = z.object({
  name: z.string(),
  location: z.string(),
  askingPrice: z.number(),
  grossRev: z.number(),
  adjCashFlow: z.number(),
});

export default function AddListingCard() {
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

  function onSubmit(values: z.infer<typeof addListingSchema>) {
    console.log(values);
  }
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
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Name*</Label>
                      <FormControl>
                        <Input type="text" id="name" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"location"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="location">Location*</Label>
                      <FormControl>
                        <Input type="text" id="location" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"askingPrice"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="askingPrice">Asking Price</Label>
                      <FormControl>
                        <Input type="number" id="asking-price" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"grossRev"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="grossRev">Gross Revenue</Label>
                      <FormControl>
                        <Input type="number" id="gross-rev" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"adjCashFlow"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="adjustedCashFlow">
                        Adjusted Cash Flow
                      </Label>
                      <FormControl>
                        <Input
                          type="number"
                          id="adjusted-cashflow"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
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
