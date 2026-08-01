import type { LowerNavItem } from "@/lib/nav-menus";

export type NavPageSection = {
  heading: string;
  body: string;
};

export type NavPageContent = {
  category: LowerNavItem;
  categorySlug: string;
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: NavPageSection[];
  highlights: string[];
  relatedLinks?: { label: string; href: string }[];
};
