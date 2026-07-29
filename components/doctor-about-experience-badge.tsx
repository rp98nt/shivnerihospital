"use client";

import {
  clampExperienceBadgePosition,
  DEFAULT_EXPERIENCE_BADGE_WIDTH_PERCENT,
  normalizeExperienceBadgePosition,
  type AboutInsetPosition,
} from "@/lib/about-inset-position";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type DoctorAboutExperienceBadgeProps = {
  value: string;
  label: string;
  position?: Partial<AboutInsetPosition> | null;
  widthPercent?: number;
  draggable?: boolean;
  onPositionChange?: (position: AboutInsetPosition) => void;
  className?: string;
};

export function DoctorAboutExperienceBadge({
  value,
  label,
  position,
  widthPercent = DEFAULT_EXPERIENCE_BADGE_WIDTH_PERCENT,
  draggable = false,
  onPositionChange,
  className = "",
}: DoctorAboutExperienceBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const normalizedPosition = clampExperienceBadgePosition(
    normalizeExperienceBadgePosition(position),
    widthPercent,
  );

  const updatePositionFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;

      if (!container || !dragOffset) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const nextPosition = clampExperienceBadgePosition(
        {
          x: ((clientX - rect.left) / rect.width) * 100 - dragOffset.x,
          y: ((clientY - rect.top) / rect.height) * 100 - dragOffset.y,
        },
        widthPercent,
      );

      onPositionChange?.(nextPosition);
    },
    [dragOffset, onPositionChange, widthPercent],
  );

  useEffect(() => {
    if (!dragOffset) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      updatePositionFromPointer(event.clientX, event.clientY);
    }

    function handlePointerUp() {
      setDragOffset(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragOffset, updatePositionFromPointer]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggable || !onPositionChange) {
      return;
    }

    event.preventDefault();

    const container = containerRef.current;
    const badge = event.currentTarget;

    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const badgeRect = badge.getBoundingClientRect();

    setDragOffset({
      x: ((event.clientX - badgeRect.left) / containerRect.width) * 100,
      y: ((event.clientY - badgeRect.top) / containerRect.height) * 100,
    });
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <div
        onPointerDown={handlePointerDown}
        className={`absolute z-20 flex aspect-square flex-col items-center justify-center rounded-2xl bg-teal-900 px-2 py-2 text-center text-white shadow-xl ${
          draggable
            ? "cursor-grab touch-none active:cursor-grabbing"
            : ""
        }`}
        style={{
          left: `${normalizedPosition.x}%`,
          top: `${normalizedPosition.y}%`,
          width: `${widthPercent}%`,
        }}
      >
        <p className="text-xl font-bold leading-none sm:text-2xl">{value}</p>
        <p className="mt-1 px-1 text-[7px] font-semibold uppercase leading-tight tracking-[0.12em] text-teal-100 sm:text-[8px]">
          {label}
        </p>
        {draggable ? (
          <span className="pointer-events-none mt-1 text-[7px] font-medium text-teal-200/90">
            Drag
          </span>
        ) : null}
      </div>
    </div>
  );
}
