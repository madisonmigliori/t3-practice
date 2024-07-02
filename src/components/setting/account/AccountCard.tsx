/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import addListing from "~/app/listing/addListing/page";
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
import { api } from "~/trpc/react";

const accountSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  title: z.string(),
  companyName: z.string(),
  officePhone: z.string(),
  homePhone: z.string(),
  mobilePhone: z.string(),
});

export default function AccountCard() {
  const account = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      companyName: "",
      officePhone: "",
      homePhone: "",
      mobilePhone: "",
    },
  });

  const userInfo = api.user.update.useMutation({
    onSuccess: async () => {
      console.log("Success");
    },
  });

  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    userInfo.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      title: values.title,
      officePhone: values.officePhone,
      homePhone: values.homePhone,
      mobilePhone: values.mobilePhone,
    });
  };

  return (
    <Card>
      <CardHeader className="mt-2">
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...account}>
          <form onSubmit={account.handleSubmit(onSubmit)}>
            <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
              <div>
                <FormField
                  control={account.control}
                  name={"firstName"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="first-name">First Name*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="first-name"
                          {...field}
                          placeholder='e.g. "John"'
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={account.control}
                  name={"lastName"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="last-name">Last Name*</Label>
                      <FormControl>
                        <Input
                          type="text"
                          id="last-name"
                          placeholder='e.g. "Doe"'
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={account.control}
                  name={"email"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email*</Label>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          placeholder="e.g johndoe@email.com "
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={account.control}
                  name={"title"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="title">Title</Label>
                      <FormControl>
                        <Input
                          type="text"
                          id="title"
                          placeholder='e.g. "CEO", "CTO", "Software Engineer" '
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={account.control}
                  name={"companyName"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="company-name">Company Name</Label>
                      <FormControl>
                        <Input
                          type="text"
                          id="company-name"
                          placeholder='e.g. "Google", "Facebook", "Microsoft" '
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={account.control}
                  name={"officePhone"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="office-phone">Office Phone</Label>
                      <FormControl>
                        <Input
                          type="tel"
                          id="office-phone"
                          placeholder="e.g. (123) 456-7890 "
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={account.control}
                  name={"homePhone"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="home-phone">Home Phone</Label>
                      <FormControl>
                        <Input
                          type="tel"
                          id="home-phone"
                          placeholder="e.g. (123) 456-7890 "
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={account.control}
                  name={"mobilePhone"}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mobile-phone">Mobile Phone</Label>
                      <FormControl>
                        <Input
                          type="tel"
                          id="mobile-phone"
                          placeholder="e.g. (123) 456-7890 "
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
          <div className="mx-10 my-5 grid grid-flow-row-dense grid-cols-2">
            <div className="basis-1/8">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
