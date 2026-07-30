import type { Doctor } from "@/lib/doctors";
import { getDoctorBlogPosts, type DoctorBlogPost } from "@/lib/doctor-blog-posts";
import Image from "next/image";
import Link from "next/link";

type DoctorProfileBlogProps = {
  doctor: Doctor;
};

export function DoctorProfileBlog({ doctor }: DoctorProfileBlogProps) {
  const posts = getDoctorBlogPosts(doctor);

  return (
    <section className="relative overflow-x-clip border-t border-slate-200 bg-slate-100 py-10 sm:py-12 md:py-16">
      <BlogWatermark className="pointer-events-none absolute bottom-8 left-4 h-40 w-40 text-teal-900/5 sm:left-8 sm:h-52 sm:w-52" />
      <BlogWatermark className="pointer-events-none absolute right-4 top-10 h-36 w-36 rotate-180 text-teal-900/5 sm:right-10 sm:h-48 sm:w-48" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
            <HeartIcon className="h-3.5 w-3.5 text-teal-700" />
            Doctor&apos;s Blog
          </span>

          <h2 className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
            Your Health, My Words
          </h2>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: DoctorBlogPost }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pt-5">
        <h3 className="text-lg font-bold leading-snug text-teal-900 sm:text-xl">
          {post.title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4 text-slate-400" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <TagIcon className="h-4 w-4 text-slate-400" />
            {post.category}
          </span>
        </div>
      </div>

      <Link
        href={post.href}
        className="inline-flex items-center justify-center gap-2 bg-teal-900 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-teal-800 sm:text-sm"
      >
        Read More
        <ArrowUpRightIcon className="h-4 w-4" />
      </Link>
    </article>
  );
}

function BlogWatermark({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="currentColor"
      aria-hidden
    >
      <path d="M100 20c-20 0-36 16-36 36 0 14 8 26 20 32v72c0 8 6 14 14 14h4c8 0 14-6 14-14v-8c0-4 3-7 7-7s7 3 7 7v8c0 8 6 14 14 14h4c8 0 14-6 14-14V88c12-6 20-18 20-32 0-20-16-36-36-36zm0 16c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20z" />
      <path
        d="M40 120c-8 0-14 6-14 14v20c0 8 6 14 14 14h8M160 120c8 0 14 6 14 14v20c0 8-6 14-14 14h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M20 12l-8 8-8-8V4h8l8 8z" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}
