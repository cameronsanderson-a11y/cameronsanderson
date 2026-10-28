import { writingCategories } from "@/lib/types";
import { Container } from "@/components/container";
import { EndNote } from "@/components/mdx-content";
import { TopicList } from "@/components/topic-list";
import { WritingBrowser } from "@/components/writing-browser";
import { topicsStillOpen } from "@/content/topics";
import { getArticleSummaries } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Writing",
  "Essays from Cameron Sanderson on church communications, creative leadership, and building practical tools.",
  "/writing",
);

export default function WritingPage() {
  const articles = getArticleSummaries();
  const topics = topicsStillOpen(articles.map((article) => article.title));

  return (
    <Container className="py-16 lg:py-24">
      <header className="grid gap-8 border-b border-line pb-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="kicker">Writing</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.7rem,6vw,5.2rem)] leading-[0.95] tracking-tight">
            What the work has been teaching me.
          </h1>
        </div>
        <div className="max-w-sm lg:col-span-4 lg:pt-12">
          <p className="font-serif text-xl leading-relaxed text-muted">
            Church communications, creative leadership, and building useful things.
          </p>
          <ul className="mt-6 space-y-1 text-sm text-muted">
            {writingCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="pt-12">
        {articles.length > 0 ? <WritingBrowser articles={articles} /> : null}
        {topics.length > 0 ? (
          <section className={articles.length > 0 ? "mt-20" : undefined} aria-labelledby="topics-heading">
            <h2
              id="topics-heading"
              className={
                articles.length > 0 ? "font-serif text-3xl tracking-tight" : "sr-only"
              }
            >
              Topics
            </h2>
            <div className={articles.length > 0 ? "mt-8" : undefined}>
              <TopicList topics={topics} />
            </div>
          </section>
        ) : null}
      </div>

      <EndNote title="About the person writing these." href="/about" label="About">
        Twenty years in church ministry, and the path from that work into Communicate.
      </EndNote>
    </Container>
  );
}
