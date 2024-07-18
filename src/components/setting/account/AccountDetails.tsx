/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumber from "libphonenumber-js";
import { Pencil } from "lucide-react";
import Link from "next/link";
import router from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import addListing from "~/app/listing/addListing/page";
import { Button, buttonVariants } from "~/components/ui/button";

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
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function Account() {
  const me = api.user.me.useQuery();

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="mt-2">
          <CardTitle>Account</CardTitle>
        </div>
        <div className="gap-4">
          <Link
            href={`/settings/account/editAccount`}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <Pencil />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mx-10 grid grid-flow-row-dense grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <div
              className="flex h-10 w-full rounded-md border-2 border-solid border-slate-100
             px-3 py-2"
            >
              <div className="text-sm ">{me.data?.firstName}</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <div
              className="flex h-10 w-full rounded-md border-2 border-solid border-slate-100
             px-3 py-2"
            >
              <div className="text-sm ">{me.data?.lastName}</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <div
              className="flex h-10 w-full rounded-md border-2 border-solid border-slate-100
             px-3 py-2"
            >
              <div className="text-sm">{me.data?.email}</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <div
              className="flex h-10 w-full rounded-md border-2 border-solid border-slate-100
             px-3 py-2"
            >
              <div className="text-sm">{me.data?.title}</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <div
              className="flex h-10 w-full rounded-md border-2 border-solid border-slate-100
             px-3 py-2"
            >
              <div className="text-sm">{me.data?.title}</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Office Phone</Label>
            <div
              className="flex h-10 w-full rounded-md border-2 border-solid border-slate-100
             px-3 py-2"
            >
              <div className="text-sm">{me.data?.officePhone}</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Home Phone</Label>
            <div
              className="flex h-10 w-full rounded-md border-2 border-solid border-slate-100
             px-3 py-2"
            >
              <div className="text-sm">{me.data?.homePhone}</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Mobile Phone</Label>
            <div
              className="flex h-10 w-full rounded-md border-2 border-solid border-slate-100
             px-3 py-2"
            >
              <div className="text-sm">{me.data?.homePhone}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
