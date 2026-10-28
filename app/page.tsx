import Link from "next/link";
import { Container } from "@/components/container";
import { MediaFrame } from "@/components/media-frame";
import { TopicList } from "@/components/topic-list";
import { topicsStillOpen } from "@/content/topics";
import { speakingTopics } from "@/content/speaking";
import { site } from "@/content/site";
import { getArticleSummaries, getProject, getProjectSummaries } from "@/lib/content";
import { formatDate, slugify } from "@/lib/format";
import type { ProjectSummary } from "@/lib/types";

const practices = [
  {
    title: "Create",
    text: "Campaigns, storytelling, visual communication, and the experiences a congregation makes together.",
  },
  {
    title: "Lead",
    text: "Strategy, teams, and the systems that let good work happen more than once.",
  },
  {
    title: "Build",
    text: "Software and practical tools, when the work needs something that does not exist yet.",
  },
];

export default function HomePage() {
  const featured = getProjectSummaries().filter((project) => project.featured);
  const communicate = getProject("communicate");
  const allArticles = getArticleSummaries();
  const articles = allArticles.slice(0, 3);
  const topics = topicsStillOpen(allArticles.map((article) => article.title)).slice(0, 3);
  const talks = speakingTopics.slice(0, 3);

  return (
    <>
      <Container className="pb-20 pt-10 lg:pb-28 lg:pt-14">
        <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="kicker">Creative direction and church communications</p>
          <p className="kicker">{site.location}</p>
        </div>

        <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <span className="mb-7 block h-0.5 w-10 bg-accent" aria-hidden="true" />
            <h1 className="font-serif text-[clamp(2.45rem,7.2vw,5.5rem)] leading-[0.9] tracking-[-0.035em]">
              <span className="block">Making things</span>
              <span className="block">that help</span>
              <span className="block">the Church</span>
              <span className="block italic">communicate</span>
              <span className="block italic">better.</span>
            </h1>
            <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-ink sm:text-[1.35rem]">
              I&apos;m Cameron Sanderson. For more than 20 years I&apos;ve worked where creativity,
              communication, and the local church meet — leading teams, shaping how a church
              communicates, and building tools that help churches do the work better.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/work" className="button">
                Explore the work
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link href="/about" className="marker">
                About
              </Link>
              <Link href="/speaking" className="marker">
                Speaking
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-16">
            <MediaFrame
              image={site.portrait || null}
              alt={site.portraitAlt}
              label="Cameron Sanderson"
              tone="paper"
              aspect="portrait"
              priority
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
          </div>
        </div>
      </Container>

      <section className="border-t border-line" aria-labelledby="practice-heading">
        <Container className="py-20 lg:py-28">
          <p className="kicker">
            <span className="text-ink">01</span>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            Practice
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 id="practice-heading" className="max-w-xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                I&apos;ve stayed close to the work.
              </h2>
              <div className="mt-6 max-w-xl space-y-5 font-serif text-xl leading-relaxed">
                <p>
                  Most of it has happened inside the local church. I spent about a decade at Compass
                  Christian Church in Colleyville. I serve now as Creative Director at Doxology Bible
                  Church in Fort Worth, leading creative direction, worship, communications,
                  production, and the people who make those things happen.
                </p>
                <p>
                  I also co-founded Communicate, a planning platform for church communications. It
                  exists because I kept running into the same problems while doing the job.
                </p>
              </div>
            </div>
            <dl className="lg:col-span-5 lg:col-start-8 lg:border-l lg:border-line lg:pl-10">
              {practices.map((practice) => (
                <div key={practice.title} className="border-b border-line py-6 first:pt-0">
                  <dt className="font-serif text-3xl italic tracking-tight">{practice.title}</dt>
                  <dd className="mt-2 max-w-sm leading-relaxed text-muted">{practice.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {featured.length > 0 ? (
        <section className="border-t border-line" aria-labelledby="work-heading">
          <Container className="py-20 lg:py-28">
            <p className="kicker">
              <span className="text-ink">02</span>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              Selected work
            </p>
            <h2 id="work-heading" className="mt-6 max-w-xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              From the churches.
            </h2>
            <div className="mt-12 space-y-16 lg:space-y-24">
              {featured.map((project, index) => (
                <WorkFeature key={project.slug} project={project} split={index % 2 === 1} />
              ))}
            </div>
            <p className="mt-12">
              <Link href="/work" className="marker">
                All work
              </Link>
            </p>
          </Container>
        </section>
      ) : null}

      {communicate ? (
        <section className="dark-surface bg-ink text-paper" aria-labelledby="building-heading">
          <Container className="py-20 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-sans text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-accent">
                  What I&apos;m building
                </p>
                <h2
                  id="building-heading"
                  className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl"
                >
                  Communicate started as a problem I was responsible for.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-white/15 lg:pl-10">
                <div className="space-y-5 font-serif text-xl leading-relaxed">
                  <p>
                    I co-founded Communicate, a communications planning platform for churches. The
                    hard part of the job was a shared plan: who owned the message, where the work
                    lived, and how a team got it ready.
                  </p>
                  <p className="text-quiet">
                    The product sits with the creative work. The longer version is the story of why it
                    exists.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link href={`/work/${communicate.slug}`} className="button">
                    The story behind it
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                  {communicate.externalUrl ? (
                    <a href={communicate.externalUrl} className="marker" target="_blank" rel="noreferrer">
                      Visit Communicate
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-line" aria-labelledby="writing-heading">
        <Container className="py-20 lg:py-28">
          <p className="kicker">
            <span className="text-ink">03</span>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            Writing
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="writing-heading" className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:col-span-7">
              {articles.length > 0 ? "Recent writing." : "What the work has been teaching me."}
            </h2>
            {articles.length > 0 ? (
              <p className="max-w-sm text-muted lg:col-span-4 lg:col-start-9">
                Essays on church communications, creative leadership, and building useful things.
              </p>
            ) : null}
          </div>
          {articles.length > 0 ? (
            <ol className="mt-12 border-t border-line">
              {articles.map((article) => (
                <li key={article.slug} className="relative border-b border-line py-8">
                  <p className="kicker">
                    {article.category}
                    <span aria-hidden="true"> · </span>
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                    <span aria-hidden="true"> · </span>
                    {article.readingTime}
                  </p>
                  <h3 className="mt-3 max-w-3xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                    <Link
                      href={`/writing/${article.slug}`}
                      className="marker after:absolute after:inset-0 after:content-['']"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{article.description}</p>
                </li>
              ))}
            </ol>
          ) : (
            topics.length > 0 ? (
              <div className="mt-12">
                <TopicList topics={topics} />
              </div>
            ) : null
          )}
          <p className="mt-8">
            <Link href="/writing" className="marker">
              {articles.length > 0 ? "All writing" : "Writing"}
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-2" aria-labelledby="speaking-heading">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="kicker">
                <span className="text-ink">04</span>
                <span className="mx-2" aria-hidden="true">
                  /
                </span>
                Speaking and teaching
              </p>
              <h2 id="speaking-heading" className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                For church communicators and ministry leaders.
              </h2>
              <p className="mt-5 max-w-md font-serif text-xl leading-relaxed">
                I talk with church communicators, creative teams, and ministry leaders about
                strategy, leadership, and the systems under the work. Talks, workshops, and
                interviews.
              </p>
              <Link href="/speaking" className="button mt-8">
                Speaking
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <ol className="lg:col-span-6 lg:col-start-7">
              {talks.map((topic, index) => (
                <li key={topic.title} className="border-t border-line py-5">
                  <Link href={`/speaking#${slugify(topic.title)}`} className="group block">
                    <span className="kicker" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="mt-2 block font-serif text-2xl leading-snug tracking-tight group-hover:italic">
                      {topic.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}

function WorkFeature({ project, split }: { project: ProjectSummary; split: boolean }) {
  const media = (
    <MediaFrame
      image={project.image}
      alt={project.imageAlt}
      label={project.organization}
      tone={project.tone}
      aspect={split ? "landscape" : "wide"}
      sizes={split ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 80vw, 100vw"}
    />
  );
  const copy = (
    <div>
      <p className="kicker">{project.category}</p>
      <h3 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
        <Link href={`/work/${project.slug}`} className="marker">
          {project.title}
        </Link>
      </h3>
      <p className="mt-4 max-w-xl font-serif text-xl leading-relaxed text-muted">{project.summary}</p>
      <p className="mt-4 text-sm">
        {project.organization}
        {project.location ? ` · ${project.location}` : ""}
        {` · ${project.role}`}
      </p>
    </div>
  );

  if (!split) {
    return (
      <article className="grid gap-8">
        {media}
        {copy}
      </article>
    );
  }

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">{copy}</div>
      <div className="lg:col-span-6 lg:col-start-7">{media}</div>
    </article>
  );
}
