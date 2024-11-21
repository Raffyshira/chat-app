"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils.ts";

import { useConversation } from "@/hooks/useConversation.tsx";

interface Props {
   // Define your props here
   children: React.ReactNode;
   title: string;
   action?: React.ReactNode;
}

const ItemList = ({ children, title, action: Action }: Props) => {
   const { isActive } = useConversation();
   return (
      <div
         className={cn("hidden w-full md:w-80 md:flex-none h-full p-2", {
            block: !isActive, // Tampilkan di layar mobile saat tidak aktif
            "md:block": isActive
         })}
      >
         <div className="w-full mb-4 flex justify-between items-center">
            <h1 className="text-2xl tracking-tighter font-semibold">{title}</h1>
            {Action ? Action : null}
         </div>
         <div
            className="w-full h-full flex justify-start items-center gap-2
    	flex-col"
         >
            {children}
         </div>
      </div>
   );
};

export default ItemList;
