import type { Doctor } from "@/lib/doctors";

export type DoctorBlogPost = {
  id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  href: string;
};

const DEFAULT_BLOG_POSTS: DoctorBlogPost[] = [
  {
    id: "medical-minute",
    title: "The Medical Minute Quick Tips for Better Living",
    date: "11 March 2025",
    category: "Event",
    imageUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
    href: "/",
  },
  {
    id: "healthy-habits",
    title: "Healthy Habits for Busy Professionals",
    date: "11 March 2025",
    category: "Event",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    href: "/",
  },
  {
    id: "ask-the-doctor",
    title: "Ask the Doctor Real Answers, Real Care",
    date: "11 March 2025",
    category: "Event",
    imageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
    href: "/",
  },
];

export function getDoctorBlogPosts(_doctor: Doctor): DoctorBlogPost[] {
  return DEFAULT_BLOG_POSTS;
}
