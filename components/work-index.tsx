"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaFrame } from "@/components/media-frame";
import type { ProjectSummary } from "@/lib/types";

export function WorkIndex({ projects }: { projects: ProjectSummary[] }) {
  const [active, setActive] = useState("All");
  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const visible =
    active === "All" ? projects : projects.filter((project) => project.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-x-5 gap-y-3">
        {["All", ...categories].map((category) => {
          const count =
            category === "All"
              ? projects.length
              : projects.filter((project) => project.category === category).length;
          const selected = active === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={`min-h-11 py-2 text-left text-[0.95rem] ${selected ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              <span className={selected ? "border-b border-ink pb-0.5" : undefined}>{category}</span>
              <span className="ml-1.5 text-xs text-muted">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}.
      </p>
      <div className="mt-8 border-t border-line">
        {visible.map((project) => (
          <article key={project.slug} className="relative border-b border-line py-8 sm:py-12">
            <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <MediaFrame
                  image={project.image}
                  alt={project.imageAlt}
                  label={project.organization}
                  tone={project.tone}
                  aspect="landscape"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="kicker">{project.category}</p>
                <h2 className="mt-3 max-w-3xl font-serif text-[2rem] leading-[1.05] tracking-tight sm:text-5xl">
                  <Link
                    href={`/work/${project.slug}`}
                    className="marker after:absolute after:inset-0 after:content-['']"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{project.summary}</p>
                <p className="mt-5 text-sm">
                  {project.organization}
                  {" · "}
                  {project.year}
                  {" · "}
                  {project.role}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 ? <p className="py-10 text-muted">Nothing in this category.</p> : null}
    </div>
  );
}
