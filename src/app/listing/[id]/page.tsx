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

import { api } from "~/trpc/server";

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
              <div className="flex flex-col gap-2">
                <CardTitle className="text-wrap text-4xl">
                  {getListing.name}
                </CardTitle>
                <CardDescription className="text-xl">
                  {getListing.location}
                </CardDescription>
              </div>
              <div>
                {!created && <HeartIcon id={getListing.id} />}

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
            <div className="relative">
              <div className=" mb-10 flex max-h-max max-w-max justify-center object-fill">
                <Image
                  className="absolute"
                  src={getListing.img ? getListing.img : "/business.jpg"}
                  layout="fill"
                  // width={100}
                  // height={100}
                  // style={{ width: "100%", height: "auto" }}
                  alt={""}
                  quality={100}
                  objectFit="cover"
                ></Image>
              </div>
            </div>

            <CardContent>
              <div>
                <div className="mt-4 grid grid-flow-row-dense grid-cols-2 justify-between gap-x-10 px-10 pb-5 text-3xl">
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
                <div className="mt-4 px-10 pb-5">
                  <div className=" grid grid-flow-row-dense grid-cols-2 justify-between gap-x-10">
                    <tr>
                      <td className=" font-semibold">Gross Revenue: </td>
                      <td>{formatPrice.format(Number(getListing.grossRev))}</td>
                    </tr>

                    <tr>
                      <td className=" font-semibold">EBITDA: </td>
                      <td>{formatPrice.format(Number(getListing.ebita))}</td>
                    </tr>

                    <tr>
                      <td className=" font-semibold">FF&E: </td>
                      <td>{formatPrice.format(Number(getListing.ffe))}</td>
                    </tr>

                    <tr>
                      <td className=" font-semibold">Inventory: </td>
                      <td>
                        {" "}
                        {formatPrice.format(Number(getListing.inventory))}
                      </td>
                    </tr>

                    <tr>
                      <td className=" font-semibold">Rent: </td>
                      <td> {formatPrice.format(Number(getListing.rent))}</td>
                    </tr>
                    <tr>
                      <td className=" font-semibold">Established: </td>
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
                      <tr>
                        <td className="font-semibold">Location: </td>
                        <td>{getListing?.location}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Inventory: </td>
                        <td>
                          {" "}
                          {formatPrice.format(Number(getListing.inventory))}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Real Estate:</td>
                        <td> {getListing?.realEstate}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Building Square Feet:</td>
                        <td> {getListing?.buildingSf}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Lease Expiration: </td>
                        <td> {getListing?.location}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Employees:</td>
                        <td> {getListing?.employees}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">
                          Furniture, Fixture & Equipment (FF&E):
                        </td>
                        <td> {formatPrice.format(Number(getListing.ffe))}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Facilities:</td>
                        <td> {getListing?.facilities}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Reason for Selling:</td>
                        <td> {getListing?.reasonForSelling}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Franchise:</td>
                        <td> {getListing?.franchise}</td>
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
    </div>
  );
}
