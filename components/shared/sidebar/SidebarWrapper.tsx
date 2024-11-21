import NavDesktop from "@/components/shared/sidebar/nav/NavDesktop";
import MobileNav from "@/components/shared/sidebar/nav/MobileNav.tsx"
interface Props {
   children: React.ReactNode;
}

const SidebarWrapper = ({ children }: Props) => {
   return (
      <div className="h-full w-full p-4 flex flex-col md:flex-row gap-4">
      <MobileNav />
         <NavDesktop />
         <main className="h-full w-full flex gap-4">
            {children}
         </main>
      </div>
   );
};

export default SidebarWrapper;
