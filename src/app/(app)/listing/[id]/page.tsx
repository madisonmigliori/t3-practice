import { toDate } from "date-fns";
import { ArrowLeft, Pencil } from "lucide-react";
import type { Metadata } from "next";
import { now } from "next-auth/client/_utils";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "~/components/listings/ContactForm";
import ShareListing from "~/components/listings/ShareListing";

import DeleteButton from "~/components/misc/DeleteButton";
import HeartIcon from "~/components/misc/HeartIcon";
import { AspectRatio } from "~/components/ui/aspect-ratio";

import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "View Listings Details",
  description: "",
};

export default async function ListingComponent({
  params,
}: {
  params: { id: number };
}) {
  const id = Number(params.id);
  const getListing = await api.listing.getListing({ id });
  const me = await api.user.me();

  const created = me?.id === getListing?.userId;

  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const est = getListing?.est;
  // const whoCreated = createdBy !== me?.id ? false: true;

  return (
    <div>
      <Button variant="secondary" className="m-6">
        <Link href="/listing">
          {" "}
          <ArrowLeft />
        </Link>
      </Button>
      <div className="ml-10 flex flex-row">
        <div className="mx-10 basis-2/3">
          {getListing ? (
            <Card>
              <CardHeader className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-wrap text-4xl">
                    {getListing.name}
                  </CardTitle>
                  <CardDescription className="text-xl">
                    {getListing.location}
                  </CardDescription>
                </div>
                <div>
                  {!created && (
                    <div className="flex flex-row">
                      <HeartIcon id={getListing.id} liked={getListing.liked} />
                      <ShareListing id={getListing.id} />
                    </div>
                  )}

                  {created && (
                    <div className="flex flex-row">
                      <DeleteButton id={getListing.id} />
                      <Link
                        href={`/listing/${getListing.id}/editListing`}
                        className={cn(buttonVariants({ variant: "ghost" }))}
                      >
                        <Pencil />
                      </Link>{" "}
                    </div>
                  )}
                </div>
              </CardHeader>
              <div>
                <div className=" ">
                  <div className="">
                    <Image
                      src={getListing.img ? getListing.img : "/business.jpg"}
                      width={600}
                      height={600}
                      style={{ width: "100%", height: "auto" }}
                      alt="Image"
                    />
                  </div>
                </div>
              </div>

              <CardContent>
                <div>
                  <div className="my-10 grid grid-flow-row-dense grid-cols-2 justify-between gap-x-10 px-10 text-3xl">
                    <div className="text-blue-800">
                      <div>
                        <div>
                          <span className="font-semibold">Asking Price:</span>
                          {formatPrice.format(Number(getListing.askingPrice))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>
                        {" "}
                        <span className=" font-semibold">Cash Flow: </span>{" "}
                        {formatPrice.format(Number(getListing.adjCashFlow))}
                      </div>
                    </div>
                  </div>
                  <hr className="dotted"></hr>
                  <div className="mt-4 px-10 pb-5">
                    <div className=" grid grid-flow-row-dense grid-cols-2 justify-between gap-x-10">
                      <div>
                        <div className="pb-2">
                          <span className="font-semibold">Gross Revenue:</span>
                          {formatPrice.format(Number(getListing.grossRev))}
                        </div>
                      </div>

                      <div>
                        <div className="pb-2">
                          {" "}
                          <span className="font-semibold">EBITDA: </span>
                          {formatPrice.format(Number(getListing.ebita))}
                        </div>
                      </div>

                      <div>
                        <div className="pb-2">
                          {" "}
                          <span className="font-semibold">FF&E: </span>{" "}
                          {formatPrice.format(Number(getListing.ffe))}
                        </div>
                      </div>

                      <div>
                        <div className="pb-2">
                          {" "}
                          <span className="font-semibold">Inventory: </span>
                          {formatPrice.format(Number(getListing.inventory))}
                        </div>
                      </div>

                      <div>
                        <div className="pb-2">
                          {" "}
                          <span className="font-semibold">Rent: </span>
                          {formatPrice.format(Number(getListing.rent))}
                        </div>
                      </div>
                      <div>
                        <div>
                          {" "}
                          <span className="font-semibold">
                            Established:{" "}
                          </span>{" "}
                          {getListing?.est
                            ?.toDateString()
                            .split("")
                            .splice(3, 4)}
                          {getListing?.est?.toDateString().split("").splice(10)}
                        </div>
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
                    <div>{getListing.description}</div>
                  </div>
                  <hr></hr>
                  <div className="py-5">
                    <h1 className=" px-10 text-2xl font-semibold">
                      {" "}
                      Detail Information{" "}
                    </h1>
                    <div className="mt-4 justify-between px-10 pb-5">
                      <div className=" grid grid-flow-row-dense grid-cols-2 gap-x-10 ">
                        <div>
                          <div className="pb-5">
                            <span className="font-semibold">Location: </span>
                            {getListing?.location}
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            {" "}
                            <span className="font-semibold">
                              Inventory:{" "}
                            </span>{" "}
                            {formatPrice.format(Number(getListing.inventory))}
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <span className="font-semibold">Real Estate:</span>{" "}
                            {getListing?.realEstate}
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <span className="font-semibold">
                              Building Square Feet:
                            </span>{" "}
                            {getListing?.buildingSf}
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            {" "}
                            <span className="font-semibold">
                              Lease Expiration:{" "}
                            </span>
                            {getListing?.leaseExp
                              ?.toDateString()
                              .split("")
                              .splice(3, 4)}
                            {getListing?.leaseExp
                              ?.toDateString()
                              .split("")
                              .splice(10)}
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <span className="font-semibold">Employees: </span>{" "}
                            {getListing?.employees}
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <span className="font-semibold">
                              Furniture, Fixture & Equipment (FF&E):{" "}
                            </span>
                            {formatPrice.format(Number(getListing.ffe))}
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <span className="font-semibold">Facilities: </span>{" "}
                            {getListing?.facilities}
                          </div>
                        </div>
                        <div>
                          <div>
                            {" "}
                            <span className="font-semibold">
                              Reason for Selling:
                            </span>{" "}
                            {getListing?.reasonForSelling}
                          </div>
                        </div>
                        <div>
                          <div>
                            {" "}
                            <span className="font-semibold">
                              Franchise:{" "}
                            </span>{" "}
                            {getListing?.franchise ? (
                              <>
                                <span>This is an established franchise.</span>
                              </>
                            ) : (
                              <>
                                <span>
                                  This is not an established franchise.
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
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
                    <div>{getListing.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            "No Listings Found :("
          )}
        </div>
        <div className=" flex ">
          <div className="gap-2 ">
            <ContactForm
              contactFirstName={getListing?.User?.firstName ?? ""}
              contactId={""}
              client={{
                id: me?.id ?? "",
                name: me?.name ?? "",
                firstName: me?.firstName ?? "",
                lastName: me?.lastName ?? "",
                email: me?.email ?? "",
                title: null,
                mobilePhone: me?.mobilePhone ?? "",
                officePhone: null,
                homePhone: null,
                emailVerified: null,
                image: null,
                messageId: null,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
