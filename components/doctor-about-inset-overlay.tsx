"use client";

import {
  clampAboutInsetPosition,
  DEFAULT_ABOUT_INSET_WIDTH_PERCENT,
  normalizeAboutInsetPosition,
  type AboutInsetPosition,
} from "@/lib/about-inset-position";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

export type { AboutInsetPosition };

type DoctorAboutInsetOverlayProps = {
  aboutInsetUrl: string;
  alt: string;
  position?: Partial<AboutInsetPosition> | null;
  widthPercent?: number;
  draggable?: boolean;
  onPositionChange?: (position: AboutInsetPosition) => void;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function DoctorAboutInsetOverlay({
  aboutInsetUrl,
  alt,
  position,
  widthPercent = DEFAULT_ABOUT_INSET_WIDTH_PERCENT,
  draggable = false,
  onPositionChange,
  priority = false,
  sizes = "(max-width: 1024px) 45vw, 17rem",
  className = "",
}: DoctorAboutInsetOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const normalizedPosition = clampAboutInsetPosition(
    normalizeAboutInsetPosition(position),
    widthPercent,
  );

  const updatePositionFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;

      if (!container || !dragOffset) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const nextPosition = clampAboutInsetPosition(
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
    const overlay = event.currentTarget;

    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();

    setDragOffset({
      x:
        ((event.clientX - overlayRect.left) / containerRect.width) * 100,
      y:
        ((event.clientY - overlayRect.top) / containerRect.height) * 100,
    });
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <div
        onPointerDown={handlePointerDown}
        className={`absolute z-30 overflow-hidden rounded-2xl border-[3px] border-amber-200 bg-white shadow-2xl ${
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
        <Image
          src={aboutInsetUrl}
          alt={alt}
          width={640}
          height={480}
          draggable={false}
          className="aspect-[4/3] h-auto w-full object-cover object-[center_35%] select-none"
          sizes={sizes}
          priority={priority}
        />
        {draggable ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/45 to-transparent px-2 py-1.5 text-center text-[10px] font-semibold text-white">
            Drag to reposition
          </div>
        ) : null}
      </div>
    </div>
  );
}
