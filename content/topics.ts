import type { WritingCategory } from "@/lib/types";

export type ForthcomingTopic = {
  title: string;
  description: string;
  category: WritingCategory;
};

/**
 * Subjects being written. These are not articles.
 * They appear only while nothing with the same title is published.
 * Remove a topic after the real essay is published, or leave it —
 * a matching published title is hidden automatically.
 */
export function topicsStillOpen(publishedTitles: string[]) {
  const published = new Set(publishedTitles.map((title) => title.trim().toLowerCase()));
  return forthcomingTopics.filter((topic) => !published.has(topic.title.trim().toLowerCase()));
}

export const forthcomingTopics: ForthcomingTopic[] = [
  {
    title: "Church Communications Is a Leadership Problem Before It's a Design Problem",
    description:
      "The work usually stalls on ownership, priorities, and decisions long before it stalls on a layout.",
    category: "Church Communications",
  },
  {
    title: "Why More Content Isn't Always Better Communication",
    description:
      "A church can publish a great deal and still be hard to follow. Clarity is the more useful goal.",
    category: "Church Communications",
  },
  {
    title: "Building Systems That Make Creative Teams Better",
    description:
      "A team gets better when the path of the work is clear enough that people are not waiting on one person.",
    category: "Creative Leadership",
  },
  {
    title: "What Two Decades in Church Ministry Have Taught Me About Communication",
    description:
      "A longer view of what holds up after the novelty of a campaign wears off.",
    category: "Behind the Work",
  },
  {
    title: "Building Software to Solve Problems I Experienced in Ministry",
    description:
      "Why Communicate exists, and what it has meant to turn a ministry frustration into a product.",
    category: "Building & Innovation",
  },
  {
    title: "Where AI Helps Church Communications",
    description:
      "A practical line between useful assistance and the judgment a team still has to own.",
    category: "Building & Innovation",
  },
];
