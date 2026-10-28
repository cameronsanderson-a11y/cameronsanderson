import Image from "next/image";
import type { Tone } from "@/lib/types";

const toneClasses: Record<Tone, string> = {
  ink: "bg-ink text-paper",
  paper: "bg-paper-2 text-ink ring-1 ring-inset ring-ink/10",
  olive: "bg-olive text-paper",
};

const aspects = {
  portrait: "aspect-[737/1024]",
  landscape: "aspect-[16/10]",
  wide: "aspect-[2/1]",
  square: "aspect-square",
} as const;

export function MediaFrame({
  image,
  src,
  alt,
  label = "",
  caption,
  tone = "paper",
  aspect = "landscape",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  wide = false,
}: {
  image?: string | null;
  src?: string;
  alt: string;
  label?: string;
  caption?: string;
  tone?: Tone;
  aspect?: keyof typeof aspects;
  priority?: boolean;
  sizes?: string;
  wide?: boolean;
}) {
  const source = image || src || "";
  const showLabel = !source && label.trim().length > 0;

  return (
    <figure
      className={wide ? "md:-mx-12 lg:-mx-20" : undefined}
      aria-hidden={!source && !showLabel ? true : undefined}
    >
      <div
        className={`relative overflow-hidden ${aspects[aspect]} ${source ? "bg-paper-2" : toneClasses[tone]}`}
      >
        {source ? (
          <Image
            src={source}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        ) : showLabel ? (
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
            <div className="flex justify-end">
              <span className="h-2 w-2 shrink-0 bg-accent" aria-hidden="true" />
            </div>
            <p className="max-w-[12ch] font-serif text-[1.7rem] leading-none tracking-tight sm:text-4xl">
              {label}
            </p>
          </div>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mt-3 font-sans text-sm leading-relaxed text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return <blockquote className="pullquote">{children}</blockquote>;
}
