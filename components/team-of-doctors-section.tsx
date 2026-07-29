import { TeamOfDoctorsGrid } from "@/components/team-of-doctors-grid";
import { getPersonnelPhotoMapBySlug } from "@/lib/personnel-photos";

export async function TeamOfDoctorsSection() {
  const photoMap = await getPersonnelPhotoMapBySlug();
  const photoUrls = Object.fromEntries(photoMap);

  return <TeamOfDoctorsGrid photoUrls={photoUrls} />;
}
