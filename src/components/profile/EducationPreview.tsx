import type { EducationEntry } from "../../types";
import SectionShell from "./SectionShell";

interface EducationPreviewProps {
  entries: EducationEntry[];
}

export default function EducationPreview({ entries }: EducationPreviewProps) {
  return (
    <SectionShell title="Education" isEmpty={entries.length === 0}>
      {entries.map((entry) => (
        <div key={entry.id} className="flex items-baseline justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-ink">{entry.school}</p>
            <p className="text-xs text-ink-muted">{entry.degree}</p>
          </div>
          <p className="text-[11px] text-ink-faint whitespace-nowrap">{entry.year}</p>
        </div>
      ))}
    </SectionShell>
  );
}
