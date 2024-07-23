/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { cn } from "~/lib/utils";

const addListingSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  location: z.string().min(1, "Location is required"),
  askingPrice: z.coerce.number().min(1, "Asking Price is required"),
  grossRev: z.coerce.number().min(1, "Gross Revenue is required"),
  adjCashFlow: z.coerce.number().min(1, "Adjusted Cash Flow is required"),
  ebita: z.coerce.number(),
  ffe: z.coerce.number(),
  inventory: z.coerce.number(),
  rent: z.coerce.number(),
  est: z.coerce.string().transform((value) => new Date(value)),
  description: z.string(),
  realEstate: z.string(),
  buildingSf: z.string(),
  leaseExp: z.coerce.string().transform((value) => new Date(value)),
  employees: z.coerce.number(),
  facilities: z.string(),
  reasonForSelling: z.string(),
  franchise: z.boolean(),
  img: z.string(),
});

export default function AddListingCard() {
  const router = useRouter();
  const utils = api.useUtils();

  const addListing = useForm<z.infer<typeof addListingSchema>>({
    resolver: zodResolver(addListingSchema),
    defaultValues: {
      name: "",
      location: "",
      askingPrice: 0,
      grossRev: 0,
      adjCashFlow: 0,
      ebita: 0,
      ffe: 0,
      inventory: 0,
      rent: 0,
      est: new Date(),
      description: "N/A",
      realEstate: "N/A",
      buildingSf: "N/A",
      leaseExp: new Date(),
      employees: 0,
      facilities: "N/A",
      reasonForSelling: "N/A",
      franchise: false,
      img: "",
    },
  });

  const createListing = api.listing.create.useMutation({
    onSuccess: async () => {
      await utils.listing.invalidate();
      router.push("/");
      router.refresh();
      addListing.reset();
      toast({
        title: "New Listing Added",
      });
    },

    onError: async () => {
      toast({
        variant: "destructive",
        title: "Error: Failed to add new listing",
        description: "Please fill out all required fields correctly.",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof addListingSchema>) => {
    createListing.mutate({
      name: values.name,
      location: values.location,
      askingPrice: values.askingPrice,
      grossRev: values.grossRev,
      adjCashFlow: values.adjCashFlow,
      ebita: values.ebita,
      ffe: values.ffe,
      inventory: values.inventory,
      rent: values.rent,
      est: values.est,
      description: values.description,
      realEstate: values.realEstate,
      buildingSf: values.buildingSf,
      leaseExp: values.leaseExp,
      employees: values.employees,
      facilities: values.facilities,
      reasonForSelling: values.reasonForSelling,
      franchise: values.franchise,
      img: values.img,
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
                  name={"img"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Business Images*</FormLabel>
                        <FormControl>
                          <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params/route.ts">
                            {({ open }) => {
                              return (
                                <button onClick={() => open()}>
                                  <Input
                                    type="file"
                                    {...field}
                                    autoComplete="off"
                                  />
                                </button>
                              );
                            }}
                          </CldUploadWidget>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"name"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Business Name*</FormLabel>
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
              <div>
                <FormField
                  control={addListing.control}
                  name={"ebita"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>EBITDA </FormLabel>
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
              <div>
                <FormField
                  control={addListing.control}
                  name={"ffe"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>FF&E</FormLabel>
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
              <div>
                <FormField
                  control={addListing.control}
                  name={"inventory"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Inventory</FormLabel>
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

              <div>
                <FormField
                  control={addListing.control}
                  name={"est"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Established</FormLabel>
                        <div className="space-y-1 leading-none">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"description"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"realEstate"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Real Estate</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} min={0} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"buildingSf"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Building Square Feet</FormLabel>
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
                  control={addListing.control}
                  name={"leaseExp"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Lease Expiration</FormLabel>
                        <div className="space-y-1 leading-none">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div>
                <FormField
                  control={addListing.control}
                  name={"employees"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Employees</FormLabel>
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
                  control={addListing.control}
                  name={"facilities"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Facilities</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"reasonForSelling"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Reason for Selling</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={addListing.control}
                  name={"franchise"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Franchise</FormLabel>
                        <div className="space-y-10 leading-none">
                          <div>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>

                            <FormLabel>
                              Check if your business is an established franchise
                            </FormLabel>
                          </div>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="grid-flow- mx-10 my-5 grid grid-cols-2">
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
