/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Session } from "inspector";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import { any } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";

export default function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between border-b-2 bg-white px-10 py-4">
      <div className="items-left flex gap-10">
        <div className="flex justify-between gap-4">
          {" "}
          <Image
            src="/shopping-icon.png"
            alt="shoping-icon"
            width="30"
            height={30}
          ></Image>
          <Link className="font-bold" href="/">
            Home
          </Link>
        </div>
        <Link href="/listing">Listings</Link>
        <Link href="/settings/account">Settings</Link>
      </div>

      <div className="items-left flex">
        <Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {session && (
                <AvatarImage src={session.user.image?.toString()} />
              )}
              <AvatarFallback>MM</AvatarFallback>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/settings/account">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>{" "}
              </Link>
              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">Log out</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Log out</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to log out?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="sm:justify-between">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="button" variant="destructive">
                      Log out
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </Avatar>
      </div>
    </nav>
  );
}
