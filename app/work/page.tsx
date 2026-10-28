import Link from "next/link";
import { Container } from "@/components/container";
import { EndNote } from "@/components/mdx-content";
import { WorkIndex } from "@/components/work-index";
import { experience } from "@/content/experience";
import { getProjectSummaries } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Work",
  "More than twenty years in local church ministry: a decade at Compass Christian Church, creative direction at Doxology Bible Church, and Communicate, the planning platform Cameron Sanderson co-founded.",
  "/work",
);

export default function WorkPage() {
  const projects = getProjectSummaries();

  return (
    <Container className="py-16 lg:py-24">
      <header className="border-b border-line pb-12">
        <p className="kicker">Work</p>
        <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.7rem,6vw,5.2rem)] leading-[0.95] tracking-tight">
          The work, and the thinking behind it.
        </h1>
        <div className="mt-8 max-w-2xl space-y-5 font-serif text-xl leading-relaxed">
          <p>
            I have spent more than twenty years in local church ministry, in communications, creative
            direction, production, worship, and the teams around that work.
          </p>
          <p>
            About a decade of that ministry was at Compass Christian Church in Colleyville, where I
            led worship for a while before the later years turned to creative work in the same church.
          </p>
          <p>
            I serve as Creative Director at Doxology Bible Church in Fort Worth. The work is creative
            direction, worship, communications, production, and the teams and initiatives around them.
          </p>
          <p>
            I co-founded Communicate, a communications planning platform for churches, from planning
            problems I kept meeting in ministry. The product is at{" "}
            <a href="https://communicate.app" className="marker" target="_blank" rel="noreferrer">
              communicate.app
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </div>
      </header>
      {projects.length > 0 ? (
        <div className="pt-10">
          <WorkIndex projects={projects} />
        </div>
      ) : null}
      <section className="mt-16 border-t border-line pt-10" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className="font-serif text-2xl tracking-tight">
          The short version
        </h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-3">
          {experience.map((item) => (
            <li key={item.organization}>
              <p className="kicker">{item.period}</p>
              <h3 className="mt-2 font-serif text-2xl tracking-tight">
                {item.href ? (
                  <Link href={item.href} className="marker">
                    {item.organization}
                  </Link>
                ) : (
                  item.organization
                )}
              </h3>
              <p className="mt-1 text-sm">
                {item.role}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
            </li>
          ))}
        </ol>
      </section>
      <EndNote title="For a talk, a workshop, or an interview." href="/speaking" label="Speaking">
        Talks, workshops, and interviews are gathered on the speaking page.
      </EndNote>
    </Container>
  );
}
