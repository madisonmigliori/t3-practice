import type { Metadata } from "next";
import React from "react";
import ContactUsForm from "~/components/ContactUsForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "",
};

export default function page() {
  return (
    <div className="mt-10">
      <ContactUsForm />
    </div>
  );
}
