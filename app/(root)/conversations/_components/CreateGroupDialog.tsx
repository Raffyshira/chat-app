"use client";
import { useMemo } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/useMutationState";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
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

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CirclePlus, X } from "lucide-react";

const createGroupFormSchema = z.object({
   name: z.string().min(1, { message: "This field can't be empty" }),
   members: z
      .string()
      .array()
      .min(1, { message: "You must select at least 1 friend" })
});

const CreateGroupDialog = () => {
   const friends = useQuery(api.friends.get);
   console.log("Friends:", friends);
   const { mutate: createGroup, pending } = useMutationState(
      api.conversation.createGroup
   );

   const form = useForm<z.infer<typeof createGroupFormSchema>>({
      resolver: zodResolver(createGroupFormSchema),
      defaultValues: {
         name: "",
         members: []
      }
   });

   const members = form.watch("members", []);

   const unselectedFriends = useMemo(() => {
      return friends
         ? friends.filter(friend => !members.includes(friend._id))
         : [];
   }, [members.length, friends?.length]);

   const handleSubmit = async (
      values: z.infer<typeof createGroupFormSchema>
   ) => {
      await createGroup({ name: values.name, members: values.members })
         .then(() => {
            form.reset();
            toast.success("Group created");
         })
         .catch(error => {
            toast.error(
               error instanceof ConvexError
                  ? error.data
                  : "Unexpected error occurres"
            );
         });
   };

   return (
      <Dialog>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button size="icon" variant="outline" asChild>
                  <DialogTrigger>
                     <CirclePlus />
                  </DialogTrigger>
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <p>Create Group</p>
            </TooltipContent>
         </Tooltip>
         <DialogContent className="block">
            <DialogHeader>
               <DialogTitle>Create Group</DialogTitle>
               <DialogDescription>Add your friend to started</DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <form
                  className="space-y-8"
                  onSubmit={form.handleSubmit(handleSubmit)}
               >
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => {
                        return (
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                 <Input placeholder="Group Name" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        );
                     }}
                  />
                  <FormField
                     control={form.control}
                     name="members"
                     render={() => {
                        return (
                           <FormItem>
                              <FormLabel>Friends</FormLabel>
                              <FormControl>
                                 <DropdownMenu>
                                    <DropdownMenuTrigger
                                       asChild
                                       disabled={unselectedFriends.length === 0}
                                    >
                                       <Button
                                          className="w-full"
                                          variant="outline"
                                       >
                                          Select
                                       </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                       {unselectedFriends.map(friend => {
                                          return (
                                             <DropdownMenuCheckboxItem
                                                key={friend._id}
                                                className="flex items-center gap-2 w-full
                                   		p-2"
                                                onCheckedChange={checked => {
                                                   if (checked) {
                                                      form.setValue("members", [
                                                         ...members,
                                                         friend._id
                                                      ]);
                                                   }
                                                }}
                                             >
                                                <Avatar className="w-8 h-8">
                                                   <AvatarImage
                                                      src={friend.imageUrl}
                                                   />
                                                   <AvatarFallback>
                                                      {friend.username.substring(
                                                         0,
                                                         1
                                                      )}
                                                   </AvatarFallback>
                                                </Avatar>
                                                <h4 className="truncate">
                                                   {friend.username}
                                                </h4>
                                             </DropdownMenuCheckboxItem>
                                          );
                                       })}{" "}
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        );
                     }}
                  />
                  {members && members.length ? (
                     <Card
                        className="flex
                  	items-center gap-3 overflow-x-auto w-full h-24 p-2
                  	no-scrollbar"
                     >
                        {friends
                           ?.filter(friend => members.includes(friend._id))
                           .map(friend => {
                              return (
                                 <div
                                    className="flex flex-col items-center gap-1"
                                    key={friend._id}
                                 >
                                    <div className="relative">
                                       <Avatar>
                                          <AvatarImage src={friend.imageUrl} />
                                          <AvatarFallback>
                                             {friend.username.substring(0, 1)}
                                          </AvatarFallback>
                                       </Avatar>
                                       <X
                                          className="text-muted-foreground w-4
                                       h-4 absolute bottom-8 left-7 bg-muted
                                       rounded-full cursor-pointer"
                                          onClick={() =>
                                             form.setValues(
                                                "members",
                                                members.filter(
                                                   id => id !== friend._id
                                                )
                                             )
                                          }
                                       />
                                    </div>
                                    <p
                                       className="truncate
                                    text-sm"
                                    >
                                       {friend.username.split(" ")[0]}
                                    </p>
                                 </div>
                              );
                           })}
                     </Card>
                  ) : null}
                  <DialogFooter>
                     <Button disabled={pending} type="submit">
                        Create Group
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default CreateGroupDialog;
