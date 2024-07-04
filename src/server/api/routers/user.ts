import router from "next/router";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string(),
        email: z.string(),
        title: z.string(),
        officePhone: z.string(),
        homePhone: z.string(),
        mobilePhone: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          title: input.title,
          officePhone: input.officePhone,
          homePhone: input.homePhone,
          mobilePhone: input.mobilePhone,
        },
      });
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    return user;
  }),

  createdBy: protectedProcedure.query(async ({ ctx }) => {
    const author = await ctx.db.user.findMany({
      where: { id: ctx.session.user.id },
      include: {
        listings: true,
      },
    });
    return author.map((author) => author.id);
  }),
});
