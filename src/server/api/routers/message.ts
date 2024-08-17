/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { create } from "domain";
import { connect } from "http2";
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
        topicId: z.string().optional(),
        parentId: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const post = ctx.db.message.create({
        data: {
          message: input.message,
          parent: {
            connectOrCreate: {
              where: {
                id: input.parentId,
              },
              create: {
                id: input.parentId ?? "",
                message: input.message,
              },
            },
          },
          topic: {
            connectOrCreate: {
              where: {
                id: input.topicId ?? "",
              },
              create: {
                title: "General",
                id: "general",
                userId: "Admin",
              },
            },
          },

          users: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return post;
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
    return ctx.db.topic.findMany({
      orderBy: { userId: "asc" },
    });
  }),

  getManyMsg: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.message.findMany({
        where: {
          topicId: input.id,
        },
        include: {
          topic: input.id === "" ? false : true,
        },
        orderBy: { id: "desc" },
      });
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

  searchTopic: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(({ ctx, input }) => {
      const searchTopic = ctx.db.topic.findMany({
        where: {
          title: {
            search: input.title ?? "",
          },
        },
      });
      return searchTopic;
    }),

  getTopicMessages: publicProcedure
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
        orderBy: { id: "desc" },
      });
      return comments;
    }),

  getMessage: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const message = ctx.db.message.findUnique({
        where: {
          id: input.id,
        },
      });
      return message;
    }),

  updateMessage: protectedProcedure
    .input(
      z.object({
        id: z.string(),

        message: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updateMessage = ctx.db.message.update({
        where: {
          id: input.id,
        },
        data: {
          message: input.message,
        },
      });
      return updateMessage;
    }),

  deleteMessage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.message.delete({
        where: { id: input.id },
      });
    }),

  updateTopic: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updateTopic = ctx.db.topic.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
      return updateTopic;
    }),

  deleteTopic: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.topic.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
