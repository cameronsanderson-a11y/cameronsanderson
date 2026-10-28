import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleRow } from "@/components/article-row";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { MediaFrame } from "@/components/media-frame";
import { MdxContent } from "@/components/mdx-content";
import { site } from "@/content/site";
import { getArticle, getArticles, getRelatedArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { articleGraph, breadcrumbGraph, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const articles = getArticles();
  // Static export requires at least one path. There are no published essays yet.
  if (articles.length === 0) return [{ slug: "_" }];
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Writing" };
  const meta = pageMeta(article.title, article.description, `/writing/${article.slug}`);
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: article.date,
      authors: [site.name],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = getRelatedArticles(article.slug);

  return (
    <Container className="py-14 lg:py-20">
      <JsonLd
        data={[
          articleGraph(article),
          breadcrumbGraph([
            { name: "Writing", path: "/writing" },
            { name: article.title, path: `/writing/${article.slug}` },
          ]),
        ]}
      />
      <article className="mx-auto max-w-[42rem]">
        <p>
          <Link href="/writing" className="marker text-sm">
            All writing
          </Link>
        </p>
        <header className="mt-8">
          <p className="kicker">
            {article.category}
            <span aria-hidden="true"> · </span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true"> · </span>
            {article.readingTime}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-tight text-balance">
            {article.title}
          </h1>
          <p className="mt-6 font-serif text-xl leading-relaxed text-muted">{article.description}</p>
        </header>
        {article.image ? (
          <div className="mt-10">
            <MediaFrame
              image={article.image}
              alt={article.imageAlt}
              label={article.title}
              aspect="wide"
              priority
              sizes="(min-width: 768px) 42rem, 100vw"
            />
          </div>
        ) : null}
        <div className="mt-12">
          <MdxContent source={article.content} />
        </div>
        <p className="mt-16 border-t border-line pt-6 text-sm text-muted">
          <Link href="/about" className="marker text-ink">
            Cameron Sanderson
          </Link>
          <span aria-hidden="true"> · </span>
          Creative Director, Doxology Bible Church
        </p>
      </article>
      {related.length > 0 ? (
        <section className="mx-auto mt-20 max-w-[42rem]" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-serif text-3xl tracking-tight">
            Related writing
          </h2>
          <div className="mt-4 border-t border-line">
            {related.map((item) => (
              <ArticleRow key={item.slug} article={item} heading="h3" />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
