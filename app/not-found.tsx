import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 lg:py-36">
      <p className="kicker">404</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
        This page is not on the site.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-muted">
        The work, the writing, and a way to get in touch are still here.
      </p>
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
        <Link href="/" className="button">
          Home
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <Link href="/work" className="marker self-center">
          Work
        </Link>
        <Link href="/writing" className="marker self-center">
          Writing
        </Link>
        <Link href="/contact" className="marker self-center">
          Contact
        </Link>
      </div>
    </Container>
  );
}
