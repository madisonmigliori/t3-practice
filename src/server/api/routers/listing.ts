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

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        location: z.string(),
        askingPrice: z.number(),
        grossRev: z.number(),
        adjCashFlow: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.listing.create({
        data: {
          name: input.name,
          location: input.location,
          askingPrice: input.askingPrice,
          grossRev: input.grossRev,
          adjCashFlow: input.adjCashFlow,
        },
      });
    }),
});

getLatest: publicProcedure.query(({ ctx }) => {
  return ctx.db.listing.findFirst({
    orderBy: { id: "desc" },
  });
});
//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
