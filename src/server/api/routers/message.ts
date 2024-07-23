/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { Session } from "next-auth";
import { useContext } from "react";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        topicId: z.string(),
        parentId: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const message = ctx.db.message.create({
        data: {
          message: input?.message,
          userId: ctx.session.user.id,
          topicId: input.topicId,
          parentId: input.parentId,
        },
      });
      return message;
    }),

  createTopic: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input, ctx }) => {
      const topic = ctx.db.topic.create({
        data: {
          title: input?.title,
          userId: ctx.session.user.id,
        },
      });
      return topic;
    }),

  getManyTopics: publicProcedure.query(({ ctx }) => {
    return ctx.db.topic.findMany({});
  }),

  getSingleTopic: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.topic.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // createdBy: protectedProcedure.query(async ({ ctx }) => {
  //   const author = await ctx.db.user.findMany({
  //     where: { id: ctx.session.user.id },
  //     include: {
  //       messages: true,
  //     },
  //   });
  //   return author.map((author) => author.id);
  // }),
});
