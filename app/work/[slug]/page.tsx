import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { MediaFrame } from "@/components/media-frame";
import { MdxContent } from "@/components/mdx-content";
import { getProject, getProjects } from "@/lib/content";
import { breadcrumbGraph, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return pageMeta(project.title, project.summary, `/work/${project.slug}`);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projects = getProjects();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const facts = [
    ["Organization", project.organization],
    ["Role", project.role],
    ["Year", project.year],
    ["Place", project.location],
    ["Category", project.category],
  ].filter((item): item is [string, string] => item[1].length > 0);

  return (
    <Container className="py-14 lg:py-20">
      <JsonLd
        data={breadcrumbGraph([
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ])}
      />
      <p>
        <Link href="/work" className="marker text-sm">
          All work
        </Link>
      </p>
      <header className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="kicker">{project.category}</p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,5.4vw,4.8rem)] leading-[1.02] tracking-tight text-balance">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-muted sm:text-2xl">
            {project.overview}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-end text-sm lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="kicker">{label}</dt>
              <dd className="mt-1 text-base">{value}</dd>
            </div>
          ))}
        </dl>
      </header>
      <div className="mt-12">
        <MediaFrame
          image={project.image}
          alt={project.imageAlt}
          label={project.organization}
          tone={project.tone}
          aspect="wide"
          priority
          sizes="(min-width: 1024px) 80vw, 100vw"
        />
      </div>
      {project.videoUrl.startsWith("https://") ? (
        <div className="mt-8 aspect-video bg-ink">
          <iframe
            src={project.videoUrl}
            title={`${project.title} video`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}
      <div className="mt-14 max-w-[40rem]">
        <MdxContent source={project.content} variant="case" />
        {project.externalUrl ? (
          <p className="mt-12">
            <a href={project.externalUrl} className="button" target="_blank" rel="noreferrer">
              {project.externalLabel}
              <span className="sr-only"> (opens in a new tab)</span>
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </p>
        ) : null}
      </div>
      {next ? (
        <div className="mt-20 border-t border-line pt-8">
          <p className="kicker">Next</p>
          <Link
            href={`/work/${next.slug}`}
            className="mt-3 block max-w-3xl font-serif text-4xl leading-tight tracking-tight hover:italic sm:text-5xl"
          >
            {next.title}
          </Link>
        </div>
      ) : null}
    </Container>
  );
}
