export const HOSPITAL_NAME = "Shivneri Hospital";

export const EMERGENCY_MOBILE = "+91 84328 42222";
export const EMERGENCY_MOBILE_TEL = "+918432842222";
export const APPOINTMENT_PHONE = "02452-222350";
export const APPOINTMENT_PHONE_TEL = "02452222350";

const HOSPITAL_ADDRESS =
  "Shivneri Hospital, Swastik Chamber, Gavhane Road, Near Hotel Niraj International, Gavhane Chowk, Parbhani, Maharashtra 431401";

/** Google Maps pin aligned with the embedded map (Surya I.C.U. Hospital listing). */
const HOSPITAL_MAP_LAT = 19.26317470268271;
const HOSPITAL_MAP_LNG = 76.76867309207077;

export const VISIT_LOCATION = {
  heading: "Visit Our Parbhani Hospital Campus",
  address: HOSPITAL_ADDRESS,
  phone: EMERGENCY_MOBILE,
  phoneTel: EMERGENCY_MOBILE_TEL,
  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2163.7215429937405!2d76.76867309207077!3d19.26317470268271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd019d030c46fcf%3A0x71147c19c8a093b2!2sSurya%20I.C.U.%20Hospital!5e1!3m2!1sen!2sin!4v1785601578746!5m2!1sen!2sin",
  mapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${HOSPITAL_MAP_LAT},${HOSPITAL_MAP_LNG}`,
} as const;
