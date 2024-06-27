/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "lucide-react";

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  getListing: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.listing.findUnique({
        where: {
          id: Number(input.id),
        },
      });
    }),

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
          userId: ctx.session?.user.id,
        },
      });
    }),

  getSelling: protectedProcedure.query(({ ctx }) => {
    return ctx.db.listing.findMany({
      orderBy: { id: "desc" },
      where: { User: { id: ctx.session.user.id } },
    });
  }),

  searchListing: publicProcedure
    .input(
      z.object({
        name: z.string(),
        location: z.string(),
        askingPrice: z.number(),
        grossRev: z.number(),
        adjCashFlow: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.listing.findMany({
        where: {
          OR: [
            {
              name: input.name,
              location: input.location,
              askingPrice: input.askingPrice,
              grossRev: input.grossRev,
              adjCashFlow: input.adjCashFlow,
            },
          ],
        },
      });
    }),

  deleteListing: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.listing.delete({
        where: {
          User: { id: ctx.session.user.id },
          id: Number(input.id),
        },
      });
    }),

  likeListing: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const like = ctx.db.like.create({
        data: { listingId: Number(id), userId: ctx.session.user.id },
      });

      return like;
    }),
});
