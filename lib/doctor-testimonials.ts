import type { Doctor } from "@/lib/doctors";

export type PatientTestimonial = {
  id: string;
  quote: string;
  name: string;
  location: string;
};

const DEFAULT_TESTIMONIALS: PatientTestimonial[] = [
  {
    id: "1",
    quote:
      "My experience was excellent. The staff was polite and attentive, and the doctor took the time to explain every step clearly.",
    name: "Rahul Patil",
    location: "Parbhani, Maharashtra",
  },
  {
    id: "2",
    quote:
      "From consultation to follow-up, care felt personal and well organised. I always knew what to expect at each stage of treatment.",
    name: "Sneha Deshmukh",
    location: "Jintur, Maharashtra",
  },
  {
    id: "3",
    quote:
      "The doctor listened carefully, answered every question, and helped me recover with confidence. Highly recommended.",
    name: "Amit Kulkarni",
    location: "Aurangabad, Maharashtra",
  },
  {
    id: "4",
    quote:
      "Professional, compassionate, and thorough. The hospital team made a difficult time much easier for our family.",
    name: "Priya Waghmare",
    location: "Parbhani, Maharashtra",
  },
  {
    id: "5",
    quote:
      "Clear diagnosis, thoughtful treatment planning, and consistent follow-up. I felt genuinely cared for throughout.",
    name: "Vikram Jadhav",
    location: "Hingoli, Maharashtra",
  },
  {
    id: "6",
    quote:
      "Excellent medical attention with a warm approach. Appointments were smooth and the recovery guidance was very helpful.",
    name: "Anjali More",
    location: "Nanded, Maharashtra",
  },
];

export function getDoctorTestimonials(_doctor: Doctor): PatientTestimonial[] {
  return DEFAULT_TESTIMONIALS;
}

export function getDoctorTestimonialsSubtitle(doctor: Doctor) {
  return `Real feedback from patients whose lives were touched by compassionate, expert ${doctor.specialty.toLowerCase()} care.`;
}
