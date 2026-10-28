import type { ForthcomingTopic } from "@/content/topics";

export function TopicList({ topics }: { topics: ForthcomingTopic[] }) {
  return (
    <ol className="border-t border-line">
      {topics.map((topic) => (
        <li key={topic.title} className="border-b border-line py-8 sm:py-10">
          <p className="kicker">{topic.category}</p>
          <h3 className="mt-3 max-w-3xl font-serif text-2xl leading-tight tracking-tight sm:text-[1.85rem]">
            {topic.title}
          </h3>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{topic.description}</p>
        </li>
      ))}
    </ol>
  );
}
