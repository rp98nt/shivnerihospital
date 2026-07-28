import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personnel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PersonnelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
