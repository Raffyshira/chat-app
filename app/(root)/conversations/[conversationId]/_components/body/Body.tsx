"use client";

import { useEffect } from "react";

import { useConversation } from "@/hooks/useConversation";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexError } from "convex/values";
import { useQuery } from "convex/react";

import Message from "./Message.tsx";

import {
   TooltipProvider,
   Tooltip,
   TooltipTrigger,
   TooltipContent
} from "@/components/ui/tooltip";

type Props = {
   members: {
      lastSeenMessageId?: Id<"messages">;
      username?: string;
      [key: string]: any;
   }[];
};

const Body = ({ members }: Props) => {
   const { conversationId } = useConversation();

   const messages = useQuery(api.messages.get, {
      id: conversationId as Id<"conversations">
   });

   const { mutate: markRead } = useMutationState(api.conversation.markRead);

   useEffect(() => {
      if (messages && messages.length > 0) {
         markRead({
            conversationId,
            messageId: messages[0].message._id
         });
      }
   }, [messages?.length, conversationId, markRead]);

   const formatSeenBy = (names: string[]) => {
      switch (names.length) {
         case 1:
            return (
               <p className="text-muted-foreground text-sm text-right">{`Seen by
   			${names[0]}`}</p>
            );
         case 2:
            return (
               <p className="text-muted-foreground text-sm text-right">{`Seen by
   			${names[0]} and ${names[1]}`}</p>
            );
         default:
            return (
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger>
                        <p className="text-muted-foreground text-sm text-right">{`Seen by
   			${names[0]}, ${names[1]} and ${names.length - 2} more`}</p>
                     </TooltipTrigger>
                     <TooltipContent>
                    	<ul>
                    		{
                    			names.map((name, index) => {
                    				return <li key={index}>{name}</li>
                    			})
                    		}
                    	</ul>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            );
      }
   };

   const getSeenMessage = (messageId: Id<"messages">) => {
      const seenUsers = members
         .filter(member => member.lastSeenMessageId === messageId)
         .map(user => user.username?.spilt(" ")[0]);

      if (seenUsers.length === 0) return undefined;

      return formatSeenBy(seenUsers);
   };
   return (
      <div
         className="flex flex-1 w-full overflow-y-scroll flex-col-reverse gap-2
    p-3 no-scrollbar"
      >
         {messages?.map(
            ({ message, senderImage, senderName, isCurrentUser }, index) => {
               const lastByUser =
                  index > 0 &&
                  messages[index - 1]?.message.senderId === message.senderId;

               const seenMessages = isCurrentUser
                  ? getSeenMessage(message._id)
                  : undefined;
               return (
                  <Message
                     key={message._id}
                     fromCurrentUser={isCurrentUser}
                     senderImage={senderImage}
                     senderName={senderName}
                     lastByUser={lastByUser}
                     content={message.content}
                     createdAt={message._creationTime}
                     seen={seenMessages}
                     type={message.type}
                  />
               );
            }
         )}
      </div>
   );
};

export default Body;
