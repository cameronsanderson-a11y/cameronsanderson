"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import { mailto } from "@/lib/format";

function isActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const main = document.getElementById("content");
    const footer = document.querySelector("footer");
    if (main) main.inert = open;
    if (footer) footer.inert = open;
    return () => {
      document.body.style.overflow = "";
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (open) {
      document.querySelector<HTMLElement>("#site-menu a")?.focus();
    } else if (wasOpen.current) {
      buttonRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="font-serif text-[1.15rem] tracking-tight">
          Cameron Sanderson
        </Link>
        <nav aria-label="Primary" className="flex items-center">
          <ul className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center py-4 text-[0.95rem] ${
                      active
                        ? "text-ink shadow-[inset_0_-2px_0_0_var(--color-accent)]"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            ref={buttonRef}
            type="button"
            className="px-1 py-3 text-[0.95rem] lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </div>
      <div
        id="site-menu"
        className={
          open
            ? "fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper px-5 pb-16 pt-6 lg:hidden"
            : "hidden"
        }
      >
        <ul className="flex flex-col">
          {navigation.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="block py-4 font-serif text-4xl tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {site.email ? (
          <a href={mailto(site.email)} className="marker mt-8 inline-block text-muted">
            {site.email}
          </a>
        ) : null}
        <p className="mt-3 text-sm text-muted">{site.location}</p>
      </div>
    </header>
  );
}
