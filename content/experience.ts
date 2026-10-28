export type ExperienceItem = {
  period: string;
  organization: string;
  location: string;
  role: string;
  summary: string;
  href?: string;
};

export const experience: ExperienceItem[] = [
  {
    period: "About a decade",
    organization: "Compass Christian Church",
    location: "Colleyville, Texas",
    role: "Worship, then creative",
    summary:
      "I was there for about a decade, leading worship before I moved into creative work in the same church.",
    href: "/work/compass",
  },
  {
    period: "Present",
    organization: "Doxology Bible Church",
    location: "Fort Worth, Texas",
    role: "Creative Director",
    summary:
      "I lead creative direction, worship, communications, production, and the teams and initiatives around that work.",
    href: "/work/doxology",
  },
  {
    period: "Alongside the ministry",
    organization: "Communicate",
    location: "",
    role: "Co-founder",
    summary:
      "I co-founded a communications planning platform for churches from planning problems in the work itself.",
    href: "/work/communicate",
  },
];
