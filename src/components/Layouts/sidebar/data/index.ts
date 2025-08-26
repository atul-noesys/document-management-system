import * as Icons from "../icons";

export interface BaseNavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavItemWithUrl extends BaseNavItem {
  url: string;
  items?: never;
}

export interface NavItemWithChildren extends BaseNavItem {
  url?: never;
  items: Array<{
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

export type NavItem = NavItemWithUrl | NavItemWithChildren;

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_DATA: NavSection[] = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Document List",
        icon: Icons.Table,
        items: [
          {
            title: "Finance",
            url: "/",
          },
          {
            title: "Development",
            url: "/development",
          },
          {
            title: "IT",
            url: "/it",
          },
          {
            title: "HR",
            url: "/hr",
          },
          {
            title: "Admin",
            url: "/admin",
          },
          {
            title: "Operations",
            url: "/operations",
          },
        ],
      },
      {
        title: "Create Document",
        icon: Icons.Alphabet,
        url: "/create-document",
      },
      {
        title: "approve",
        icon: Icons.Authentication,
        url: "/approve-document",
      },
    ],
  },
];
