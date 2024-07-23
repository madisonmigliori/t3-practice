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

const messageSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export default function TopicMessage() {
  const router = useRouter();
  const utils = api.useUtils();

  const addMessage = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const createMessage = api.message.create.useMutation({
    onSuccess: async () => {
      await utils.listing.invalidate();
      toast({
        title: "New Message Added",
      });
      addMessage.reset();
    },

    onError: async () => {
      toast({
        variant: "destructive",
        title: "Error: Failed to add new message",
        description: "Please fill out all required fields correctly.",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
    createMessage.mutate({
      message: values.message,
      topicId: "sssss",
    });
  };

  return (
    <div>
      <Form {...addMessage}>
        <form onSubmit={addMessage.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={addMessage.control}
              name={"message"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Enter Text..." {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="my-5 flex justify-end">
            <div>
              <Button type="submit">Post Message</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
