import { getNavItemHref } from "@/lib/nav-routes";

export type NavLink = {
  label: string;
  href?: string;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

export type NavEntry = NavLink | NavGroup;

export function isNavGroup(item: NavEntry): item is NavGroup {
  return "items" in item;
}

export const LOWER_NAV_ITEMS = [
  "About us",
  "Diagnostics",
  "Specialities",
  "Super Specialities",
  "Services",
  "Patient Guide",
] as const;

export type LowerNavItem = (typeof LOWER_NAV_ITEMS)[number];

/** Source menu tree (labels only). Hrefs are assigned in {@link NAV_MENUS}. */
export const NAV_MENU_ENTRIES: Record<LowerNavItem, NavEntry[]> = {
  "About us": [
    { label: "About us" },
    { label: "Milestones" },
    { label: "Board of Trustees" },
    { label: "Team of Doctors" },
    { label: "Scope of Services" },
    { label: "Careers" },
  ],
  Diagnostics: [
    { label: "Audiology and Speech Therapy" },
    { label: "Cardiology" },
    { label: "Endoscopy" },
    { label: "Pathology" },
    { label: "Neurology" },
    { label: "Pulmonary Function Test" },
    {
      label: "Imaging-Sciences",
      items: [
        { label: "Radiology" },
        { label: "Ultrasonography" },
        { label: "Computed Tomography Scan (CT Scan)" },
      ],
    },
  ],
  Specialities: [
    { label: "Chest Medicine and Interventional Pulmonology" },
    { label: "Critical Care" },
    { label: "Diabetology" },
    { label: "Dermatology" },
    { label: "Ear Nose and Throat (ENT)" },
    { label: "Gynaecology and Obstretrics" },
    { label: "Medicine" },
    { label: "Orthopaedics" },
    { label: "Ophthalmology" },
    { label: "Paediatrics" },
    { label: "Pain Clinic" },
    { label: "Psychiatry" },
    { label: "Surgery" },
  ],
  "Super Specialities": [
    { label: "Anaesthesia" },
    { label: "Bariatric and Metabolic Surgery" },
    { label: "Cardiac Sciences" },
    { label: "Chest Diseases" },
    { label: "Endocrinology" },
    { label: "Head & Neck Oncology" },
    { label: "Gastroenterology" },
    { label: "Nephrology" },
    { label: "Neuro Sciences" },
    { label: "Oncology" },
    { label: "Plastic Surgery" },
    { label: "Rheumatology" },
    { label: "Urology" },
  ],
  Services: [
    { label: "Blood Bank" },
    { label: "Dialysis" },
    { label: "Physiotherapy Rehabilitation" },
  ],
  "Patient Guide": [
    { label: "TPA and Insurance" },
    { label: "Registration Admission" },
    { label: "Room Category Tariff" },
    { label: "I & P Scheme" },
    { label: "Attendant Visitors" },
    { label: "ATM's" },
    { label: "Cafeteria Transports" },
    { label: "Hotels and Restaurants" },
  ],
};

function assignNavHrefs(
  category: LowerNavItem,
  entries: NavEntry[],
): NavEntry[] {
  return entries.map((entry) => {
    if (isNavGroup(entry)) {
      return {
        ...entry,
        items: entry.items.map((item) => ({
          ...item,
          href: getNavItemHref(category, item.label),
        })),
      };
    }

    return {
      ...entry,
      href: getNavItemHref(category, entry.label),
    };
  });
}

export const NAV_MENUS: Record<LowerNavItem, NavEntry[]> = {
  "About us": assignNavHrefs("About us", NAV_MENU_ENTRIES["About us"]),
  Diagnostics: assignNavHrefs("Diagnostics", NAV_MENU_ENTRIES.Diagnostics),
  Specialities: assignNavHrefs("Specialities", NAV_MENU_ENTRIES.Specialities),
  "Super Specialities": assignNavHrefs(
    "Super Specialities",
    NAV_MENU_ENTRIES["Super Specialities"],
  ),
  Services: assignNavHrefs("Services", NAV_MENU_ENTRIES.Services),
  "Patient Guide": assignNavHrefs(
    "Patient Guide",
    NAV_MENU_ENTRIES["Patient Guide"],
  ),
};
