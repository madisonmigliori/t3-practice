import React from "react";
import ContactForm from "~/components/listings/ContacForm";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <main>{children}</main>
      </div>
    </div>
  );
}
