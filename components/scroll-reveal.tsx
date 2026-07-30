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
};

const hiddenClasses: Record<ScrollRevealDirection, string> = {
  up: "translate-y-10 opacity-0 md:translate-y-12",
  left: "-translate-x-10 opacity-0 md:-translate-x-12",
  right: "translate-x-10 opacity-0 md:translate-x-12",
};

const mobileHiddenClasses: Record<ScrollRevealDirection, string> = {
  up: "translate-y-8 opacity-0",
  left: "translate-y-8 opacity-0",
  right: "translate-y-8 opacity-0",
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
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const resolvedDirection = resolveDirection(direction, isMobile);
  const motionClasses = isMobile
    ? mobileHiddenClasses[resolvedDirection]
    : hiddenClasses[resolvedDirection];

  return (
    <Component
      ref={itemRef}
      className={`transform transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : motionClasses
      } ${className}`}
    >
      {children}
    </Component>
  );
}
