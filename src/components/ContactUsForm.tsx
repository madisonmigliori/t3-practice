/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ContactInquiry } from "@prisma/client";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const contactFormSchema = z.object({
  inquiry: z.nativeEnum(ContactInquiry, {
    required_error: "Please select an inquiry.",
  }),
  comment: z.string().optional(),
});

export default function ContactUsForm() {
  const utils = api.useUtils();

  const [submit, setSubmit] = useState(false);

  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const createInquiry = api.contact.create.useMutation({
    onSuccess: async () => {
      setSubmit(true);
      toast({
        title: "Inquiry submitted",
      });
      contactForm.reset();
    },

    onError: async () => {
      toast({
        title: "Inquiry could not be submitted",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    createInquiry.mutate({
      inquiry: values.inquiry ?? "",
      comment: values.comment,
      recieverId: "Admin",
    });
  };
  return (
    <div className="flex justify-center">
      <div className="basis-4/6">
        <div className="mb-10">
          <h1 className="my-4 text-3xl font-bold">Contact Us</h1>
          {!submit ? (
            <h2 className=" text-xl font-semibold">
              Reach out to our team by completing this form below.
            </h2>
          ) : (
            <h2 className=" text-xl font-semibold">Inquiry submitted!</h2>
          )}
        </div>
        {!submit ? (
          <div className="flex justify-center">
            <div className="basis-5/6">
              <Form {...contactForm}>
                <form
                  onSubmit={contactForm.handleSubmit(onSubmit)}
                  className="space-y-8 rounded-lg"
                >
                  <FormField
                    control={contactForm.control}
                    name="inquiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          I&apos;d like help with...
                          <span className="text-red-400">*</span>
                        </FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Reason For Inquiry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={ContactInquiry.GENERAL}>
                              General Inquiry
                            </SelectItem>
                            <SelectItem value={ContactInquiry.BUYING}>
                              Buying Interest
                            </SelectItem>
                            <SelectItem value={ContactInquiry.SELLING}>
                              Selling Interest
                            </SelectItem>
                            <SelectItem value={ContactInquiry.VALUATION}>
                              Valuation Interest
                            </SelectItem>
                            <SelectItem value={ContactInquiry.PARTNERSHIP}>
                              Partnership Inquiry
                            </SelectItem>
                            <SelectItem
                              value={ContactInquiry.TECHNICAL_SUPPORT}
                            >
                              Technical Support
                            </SelectItem>
                            <SelectItem
                              value={ContactInquiry.ACCOUNT_ASSISTANCE}
                            >
                              Account Assistance
                            </SelectItem>
                            <SelectItem value={ContactInquiry.FEEDBACK}>
                              Feedback and Suggestions
                            </SelectItem>
                            <SelectItem value={ContactInquiry.OTHER}>
                              Other
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Any additional comments?{" "}
                          <span className="text-slate-400">[optional]</span>{" "}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    <Button className="basis-1/4 rounded-lg" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-start">
              <div className="basis-1/2">
                <div className="mt-10 text-wrap text-xl font-normal">
                  <p>
                    Thank you for reaching out to Dealonomy. We have recieved
                    your inquiry and one of our team members will get back to
                    you within the next 24-48 hours
                  </p>
                  <p className="mt-5">
                    In the meantime, feel free to explore our website for more
                    information about our services
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
