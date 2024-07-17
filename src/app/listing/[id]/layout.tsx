import React from "react";
import ContactForm from "~/components/listings/ContacForm";

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <main className="ml-10 basis-2/3">{children}</main>
        <div className="mt-20">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
