/**
 * Site-wide settings. This is the file to edit for contact, links, and the portrait.
 *
 * The email below was carried from the original starter page. Confirm the mailbox
 * before you rely on it. Leave socialLinks empty until you have real profiles.
 * The portrait is a real photograph. Do not replace it with a stock image.
 */
export const site = {
  name: "Cameron Sanderson",
  url: "https://cameronsanderson.com",
  description:
    "Cameron Sanderson is a creative director, church communications practitioner, and co-founder of Communicate, based in Fort Worth.",
  email: "hello@cameronsanderson.com",
  location: "Fort Worth, Texas",
  /** Served from public/images. The supplied photo was already 737×1024, so it is not upscaled. */
  portrait: "/images/cameron-sanderson.webp",
  portraitAlt:
    "Cameron Sanderson, bald with a red beard and glasses, wearing a black sweater and khaki pants, standing with his hands in his pockets in front of bookshelves.",
  /**
   * Optional personal note for the About page. Leave empty until you want it public.
   * A few honest sentences is enough. Skip anything you would not say to a colleague.
   */
  personalNote: "",
  /**
   * Optional interests for the About page. Stays off the public page until this
   * contains real sentences. Do not leave placeholder copy here.
   */
  interests: "",
};

export const navigation = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/speaking", label: "Speaking" },
  { href: "/contact", label: "Contact" },
] as const;

export const socialLinks: { label: string; href: string }[] = [
  // { label: "Instagram", href: "https://instagram.com/your-handle" },
];
