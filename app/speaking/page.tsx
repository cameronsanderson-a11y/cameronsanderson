import { CopyText } from "@/components/copy-text";
import { Container } from "@/components/container";
import { MediaFrame } from "@/components/media-frame";
import {
  appearances,
  formats,
  inquiryNotes,
  longBio,
  shortBio,
  speakingIntro,
  speakingTopics,
  testimonials,
} from "@/content/speaking";
import { site } from "@/content/site";
import { mailto, slugify } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Speaking",
  "Cameron Sanderson speaks and teaches on church communications, creative leadership, systems, and building tools for the Church.",
  "/speaking",
);

export default function SpeakingPage() {
  return (
    <Container className="py-16 lg:py-24">
      <header className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="kicker">Speaking</p>
          <h1 className="mt-4 font-serif text-[clamp(2.7rem,6vw,5.2rem)] leading-[0.95] tracking-tight">
            {speakingIntro.title}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-muted sm:text-2xl">
            {speakingIntro.lede}
          </p>
        </div>
      </header>
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="max-w-2xl space-y-5 font-serif text-lg leading-relaxed lg:col-span-7">
          {speakingIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="kicker">Formats</p>
          <ul className="mt-4 space-y-3">
            {formats.map((format) => (
              <li key={format} className="border-t border-line pt-3">
                {format}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Fees, travel, and format are part of the conversation.
          </p>
        </div>
      </div>

      <section className="mt-20" aria-labelledby="topics-heading" id="topics">
        <h2 id="topics-heading" className="font-serif text-4xl tracking-tight">
          Topics
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          These are the conversations I can lead. They are easy to reshape for a particular room.
        </p>
        <ol className="mt-10">
          {speakingTopics.map((topic, index) => (
            <li
              key={topic.title}
              id={slugify(topic.title)}
              className="grid gap-4 border-t border-line py-10 lg:grid-cols-12"
            >
              <p className="font-serif text-2xl italic text-muted lg:col-span-2">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="lg:col-span-8">
                <h3 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{topic.title}</h3>
                <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted">
                  {topic.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 border-t border-line pt-16" aria-labelledby="bio-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="bio-heading" className="font-serif text-4xl tracking-tight">
              Biography
            </h2>
            <p className="mt-3 text-muted">For programs, websites, and introductions. Copy either length.</p>
            {site.portrait ? (
              <div className="mt-8 max-w-xs">
                <MediaFrame
                  image={site.portrait}
                  alt={site.portraitAlt}
                  label="Cameron Sanderson"
                  aspect="portrait"
                  sizes="320px"
                />
              </div>
            ) : null}
          </div>
          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            <div>
              <h3 className="kicker">Short</h3>
              <p className="mt-4 font-serif text-lg leading-relaxed">{shortBio}</p>
              <CopyText text={shortBio} label="Copy short bio" />
            </div>
            <div>
              <h3 className="kicker">Longer</h3>
              <div className="mt-4 space-y-4 font-serif text-lg leading-relaxed">
                {longBio.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <CopyText text={longBio} label="Copy longer bio" />
            </div>
          </div>
        </div>
      </section>

      {appearances.length > 0 || testimonials.length > 0 ? (
        <section className="mt-20 border-t border-line pt-16" aria-labelledby="archive-heading">
          <h2 id="archive-heading" className="font-serif text-4xl tracking-tight">
            Talks, interviews, and samples
          </h2>
          {appearances.length > 0 ? (
            <ul className="mt-10 grid gap-10 sm:grid-cols-2">
              {appearances.map((item) => (
                <li key={`${item.event}-${item.title}`} className="border-t border-line pt-6">
                  {item.image ? (
                    <MediaFrame
                      image={item.image}
                      alt={item.imageAlt || ""}
                      label={item.title}
                      aspect="landscape"
                      sizes="(min-width: 640px) 40vw, 100vw"
                    />
                  ) : null}
                  <p className="kicker mt-4">
                    {item.kind}
                    <span aria-hidden="true"> · </span>
                    {item.year}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl tracking-tight">
                    {item.href ? (
                      <a href={item.href} className="marker" target="_blank" rel="noreferrer">
                        {item.title}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="mt-2 text-muted">{item.event}</p>
                </li>
              ))}
            </ul>
          ) : null}
          {testimonials.length > 0 ? (
            <ul className="mt-12 space-y-8">
              {testimonials.map((item) => (
                <li key={item.name} className="max-w-3xl border-t border-line pt-6">
                  <blockquote className="font-serif text-2xl leading-snug tracking-tight">
                    “{item.quote}”
                  </blockquote>
                  <p className="mt-4 text-sm">
                    {item.name}
                    <span className="text-muted"> · {item.role}</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section id="inquire" className="dark-surface mt-20 bg-ink px-6 py-14 text-paper sm:px-10 lg:px-14" aria-labelledby="inquire-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-sans text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-accent">
              Speaking inquiries
            </p>
            <h2 id="inquire-heading" className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              Tell me about the event.
            </h2>
            <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-quiet">
              A short note is enough. I read them.
            </p>
            {site.email ? (
              <a href={mailto(site.email, "Speaking inquiry")} className="button mt-8">
                {site.email}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ) : null}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="kicker">Worth including</p>
            <ul className="mt-4 space-y-3">
              {inquiryNotes.map((note) => (
                <li key={note} className="border-t border-white/15 pt-3">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}
