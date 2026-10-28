export type SpeakingTopic = {
  title: string;
  description: string;
};

export type SpeakingAppearance = {
  title: string;
  event: string;
  year: string;
  kind: "Talk" | "Workshop" | "Podcast" | "Interview" | "Teaching";
  href?: string;
  image?: string;
  imageAlt?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const speakingIntro = {
  title: "Speaking, teaching, and interviews.",
  lede: "I work with churches, conferences, and ministry networks that want a practitioner's view of communications, creative leadership, and the systems behind both.",
  paragraphs: [
    "The conversations are usually with people who do the work: church communicators, creative teams, and the leaders who depend on them. The usual formats are a talk, a workshop, a staff teaching time, or a podcast conversation.",
    "I have spent more than 20 years in local church ministry, including creative direction at Doxology Bible Church in Fort Worth and about a decade at Compass Christian Church in Colleyville. I also co-founded Communicate, a communications planning platform for churches.",
  ],
};

/**
 * Edit these freely. They are proposed topics, not a record of past events.
 * Do not add conferences, dates, or endorsements here unless they are real.
 */
export const speakingTopics: SpeakingTopic[] = [
  {
    title: "Building a Church Communications Strategy",
    description:
      "What a communications strategy is for, who it serves, and how it connects to the life of a church. The aim is clarity, priorities, and follow-through.",
  },
  {
    title: "Leading Creative Teams Without Becoming the Bottleneck",
    description:
      "How a creative leader can raise the quality of the work without holding every decision. Roles, review, trust, and the habits that keep a team moving when you are not in the room.",
  },
  {
    title: "Why Church Communications Needs Better Systems, Not Just Better Content",
    description:
      "The planning, ownership, and workflow problems underneath inconsistent communication, and what a team can build to address them.",
  },
  {
    title: "AI, Creativity, and the Future of Church Communications",
    description:
      "Where AI is genuinely useful in a communications workflow, where it gets in the way, and how a team can use it without handing over its judgment.",
  },
  {
    title: "From Ministry Problem to Software Product: Building Tools for the Church",
    description:
      "What it looks like to take a recurring ministry frustration and turn it into a product other churches can use, drawn from co-founding Communicate.",
  },
];

export const shortBio =
  "Cameron Sanderson is Creative Director at Doxology Bible Church in Fort Worth and co-founder of Communicate, a communications planning platform for churches. He has spent more than 20 years in local church ministry, including about a decade at Compass Christian Church in Colleyville. His work brings together creative direction, communications strategy, team leadership, and building practical tools for the Church.";

export const longBio = `Cameron Sanderson has spent more than 20 years inside the local church, working in communications, creative leadership, production, and storytelling. He serves as Creative Director at Doxology Bible Church in Fort Worth, where he leads creative direction, worship, communications, production, and the teams around that work. Before that, he spent about a decade at Compass Christian Church in Colleyville.

He co-founded Communicate, a communications planning platform for churches, out of problems he encountered while doing the work himself. He speaks and teaches on church communications, creative leadership, the systems behind a healthy team, and what it looks like to build useful tools for ministry.

He is based in Fort Worth, Texas.`;

export const formats = [
  "A talk or conference session",
  "A workshop with a team",
  "Teaching for a church staff",
  "A podcast or interview",
];

export const inquiryNotes = [
  "The event, church, podcast, or team",
  "Who will be in the room",
  "The date and the city, if it is in person",
  "Whether you have a talk, a workshop, or an interview in mind",
  "When you need an answer",
];

/** Add real appearances only. An empty list hides the archive grid. */
export const appearances: SpeakingAppearance[] = [];

/** Add real testimonials only. An empty list hides the section. */
export const testimonials: Testimonial[] = [];
