"use client";

import { Dispatch, SetStateAction } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexError } from "convex/values";
import { useMutationState } from "@/hooks/useMutationState";
import { toast } from "sonner";

import {
   AlertDialog,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogCancel,
   AlertDialogAction
} from "@/components/ui/alert-dialog";

interface Props {
   conversationId: Id<"conversations">;
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
}

const RemoveFriendDialog = ({ conversationId, open, setOpen }: Props) => {
   const { mutate: removeFriend, pending } = useMutationState(
      api.friend.remove
   );

   const handleRemoveFriend = async () => {
      removeFriend({ conversationId })
         .then(() => {
            toast.success("Removed friend");
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
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are You Sure ?</AlertDialogTitle>
               <AlertDialogDescription>
                  This Action cannot be undone. All messages will be deleted and
                  you will not be able to message this user. All group chats
                  will still work as usual{" "}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  onClick={handleRemoveFriend}
                  disabled={pending}
               >
                  Delete
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default RemoveFriendDialog;
