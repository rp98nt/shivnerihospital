export type Doctor = {
  slug: string;
  name: string;
  specialty: string;
  qualifications: string;
  isGuest?: boolean;
};

function toDoctorSlug(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function defineDoctor(
  doctor: Omit<Doctor, "slug"> & { slug?: string },
): Doctor {
  return {
    ...doctor,
    slug: doctor.slug ?? toDoctorSlug(doctor.name),
  };
}

export const DOCTORS: Doctor[] = [
  defineDoctor({
    name: "Dr. Sanjay Khillare",
    specialty: "Medicine",
    qualifications: "MBBS, FCPS (Medicine)",
  }),
  defineDoctor({
    name: "Dr. Govind Pawade Patil",
    specialty: "Medicine",
    qualifications: "MBBS, MD (Medicine)",
  }),
  defineDoctor({
    name: "Dr. Sanjyot Gajendra Giri",
    specialty: "Chest Medicine",
    qualifications: "MBBS, MD (Chest Medicine), MICS, MERS, CCCDM",
  }),
  defineDoctor({
    name: "Dr. Rahul Tengase Patil",
    specialty: "Nephrology",
    qualifications: "MBBS, MD Medicine, DM Nephrology",
  }),
  defineDoctor({
    name: "Dr. Pooja Tengase Khupase",
    specialty: "Chest Medicine",
    qualifications: "MBBS, MD (Chest Medicine)",
  }),
  defineDoctor({
    name: "Dr. Ninad Suryatale",
    specialty: "Orthopaedics",
    qualifications: "MBBS, D.Ortho",
  }),
  defineDoctor({
    name: "Dr. Prakash Chavan",
    specialty: "Oncosurgery",
    qualifications: "MBBS, FCPS Surgery, FMAS (Laproscopy Oncosurgery)",
  }),
  defineDoctor({
    name: "Dr. Kailas Giri",
    specialty: "Critical Care",
    qualifications: "MBBS, FCPS (Medicine), IDCCM",
  }),
  defineDoctor({
    name: "Dr. Anvesh Sattepar Jain",
    specialty: "Neuro-Surgery",
    qualifications: "D.N.B. (Gen. Surgery), D.N.B. (Neuro-Surgery)",
    isGuest: true,
  }),
  defineDoctor({
    name: "Dr. Varsha Sanjay Killare",
    specialty: "Physiotherapy",
    qualifications: "B.P.Th., M.P.Th. (Neuro)",
    isGuest: true,
  }),
  defineDoctor({
    name: "Dr. Ashok Bun",
    specialty: "General Surgery",
    qualifications: "MBBS, MS",
    isGuest: true,
  }),
];

export function getDoctorSortName(name: string) {
  return name.replace(/^Dr\.?\s+/i, "").trim();
}

export const SORTED_DOCTORS = [...DOCTORS].sort((a, b) =>
  getDoctorSortName(a.name).localeCompare(getDoctorSortName(b.name), "en", {
    sensitivity: "base",
  }),
);

export function getDoctorBySlug(slug: string) {
  return DOCTORS.find((doctor) => doctor.slug === slug);
}

export function getDoctorProfilePath(slug: string) {
  return `/doctors/${slug}`;
}

export function getDoctorAppointmentPath(slug: string) {
  return `/appointment?doctor=${encodeURIComponent(slug)}`;
}
