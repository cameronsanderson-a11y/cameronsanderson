import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { formatDate } from "@/lib/format";
import type { ArticleSummary } from "@/lib/types";

export function ArticleRow({
  article,
  featured = false,
  heading = "h2",
}: {
  article: ArticleSummary;
  featured?: boolean;
  heading?: "h2" | "h3";
}) {
  const Heading = heading;

  return (
    <article className={`relative ${featured ? "pb-4" : "border-b border-line py-8 sm:py-10"}`}>
      {featured && article.image ? (
        <div className="mb-8">
          <MediaFrame
            image={article.image}
            alt={article.imageAlt}
            label={article.title}
            aspect="wide"
            sizes="(min-width: 1024px) 70vw, 100vw"
          />
        </div>
      ) : null}
      <p className="kicker">
        {article.category}
        <span aria-hidden="true"> · </span>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden="true"> · </span>
        {article.readingTime}
      </p>
      <Heading
        className={`mt-3 max-w-4xl font-serif tracking-tight ${
          featured
            ? "text-4xl leading-[1.05] sm:text-6xl"
            : "text-3xl leading-tight sm:text-4xl"
        }`}
      >
        <Link
          href={`/writing/${article.slug}`}
          className="marker after:absolute after:inset-0 after:content-['']"
        >
          {article.title}
        </Link>
      </Heading>
      <p className={`max-w-2xl leading-relaxed text-muted ${featured ? "mt-5 font-serif text-xl" : "mt-3 text-lg"}`}>
        {article.description}
      </p>
    </article>
  );
}
