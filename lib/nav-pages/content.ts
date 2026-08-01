import {
  isNavGroup,
  LOWER_NAV_ITEMS,
  NAV_MENU_ENTRIES,
  type LowerNavItem,
} from "@/lib/nav-menus";
import { categoryToSlug, getNavItemHref, labelToSlug } from "@/lib/nav-routes";
import type { NavPageContent, NavPageSection } from "@/lib/nav-pages/types";

const HOSPITAL = "Shivneri Hospital";
const REGION = "Parbhani and the Marathwada region";

type PageOverride = Partial<
  Pick<NavPageContent, "subtitle" | "intro" | "sections" | "highlights" | "relatedLinks">
>;

function defaultSections(
  title: string,
  focus: string,
  bullets: string[],
): NavPageSection[] {
  return [
    {
      heading: "Overview",
      body: `${HOSPITAL} offers ${focus.toLowerCase()} with structured protocols, experienced clinicians, and coordinated support services so patients and families feel guided at every step.`,
    },
    {
      heading: "What We Offer",
      body: bullets.join(" "),
    },
    {
      heading: "Patient Experience",
      body: `Appointments can be booked through our front desk at 02452-222350 or via the online appointment page. Our team assists with reports, follow-up planning, and referrals within the hospital when additional speciality input is required.`,
    },
  ];
}

function specialtyPage(label: string, focus: string, bullets: string[]): PageOverride {
  return {
    subtitle: `${label} outpatient and inpatient care in ${REGION}`,
    intro: `Our ${label} team supports diagnosis, treatment, and long-term follow-up for patients across ${REGION}. Consultants work closely with diagnostics, pharmacy, and nursing teams to deliver safe, evidence-based care.`,
    sections: defaultSections(label, focus, bullets),
    highlights: bullets.slice(0, 4),
  };
}

function diagnosticPage(label: string, focus: string, bullets: string[]): PageOverride {
  return {
    subtitle: `${label} diagnostics at ${HOSPITAL}, Parbhani`,
    intro: `${HOSPITAL} provides ${focus.toLowerCase()} with calibrated equipment, trained technicians, and reporting reviewed by senior consultants. Reports are integrated with OPD, IPD, and emergency workflows for faster clinical decisions.`,
    sections: [
      {
        heading: "Department Overview",
        body: `The ${label} unit operates with defined quality checks, sample handling standards, and turnaround targets suitable for both routine and urgent cases referred from across ${REGION}.`,
      },
      {
        heading: "Tests and Capabilities",
        body: bullets.join(" "),
      },
      {
        heading: "Before Your Visit",
        body: "Please carry your doctor's referral note, previous reports, and a valid photo ID. Fasting or preparation instructions, when required, will be communicated at the time of booking. For appointments call 02452-222350.",
      },
    ],
    highlights: bullets.slice(0, 4),
  };
}

