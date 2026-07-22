"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_SPLASH_MS = 750;
const FILL_MS = 1050;
const HOLD_MS = 500;
const FADE_OUT_MS = 350;
const LOGO_OPACITY_START = 0.25;
const LOGO_OPACITY_END = 0.6;
const SPLASH_LOGO_SRC = "/loading-logo.jpeg";

export function PageLoader() {
  const [phase, setPhase] = useState<
    "loading" | "filling" | "holding" | "exit" | "done"
  >("loading");

  useEffect(() => {
    const startedAt = performance.now();
    const timeouts: number[] = [];

    function schedule(fn: () => void, delay: number) {
      timeouts.push(window.setTimeout(fn, delay));
    }

    function complete() {
      const elapsed = performance.now() - startedAt;
      const waitBeforeFill = Math.max(0, MIN_SPLASH_MS - elapsed);

      schedule(() => {
        setPhase("filling");

        schedule(() => {
          setPhase("holding");

          schedule(() => {
            document.documentElement.classList.remove("loading");
            document.documentElement.classList.add("app-ready");
            setPhase("exit");

            schedule(() => {
              setPhase("done");
            }, FADE_OUT_MS);
          }, HOLD_MS);
        }, FILL_MS);
      }, waitBeforeFill);
    }

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    return () => {
      window.removeEventListener("load", complete);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  const showFilledLogo =
    phase === "filling" || phase === "holding" || phase === "exit";

  return (
    <div
      id="page-loader"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50 transition-opacity ease-out duration-[350ms] ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <LogoWaterFill filling={showFilledLogo} />
    </div>
  );
}

function LogoWaterFill({ filling }: { filling: boolean }) {
  return (
    <div
      className="relative h-[216px] w-[216px] sm:h-[252px] sm:w-[252px]"
      style={
        {
          "--logo-fill-duration": `${FILL_MS}ms`,
        } as React.CSSProperties
      }
    >
      <Image
        src={SPLASH_LOGO_SRC}
        alt=""
        fill
        priority
        sizes="(max-width: 640px) 216px, 252px"
        className="object-contain"
        style={{ opacity: LOGO_OPACITY_START }}
      />
      <div
        className={`logo-water-fill absolute inset-0 overflow-hidden ${
          filling ? "logo-water-fill--active" : ""
        }`}
      >
        <Image
          src={SPLASH_LOGO_SRC}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 216px, 252px"
          className="object-contain"
          style={{ opacity: LOGO_OPACITY_END }}
        />
      </div>
    </div>
  );
}
