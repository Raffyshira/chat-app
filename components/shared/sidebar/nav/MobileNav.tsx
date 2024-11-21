"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/hooks/useNavigation";
import { useConversation } from "@/hooks/useConversation.tsx";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const MobileNav = () => {
   const paths = useNavigation();
   const { isActive } = useConversation();

   if (isActive) return null;
   return (
      <div
         className="fixed bottom-2 w-[calc(100vw-32px)] p-2 h-16 flex
      items-center md:hidden rounded-t-none"
      >
         <nav className="w-full">
            <ul className="flex items-center justify-around">
               {paths.map((path, id) => {
                  return (
                     <li className="relative" key={id}>
                        <Tooltip>
                           <TooltipTrigger>
                              <Button
                                 size="icon"
                                 variant={path.active ? "default" : "outline"}
                                 asChild
                              >
                                 <Link href={path.href}>{path.icon}</Link>
                              </Button>
                              {path.count ? (
                                 <Badge
                                    className="absolute bottom-7
                              left-6
                              "
                                 >
                                    {path.count}
                                 </Badge>
                              ) : null}
                           </TooltipTrigger>
                           <TooltipContent>
                              <span>{path.name}</span>
                           </TooltipContent>
                        </Tooltip>
                     </li>
                  );
               })}

               <li>
                  <ModeToggle />
               </li>
               <li>
                  <UserButton />
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default MobileNav;
