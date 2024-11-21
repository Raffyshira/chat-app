"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import DMConversations from "./_components/DMConversations";
import CreateGroupDialog from "./_components/CreateGroupDialog"
import GroupConversationItem from "./_components/GroupConversationItem"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Loader2 } from "lucide-react";
export default function ConversationLayout({
   children
}: Readonly<{
   children: React.ReactNode;
}>) {
   const conversations = useQuery(api.conversations.get);
   return (
      <>
         <ItemList title="Messages" action={<CreateGroupDialog />}>
            {conversations ? (
               conversations.length === 0 ? (
                  <p
                     className="w-full h-full flex
               justify-center items-center"
                  >
                     No Conversation Found
                  </p>
               ) : (
                  conversations.map(item => {
                     return item.conversation.isGroup ? (
                     	                        <GroupConversationItem
                           key={item.conversation._id}
                           id={item.conversation._id}
                           name={item.conversation?.name || ""}
                           
                           lastMessageContent={item.lastMessage?.content}
                           lastMessageSender={item.lastMessage?.sender}
                           unseenCount={conversations.unseenCount}
                        />
                     	) : (
                        <DMConversations
                           key={item.conversation._id}
                           id={item.conversation._id}
                           username={item.otherMember?.username || ""}
                           imageUrl={item.otherMember?.imageUrl || ""}
                           lastMessageContent={item.lastMessage?.content}
                           lastMessageSender={item.lastMessage?.sender}
                           unseenCount={conversations.unseenCount}
                        />
                     );
                  })
               )
            ) : (
               <Loader2 />
            )}
         </ItemList>
         {children}
      </>
   );
}
