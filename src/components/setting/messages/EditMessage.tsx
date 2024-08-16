import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";

interface TopicItemsProps {
  id: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
  message: string;
}

const postSchema = z.object({
  message: z.string(),
});

export default function EditMessage({ id, setEdit, message }: TopicItemsProps) {
  const utils = api.useUtils();
  const post = api.message.getMessage.useQuery({ id });

  const editPost = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),

    defaultValues: {
      message: post.data?.message ?? message,
    },
  });

  const updatePost = api.message.updateMessage.useMutation({
    onSuccess: async () => {
      setEdit(false);
      await utils.message.invalidate();

      editPost.reset();
    },

    onError: async () => {},
  });

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    updatePost.mutate({
      message: values.message,
      id: id,
    });
  };

  return (
    <div>
      <Form {...editPost}>
        <form onSubmit={editPost.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={editPost.control}
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
              <Button type="submit">Update</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
