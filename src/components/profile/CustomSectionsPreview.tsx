import type { CustomSection } from "../../types";
import SectionShell from "./SectionShell";

interface CustomSectionsPreviewProps {
  sections: CustomSection[];
}

const PREVIEW_LENGTH = 100;

export default function CustomSectionsPreview({ sections }: CustomSectionsPreviewProps) {
  return (
    <SectionShell title="Additional Sections" isEmpty={sections.length === 0}>
      {sections.map((section) => {
        const trimmed = section.content.trim();
        const truncated =
          trimmed.length > PREVIEW_LENGTH ? `${trimmed.slice(0, PREVIEW_LENGTH).trim()}…` : trimmed;
        return (
          <div key={section.id}>
            <p className="text-sm font-semibold text-ink">{section.title}</p>
            <p className="text-xs text-ink-muted mt-0.5">{truncated}</p>
          </div>
        );
      })}
    </SectionShell>
  );
}
