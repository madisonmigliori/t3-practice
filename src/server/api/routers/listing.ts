/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  //Single Listing
  getListing: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.listing.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  //Mutiple Listings
  getListingsById: publicProcedure
    .input(z.object({ id: z.array(z.number()) }))
    .query(({ ctx, input }) => {
      return ctx.db.listing.findMany({
        where: {
          id: {
            in: input.id,
          },
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

  createdBy: protectedProcedure.query(({ ctx }) => {
    return ctx.db.listing.findMany({
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

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        location: z.string(),
        askingPrice: z.number(),
        grossRev: z.number(),
        adjCashFlow: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updateListing = ctx.db.listing.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          location: input.name,
          askingPrice: input.askingPrice,
          grossRev: input.grossRev,
          adjCashFlow: input.adjCashFlow,
        },
      });
      return updateListing;
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
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const like = ctx.db.like.upsert({
        where: {
          userId_listingId: {
            listingId: Number(input.id),
            userId: ctx.session.user.id,
          },
        },
        create: {
          userId: ctx.session.user.id,
          listingId: Number(input.id),
        },
        update: {
          listingId: Number(input.id),
          userId: ctx.session.user.id,
        },
      });
      return like;
    }),

  unlikeListing: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const like = ctx.db.like.delete({
        where: {
          userId_listingId: {
            listingId: Number(input.id),
            userId: ctx.session.user.id,
          },
        },
      });
      return like;
    }),

  isLiked: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      const isLiked = ctx.db.like.findUnique({
        where: {
          userId_listingId: {
            userId: ctx.session.user.id,
            listingId: Number(input.id),
          },
        },
      });

      if (isLiked !== null) {
        return true;
      } else {
        return false;
      }
    }),

  isLikedList: protectedProcedure.query(({ ctx }) => {
    const likes = ctx.db.like.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        listing: true,
      },
    });
    return likes;
  }),
});
