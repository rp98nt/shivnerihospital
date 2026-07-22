"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  isNavGroup,
  LOWER_NAV_ITEMS,
  NAV_MENUS,
  type NavEntry,
  type NavLink,
} from "@/lib/nav-menus";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <p className="text-base font-semibold text-slate-900">Menu</p>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav
              className="flex-1 overflow-y-auto px-2 py-2"
              aria-label="Mobile main"
            >
              {LOWER_NAV_ITEMS.map((label) => (
                <MobileNavSection
                  key={label}
                  label={label}
                  items={NAV_MENUS[label]}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MobileNavSection({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: NavEntry[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-3.5 text-left text-sm font-medium text-slate-800"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {label}
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded ? (
        <ul className="space-y-0.5 pb-3 pl-2">
          {items.map((item) => (
            <li key={item.label}>
              {isNavGroup(item) ? (
                <MobileNavGroup item={item} onNavigate={onNavigate} />
              ) : (
                <MobileNavLink item={item} onNavigate={onNavigate} />
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MobileNavGroup({
  item,
  onNavigate,
}: {
  item: { label: string; items: NavLink[] };
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg bg-slate-50">
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-slate-700"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {item.label}
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded ? (
        <ul className="space-y-0.5 border-t border-slate-200 px-2 pb-2 pt-1">
          {item.items.map((child) => (
            <li key={child.label}>
              <MobileNavLink item={child} onNavigate={onNavigate} nested />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MobileNavLink({
  item,
  onNavigate,
  nested = false,
}: {
  item: NavLink;
  onNavigate: () => void;
  nested?: boolean;
}) {
  return (
    <Link
      href={item.href ?? "#"}
      className={`block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-800 ${
        nested ? "pl-4" : ""
      }`}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
