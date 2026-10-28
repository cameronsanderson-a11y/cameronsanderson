import { MDXRemote } from "next-mdx-remote/rsc";
import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { MediaFrame, PullQuote } from "@/components/media-frame";

function Figure(props: {
  src?: string;
  alt?: string;
  label?: string;
  caption?: string;
  tone?: "ink" | "paper" | "olive";
  wide?: boolean;
}) {
  return (
    <MediaFrame
      src={props.src}
      alt={props.alt || ""}
      label={props.label}
      caption={props.caption}
      tone={props.tone}
      wide={props.wide}
      aspect="landscape"
    />
  );
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = typeof props.href === "string" && props.href.startsWith("http");
  return (
    <a {...props} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {props.children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

const components = {
  PullQuote,
  Figure,
  a: MdxLink,
};

export function MdxContent({
  source,
  variant = "essay",
}: {
  source: string;
  variant?: "essay" | "case";
}) {
  return (
    <div className={variant === "case" ? "editorial editorial-case" : "editorial"}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}

export function EndNote({
  title,
  children,
  href,
  label,
}: {
  title: string;
  children: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <aside className="mt-20 grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-xl font-serif text-lg leading-relaxed text-muted">{children}</p>
      </div>
      <div className="lg:col-span-5 lg:text-right">
        <NextLink href={href} className="button">
          {label}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </NextLink>
      </div>
    </aside>
  );
}
