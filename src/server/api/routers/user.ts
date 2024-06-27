import router from "next/router";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const userRouter = {
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    return user;
  }),
};