const PAGE_OVERRIDES: Record<string, PageOverride> = {
  "about-us|milestones": {
    subtitle: "Three decades of trusted healthcare in Parbhani",
    intro: `${HOSPITAL} has grown from a community-focused clinic into a full multispecialty campus serving families across Marathwada. Our milestones reflect steady investment in consultants, infrastructure, and patient-centred systems.`,
    sections: [
      {
        heading: "1994 — Foundation",
        body: "Shivneri Hospital began as a 20-bed facility on Gavhane Road with a commitment to affordable, ethical care for Parbhani town and nearby talukas.",
      },
      {
        heading: "2006 — Multispecialty Expansion",
        body: "New surgical suites, a dedicated ICU, and expanded OPD blocks enabled round-the-clock emergency care and broader speciality consultations.",
      },
      {
        heading: "2014 — Advanced Diagnostics",
        body: "Computed tomography, digital radiology, and an expanded pathology laboratory strengthened same-day diagnosis for referred and walk-in patients.",
      },
      {
        heading: "2020 — Critical Care Upgrade",
        body: "High-dependency beds, ventilator support, and dialysis services were scaled to meet rising demand during the pandemic and beyond.",
      },
      {
        heading: "Today",
        body: "The campus continues to add super-specialty programmes, insurance tie-ups, and visiting faculty while retaining the personal touch that local families expect.",
      },
    ],
    highlights: [
      "20-bed beginnings in 1994",
      "24/7 emergency and ICU support",
      "Modern imaging and pathology",
      "Serving Parbhani and Marathwada",
    ],
  },
  "about-us|board-of-trustees": {
    subtitle: "Governance guided by community trust and clinical excellence",
    intro: "The Board of Trustees provides strategic oversight for Shivneri Hospital, ensuring investments in safety, staffing, and service quality align with the needs of patients in Parbhani and surrounding districts.",
    sections: [
      {
        heading: "Our Role",
        body: "Trustees review clinical governance, capital projects, and community health initiatives. The board includes senior physicians, local business leaders, and public-health advocates with long-standing ties to Marathwada.",
      },
      {
        heading: "Clinical Governance",
        body: "Regular mortality-morbidity reviews, infection-control audits, and patient-feedback forums inform policy updates across OPD, IPD, and emergency services.",
      },
      {
        heading: "Community Commitment",
        body: "The board supports outreach camps, school health programmes, and concessional schemes for eligible patients under government and institutional partnerships.",
      },
    ],
    highlights: [
      "Physician-led governance",
      "Transparent quality reviews",
      "Community health outreach",
      "Long-term campus planning",
    ],
  },
  "about-us|scope-of-services": {
    subtitle: "Complete care under one Parbhani campus",
    intro: `${HOSPITAL} delivers outpatient consultations, planned surgeries, emergency care, diagnostics, dialysis, pharmacy, and rehabilitation services for adults and children.`,
    sections: [
      {
        heading: "Outpatient and Inpatient",
        body: "More than twenty speciality and super-speciality OPD clinics operate six days a week, supported by private, semi-private, and general ward admission options.",
      },
      {
        heading: "Emergency and Critical Care",
        body: "A dedicated emergency bay, triage team, and ICU/HDU beds are staffed 24/7 with anaesthesia and critical-care cover for medical and surgical emergencies.",
      },
      {
        heading: "Diagnostics and Support",
        body: "In-house pathology, radiology, CT, ultrasound, cardiology investigations, dialysis, blood bank coordination, and physiotherapy reduce the need for patients to travel outside Parbhani.",
      },
    ],
    highlights: [
      "Multispecialty OPD clinics",
      "24/7 emergency and ICU",
      "In-house diagnostics",
      "Dialysis and rehabilitation",
    ],
    relatedLinks: [
      { label: "Book an appointment", href: "/appointment" },
      { label: "Meet our doctors", href: "/team-of-doctors" },
    ],
  },
  "about-us|careers": {
    subtitle: "Join our team — doctors, nurses, reception, and allied health",
    intro: `${HOSPITAL} welcomes applications from compassionate professionals who want to serve patients across Parbhani and Marathwada. We hire consultants, medical officers, nursing staff, front-office teams, technicians, and administrative personnel.`,
    sections: [
      {
        heading: "Who We Hire",
        body: "Current recruitment focus includes consultants and medical officers across medicine and surgery, staff nurses and ICU-trained nursing personnel, reception and patient-relations executives, laboratory and radiology technicians, physiotherapists, and hospital administration staff.",
      },
      {
        heading: "How to Apply",
        body: "Email your CV with post applied for, registration details (where applicable), and contact number to careers@shivnerihospital.in. You may also visit the HR desk at the main campus on Gavhane Road, Parbhani, between 10:00 AM and 4:00 PM on working days.",
      },
      {
        heading: "What We Offer",
        body: "Structured induction, continuing medical education sessions, duty rosters designed with clinician input, and a collaborative environment where front-line staff are heard. Salaries are discussed based on qualification, experience, and role requirements.",
      },
    ],
    highlights: [
      "Doctors and medical officers",
      "Staff nurses and ICU nurses",
      "Reception and front office",
      "Lab, radiology, and admin roles",
    ],
    relatedLinks: [
      { label: "About Shivneri Hospital", href: "/about-us" },
      { label: "Contact for appointments", href: "/appointment" },
    ],
  },
  "patient-guide|tpa-and-insurance": {
    subtitle: "Cashless and reimbursement support for admitted patients",
    intro: "Our billing desk coordinates with major TPAs and insurance companies so eligible patients can avail cashless treatment or structured reimbursement documentation at discharge.",
    sections: [
      {
        heading: "Cashless Process",
        body: "Present your policy card and photo ID at admission. Our team initiates pre-authorisation with your insurer and keeps you informed of approved amounts and any top-up requirements.",
      },
      {
        heading: "Documents Required",
        body: "Photo ID, insurance policy copy, TPA card, employer letter (if applicable), and prior investigation reports help avoid delays during authorisation.",
      },
    ],
    highlights: [
      "Pre-authorisation support",
      "Major TPA tie-ups",
      "Billing desk guidance",
      "Discharge documentation",
    ],
  },
  "patient-guide|registration-admission": {
    subtitle: "Simple steps for OPD registration and planned admission",
    intro: "New and returning patients can register at the ground-floor reception. Planned admissions are scheduled through the consulting doctor's office and the admission counter.",
    sections: [
      {
        heading: "OPD Registration",
        body: "Carry a valid photo ID and previous medical records. Registration fees and consultation charges are displayed at reception. Same-day appointments are subject to doctor availability.",
      },
      {
        heading: "Planned Admission",
        body: "Your consultant provides an admission advice note. The admission desk confirms bed category, estimated deposit, and insurance details before room allocation.",
      },
    ],
    highlights: [
      "Ground-floor reception",
      "ID and prior records",
      "Admission advice note",
      "Bed category selection",
    ],
  },
  "services|blood-bank": {
    subtitle: "Coordinated blood component support for emergencies and surgeries",
    intro: "Shivneri Hospital maintains ties with licensed regional blood banks to arrange screened blood components for elective surgeries, obstetric emergencies, and trauma cases.",
    sections: [
      {
        heading: "Availability",
        body: "Packed red cells, platelets, and plasma are arranged through approved suppliers with cross-matching performed in-house before transfusion.",
      },
      {
        heading: "For Patients and Attendants",
        body: "Follow physician instructions regarding donation drives and replacement policies. Emergency requests are prioritised through the duty medical officer and blood bank coordinator.",
      },
    ],
    highlights: [
      "Screened components",
      "Cross-matching in-house",
      "Emergency coordination",
      "Surgery and obstetric support",
    ],
  },
  "services|dialysis": {
    subtitle: "Haemodialysis unit for chronic kidney disease patients",
    intro: "Our dialysis unit offers scheduled haemodialysis sessions with infection-control protocols, dedicated nursing staff, and nephrology oversight for patients across Parbhani district.",
    sections: [
      {
        heading: "Unit Features",
        body: "Individual dialysis stations, volumetric monitors, and water-quality checks aligned with standard dialysis practice. Sessions are scheduled in morning and afternoon shifts.",
      },
      {
        heading: "Getting Started",
        body: "Patients require a nephrologist referral and recent laboratory work-up. The unit team explains vascular access care, diet counselling, and session frequency during the first visit.",
      },
    ],
    highlights: [
      "Scheduled HD sessions",
      "Nephrology oversight",
      "Infection-control protocols",
      "Morning and afternoon shifts",
    ],
  },
};

