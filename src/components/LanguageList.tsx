import { useState } from "react";

const MAX_VISIBLE = 30;

interface Props {
  title: string;
  languages: string[];
}

export default function LanguageList({ title, languages }: Props) {
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState(false);

  const filtered = filter
    ? languages.filter((l) => l.toLowerCase().includes(filter.toLowerCase()))
    : languages;

  const isSearching = filter.length > 0;
  const needsTruncation = !isSearching && !expanded && filtered.length > MAX_VISIBLE;
  const visible = needsTruncation ? filtered.slice(0, MAX_VISIBLE) : filtered;
  const remaining = filtered.length - MAX_VISIBLE;

  return (
    <div className="not-prose my-4 rounded-xl border border-handy-text/8 bg-handy-text/[0.02] p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-handy-text">{title}</span>
        <input
          type="text"
          placeholder={`Search ${languages.length} languages...`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-[180px] text-xs px-2.5 py-1.5 rounded-md border border-handy-text/15 bg-handy-text/[0.03] text-handy-text placeholder:text-handy-text/35 outline-none focus:border-handy-pink/50"
        />
      </div>
      <div className="flex flex-wrap gap-1.5 items-center">
        {visible.map((lang) => (
          <span
            key={lang}
            className="text-xs px-2 py-0.5 rounded-full bg-handy-text/[0.06] text-handy-text/70"
          >
            {lang}
          </span>
        ))}
        {needsTruncation && (
          <button
            onClick={() => setExpanded(true)}
            className="text-xs px-2 py-0.5 rounded-full bg-handy-pink/20 text-handy-text/60 hover:text-handy-pink cursor-pointer border-none"
          >
            +{remaining} more
          </button>
        )}
        {filtered.length === 0 && (
          <span className="text-xs text-handy-text/40">No matching languages</span>
        )}
      </div>
    </div>
  );
}
