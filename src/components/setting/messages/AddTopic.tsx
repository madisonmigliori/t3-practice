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

export default function AddTopic() {
  const utils = api.useUtils();

  const addTopic = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      title: "New Topic",
    },
  });

  const createTopic = api.message.createTopic.useMutation({
    onSuccess: async () => {
      await utils.message.invalidate();
      toast({
        title: "New Topic Added",
      });
      addTopic.reset();
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
    });
  };

  return (
    <div>
      <Form {...addTopic}>
        <form onSubmit={addTopic.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={addTopic.control}
              name={"title"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        className=" my-2 flex flex-row justify-between border-none p-3 text-[16px]"
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
