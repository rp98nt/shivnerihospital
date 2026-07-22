"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_SPLASH_MS = 450;
const FILL_MS = 450;
const FADE_OUT_MS = 300;
const LOGO_OPACITY_START = 0.25;
const LOGO_OPACITY_END = 0.6;

export function PageLoader() {
  const [phase, setPhase] = useState<
    "loading" | "filling" | "exit" | "done"
  >("loading");

  useEffect(() => {
    const startedAt = performance.now();

    function complete() {
      const elapsed = performance.now() - startedAt;
      const waitBeforeFill = Math.max(0, MIN_SPLASH_MS - elapsed);

      window.setTimeout(() => {
        setPhase("filling");

        window.setTimeout(() => {
          document.documentElement.classList.remove("loading");
          document.documentElement.classList.add("app-ready");
          setPhase("exit");

          window.setTimeout(() => {
            setPhase("done");
          }, FADE_OUT_MS);
        }, FILL_MS);
      }, waitBeforeFill);
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
      <LogoWaterFill filling={phase === "filling" || phase === "exit"} />
    </div>
  );
}

function LogoWaterFill({ filling }: { filling: boolean }) {
  return (
    <div
      className="relative h-36 w-36 sm:h-[168px] sm:w-[168px]"
      style={
        {
          "--logo-fill-duration": `${FILL_MS}ms`,
        } as React.CSSProperties
      }
    >
      <Image
        src="/shivneri-logo.png"
        alt=""
        fill
        priority
        sizes="(max-width: 640px) 144px, 168px"
        className="object-contain"
        style={{ opacity: LOGO_OPACITY_START }}
      />
      <div
        className={`logo-water-fill absolute inset-0 overflow-hidden ${
          filling ? "logo-water-fill--active" : ""
        }`}
      >
        <Image
          src="/shivneri-logo.png"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 144px, 168px"
          className="object-contain"
          style={{ opacity: LOGO_OPACITY_END }}
        />
      </div>
    </div>
  );
}
