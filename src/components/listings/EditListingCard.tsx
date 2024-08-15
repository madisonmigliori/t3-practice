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

const editListingSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  askingPrice: z.coerce.number().optional(),
  grossRev: z.coerce.number().optional(),
  adjCashFlow: z.coerce.number().optional(),
  ebita: z.coerce.number().optional(),
  ffe: z.coerce.number().optional(),
  inventory: z.coerce.number().optional(),
  rent: z.coerce.number().optional(),
  est: z.coerce
    .string()
    .transform((value) => new Date(value))
    .optional(),
  description: z.string().optional(),
  realEstate: z.string().optional(),
  buildingSf: z.string().optional(),
  leaseExp: z.coerce.string().transform((value) => new Date(value)),
  employees: z.coerce.number(),
  facilities: z.string(),
  reasonForSelling: z.string(),
  franchise: z.boolean(),
  img: z.string(),
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
      ebita: listing?.data?.ebita ?? undefined,
      ffe: listing?.data?.ffe ?? undefined,
      inventory: listing?.data?.inventory ?? undefined,
      rent: listing?.data?.rent ?? undefined,
      est: listing?.data?.est ?? undefined,
      description: listing?.data?.description ?? undefined,
      realEstate: listing?.data?.realEstate ?? undefined,
      buildingSf: listing?.data?.buildingSf ?? undefined,
      leaseExp: listing?.data?.leaseExp ?? undefined,
      employees: listing?.data?.employees ?? undefined,
      facilities: listing?.data?.facilities ?? undefined,
      reasonForSelling: listing?.data?.reasonForSelling ?? undefined,
      franchise: listing?.data?.franchise ?? undefined,
      img: listing?.data?.img ?? undefined,
    },
  });

  const updateListing = api.listing.update.useMutation({
    onSuccess: async () => {
      await utils.listing.invalidate();
      router.refresh();
      router.back();

      toast({
        title: "Listing Details Updated!",
      });
    },

    onError: async () => {
      toast({
        variant: "destructive",
        title: "Error: Failed to Update Listing Details",
        description: "Please fill out all required fields correctly.",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof editListingSchema>) => {
    updateListing.mutate({
      name: values.name ?? "",
      location: values.location ?? "",
      askingPrice: values.askingPrice ?? 0,
      grossRev: values.grossRev ?? 0,
      adjCashFlow: values.adjCashFlow ?? 0,
      ebita: values.ebita ?? 0,
      ffe: values.ffe ?? 0,
      inventory: values.inventory ?? 0,
      rent: values.rent ?? 0,
      est: values.est,
      description: values.description ?? "",
      realEstate: values.realEstate ?? "",
      buildingSf: values.buildingSf ?? "",
      leaseExp: values.leaseExp,
      employees: values.employees,
      facilities: values.facilities,
      reasonForSelling: values.reasonForSelling,
      franchise: values.franchise,
      img: values.img,
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
                  name={"img"}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Business Images*</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} autoComplete="off" />
                        </FormControl>
                      </FormItem>
                    );
                    s;
                  }}
                />
              </div>
              <div>
                <FormField
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
                  control={editListing.control}
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
