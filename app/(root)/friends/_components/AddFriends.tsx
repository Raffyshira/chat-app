"use client";
import { useMutationState } from "@/hooks/useMutationState";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { ConvexError } from "convex/values";

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
   Dialog,
   DialogTrigger,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter
} from "@/components/ui/dialog";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { UserPlus } from "lucide-react";

import { api } from "@/convex/_generated/api";

const addFriendFormSchema = z.object({
   email: z.string().email("Please enter a valid email")
});

const AddFriends = (props: Props) => {
   const { mutate: createRequest, pending } = useMutationState(
      api.request.create
   );

   const form = useForm<z.infer<typeof addFriendFormSchema>>({
      resolver: zodResolver(addFriendFormSchema),
      defaultValues: {
         email: ""
      }
   });

   const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
      await createRequest({ email: values.email })
         .then(() => {
            form.reset();
            toast.success("Friend Request Sent!");
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
      <>
         <Dialog>
            <Tooltip>
               <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                     <Button size="icon" variant="outline">
                        <UserPlus />
                     </Button>
                  </DialogTrigger>
               </TooltipTrigger>
               <TooltipContent>
                  <span>Add Friends</span>
               </TooltipContent>
            </Tooltip>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Add Friend</DialogTitle>
                  <DialogDescription>Banyakin temen lu nih</DialogDescription>
               </DialogHeader>
               <Form {...form}>
                  <form
                     className="space-y-8"
                     onSubmit={form.handleSubmit(handleSubmit)}
                  >
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    type="email"
                                    placeholder="Email..."
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <DialogFooter>
                        <Button type="submit" disabled={pending}>
                           Send
                        </Button>
                     </DialogFooter>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default AddFriends;
