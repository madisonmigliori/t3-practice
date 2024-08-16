/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ContactInquiry } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const contactUsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        inquiry: z.nativeEnum(ContactInquiry),
        comment: z.string().optional(),
        recieverId: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const contactInquiry = ctx.db.contact.create({
        data: {
          inquiry: input.inquiry ?? "",
          comment: input.comment ?? "",
          sender: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
          reciever: {
            connectOrCreate: {
              where: {
                id: input.recieverId,
              },
              create: {
                id: "Admin",
                name: "Admin",
                email: "inquiry@t3practice.com",
              },
            },
          },
        },
      });
      return contactInquiry;
    }),

  contactListing: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        mobilePhone: z.string().optional(),
        comment: z.string().optional(),
        recieverId: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const contactLister = ctx.db.contact.create({
        data: {
          comment: input.comment,
          sender: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
          reciever: {
            connectOrCreate: {
              where: {
                id: input.recieverId,
              },
              create: {
                id: "contact",
                name: "Jane Doe",
                email: "contact@t3practice.com",
              },
            },
          },
        },
      });
      return contactLister;
    }),
});
