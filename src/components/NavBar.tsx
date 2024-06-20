import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between border-b-2 bg-white px-10 py-4">
      <div className="items-left flex gap-10">
        <div className="flex justify-between gap-4">
          {" "}
          <Image
            src="/shopping-icon.png"
            alt="shoping-icon"
            width="30"
            height={30}
          ></Image>
          <Link href="/">Home</Link>
        </div>
        <Link href="/listings">Listings</Link>
        <Link href="/settings">Settings</Link>
      </div>

      <div className="items-left flex">
        <Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AvatarImage src="/user-profile.png" />
              <AvatarFallback>MM</AvatarFallback>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/settings/account">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>{" "}
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Avatar>
      </div>
    </nav>
  );
}
