"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How can I book an appointment with a doctor?",
    answer:
      "You can book an appointment online through our website, call our reception desk, or visit the hospital directly.",
  },
  {
    question: "Do I need a prior appointment, or are walk-in consultations available?",
    answer:
      "Both appointment-based and walk-in consultations are available, subject to doctor availability.",
  },
  {
    question: "What are the hospital's emergency service timings?",
    answer:
      "Our Emergency & ICU services are available 24 hours a day, 7 days a week.",
  },
  {
    question: "Which medical specialties are available at the hospital?",
    answer:
      "We provide services in General Medicine, Cardiology, Nephrology, Neurology, Orthopedics, Surgery, Pediatrics, Gynecology, Urology, Critical Care, Dialysis, and more.",
  },
  {
    question: "Does the hospital provide cashless treatment and insurance facilities?",
    answer:
      "Yes, we support cashless treatment through various insurance providers and government healthcare schemes.",
  },
  {
    question: "What documents should I bring during my visit?",
    answer:
      "Please carry a valid ID proof, previous medical records, prescriptions, insurance card (if applicable), and any recent diagnostic reports.",
  },
  {
    question: "Are diagnostic and laboratory services available within the hospital?",
    answer:
      "Yes, we offer in-house diagnostic services including blood tests, ECG, X-Ray, Ultrasound, CT Scan, and other investigations.",
  },
  {
    question: "How can I access my laboratory or diagnostic reports?",
    answer: "Reports can be collected from the hospital reception desk.",
  },
  {
    question: "Does the hospital provide ambulance services?",
    answer:
      "Yes, ambulance services are available 24×7 for emergency patient transportation.",
  },
  {
    question: "What should I do in case of a medical emergency?",
    answer:
      "Call our emergency helpline immediately or visit the Emergency Department without delay. Our critical care team is available round the clock.",
  },
  {
    question: "Do you provide dialysis services?",
    answer:
      "Yes, we provide advanced dialysis services under the supervision of experienced nephrologists and trained dialysis technicians. Both emergency and scheduled dialysis sessions are available.",
  },
  {
    question: "What are the visiting hours for admitted patients?",
    answer:
      "Visiting hours may vary depending on the ward and patient condition. Please contact the hospital reception for the latest visitor guidelines and timings.",
  },
  {
    question: "Can I get a second medical opinion from your specialists?",
    answer:
      "Yes, our specialist doctors are available for second opinions. Please schedule an appointment and bring all relevant medical records, reports, and prescriptions.",
  },
  {
    question: "Are health check-up packages available?",
    answer:
      "Yes, we offer a range of preventive health check-up packages for individuals, senior citizens, women, and corporate employees. Please visit our Health Packages section for details.",
  },
  {
    question: "Do you offer teleconsultation or online consultation services?",
    answer:
      "Yes, online consultations may be available for selected specialties. Please contact our appointment desk to check doctor availability and schedule a virtual consultation.",
  },
  {
    question: "Which government healthcare schemes are accepted?",
    answer:
      "We accept eligible government healthcare schemes such as Ayushman Bharat (PMJAY) and Mahatma Jyotiba Phule Jan Arogya Yojana (MJPJAY), subject to applicable guidelines and eligibility criteria.",
  },
  {
    question: "Is parking available for patients and visitors?",
    answer:
      "Yes, parking facilities are available for patients and visitors within or near the hospital premises for added convenience.",
  },
  {
    question: "How can I contact a specific department?",
    answer:
      "You can contact any department through our hospital reception, helpline number, or the Contact Us page on our website. Our team will connect you with the appropriate department or specialist.",
  },
  {
    question: "Are ATM and banking facilities available nearby?",
    answer:
      "Yes, ATM facilities and banking services are available in close proximity to the hospital. Please contact the reception desk for directions to the nearest ATM or bank branch.",
  },
];

export function FaqSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-xl font-semibold text-slate-800 sm:text-2xl">
          Frequently Asked <span className="text-teal-800">Questions</span>
        </h2>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white sm:mt-10">
          {FAQ_ITEMS.map((item, index) => (
            <FaqRow key={item.question} item={item} isLast={index === FAQ_ITEMS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  isLast,
}: {
  item: (typeof FAQ_ITEMS)[number];
  isLast: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isLast ? "" : "border-b border-slate-200"}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-50 sm:px-6 sm:py-5"
      >
        <span className="text-sm font-semibold text-slate-800 sm:text-base">
          {item.question}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 shrink-0 text-teal-700 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-5 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
