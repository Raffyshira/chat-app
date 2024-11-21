"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, AuthLoading, Authenticated } from "convex/react";

import LoadingLogo from "@/components/shared/loading-logo.tsx";

type Props = {
   // Define your props here
   children: React.ReactNode;
};
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider = ({ children }: Props) => {
   return (
      <ClerkProvider dynamic={true}>
         <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <Authenticated> {children}</Authenticated>
            <AuthLoading>
               <LoadingLogo size={100} />
            </AuthLoading>
         </ConvexProviderWithClerk>
      </ClerkProvider>
   );
};

export default ConvexClientProvider;
