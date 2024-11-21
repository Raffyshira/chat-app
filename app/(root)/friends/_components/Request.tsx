import { Id } from "@/convex/_generated/dataModel";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { ConvexError } from "convex/values";

import { User, Check, X } from "lucide-react";

interface Props {
   id: Id<"requests">;
   imageUrl: string;
   username: string;
   email: string;
}

const RequestUser = ({ id, imageUrl, username, email }: Props) => {
   const { mutate: denyRequest, pending: denyPending } = useMutationState(
      api.request.deny
   );
   const { mutate: acceptRequest, pending: acceptPending } = useMutationState(
      api.request.accept
   );
   return (
      <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
         <div className="flex items-center gap-4 truncate">
            <Avatar>
               <AvatarImage src={imageUrl} />
               <AvatarFallback>
                  <User />
               </AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
               <h4 className="truncate">{username}</h4>
               <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Button
               disabled={denyPending || acceptPending}
               size="icon"
               onClick={() => {
                  acceptRequest({ id })
                     .then(() => {
                        toast.success("Friend request accepted");
                     })
                     .catch(error => {
                        toast.error(
                           error instanceof ConvexError
                              ? error.data
                              : "Unexpected error occurred"
                        );
                     });
               }}
            >
               <Check />
            </Button>
            <Button
               disabled={denyPending}
               variant="destructive"
               size="icon"
               onClick={() => {
                  denyRequest({ id })
                     .then(() => {
                        toast.success("Friend request denied");
                     })
                     .catch(error => {
                        toast.error(
                           error instanceof ConvexError
                              ? error.data
                              : "Unexpected error occurred"
                        );
                     });
               }}
            >
               <X className="w-4 h-4" />
            </Button>
         </div>
      </Card>
   );
};

export default RequestUser;
