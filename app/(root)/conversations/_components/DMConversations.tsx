import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { User } from "lucide-react";

type Props = {
   id: Id<"conversations">;
   imageUrl: string;
   username: string;
   lastMessageSender?: string;
   lastMessageContent?: string;
   unseenCount: number;
};

const DMConversations = ({
   id,
   imageUrl,
   username,
   lastMessageContent,
   lastMessageSender,
   unseenCount
}: Props) => {
   return (
      <Link href={`/conversations/${id}`} className="w-full">
         <div className="pb-3 border-b flex flex-row items-center gap-4 justify-between">
            <div className="flex flex-row items-center gap-4 truncate">
               <Avatar>
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback>
                     <User />
                  </AvatarFallback>
               </Avatar>
               <div className="flex flex-col truncate">
                  <h4 className="truncate capitalize">{username}</h4>
                  {lastMessageSender && lastMessageContent ? (
                     <span
                        className="text-sm text-muted-foreground flex truncate
                  overflow-ellipsis"
                     >
                        <p className="font-semibold">
                           {lastMessageSender}
                           {":"}&nbsp;
                        </p>
                        <p className="truncate overflow-ellipsis">
                           {lastMessageContent}
                        </p>
                     </span>
                  ) : (
                     <p
                        className="text-sm
                  text-muted-foreground truncate"
                     >
                        Say hi to your friend!
                     </p>
                  )}
               </div>
            </div>
            {unseenCount ? <Badge>{unseenCount}</Badge> : null}
         </div>
      </Link>
   );
};

export default DMConversations;
