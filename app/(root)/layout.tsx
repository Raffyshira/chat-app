import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper.tsx"
export default function Layout({
   children
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <SidebarWrapper>{children}</SidebarWrapper>
      </>
   );
}
