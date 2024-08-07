/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { Listing, Prisma } from "@prisma/client";
import type { Session } from "next-auth";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// const createListingWhereClause = (
//   input: Listing
//   ctx: {
//     session: Session | null;
//   }
// ) => {
//   const where: Prisma.ListingWhereInput = {
//     name: {
//       search: input.query
//         ?.split(' ')
//         .filter((x) => x.length > 0)
//         .join(' <-> '),
//     }
//   }

//   // console.log('Where clause', JSON.stringify(where, null, 2));

//   return where;
// }

export const listingRouter = createTRPCRouter({
  //Single Listing
  getListing: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.listing.findUnique({
        where: {
          id: input.id,
        },
        include: {
          User: true,
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
        ebita: z.number(),
        ffe: z.number(),
        inventory: z.number(),
        rent: z.number(),
        est: z.date(),
        description: z.string(),
        realEstate: z.string(),
        buildingSf: z.string(),
        leaseExp: z.date(),
        employees: z.number(),
        facilities: z.string(),
        reasonForSelling: z.string(),
        franchise: z.boolean(),
        img: z.string(),
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
          ebita: input.ebita,
          ffe: input.ffe,
          inventory: input.inventory,
          rent: input.rent,
          est: input.est,
          description: input.description,
          realEstate: input.realEstate,
          buildingSf: input.buildingSf,
          leaseExp: input.leaseExp,
          employees: input.employees,
          facilities: input.facilities,
          reasonForSelling: input.reasonForSelling,
          franchise: input.franchise,
          img: input.img,
          userId: ctx.session?.user.id,
          liked: false,
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
    .input(z.object({ text: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.listing.findMany({
        where: {
          OR: [
            {
              name: {
                search: input.text ?? "",
              },
            },
            {
              location: {
                search: input.text,
              },
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
      return ctx.db.like.findUnique({
        where: {
          userId_listingId: {
            userId: ctx.session.user.id,
            listingId: Number(input.id),
          },
        },
      });
    }),

  isLikedList: protectedProcedure.query(async ({ ctx }) => {
    const likes = await ctx.db.like.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        listing: true,
      },
    });
    return likes.map((like) => like.listing);
  }),
});
