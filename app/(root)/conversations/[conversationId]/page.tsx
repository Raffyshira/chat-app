"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

import Body from "./_components/body/Body";
import Header from "./_components/Header";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { Loader2 } from "lucide-react";

const ConversationPage = () => {
   // Gunakan useParams untuk mengakses conversationId
   const params = useParams();
   const conversationId = params?.conversationId as Id<"conversations">;

   const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
   const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
   const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
   const [callType, setCallType] = useState<"audio" | "video" | null>(null);

   // Jika `conversationId` belum siap, tampilkan loader
   if (!conversationId) {
      return (
         <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="w-7 h-7 animate-spin duration-700" />
         </div>
      );
   }

   const conversation = useQuery(api.conversation.get, { id: conversationId });

   return conversation === undefined ? (
      <div className="w-full h-full flex justify-center items-center">
         <Loader2 className="w-7 h-7 animate-spin duration-700" />
      </div>
   ) : conversation === null ? (
      <p className="w-full h-full flex justify-center items-center">
         Conversation Not Found
      </p>
   ) : (
      <ConversationContainer>
         <RemoveFriendDialog
            conversationId={conversationId}
            open={removeFriendDialogOpen}
            setOpen={setRemoveFriendDialogOpen}
         />
         <LeaveGroupDialog
            conversationId={conversationId}
            open={leaveGroupDialogOpen}
            setOpen={setLeaveGroupDialogOpen}
         />
         <DeleteGroupDialog
            conversationId={conversationId}
            open={deleteGroupDialogOpen}
            setOpen={setDeleteGroupDialogOpen}
         />
         <Header
            name={
               (conversation.isGroup
                  ? conversation.name
                  : conversation.otherMember.username) || ""
            }
            imageUrl={
               conversation.isGroup
                  ? undefined
                  : conversation.otherMember.imageUrl
            }
            options={
               conversation.isGroup
                  ? [
                       {
                          label: "Leave group",
                          destructive: false,
                          onClick: () => setLeaveGroupDialogOpen(true)
                       },
                       {
                          label: "Delete group",
                          destructive: true,
                          onClick: () => setDeleteGroupDialogOpen(true)
                       }
                    ]
                  : [
                       {
                          label: "Remove friend",
                          destructive: true,
                          onClick: () => setRemoveFriendDialogOpen(true)
                       }
                    ]
            }
         />
         <Body
            members={
               conversation.isGroup
                  ? conversation.otherMembers
                     ? conversation.otherMembers
                     : []
                  : conversation.otherMember
                  ? [conversation.otherMember]
                  : []
            }
         />
         <ChatInput />
      </ConversationContainer>
   );
};

export default ConversationPage;
