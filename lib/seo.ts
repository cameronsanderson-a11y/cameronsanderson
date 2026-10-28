import type { Metadata } from "next";
import { site, socialLinks } from "@/content/site";

export function pageMeta(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      title: fullTitle,
      description,
    },
  };
}

export function siteGraph() {
  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    url: site.url,
    jobTitle: "Creative Director",
    description: site.description,
    email: site.email || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fort Worth",
      addressRegion: "TX",
      addressCountry: "US",
    },
    worksFor: {
      "@type": "Organization",
      name: "Doxology Bible Church",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fort Worth",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    affiliation: {
      "@type": "Organization",
      name: "Communicate",
      url: "https://communicate.app",
    },
    knowsAbout: [
      "Church communications",
      "Creative leadership",
      "Church communications strategy",
      "Team leadership",
      "Software for churches",
    ],
  };

  if (socialLinks.length > 0) {
    person.sameAs = socialLinks.map((link) => link.href);
  }

  if (site.portrait) {
    person.image = new URL(site.portrait, site.url).toString();
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: site.description,
        publisher: { "@id": `${site.url}/#person` },
        inLanguage: "en-US",
      },
    ],
  };
}

export function breadcrumbGraph(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function articleGraph(article: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@id": `${site.url}/#person` },
    mainEntityOfPage: new URL(`/writing/${article.slug}`, site.url).toString(),
    inLanguage: "en-US",
  };
}
