"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useNavigation } from "@/hooks/useNavigation";
import { useConversation } from "@/hooks/useConversation.tsx";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton, useUser } from "@clerk/nextjs";

import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { User, Settings, LogOut, LayoutDashboard } from "lucide-react";

const MobileNav = ({
   nameUser = "Anonymous",
   emailUser = "No email provided",
   avatarUrl = ""
}: {
   nameUser?: string;
   emailUser?: string;
   avatarUrl?: string;
}) => {
   const paths = useNavigation();
   const { isActive } = useConversation();

   const [open, setOpen] = useState(false);
   const { user } = useUser();

   console.log(user);

   const email = user?.emailAddresses?.[0]?.emailAddress; // Mendapatkan email pertama
   const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim(); // Menggabungkan nama depan dan belakang
   const currentUserImage = user?.imageUrl;

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
                  <DropdownMenu open={open} onOpenChange={setOpen}>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           className="relative h-10 w-10 rounded-full"
                        >
                           <Avatar className="h-8 w-8">
                              <AvatarImage src={user.imageUrl} alt={nameUser} />
                              <AvatarFallback>
                                 {nameUser
                                    .split(" ")
                                    .map(n => n[0])
                                    .join("")
                                    .toUpperCase()}
                              </AvatarFallback>
                           </Avatar>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                     >
                        <DropdownMenuLabel className="font-normal">
                           <div className="flex flex-col space-y-1">
                              <p className="text-sm leading-none">{name}</p>
                              <p className="text-xs leading-none text-muted-foreground">
                                 {email}
                              </p>
                           </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <a href="/user-profile">
                           <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                           </DropdownMenuItem>
                        </a>
                        <a href="/dashboard">
                           <DropdownMenuItem>
                              <LayoutDashboard className="h-4 w-4 mr-2" />
                              <span>Dashboard</span>
                           </DropdownMenuItem>
                        </a>
                        <DropdownMenuItem>
                           <Settings className="mr-2 h-4 w-4" />
                           <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                           <LogOut className="mr-2 h-4 w-4" />
                           <span>Log Out</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default MobileNav;
