import type { LowerNavItem } from "@/lib/nav-menus";

const CATEGORY_SLUGS: Record<LowerNavItem, string> = {
  "About us": "about-us",
  Diagnostics: "diagnostics",
  Specialities: "specialities",
  "Super Specialities": "super-specialities",
  Services: "services",
  "Patient Guide": "patient-guide",
};

const ITEM_HREF_OVERRIDES: Record<string, string> = {
  "about-us|about-us": "/about-us",
  "about-us|team-of-doctors": "/team-of-doctors",
};

export function categoryToSlug(category: LowerNavItem): string {
  return CATEGORY_SLUGS[category];
}

export function labelToSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[''()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getNavItemHref(category: LowerNavItem, label: string): string {
  const overrideKey = `${categoryToSlug(category)}|${labelToSlug(label)}`;
  const override = ITEM_HREF_OVERRIDES[overrideKey];
  if (override) {
    return override;
  }

  return `/${categoryToSlug(category)}/${labelToSlug(label)}`;
}

export function isDynamicNavCategory(category: string): category is string {
  return Object.values(CATEGORY_SLUGS).includes(category);
}

export function categorySlugToLabel(slug: string): LowerNavItem | null {
  const entry = Object.entries(CATEGORY_SLUGS).find(([, value]) => value === slug);
  return (entry?.[0] as LowerNavItem | undefined) ?? null;
}
