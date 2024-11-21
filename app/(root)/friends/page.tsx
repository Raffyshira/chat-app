"use client";

import AddFriends from "./_components/AddFriends.tsx";

import ItemList from "@/components/shared/item-list/ItemList";
import ConversationFallback from "@/components/shared/conversation/ConversationFallback.tsx";
import RequestUser from "./_components/Request.tsx";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Loader2 } from "lucide-react";

const FriendPage = () => {
   const requests = useQuery(api.requests.get);
   return (
      <>
         <ItemList title="Friends" action={<AddFriends />}>
            {requests ? (
               requests.length === 0 ? (
                  <p>No Request friend</p>
               ) : (
                  requests.map(request => {
                     return (
                        <RequestUser
                           key={request.request._id}
                           id={request.request._id}
                           imageUrl={request.sender.imageUrl}
                           username={request.sender.username}
                           email={request.sender.email}
                        />
                     );
                  })
               )
            ) : (
               <Loader2 className="h-8 w-8 animate-spin duration-1000 ease-in-out" />
            )}
         </ItemList>
         <ConversationFallback />
      </>
   );
};

export default FriendPage;
