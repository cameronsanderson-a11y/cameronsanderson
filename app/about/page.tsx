import Link from "next/link";
import { Container } from "@/components/container";
import { MediaFrame } from "@/components/media-frame";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About",
  "Cameron Sanderson lives in Burleson, Texas, with his wife and their four kids. He has spent more than twenty years in local church ministry and serves at Doxology Bible Church in Fort Worth.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <Container className="py-16 lg:py-24">
        <p className="kicker">About</p>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <MediaFrame
              image={site.portrait || null}
              alt={site.portraitAlt}
              label="Cameron Sanderson"
              tone="olive"
              aspect="portrait"
              priority
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
          </div>
          <div className="lg:col-span-7 lg:row-start-1">
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.02] tracking-tight">
              I&apos;m Cameron Sanderson.
            </h1>
            <div className="mt-8 max-w-xl space-y-5 font-serif text-xl leading-relaxed">
              <p>I&apos;m a husband and a dad. My wife and I live in Burleson with our four kids.</p>
              <p>
                For more than twenty years I have served in local church ministry — communications,
                creative direction, production, worship, and the teams around that work. I serve now
                at Doxology Bible Church in Fort Worth, and I co-founded Communicate. The fuller
                account is on the{" "}
                <Link href="/work" className="marker">
                  work page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>

      <section className="mt-20 bg-paper-2 lg:mt-28" aria-labelledby="family-heading">
        <Container className="py-16 lg:py-24">
          <p className="kicker">Family</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2
              id="family-heading"
              className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:col-span-7"
            >
              Home in Burleson.
            </h2>
            <p className="max-w-md font-serif text-xl leading-relaxed lg:col-span-5">
              My wife and I, with our four kids, in the Fort Worth area.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="max-w-xl space-y-5 font-serif text-lg leading-relaxed lg:col-span-5">
              <p>
                My wife and I have four kids. We live in Burleson, in the Fort Worth area, and we
                homeschool.
              </p>
              <p>
                Home takes a real share of the week. The days include school, church, and the regular
                responsibilities of a household. I enjoy creating, leading, and building things, and
                a good deal of that happens here with my wife and the kids.
              </p>
              {site.personalNote.trim() ? <p>{site.personalNote}</p> : null}
              {site.interests.trim() ? (
                <div>
                  <h3 className="kicker">Interests</h3>
                  <p className="mt-3">{site.interests}</p>
                </div>
              ) : null}
            </div>
            <div className="lg:col-span-7">
              <MediaFrame
                alt=""
                tone="olive"
                aspect="landscape"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-6">
            <MediaFrame
              alt=""
              tone="paper"
              aspect="landscape"
              sizes="(min-width: 640px) 30vw, 45vw"
            />
            <MediaFrame
              alt=""
              tone="paper"
              aspect="landscape"
              sizes="(min-width: 640px) 30vw, 45vw"
            />
            <MediaFrame
              alt=""
              tone="paper"
              aspect="landscape"
              sizes="(min-width: 640px) 30vw, 45vw"
            />
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <section aria-labelledby="thinking-heading">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="kicker">What shapes my thinking</p>
              <h2
                id="thinking-heading"
                className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl"
              >
                Home, and the church.
              </h2>
            </div>
            <div className="max-w-xl space-y-5 font-serif text-lg leading-relaxed lg:col-span-7 lg:col-start-6">
              <p>
                My wife, the kids, and the churches I have served are the life I know best. The
                weeks hold school, church, and the ordinary work of a household. Patience and
                follow-through have come from staying in those places.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-line pt-12 lg:mt-28" aria-labelledby="close-heading">
          <h2 id="close-heading" className="max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            If you want to go further, start with the work, the writing, or speaking.
          </h2>
          <ul className="mt-10 grid gap-8 border-t border-line sm:grid-cols-3">
            <li className="pt-6">
              <p className="kicker">Work</p>
              <p className="mt-3 font-serif text-lg leading-relaxed">
                Doxology, Compass, and why Communicate exists.
              </p>
              <Link href="/work" className="marker mt-4 inline-block">
                Explore the work
              </Link>
            </li>
            <li className="border-t border-line pt-6 sm:border-t-0">
              <p className="kicker">Writing</p>
              <p className="mt-3 font-serif text-lg leading-relaxed">
                Church communications, creative leadership, and building useful things.
              </p>
              <Link href="/writing" className="marker mt-4 inline-block">
                Read the writing
              </Link>
            </li>
            <li className="border-t border-line pt-6 sm:border-t-0">
              <p className="kicker">Speaking</p>
              <p className="mt-3 font-serif text-lg leading-relaxed">
                A room, a podcast, or a conversation with a team.
              </p>
              <Link href="/speaking" className="marker mt-4 inline-block">
                Speaking and inquiries
              </Link>
            </li>
          </ul>
        </section>
      </Container>
    </>
  );
}
