import { AppointmentPageContent } from "@/components/appointment-page-content";
import { Suspense } from "react";

export default function AppointmentPage() {
  return (
    <Suspense>
      <AppointmentPageContent />
    </Suspense>
  );
}
