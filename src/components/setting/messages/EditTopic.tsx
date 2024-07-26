"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const topicSchema = z.object({
  title: z.string(),
});

export default function EditTopic({ id }: { id: string }) {
  const utils = api.useUtils();

  const topic = api.message.getSingleTopic.useQuery({ id });

  const editTopic = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      title: topic?.data?.title,
    },
  });

  const createTopic = api.message.updateTopic.useMutation({
    onSuccess: async () => {
      await utils.message.invalidate();
      toast({
        title: "Topic Updated",
      });
      editTopic.getValues();
    },

    onError: async () => {
      toast({
        variant: "destructive",
        title: "Error: Failed to add new topic",
        description: "Please fill out all required fields correctly.",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof topicSchema>) => {
    createTopic.mutate({
      title: values.title,
      id: id,
    });
  };

  return (
    <div>
      <Form {...editTopic}>
        <form onSubmit={editTopic.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={editTopic.control}
              name={"title"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        className=" flex flex-row justify-between text-[24px]"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
