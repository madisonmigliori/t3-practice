import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function MessageItem() {
  return (
    <div className="border-b-2">
      <div className=" grid grid-flow-row-dense grid-cols-1 gap-4">
        <div className="flex w-full flex-row items-center gap-4">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />

          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <div className="my-3 items-start  pt-2 ">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Hello</p>
              <p className="text-sm text-muted-foreground">Lets go</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
