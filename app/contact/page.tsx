import Link from "next/link";
import { Container } from "@/components/container";
import { site, socialLinks } from "@/content/site";
import { mailto } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contact",
  "Get in touch with Cameron Sanderson about speaking, teaching, interviews, and other professional conversations.",
  "/contact",
);

export default function ContactPage() {
  return (
    <Container className="py-16 lg:py-28">
      <p className="kicker">Contact</p>
      <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.7rem,6vw,5.2rem)] leading-[0.95] tracking-tight">
        Write to me.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-muted">
        Email is the best way to reach me. If you are writing about a date, include the event, who
        will be in the room, and when you need an answer.
      </p>
      {site.email ? (
        <p className="mt-12">
            <a
              href={mailto(site.email, "Hello from cameronsanderson.com")}
              aria-label={site.email}
              className="inline-block font-serif text-[clamp(1.7rem,4.6vw,4.25rem)] leading-[1.05] tracking-tight"
            >
              <span aria-hidden="true">
                <span className="marker">{site.email.slice(0, site.email.indexOf("@") + 1)}</span>
                <br />
                <span className="marker">{site.email.slice(site.email.indexOf("@") + 1)}</span>
              </span>
            </a>
        </p>
      ) : null}
      <div
        className={`mt-14 grid gap-8 border-t border-line pt-8 ${socialLinks.length > 0 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        <p>
          <span className="kicker block">Based in</span>
          <span className="mt-2 block">{site.location}</span>
        </p>
        <p>
          <span className="kicker block">Speaking</span>
          <Link href="/speaking" className="marker mt-2 block">
            Topics and a bio you can use
          </Link>
        </p>
        {socialLinks.length > 0 ? (
          <ul>
            <li className="kicker">Elsewhere</li>
            {socialLinks.map((link) => (
              <li key={link.href} className="mt-2">
                <a href={link.href} className="marker" target="_blank" rel="noreferrer">
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Container>
  );
}
