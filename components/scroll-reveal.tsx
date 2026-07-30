"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type ScrollRevealDirection = "up" | "left" | "right";

type ScrollRevealProps = {
  children: ReactNode;
  direction?: ScrollRevealDirection;
  className?: string;
  as?: ElementType;
  threshold?: number;
  slideDistance?: "default" | "large";
};

const hiddenClasses: Record<
  ScrollRevealDirection,
  Record<"default" | "large", string>
> = {
  up: {
    default: "translate-y-10 opacity-0 md:translate-y-12",
    large: "translate-y-14 opacity-0 sm:translate-y-16 md:translate-y-20",
  },
  left: {
    default: "-translate-x-10 opacity-0 md:-translate-x-12",
    large: "-translate-x-12 opacity-0 md:-translate-x-16",
  },
  right: {
    default: "translate-x-10 opacity-0 md:translate-x-12",
    large: "translate-x-12 opacity-0 md:translate-x-16",
  },
};

const mobileHiddenClasses: Record<"default" | "large", string> = {
  default: "translate-y-8 opacity-0",
  large: "translate-y-12 opacity-0",
};

function resolveDirection(
  direction: ScrollRevealDirection,
  isMobile: boolean,
): ScrollRevealDirection {
  if (isMobile && (direction === "left" || direction === "right")) {
    return "up";
  }

  return direction;
}

export function ScrollReveal({
  children,
  direction = "up",
  className = "",
  as: Component = "div",
  threshold = 0.3,
  slideDistance = "default",
}: ScrollRevealProps) {
  const itemRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const syncViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    const node = itemRef.current;
    if (!node) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const resolvedDirection = resolveDirection(direction, isMobile);
  const motionClasses = isMobile
    ? mobileHiddenClasses[slideDistance]
    : hiddenClasses[resolvedDirection][slideDistance];
  const transitionClass =
    slideDistance === "large"
      ? "duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
      : "duration-700 ease-out";

  return (
    <Component
      ref={itemRef}
      className={`transform transition-all ${transitionClass} motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : motionClasses
      } ${className}`}
    >
      {children}
    </Component>
  );
}
