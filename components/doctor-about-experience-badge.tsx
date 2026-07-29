type DoctorAboutExperienceBadgeProps = {
  value: string;
  label: string;
  className?: string;
};

export function DoctorAboutExperienceBadge({
  value,
  label,
  className = "",
}: DoctorAboutExperienceBadgeProps) {
  return (
    <div
      className={`absolute right-3 top-4 z-20 rounded-2xl bg-teal-900 px-4 py-3.5 text-center text-white shadow-xl sm:right-4 sm:top-5 sm:px-5 sm:py-4 ${className}`}
    >
      <p className="text-2xl font-bold leading-none sm:text-3xl lg:text-4xl">
        {value}
      </p>
      <p className="mt-1.5 max-w-[6.5rem] text-[9px] font-semibold uppercase leading-snug tracking-[0.16em] text-teal-100 sm:mt-2 sm:max-w-none sm:text-[10px] sm:tracking-[0.2em]">
        {label}
      </p>
    </div>
  );
}
