export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};
export type MenuItem = NavItem & {
  image?: string;
  description?: string;
  launched?: boolean;
  external?: boolean;
  forceReload?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: MenuItem[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavMenuConfig = {
  pagesNav: SidebarNavItem[];
  examplesNav: SidebarNavItem[];
  links: MenuItem[];
};
