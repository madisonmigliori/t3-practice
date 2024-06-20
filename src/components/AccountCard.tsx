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
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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

export function AccountForm() {
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
}

export default function AccountCard() {
  return (
    // <Form {...account}>
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">First Name</Label>
              <Input type="text" id="first-name" placeholder='e.g. "John"' />
            </div>
            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input type="text" id="last-name" placeholder='e.g. "Doe"' />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="e.g johndoe@email.com "
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder='e.g. "CEO", "CTO", "Software Engineer" '
              />
            </div>
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                type="text"
                id="company-name"
                placeholder='e.g. "Google", "Facebook", "Microsoft" '
              />
            </div>
            <div>
              <Label htmlFor="office-phone">Office Phone</Label>
              <Input
                type="tel"
                id="office-phone"
                placeholder="e.g. (123) 456-7890 "
              />
            </div>
            <div>
              <Label htmlFor="home-phone">Home Phone</Label>
              <Input
                type="tel"
                id="home-phone"
                placeholder="e.g. (123) 456-7890 "
              />
            </div>
            <div>
              <Label htmlFor="mobile-phone">Mobile Phone</Label>
              <Input
                type="tel"
                id="mobile-phone"
                placeholder="e.g. (123) 456-7890 "
              />
            </div>
            <div className="flex flex-row">
              <Button className="basis-1/8" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
    // </Form>
  );
}
