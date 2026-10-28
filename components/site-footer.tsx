import Link from "next/link";
import { navigation, site, socialLinks } from "@/content/site";
import { mailto } from "@/lib/format";
import { Container } from "@/components/container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-line">
      <Container className="py-14 lg:py-20">
        <p className="font-serif text-4xl tracking-tight sm:text-5xl">{site.name}</p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <nav aria-label="Footer">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="marker">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3">
            {site.email ? (
              <a href={mailto(site.email)} className="marker inline-block">
                {site.email}
              </a>
            ) : null}
            <p className="text-muted">{site.location}</p>
            {socialLinks.length > 0 ? (
              <ul className="space-y-2 pt-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="marker" target="_blank" rel="noreferrer">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <p className="max-w-xs font-serif text-2xl leading-snug tracking-tight sm:justify-self-end">
            Church communications, creative direction, and practical tools.
          </p>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}</p>
          <p>Fort Worth, Texas</p>
        </div>
      </Container>
    </footer>
  );
}
