import { useMemo } from "react";
import { useParams } from "next/navigation";

export const useConversation = () => {
   const params = useParams();

   const conversationId = useMemo(
      () => params?.conversationId || "",
      [params?.conversationId]
   );

   const isActive = useMemo(() => !!conversationId, [conversationId]);

   return {
      isActive,
      conversationId
   };
};
