import { BellRing, Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export function NotificationsCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle className="my-2">Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </div>
        <div></div>
      </CardHeader>
      <div className="mx-10 grid grid-flow-row-dense grid-cols-1 gap-4">
        <CardContent className="grid w-full items-center gap-4">
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start border-b-2 py-2 ">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">TEST</p>
                <p className="text-sm text-muted-foreground">TEST</p>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className="mt-2">
        <Button variant="secondary">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
