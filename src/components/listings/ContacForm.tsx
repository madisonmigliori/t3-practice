/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import addListing from "~/app/listing/addListing/page";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

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

const contactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  mobilePhone: z.string().optional(),
  message: z.string().optional(),
});

export default function ContactForm() {
  const contact = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobilePhone: "",
      message: "",
    },
  });

  const contactUser = api.user.update.useMutation({
    onSuccess: async () => {
      console.log("Success");
    },
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    contactUser.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobilePhone: values.mobilePhone ?? "",
      homePhone: values.mobilePhone ?? "",
      officePhone: values.mobilePhone ?? "",
      message: values.message,
    });
  };

  return (
    <Card>
      <CardHeader className="mt-2">
        <CardTitle>Contact Seller</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...contact}>
          <form onSubmit={contact.handleSubmit(onSubmit)}>
            <div className="mx-10 grid grid-flow-row-dense grid-cols-1 gap-4">
              <div>
                <FormField
                  control={contact.control}
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
                  control={contact.control}
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
                  control={contact.control}
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
                  control={contact.control}
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
              <div>
                <FormField
                  control={contact.control}
                  name={"message"}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Optional Message</Label>
                      <FormControl>
                        {/* <Input type="text-area" {...field}> */}
                        <Textarea
                          placeholder="Type your message here."
                          {...field}
                        />
                        {/* </Input> */}
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
