import { NavPageContentView } from "@/components/nav-page-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteHeaderHeightSync } from "@/components/site-header-height-sync";
import { HOSPITAL_NAME } from "@/lib/hospital-contact";
import { getAllNavPageParams, getNavPage } from "@/lib/nav-pages";
import { categorySlugToLabel } from "@/lib/nav-routes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllNavPageParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const page = getNavPage(category, slug);

  if (!page) {
    return { title: HOSPITAL_NAME };
  }

  return {
    title: `${page.title} | ${HOSPITAL_NAME}`,
    description: page.intro,
  };
}

export default async function NavSectionPage({ params }: PageProps) {
  const { category, slug } = await params;
  const page = getNavPage(category, slug);

  if (!page || !categorySlugToLabel(category)) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeaderHeightSync />
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <NavPageContentView page={page} />
      </main>
      <SiteFooter />
    </div>
  );
}
