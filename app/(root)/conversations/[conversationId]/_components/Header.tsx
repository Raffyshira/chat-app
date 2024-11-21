import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { CircleArrowLeft, Settings } from "lucide-react";

interface Props {
   imageUrl?: string;
   name: string;
   options?: {
      label: string;
      destructive: boolean;
      onClick: () => void;
   }[];
}

const Header = ({ imageUrl, name, options }: Props) => {
   return (
      <Card className="w-full flex rounded-lg items-center p-2 justify-between">
         <div className="flex items-center gap-2">
            <Link className="block md:hidden" href="/conversations">
               <CircleArrowLeft />
            </Link>
            <Avatar className="w-8 h-8">
               <AvatarImage src={imageUrl} />
               <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold">{name}</h2>
         </div>
         <div className="flex gap-2">
            {options ? (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button size="icon" variant="secondary">
                        <Settings />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     {options.map((option, id) => {
                        return (
                           <DropdownMenuItem
                              className={cn("font-semibold", {
                                 "text-destructive": option.destructive
                              })}
                              onClick={option.onClick}
                              key={id}
                           >
                              {option.label}
                           </DropdownMenuItem>
                        );
                     })}
                  </DropdownMenuContent>
               </DropdownMenu>
            ) : null}
         </div>
      </Card>
   );
};

export default Header;
