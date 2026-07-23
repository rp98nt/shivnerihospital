export const HOSPITAL_NAME = "Shivneri Hospital";

export const EMERGENCY_MOBILE = "+91 84328 42222";
export const EMERGENCY_MOBILE_TEL = "+918432842222";
export const APPOINTMENT_PHONE = "02452-222350";
export const APPOINTMENT_PHONE_TEL = "02452222350";

const HOSPITAL_ADDRESS =
  "Surya I.C.U. Hospital, Swastik Chamber, Gavhane Road, Near Niraj Hotel, Gavhane Chowk, Parbhani, Maharashtra 431401";

export const VISIT_LOCATION = {
  heading: "Visit Our Parbhani Hospital Campus",
  address: HOSPITAL_ADDRESS,
  phone: EMERGENCY_MOBILE,
  phoneTel: EMERGENCY_MOBILE_TEL,
  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.4345625875535!2d76.7702733!3d19.2634594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd019d030c46fcf%3A0x71147c19c8a093b2!2sSurya%20I.C.U.%20Hospital!5e0!3m2!1sen!2sin!4v1784840841469!5m2!1sen!2sin",
  mapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HOSPITAL_ADDRESS)}`,
} as const;
