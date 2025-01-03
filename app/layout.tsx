import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
 
import "./globals.css";

const inter = Inter({
   subsets: ["latin"],
   display: "swap",
   fallback: ["system-ui", "arial"]
});

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app"
};

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>
         <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <TooltipProvider>
               <ConvexClientProvider>{children}</ConvexClientProvider>
            </TooltipProvider>
            <Toaster richColors />
            </ThemeProvider>
         </body>
      </html>
   );
}
