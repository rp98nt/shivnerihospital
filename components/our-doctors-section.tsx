import { OurDoctors } from "@/components/our-doctors";
import { getPersonnelPhotoMapBySlug } from "@/lib/personnel-photos";

export async function OurDoctorsSection() {
  const photoMap = await getPersonnelPhotoMapBySlug();
  const photoUrls = Object.fromEntries(photoMap);

  return <OurDoctors photoUrls={photoUrls} />;
}
