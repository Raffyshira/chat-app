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

const LeaveGroupDialog = ({ conversationId, open, setOpen }: Props) => {
   const { mutate: leaveGroup, pending } = useMutationState(
      api.conversation.leaveGroup
   );

   const handleLeaveGroup = async () => {
      leaveGroup({ conversationId })
         .then(() => {
            toast.success("You dont ");
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
                  This Action cannot be undone. You will not able to see
                  previous message or send new messages in this group
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleLeaveGroup} disabled={pending}>
                  Delete
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default LeaveGroupDialog;
