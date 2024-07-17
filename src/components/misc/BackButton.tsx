"use client";
import { ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <div>
      <Button variant="secondary" className="m-6" onClick={handleClick}>
        <ArrowLeft />
      </Button>
    </div>
  );
}
