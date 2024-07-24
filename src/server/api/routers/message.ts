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
        parentId: z.string(),
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
    return ctx.db.topic.findMany();
  }),

  getSingleTopic: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const topic = ctx.db.topic.findUnique({
        where: {
          id: input.id,
        },
      });
      return topic;
    }),

  getTopicMessages: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const topicMsgs = await ctx.db.topic.findUnique({
        where: { id: input.id },
        include: {
          message: true,
        },
      });
      return topicMsgs;
    }),

  createdByMessage: protectedProcedure
    .input(z.object({ messageId: z.string() }))
    .query(async ({ ctx, input }) => {
      const author = await ctx.db.message.findUnique({
        where: { id: input.messageId },
        include: {
          users: true,
        },
      });
      return author;
    }),

  getComments: protectedProcedure
    .input(z.object({ parentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.message.findMany({
        where: { parentId: input.parentId },
        include: {
          children: true,
        },
      });
      return comments;
    }),
});
