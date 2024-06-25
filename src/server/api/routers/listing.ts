/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  // displayListings: publicProcedure.input(
  //   z.object({
  //     limit: z.number().optional(),
  //     cursor: z.object({id: z.string(), createdAt: z.date()}).optional(), })).query(async ({input: {limit = 10, cursor}}))
  //   }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        location: z.string(),
        askingPrice: z.number(),
        grossRev: z.number(),
        adjCashFlow: z.number(),
      }),
    )
    .mutation(
      async ({
        input: { name, location, askingPrice, grossRev, adjCashFlow },
        ctx,
      }) => {
        const listing = await prisma.listing.create({
          data: { name, location, askingPrice, grossRev, adjCashFlow },
        });
        return listing;
      },
    ),
});

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
