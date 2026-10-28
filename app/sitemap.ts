import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getArticles, getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work", "/writing", "/about", "/speaking", "/contact"].map((path, index) => ({
    url: new URL(path, site.url).toString(),
    priority: index === 0 ? 1 : 0.7,
    changeFrequency: "monthly" as const,
  }));

  const projects = getProjects().map((project) => ({
    url: new URL(`/work/${project.slug}`, site.url).toString(),
    lastModified: new Date(project.updated),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articles = getArticles().map((article) => ({
    url: new URL(`/writing/${article.slug}`, site.url).toString(),
    lastModified: new Date(article.updated),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...projects, ...articles];
}
