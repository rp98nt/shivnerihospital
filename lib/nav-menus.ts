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

export const NAV_MENUS: Record<LowerNavItem, NavEntry[]> = {
  "About us": [
    { label: "About us" },
    { label: "Milestones" },
    { label: "Board of Trustees" },
    { label: "Appeal" },
    { label: "Scope of Services" },
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
        { label: "Magnetic Resonance Imaging (MRI)" },
      ],
    },
  ],
  Specialities: [
    { label: "Ayurveda" },
    { label: "Chest Medicine and Interventional Pulmonology" },
    { label: "Critical Care" },
    { label: "Diabetology" },
    { label: "Dermatology" },
    { label: "Ear Nose and Throat (ENT)" },
    { label: "Gynaecology and Obstretrics" },
    { label: "Homeopathy" },
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
