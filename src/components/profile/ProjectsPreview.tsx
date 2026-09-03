import type { ProjectEntry } from "../../types";
import SectionShell from "./SectionShell";

interface ProjectsPreviewProps {
  entries: ProjectEntry[];
}

export default function ProjectsPreview({ entries }: ProjectsPreviewProps) {
  return (
    <SectionShell title="Projects" isEmpty={entries.length === 0}>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p className="text-sm font-semibold text-ink">{entry.name}</p>
          <p className="text-xs text-ink-muted mt-0.5 truncate">{entry.description}</p>
        </div>
      ))}
    </SectionShell>
  );
}
