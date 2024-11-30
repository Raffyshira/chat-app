"use client";

import { useUser } from "@clerk/nextjs";

import { Card } from "@/components/ui/card"

export default function DashboardContent() {
   const { user, isLoaded } = useUser();

   if (!isLoaded) {
      return <div>Loading...</div>;
   }

   return (
      <Card className="w-full bg-white p-6">
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
               Welcome, {user?.firstName}!
            </h2>
         </div>
         <p className="text-gray-600">
            This is your protected dashboard. Only authenticated users can see
            this page.
         </p>
         <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Your Info:</h3>
            <ul className="list-disc list-inside text-gray-700">
               <li>Email: {user?.emailAddresses[0].emailAddress}</li>
               <li>User ID: {user?.id}</li>
            </ul>
         </div>
      </Card>
   );
}
