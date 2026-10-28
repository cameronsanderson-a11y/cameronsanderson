import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import type {
  Article,
  ArticleSummary,
  Project,
  ProjectCategory,
  ProjectSummary,
  Tone,
  WritingCategory,
} from "@/lib/types";
import { projectCategories, writingCategories } from "@/lib/types";
import { readingTime as estimateReadingTime } from "@/lib/format";

const projectsDirectory = path.join(process.cwd(), "content/projects");
const writingDirectory = path.join(process.cwd(), "content/writing");

const tones: readonly Tone[] = ["ink", "paper", "olive"];

function isTone(value: unknown): value is Tone {
  return typeof value === "string" && tones.includes(value as Tone);
}

function requireString(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file} is missing a ${key}.`);
  }
  return value.trim();
}

function optionalString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readMdxFiles(directory: string) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => {
      const fullPath = path.join(directory, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const updated = fs.statSync(fullPath).mtime.toISOString();
      return {
        file,
        slug: file.replace(/\.mdx$/, ""),
        data: data as Record<string, unknown>,
        content: content.trim(),
        updated,
      };
    });
}

function toSummary(project: Project): ProjectSummary {
  return {
    slug: project.slug,
    title: project.title,
    organization: project.organization,
    location: project.location,
    year: project.year,
    role: project.role,
    category: project.category,
    summary: project.summary,
    image: project.image,
    imageAlt: project.imageAlt,
    tone: project.tone,
    order: project.order,
    featured: project.featured,
  };
}

export const getProjects = cache((): Project[] => {
  return readMdxFiles(projectsDirectory)
    .filter((entry) => entry.data.published === true)
    .map((entry) => {
      const { data, file } = entry;
      const category = requireString(data, "category", file);
      if (!projectCategories.includes(category as ProjectCategory)) {
        throw new Error(
          `${file} has an unknown category "${category}". Use one of: ${projectCategories.join(", ")}.`,
        );
      }
      const tone = data.tone ?? "paper";
      if (!isTone(tone)) {
        throw new Error(`${file} has an unknown tone "${String(tone)}". Use ink, paper, or olive.`);
      }
      const image = optionalString(data.image) || null;
      const imageAlt = optionalString(data.imageAlt);
      if (image && !imageAlt) {
        throw new Error(`${file} has an image but no imageAlt.`);
      }

      return {
        slug: entry.slug,
        title: requireString(data, "title", file),
        organization: requireString(data, "organization", file),
        location: optionalString(data.location),
        year: requireString(data, "year", file),
        role: requireString(data, "role", file),
        category: category as ProjectCategory,
        summary: requireString(data, "summary", file),
        overview: requireString(data, "overview", file),
        image,
        imageAlt,
        tone,
        order: typeof data.order === "number" ? data.order : 0,
        featured: data.featured === true,
        externalUrl: optionalString(data.externalUrl),
        externalLabel: optionalString(data.externalLabel) || "Visit site",
        videoUrl: optionalString(data.videoUrl),
        updated: entry.updated,
        content: entry.content,
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
});

export function getProjectSummaries() {
  return getProjects().map(toSummary);
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}

export const getArticles = cache((): Article[] => {
  return readMdxFiles(writingDirectory)
    .filter((entry) => entry.data.published === true)
    .map((entry) => {
      const { data, file } = entry;
      const category = requireString(data, "category", file);
      if (!writingCategories.includes(category as WritingCategory)) {
        throw new Error(
          `${file} has an unknown category "${category}". Use one of: ${writingCategories.join(", ")}.`,
        );
      }
      const image = optionalString(data.image) || null;
      const imageAlt = optionalString(data.imageAlt);
      if (image && !imageAlt) {
        throw new Error(`${file} has an image but no imageAlt.`);
      }
      const date = requireString(data, "date", file);
      if (Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())) {
        throw new Error(`${file} has an invalid date. Use YYYY-MM-DD.`);
      }

      return {
        slug: entry.slug,
        title: requireString(data, "title", file),
        description: requireString(data, "description", file),
        date,
        category: category as WritingCategory,
        image,
        imageAlt,
        featured: data.featured === true,
        readingTime: estimateReadingTime(entry.content),
        updated: entry.updated,
        content: entry.content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
});

export function getArticleSummaries(): ArticleSummary[] {
  return getArticles().map(({ content: _content, updated: _updated, ...article }) => article);
}

export function getArticle(slug: string) {
  return getArticles().find((article) => article.slug === slug);
}

export function getFeaturedArticle() {
  const articles = getArticles();
  return articles.find((article) => article.featured) ?? articles[0];
}

export function getRelatedArticles(slug: string, limit = 2) {
  const articles = getArticles();
  const current = articles.find((article) => article.slug === slug);
  if (!current) return [];
  const others = articles.filter((article) => article.slug !== slug);
  const sameCategory = others.filter((article) => article.category === current.category);
  const differentCategory = others.filter((article) => article.category !== current.category);
  return [...sameCategory, ...differentCategory].slice(0, limit);
}