const SPECIALTY_DETAILS: Record<string, PageOverride> = {
  "chest-medicine-and-interventional-pulmonology": specialtyPage(
    "Chest Medicine and Interventional Pulmonology",
    "respiratory and pulmonary care",
    [
      "Asthma and COPD clinics with spirometry.",
      "Interventional pulmonology procedures where indicated.",
      "Sleep-disordered breathing evaluation.",
      "Post-COVID and chronic cough management.",
    ],
  ),
  orthopaedics: specialtyPage("Orthopaedics", "bone and joint care", [
    "Fracture and trauma management.",
    "Joint pain and arthritis clinics.",
    "Sports injury assessment.",
    "Post-operative rehabilitation planning with physiotherapy.",
  ]),
  paediatrics: specialtyPage("Paediatrics", "child health", [
    "Newborn and infant check-ups.",
    "Vaccination guidance.",
    "Growth monitoring and nutrition counselling.",
    "Common childhood illness management.",
  ]),
  "cardiac-sciences": specialtyPage("Cardiac Sciences", "advanced heart care", [
    "ECG, echocardiography, and stress testing.",
    "Heart failure and hypertension clinics.",
    "Coordination with ICU for acute cardiac events.",
    "Preventive cardiology counselling.",
  ]),
};

function getOverrideKey(categorySlug: string, slug: string): string {
  return `${categorySlug}|${slug}`;
}

