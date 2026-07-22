"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_SPLASH_MS = 450;
const FADE_OUT_MS = 300;

export function PageLoader() {
  const [phase, setPhase] = useState<"splash" | "exit" | "done">("splash");

  useEffect(() => {
    const startedAt = performance.now();

    function complete() {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);

      window.setTimeout(() => {
        document.documentElement.classList.remove("loading");
        document.documentElement.classList.add("app-ready");
        setPhase("exit");

        window.setTimeout(() => {
          setPhase("done");
        }, FADE_OUT_MS);
      }, remaining);
    }

    if (document.readyState === "complete") {
      complete();
      return;
    }

    window.addEventListener("load", complete, { once: true });
    return () => window.removeEventListener("load", complete);
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      id="page-loader"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50 transition-opacity duration-300 ease-out ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <Image
        src="/shivneri-logo.png"
        alt=""
        width={128}
        height={128}
        priority
        className="h-24 w-auto opacity-50 sm:h-28"
      />
    </div>
  );
}
