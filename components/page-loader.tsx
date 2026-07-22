"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");

  useEffect(() => {
    function finishLoading() {
      setPhase("fading");
      window.setTimeout(() => setPhase("hidden"), 400);
    }

    if (document.readyState === "complete") {
      finishLoading();
      return;
    }

    window.addEventListener("load", finishLoading);
    return () => window.removeEventListener("load", finishLoading);
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 transition-opacity duration-500 ${
        phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={phase === "fading"}
    >
      <Image
        src="/shivneri-logo.png"
        alt=""
        width={120}
        height={120}
        priority
        className="h-24 w-auto opacity-45 sm:h-28 sm:opacity-50"
      />
    </div>
  );
}