function buildPageContent(
  category: LowerNavItem,
  label: string,
  parentGroup?: string,
): NavPageContent {
  const categorySlug = categoryToSlug(category);
  const slug = labelToSlug(label);
  const overrideKey = getOverrideKey(categorySlug, slug);
  const specialtyOverride = SPECIALTY_DETAILS[slug];
  const override =
    PAGE_OVERRIDES[overrideKey] ?? specialtyOverride ?? undefined;

  const title = label;
  let subtitle = `${title} at ${HOSPITAL}`;
  let intro = `${HOSPITAL} provides ${title.toLowerCase()} services for patients across ${REGION}.`;
  let sections: NavPageSection[] = defaultSections(
    title,
    `${title} care`,
    [
      `Consultation and evaluation for ${title.toLowerCase()} conditions.`,
      "Coordination with in-house diagnostics and pharmacy.",
      "Inpatient support when admission is required.",
      "Follow-up planning and patient education.",
    ],
  );
  let highlights = [
    "Experienced consultants",
    "In-house diagnostics",
    "Coordinated inpatient care",
    "Serving Parbhani and Marathwada",
  ];

  if (category === "Diagnostics") {
    const diagnosticOverride = diagnosticPage(
      parentGroup ? `${label} (${parentGroup})` : label,
      parentGroup ? `${label} within ${parentGroup}` : label,
      [
        `${label} investigations with quality-controlled reporting.`,
        "Same-campus coordination with referring consultants.",
        "Digital report sharing for follow-up visits.",
        "Technician and consultant review before release.",
      ],
    );
    subtitle = diagnosticOverride.subtitle ?? subtitle;
    intro = diagnosticOverride.intro ?? intro;
    sections = diagnosticOverride.sections ?? sections;
    highlights = diagnosticOverride.highlights ?? highlights;
  } else if (category === "Specialities" || category === "Super Specialities") {
    const specOverride = specialtyPage(
      label,
      `${label} speciality care`,
      [
        `Outpatient clinics for ${label.toLowerCase()} conditions.`,
        "Multidisciplinary coordination within the hospital.",
        "Emergency cover linked with ICU and anaesthesia teams.",
        "Preventive counselling and follow-up protocols.",
      ],
    );
    subtitle = specOverride.subtitle ?? subtitle;
    intro = specOverride.intro ?? intro;
    sections = specOverride.sections ?? sections;
    highlights = specOverride.highlights ?? highlights;
  } else if (category === "Services") {
    subtitle = `${title} — hospital support services`;
    intro = `${HOSPITAL}'s ${title.toLowerCase()} service supports admitted and visiting patients with reliable, protocol-driven care.`;
  } else if (category === "Patient Guide") {
    subtitle = `${title} — information for patients and attendants`;
    intro = `Practical guidance for patients and families visiting ${HOSPITAL} in Parbhani. Our front-office teams can assist with any questions related to ${title.toLowerCase()}.`;
    sections = [
      {
        heading: "Good to Know",
        body: `For ${title.toLowerCase()}, please check with reception on arrival. Carry photo ID, admission documents, and insurance papers where applicable.`,
      },
      {
        heading: "Need Help?",
        body: "Call 02452-222350 for appointments or +91 84328 42222 for emergencies. Visit the help desk on the ground floor for on-campus directions.",
      },
    ];
  }

  if (override) {
    subtitle = override.subtitle ?? subtitle;
    intro = override.intro ?? intro;
    sections = override.sections ?? sections;
    highlights = override.highlights ?? highlights;
  }

  return {
    category,
    categorySlug,
    slug,
    title,
    subtitle,
    intro,
    sections,
    highlights,
    relatedLinks: override?.relatedLinks,
  };
}

function collectNavLabels(): Array<{
  category: LowerNavItem;
  label: string;
  parentGroup?: string;
}> {
  const entries: Array<{
    category: LowerNavItem;
    label: string;
    parentGroup?: string;
  }> = [];

  for (const category of LOWER_NAV_ITEMS) {
    for (const item of NAV_MENU_ENTRIES[category]) {
      if (isNavGroup(item)) {
        for (const child of item.items) {
          entries.push({
            category,
            label: child.label,
            parentGroup: item.label,
          });
        }
      } else {
        entries.push({ category, label: item.label });
      }
    }
  }

  return entries;
}

const NAV_PAGES_LIST: NavPageContent[] = collectNavLabels()
  .filter(({ category, label }) => {
    const href = getNavItemHref(category, label);
    return href.split("/").length > 2;
  })
  .map(({ category, label, parentGroup }) =>
    buildPageContent(category, label, parentGroup),
  );

const NAV_PAGES_MAP = new Map(
  NAV_PAGES_LIST.map((page) => [`${page.categorySlug}/${page.slug}`, page]),
);

export function getNavPage(
  categorySlug: string,
  slug: string,
): NavPageContent | undefined {
  return NAV_PAGES_MAP.get(`${categorySlug}/${slug}`);
}

export function getAllNavPageParams(): Array<{ category: string; slug: string }> {
  return NAV_PAGES_LIST.map((page) => ({
    category: page.categorySlug,
    slug: page.slug,
  }));
}

export { NAV_PAGES_LIST };
