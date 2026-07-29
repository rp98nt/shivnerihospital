import type { Doctor } from "@/lib/doctors";

export type BackgroundTab = "experience" | "education" | "awards";

export type BackgroundEntryIcon = "building" | "hospital" | "graduation" | "award";

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

  return parts.map((qualification, index) => ({
    period: index === 0 ? "Postgraduate" : "Graduate",
    title: qualification,
    organization: "Recognised Medical University, India",
    description:
      index === 0
        ? `Advanced training in ${doctor.specialty.toLowerCase()} with rigorous clinical and academic requirements.`
        : "Foundational medical education with comprehensive clinical rotations and board examinations.",
    icon: "graduation" as const,
  }));
}

function specialtyExperienceTitle(specialty: string, isGuest: boolean) {
  if (isGuest) {
    return `Guest ${specialty} Consultant`;
  }

  return `${specialty} Consultant`;
}

function specialtyExperienceDescription(
  doctor: Doctor,
  isGuest: boolean,
) {
  if (isGuest) {
    return `Providing specialised ${doctor.specialty.toLowerCase()} expertise and collaborative care for patients at Shivneri Hospital, Parbhani.`;
  }

  return `Delivering evidence-based ${doctor.specialty.toLowerCase()} care, mentoring clinical teams, and supporting patient outcomes across outpatient and inpatient services.`;
}

function buildWorkExperience(doctor: Doctor): BackgroundEntry[] {
  const roleLabel = specialtyExperienceTitle(
    doctor.specialty,
    Boolean(doctor.isGuest),
  );

  return [
    {
      period: "Present",
      title: roleLabel,
      organization: "Shivneri Hospital, Parbhani, Maharashtra",
      description: specialtyExperienceDescription(doctor, Boolean(doctor.isGuest)),
      icon: doctor.isGuest ? "hospital" : "building",
    },
    {
      period: "Earlier Career",
      title: `${doctor.specialty} Specialist`,
      organization: "Leading Hospitals & Clinical Centres, Maharashtra",
      description: `Built clinical expertise in ${doctor.specialty.toLowerCase()} through hands-on patient care, surgical or procedural practice, and continuous professional development.`,
      icon: "hospital",
    },
  ];
}

function buildAwards(doctor: Doctor): BackgroundEntry[] {
  const entries: BackgroundEntry[] = [
    {
      period: "Professional",
      title: "Clinical Excellence Recognition",
      organization: "Shivneri Hospital, Parbhani",
      description: `Acknowledged for dedicated patient care and consistent clinical standards in ${doctor.specialty.toLowerCase()}.`,
      icon: "award",
    },
  ];

  if (!doctor.isGuest) {
    entries.push({
      period: "Academic",
      title: "Board Certification & Fellowship Training",
      organization: doctor.qualifications,
      description:
        "Completed recognised postgraduate qualifications with emphasis on practical skills, patient safety, and ethical medical practice.",
      icon: "graduation",
    });
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
