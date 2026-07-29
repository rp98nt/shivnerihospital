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
  up: "-translate-y-12 opacity-0",
  left: "-translate-x-12 opacity-0",
  right: "translate-x-12 opacity-0",
};

export function ScrollReveal({
  children,
  direction = "up",
  className = "",
  as: Component = "div",
}: ScrollRevealProps) {
  const itemRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      ref={itemRef}
      className={`transform transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : hiddenClasses[direction]
      } ${className}`}
    >
      {children}
    </Component>
  );
}
