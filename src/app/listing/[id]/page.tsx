import type { Listing } from "@prisma/client";
import { ArrowLeft, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DeleteButton from "~/components/misc/DeleteButton";
import HeartIcon from "~/components/misc/HeartIcon";

import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

import { api } from "~/trpc/server";

export default async function ListingComponent({
  params,
}: {
  params: { id: number };
}) {
  const id = Number(params.id);
  const getListing = await api.listing.getListing({ id });
  const createdBy = await api.user.createdBy();
  const me = await api.user.me();

  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // const whoCreated = createdBy !== me?.id ? false: true;

  return (
    <div>
      <Button variant="secondary" className="m-6">
        <Link href="/listing">
          {" "}
          <ArrowLeft />
        </Link>
      </Button>
      <div className="mx-10">
        {getListing ? (
          <Card>
            <CardHeader className="flex justify-between">
              <div className="flex flex-col">
                <CardTitle>{getListing.name}</CardTitle>
                <CardDescription>{getListing.location}</CardDescription>
              </div>
              <div>
                {me && <HeartIcon id={getListing.id} />}

                {!me && (
                  <>
                    <DeleteButton id={getListing.id} />
                    <Link
                      href={`/listing/${getListing.id}/editListing`}
                      className={cn(buttonVariants({ variant: "ghost" }))}
                    >
                      <Pencil />
                    </Link>{" "}
                  </>
                )}
              </div>
            </CardHeader>
            <div className="mb-10 flex max-h-max max-w-max justify-center object-cover">
              <Image
                src="/business.jpg"
                width={500}
                height={500}
                style={{ width: "100%", height: "auto" }}
                layout="responsive"
                alt={""}
                objectFit="cover"
              ></Image>
            </div>
            <CardContent>
              <div>
                <div>
                  <div className="flex flex-row flex-wrap justify-between px-10 pb-5 text-3xl">
                    <div className="text-blue-800">
                      <tr>
                        <td className="font-semibold">Asking Price: </td>
                        <td>
                          {" "}
                          {formatPrice.format(Number(getListing.askingPrice))}
                        </td>
                      </tr>
                    </div>

                    <tr>
                      <td className=" font-semibold">Cash Flow: </td>
                      <td>
                        {" "}
                        {formatPrice.format(Number(getListing.adjCashFlow))}
                      </td>
                    </tr>
                  </div>
                  <hr className="dotted"></hr>
                  <div className="flex flex-wrap justify-between px-10 py-5">
                    <div>
                      <tr>
                        <td className=" font-semibold">Gross Revenue: </td>
                        <td>
                          {" "}
                          {formatPrice.format(Number(getListing.grossRev))}
                        </td>
                      </tr>
                    </div>{" "}
                    <div>
                      <tr>
                        <td className=" font-semibold">EBITDA: </td>
                        <td>
                          {" "}
                          {formatPrice.format(Number(getListing.adjCashFlow))}
                        </td>
                      </tr>
                    </div>{" "}
                    <div>
                      <tr>
                        <td className=" font-semibold">FF&E: </td>
                        <td>
                          {" "}
                          {formatPrice.format(Number(getListing.adjCashFlow))}
                        </td>
                      </tr>
                    </div>{" "}
                    <div>
                      <tr>
                        <td className=" font-semibold">Inventory: </td>
                        <td>
                          {" "}
                          {formatPrice.format(Number(getListing.adjCashFlow))}
                        </td>
                      </tr>
                    </div>{" "}
                    <div>
                      <tr>
                        <td className=" font-semibold">Rent: </td>
                        <td>
                          {" "}
                          {formatPrice.format(Number(getListing.adjCashFlow))}
                        </td>
                      </tr>
                    </div>{" "}
                    <div>
                      <tr>
                        <td className=" font-semibold">Established: </td>
                        <td>
                          {" "}
                          {formatPrice.format(Number(getListing.adjCashFlow))}
                        </td>
                      </tr>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div>
                <div className=" px-10 py-5">
                  <h1 className=" text-2xl font-semibold">
                    {" "}
                    Business Description
                  </h1>
                  <div>description</div>
                </div>
                <hr></hr>
                <div className=" px-10 py-5">
                  <h1 className=" text-2xl font-semibold">
                    {" "}
                    Detail Information{" "}
                  </h1>
                  <div className="mt-4">
                    <tr>
                      <td className="font-semibold">Location: </td>
                      <td>{getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Inventory: </td>
                      <td> {getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Real Estate:</td>
                      <td> {getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Building Square Feet:</td>
                      <td> {getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Leas Expiration: </td>
                      <td> {getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Employees:</td>
                      <td> {getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">
                        Furniture, Fixture & Equipment (FF&E):
                      </td>
                      <td> {getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Facilities:</td>
                      <td> {getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Reason for Selling:</td>
                      <td> {getListing?.location}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Franchise:</td>
                      <td> {getListing?.location}</td>
                    </tr>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div>
                <div className=" px-10 py-5">
                  <h1 className=" text-2xl font-semibold">
                    {" "}
                    Business Location
                  </h1>
                  <div>description</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          "No Listings Found :("
        )}
      </div>
    </div>
  );
}
