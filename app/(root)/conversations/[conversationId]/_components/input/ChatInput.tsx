"use client";

import { useRef } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { ConvexError } from "convex/values";

import TextareaAutosize from "react-textarea-autosize";

import { SendHorizonal } from "lucide-react";

const chatMessageSchema = z.object({
   content: z.string().min(1, {
      message: "This field can't be empty"
   })
});

const ChatInput = () => {
   const textareaRef = useRef<HTMLTextAreaElement | null>(null);
   const { conversationId } = useConversation();

   const { mutate: createMessage, pending } = useMutationState(
      api.message.create
   );

   const form = useForm<z.infer<typeof chatMessageSchema>>({
      resolver: zodResolver(chatMessageSchema),
      defaultValues: {
         content: ""
      }
   });

   const handleInputChange = (event: any) => {
      const { value, selectionStart } = event.target;

      if (selectionStart !== null) {
         form.setValue("content", value);
      }
   };

   const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
      createMessage({
         conversationId,
         type: "text",
         content: [values.content]
      })
         .then(() => {
            form.reset();
         })
         .catch(error => {
            toast.error(
               error instanceof ConvexError
                  ? error.data
                  : "Unexpected error occurred"
            );
         });
   };

   return (
      <Card className="w-full p-2 rounded-lg relative">
         <div className="flex items-end gap-2 w-full">
            <Form {...form}>
               <form
                  className="flex gap-2 items-end w-full"
                  onSubmit={form.handleSubmit(handleSubmit)}
               >
                  <FormField
                     control={form.control}
                     name="content"
                     render={({ field }) => {
                        return (
                           <FormItem className="w-full h-full">
                              <FormControl>
                                 <TextareaAutosize
                                    onKeyDown={async e => {
                                       if (e.key === "Enter" && !e.shiftKey) {
                                          e.preventDefault();
                                          await form.handleSubmit(
                                             handleSubmit
                                          )();
                                       }
                                    }}
                                    rows={1}
                                    maxRows={3}
                                    {...field}
                                    onChange={handleInputChange}
                                    onClick={handleInputChange}
                                    placeholder="Type a message"
                                    className="min-h-full w-full
        						resize-none border-0 outline-0 bg-card text-card-foreground
        						placeholder:text-muted-foreground p-1.5"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        );
                     }}
                  />
                  <Button disabled={pending} size="icon" type="submit">
                     <SendHorizonal />
                  </Button>
               </form>
            </Form>
         </div>
      </Card>
   );
};

export default ChatInput;