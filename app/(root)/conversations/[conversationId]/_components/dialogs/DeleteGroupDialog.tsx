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

const DeleteGroupDialog = ({ conversationId, open, setOpen }: Props) => {
   const { mutate: deleteGroup, pending } = useMutationState(
      api.conversation.deleteGroup
   );

   const handleDeleteGroup = async () => {
      deleteGroup({ conversationId })
         .then(() => {
            toast.success("Group Deleted");
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
                  you will not be able to message this group.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
               <AlertDialogAction
                  onClick={handleDeleteGroup}
                  disabled={pending}
               >
                  Delete
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default DeleteGroupDialog;
	