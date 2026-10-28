"use client";

import { useMemo, useState } from "react";
import { ArticleRow } from "@/components/article-row";
import type { ArticleSummary } from "@/lib/types";

export function WritingBrowser({ articles }: { articles: ArticleSummary[] }) {
  const [active, setActive] = useState("All");
  const categories = useMemo(
    () => [...new Set(articles.map((article) => article.category))],
    [articles],
  );
  const visible =
    active === "All" ? articles : articles.filter((article) => article.category === active);
  const showFeature = active === "All" && visible.length > 1;
  const lead = showFeature ? (visible.find((article) => article.featured) ?? visible[0]) : undefined;
  const rest = lead ? visible.filter((article) => article.slug !== lead.slug) : visible;

  return (
    <div>
      {categories.length > 1 ? (
        <div role="group" aria-label="Filter writing by category" className="mb-10 flex flex-wrap gap-x-5 gap-y-3">
          {["All", ...categories].map((category) => {
            const count =
              category === "All"
                ? articles.length
                : articles.filter((article) => article.category === category).length;
            const selected = active === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(category)}
                className={`py-1 text-left text-[0.95rem] ${selected ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                <span className={selected ? "border-b border-ink pb-0.5" : undefined}>{category}</span>
                <span className="ml-1.5 text-xs text-muted">{count}</span>
              </button>
            );
          })}
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "essay" : "essays"}.
      </p>
      {lead ? (
        <div className="mb-6">
          <ArticleRow article={lead} featured />
        </div>
      ) : null}
      {rest.length > 0 ? (
        <div className="border-t border-line">
          {rest.map((article) => (
            <ArticleRow key={article.slug} article={article} />
          ))}
        </div>
      ) : null}
      {visible.length === 0 ? <p className="py-10 text-muted">Nothing in this category.</p> : null}
    </div>
  );
}
