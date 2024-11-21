"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigation } from "@/hooks/useNavigation";

import { UserButton } from "@clerk/nextjs";

const NavDesktop = () => {
   const paths = useNavigation();
   return (
      <Card
         className="hidden md:flex md:flex-col md:justify-between
      md:items-center md:h-full md:w-16 md:px-2 md:py-4"
      >
         <nav>
            <ul className="flex flex-col items-center gap-4">
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
                              left6
                              px-2"
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
            </ul>
         </nav>
         <div className="flex flex-col items-center gap-4">
            <ModeToggle />
            <UserButton />
         </div>
      </Card>
   );
};

export default NavDesktop;
