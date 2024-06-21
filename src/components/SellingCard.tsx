"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SellingItem from "~/components/SellingItem";
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

export default function SellingCard() {
  return (
    <Card>
      <CardHeader className="mt-2">
        <CardTitle>Selling</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-5 grid grid-flow-row-dense grid-cols-1 gap-4">
          <SellingItem />
        </div>
      </CardContent>
    </Card>
  );
}
