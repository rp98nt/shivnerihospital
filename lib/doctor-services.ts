import type { Doctor } from "@/lib/doctors";

export type DoctorServiceIcon =
  | "heart-pulse"
  | "activity"
  | "shield-heart"
  | "bone"
  | "stethoscope"
  | "brain"
  | "kidney"
  | "lungs";

export type DoctorService = {
  title: string;
  description: string;
  icon: DoctorServiceIcon;
};

const CARD_ICONS: DoctorServiceIcon[] = [
  "heart-pulse",
  "activity",
  "shield-heart",
];

const SPECIALTY_SERVICES: Record<string, DoctorService[]> = {
  Orthopaedics: [
    {
      title: "Orthoscopic Surgery",
      description:
        "Minimally invasive procedures for joint and soft-tissue conditions with faster recovery and less post-operative discomfort.",
      icon: "bone",
    },
    {
      title: "Joint Replacement",
      description:
        "Advanced orthoplasty and replacement surgery to restore mobility, reduce pain, and improve long-term joint function.",
      icon: "activity",
    },
    {
      title: "Spine Care",
      description:
        "Comprehensive evaluation and treatment of spinal disorders, from conservative management to surgical intervention.",
      icon: "shield-heart",
    },
  ],
  Medicine: [
    {
      title: "General Consultation",
      description:
        "Thorough clinical evaluation, diagnosis, and personalised treatment planning for acute and chronic medical conditions.",
      icon: "stethoscope",
    },
    {
      title: "Chronic Disease Management",
      description:
        "Long-term care for diabetes, hypertension, and other ongoing conditions with regular monitoring and lifestyle guidance.",
      icon: "activity",
    },
    {
      title: "Preventive Health Screening",
      description:
        "Proactive assessments and early detection strategies to reduce health risks before symptoms become serious.",
      icon: "shield-heart",
    },
  ],
  "Chest Medicine": [
    {
      title: "Pulmonary Consultation",
      description:
        "Detailed assessment of respiratory health including lung function testing and tailored treatment for breathing disorders.",
      icon: "lungs",
    },
    {
      title: "Respiratory Diagnostics",
      description:
        "Advanced imaging and pulmonary function studies to accurately diagnose asthma, COPD, and other chest conditions.",
      icon: "activity",
    },
    {
      title: "Preventive Lung Care",
      description:
        "Risk assessment, smoking cessation support, and proactive strategies to protect long-term respiratory health.",
      icon: "shield-heart",
    },
  ],
  Nephrology: [
    {
      title: "Kidney Consultation",
      description:
        "Expert evaluation of kidney function, electrolyte balance, and management of acute and chronic renal conditions.",
      icon: "kidney",
    },
    {
      title: "Dialysis Care",
      description:
        "Supervised dialysis services with careful monitoring to support patients with advanced kidney disease.",
      icon: "activity",
    },
    {
      title: "Preventive Nephrology",
      description:
        "Early risk screening and lifestyle-based strategies to slow kidney disease progression before complications arise.",
      icon: "shield-heart",
    },
  ],
  Oncosurgery: [
    {
      title: "Cancer Surgical Consultation",
      description:
        "Comprehensive evaluation and surgical planning for oncology patients with a focus on precise, evidence-based care.",
      icon: "stethoscope",
    },
    {
      title: "Minimally Invasive Oncology",
      description:
        "Laparoscopic and advanced surgical techniques designed to reduce recovery time while maintaining oncological outcomes.",
      icon: "activity",
    },
    {
      title: "Post-Operative Follow-Up",
      description:
        "Structured recovery monitoring and coordinated care to support healing and long-term wellness after surgery.",
      icon: "shield-heart",
    },
  ],
  "Critical Care": [
    {
      title: "Intensive Care Management",
      description:
        "Round-the-clock monitoring and treatment for critically ill patients requiring advanced life-support and intervention.",
      icon: "heart-pulse",
    },
    {
      title: "Ventilator & Life Support",
      description:
        "Expert management of mechanical ventilation and hemodynamic support for patients in critical condition.",
      icon: "activity",
    },
    {
      title: "Multi-Organ Support",
      description:
        "Coordinated critical care for complex cases involving multiple organ systems with continuous reassessment.",
      icon: "shield-heart",
    },
  ],
  "Neuro-Surgery": [
    {
      title: "Neurosurgical Consultation",
      description:
        "Detailed evaluation of brain, spine, and nerve conditions with a clear plan for surgical or conservative care.",
      icon: "brain",
    },
    {
      title: "Brain & Spine Surgery",
      description:
        "Specialised surgical procedures for neurological disorders using modern techniques and careful post-op planning.",
      icon: "activity",
    },
    {
      title: "Trauma Neurosurgery",
      description:
        "Emergency and elective care for head and spinal injuries with focus on functional recovery and patient safety.",
      icon: "shield-heart",
    },
  ],
  Physiotherapy: [
    {
      title: "Neuro Rehabilitation",
      description:
        "Structured physiotherapy programmes to restore movement, strength, and independence after neurological injury.",
      icon: "activity",
    },
    {
      title: "Pain & Mobility Therapy",
      description:
        "Hands-on treatment and exercise plans to reduce pain, improve flexibility, and support daily function.",
      icon: "bone",
    },
    {
      title: "Post-Surgical Recovery",
      description:
        "Guided rehabilitation after surgery to accelerate healing, prevent complications, and rebuild confidence in movement.",
      icon: "shield-heart",
    },
  ],
  "General Surgery": [
    {
      title: "Surgical Consultation",
      description:
        "Comprehensive assessment of surgical needs with clear explanation of options, risks, and expected outcomes.",
      icon: "stethoscope",
    },
    {
      title: "Abdominal & General Surgery",
      description:
        "Expert surgical care for a wide range of general surgical conditions using established clinical protocols.",
      icon: "activity",
    },
    {
      title: "Post-Operative Care",
      description:
        "Attentive follow-up and wound management to ensure smooth recovery and long-term surgical success.",
      icon: "shield-heart",
    },
  ],
};

function expertiseDescription(tag: string, specialty: string) {
  return `Specialised ${tag.toLowerCase()} care within ${specialty.toLowerCase()}, tailored to each patient's condition, recovery goals, and long-term health needs.`;
}

export function getDoctorServices(doctor: Doctor): DoctorService[] {
  if (doctor.expertiseTags?.length) {
    return doctor.expertiseTags.slice(0, 3).map((tag, index) => ({
      title: tag,
      description: expertiseDescription(tag, doctor.specialty),
      icon: CARD_ICONS[index % CARD_ICONS.length] ?? "heart-pulse",
    }));
  }

  const specialtyServices = SPECIALTY_SERVICES[doctor.specialty];
  if (specialtyServices) {
    return specialtyServices;
  }

  return [
    {
      title: `${doctor.specialty} Consultation`,
      description:
        "Thorough evaluation and personalised treatment planning for conditions within this specialty.",
      icon: "stethoscope",
    },
    {
      title: "Diagnostic Assessment",
      description:
        "Careful investigation and interpretation of clinical findings to reach an accurate, timely diagnosis.",
      icon: "activity",
    },
    {
      title: "Preventive Care",
      description:
        "Proactive health strategies and follow-up to reduce complications and support lasting wellness.",
      icon: "shield-heart",
    },
  ];
}

export function getDoctorServicesSubtitle(doctor: Doctor) {
  return `Comprehensive ${doctor.specialty.toLowerCase()} services tailored to each patient's unique health profile.`;
}
