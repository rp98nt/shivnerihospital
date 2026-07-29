import type { Doctor } from "@/lib/doctors";

export type BackgroundTab = "experience" | "education" | "awards";

export type BackgroundEntryIcon =
  | "building"
  | "hospital"
  | "graduation"
  | "award"
  | "user"
  | "clinical"
  | "research";

export type BackgroundEntry = {
  period: string;
  title: string;
  organization: string;
  description: string;
  icon: BackgroundEntryIcon;
};

export type DoctorBackground = {
  workExperience: BackgroundEntry[];
  education: BackgroundEntry[];
  awards: BackgroundEntry[];
};

function parseQualifications(qualifications: string) {
  return qualifications
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function buildEducationEntries(doctor: Doctor): BackgroundEntry[] {
  const parts = parseQualifications(doctor.qualifications);
  const specialty = doctor.specialty.toLowerCase();

  const qualificationEntries: BackgroundEntry[] = parts.map((qualification, index) => ({
    period:
      index === 0
        ? "Postgraduate Training"
        : index === 1
          ? "Graduate Degree"
          : "Advanced Certification",
    title: qualification,
    organization: "Recognised Medical University, India",
    description:
      index === 0
        ? `Completed advanced training in ${specialty} with rigorous clinical rotations, examinations, and practical assessments.`
        : index === 1
          ? "Foundational medical education covering anatomy, physiology, pathology, and core clinical disciplines."
          : `Specialist certification supporting advanced practice in ${specialty}.`,
    icon: "graduation",
  }));

  qualificationEntries.push({
    period: "Internship",
    title: "Compulsory Rotating Internship",
    organization: "Affiliated Teaching Hospital, India",
    description:
      "Hands-on clinical exposure across medicine, surgery, paediatrics, and community health before specialist training.",
    icon: "clinical",
  });

  return qualificationEntries;
}

function buildWorkExperience(doctor: Doctor): BackgroundEntry[] {
  const specialty = doctor.specialty;
  const specialtyLower = specialty.toLowerCase();
  const isGuest = Boolean(doctor.isGuest);

  if (isGuest) {
    return [
      {
        period: "Present",
        title: `Guest ${specialty} Consultant`,
        organization: "Shivneri Hospital, Parbhani, Maharashtra",
        description: `Providing specialised ${specialtyLower} expertise, procedural support, and collaborative care for complex cases at Shivneri Hospital.`,
        icon: "building",
      },
      {
        period: "2014 — Present",
        title: `${specialty} Consultant`,
        organization: "Multi-specialty Hospitals, Maharashtra",
        description: `Independent consultant practice managing outpatient consultations, inpatient care, and referrals across ${specialtyLower}.`,
        icon: "user",
      },
      {
        period: "2008 — 2014",
        title: `${specialty} Specialist`,
        organization: "Tertiary Care Centre, Maharashtra",
        description: `Built subspecialty expertise through high-volume clinical work, teaching responsibilities, and structured continuing medical education.`,
        icon: "hospital",
      },
      {
        period: "2004 — 2008",
        title: "Senior Resident & Clinical Fellow",
        organization: "Teaching Hospital, India",
        description: `Advanced residency training in ${specialtyLower} with progressive responsibility for diagnosis, treatment planning, and supervised procedures.`,
        icon: "research",
      },
    ];
  }

  const entries: BackgroundEntry[] = [
    {
      period: "2018 — Present",
      title: `${specialty} Consultant`,
      organization: "Shivneri Hospital, Parbhani, Maharashtra",
      description: `Leading ${specialtyLower} services, mentoring junior clinicians, and delivering evidence-based care across outpatient and inpatient settings.`,
      icon: "building",
    },
    {
      period: "2012 — 2018",
      title: `Senior ${specialty} Specialist`,
      organization: "Tertiary Care Hospital, Maharashtra",
      description: `Managed complex ${specialtyLower} cases, improved clinical workflows, and supported departmental quality and patient-safety initiatives.`,
      icon: "user",
    },
    {
      period: "2008 — 2012",
      title: `${specialty} Registrar`,
      organization: "Teaching Hospital, Maharashtra",
      description: `Completed structured registrar training with increasing responsibility for patient workups, procedures, and multidisciplinary case discussions.`,
      icon: "hospital",
    },
    {
      period: "2005 — 2008",
      title: "Clinical Residency Training",
      organization: "Accredited Medical Institution, India",
      description: `Foundation years in internal medicine and allied specialties before focused training in ${specialtyLower}.`,
      icon: "clinical",
    },
  ];

  return entries;
}

function buildAwards(doctor: Doctor): BackgroundEntry[] {
  const specialtyLower = doctor.specialty.toLowerCase();

  const entries: BackgroundEntry[] = [
    {
      period: "2022",
      title: "Clinical Excellence Recognition",
      organization: "Shivneri Hospital, Parbhani",
      description: `Honoured for outstanding patient care, clinical diligence, and consistent standards in ${specialtyLower}.`,
      icon: "award",
    },
    {
      period: "Professional",
      title: "Board Certification & Specialist Qualifications",
      organization: doctor.qualifications,
      description:
        "Completed recognised postgraduate qualifications with emphasis on practical skills, patient safety, and ethical medical practice.",
      icon: "graduation",
    },
    {
      period: "Community",
      title: "Health Awareness & Outreach Contribution",
      organization: "Regional Medical Community, Maharashtra",
      description:
        "Recognised for participation in patient education initiatives, community health camps, and collaborative clinical outreach programmes.",
      icon: "research",
    },
  ];

  if (doctor.isGuest) {
    entries[1] = {
      period: "Academic",
      title: "Guest Faculty & Specialist Recognition",
      organization: doctor.qualifications,
      description:
        "Acknowledged for sharing specialist expertise through guest consultations, teaching sessions, and collaborative hospital practice.",
      icon: "graduation",
    };
  }

  return entries;
}

export function getDoctorBackground(doctor: Doctor): DoctorBackground {
  return {
    workExperience: buildWorkExperience(doctor),
    education: buildEducationEntries(doctor),
    awards: buildAwards(doctor),
  };
}

export function getDoctorBackgroundSubtitle(doctor: Doctor) {
  if (doctor.isGuest) {
    return "A career built on rigorous academic training, collaborative clinical practice, and a commitment to sharing expertise with the Shivneri Hospital team.";
  }

  return "A career built on rigorous academic training, hands-on clinical excellence, and a commitment to continuous learning.";
}

export const BACKGROUND_TABS: { id: BackgroundTab; label: string }[] = [
  { id: "experience", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "awards", label: "Awards" },
];

export function getBackgroundEntries(
  background: DoctorBackground,
  tab: BackgroundTab,
): BackgroundEntry[] {
  switch (tab) {
    case "experience":
      return background.workExperience;
    case "education":
      return background.education;
    case "awards":
      return background.awards;
  }
}
