import type { WorkExperienceEntry } from "../../types";
import SectionShell from "./SectionShell";

interface ExperiencePreviewProps {
  entries: WorkExperienceEntry[];
}

export default function ExperiencePreview({ entries }: ExperiencePreviewProps) {
  return (
    <SectionShell title="Work Experience" isEmpty={entries.length === 0}>
      {entries.map((entry) => (
        <div key={entry.id} className="border-l-2 border-accent/50 pl-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-ink">{entry.title}</p>
            <p className="text-[11px] text-ink-faint whitespace-nowrap">
              {entry.startDate} – {entry.endDate}
            </p>
          </div>
          <p className="text-xs text-ink-muted">{entry.company}</p>
          {entry.bullets[0] && (
            <p className="text-xs text-ink-muted mt-1.5 truncate">• {entry.bullets[0]}</p>
          )}
        </div>
      ))}
    </SectionShell>
  );
}
