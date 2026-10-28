# Editing the site

The pages are built. You add work and writing by editing files, then redeploying.

## Projects

Add a case study by copying `content/projects/_template.mdx`.

- Remove the leading underscore from the filename. `_` files are ignored.
- The filename is the URL. `easter-campaign.mdx` becomes `/work/easter-campaign`.
- Set `published: true` when it should appear on the site.
- Set `featured: true` to show it in the selected work on the homepage.
- `order` controls the sequence on the work index. Lower numbers come first.
- `category` must be one of: Creative Direction, Communications & Strategy, Campaigns & Storytelling, Products & Tools, Leadership & Systems.
- `tone` is `ink`, `paper`, or `olive`. It colors the frame until a photograph is added.
- Put images in `public/images/projects/` and set `image` to a path like `/images/projects/name.jpg`. If you set `image`, also set `imageAlt`.
- Do not invent metrics, awards, or outcomes.

In the body, `Figure` places an image and `PullQuote` sets a sentence apart. Leave `src` off a Figure to show an empty frame.

## Writing

Copy `content/writing/_template.mdx` the same way.

- `date` is `YYYY-MM-DD`.
- `category` must be one of: Church Communications, Creative Leadership, Building & Innovation, Behind the Work.
- Set `featured: true` on the piece that should lead the writing index.
- Reading time is calculated for you.
- `content/topics.ts` lists subjects that are not articles yet. They leave the public page once a published essay uses the same title. Delete a topic when you no longer want it mentioned.

Nothing in `topics.ts` is presented as a finished essay.

## Speaking, experience, and contact

- Topics, bios, and the inquiry checklist: `content/speaking.ts`
- Add appearances or testimonials only when they are real. Empty lists stay off the page.
- Timeline: `content/experience.ts`
- Email, social links, portrait, and an optional personal note: `content/site.ts`

The email currently set is `hello@cameronsanderson.com`, carried from the original starter. Change it if that mailbox is wrong.

The portrait is `public/images/cameron-sanderson.webp`, referenced from `site.portrait`. It appears on the homepage, the About page, and the Speaking page.

Social links stay hidden until you add them.

## Local preview

From the project folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` checks that the site compiles.
