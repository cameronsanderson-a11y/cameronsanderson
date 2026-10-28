export const projectCategories = [
  "Creative Direction",
  "Communications & Strategy",
  "Campaigns & Storytelling",
  "Products & Tools",
  "Leadership & Systems",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const writingCategories = [
  "Church Communications",
  "Creative Leadership",
  "Building & Innovation",
  "Behind the Work",
] as const;

export type WritingCategory = (typeof writingCategories)[number];

export type Tone = "ink" | "paper" | "olive";

export type Project = {
  slug: string;
  title: string;
  organization: string;
  location: string;
  year: string;
  role: string;
  category: ProjectCategory;
  summary: string;
  overview: string;
  image: string | null;
  imageAlt: string;
  tone: Tone;
  order: number;
  featured: boolean;
  externalUrl: string;
  externalLabel: string;
  videoUrl: string;
  updated: string;
  content: string;
};

export type ProjectSummary = Omit<Project, "content" | "overview" | "videoUrl" | "updated" | "externalUrl" | "externalLabel">;

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: WritingCategory;
  image: string | null;
  imageAlt: string;
  featured: boolean;
  readingTime: string;
  updated: string;
  content: string;
};

export type ArticleSummary = Omit<Article, "content" | "updated">;
