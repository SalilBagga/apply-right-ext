import type { CustomSection } from "../../../types";
import { fieldClass } from "../../../styles/formStyles";
import { makeId } from "../../../utils/id";
import EditSectionShell from "./EditSectionShell";
import EntryCard from "./EntryCard";

interface CustomSectionsEditorProps {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
}

function emptySection(): CustomSection {
  return { id: makeId("section"), title: "", content: "" };
}

export default function CustomSectionsEditor({ sections, onChange }: CustomSectionsEditorProps) {
  const updateSection = (id: string, patch: Partial<CustomSection>) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };
  const removeSection = (id: string) => onChange(sections.filter((s) => s.id !== id));
  const addSection = () => onChange([...sections, emptySection()]);

  return (
    <EditSectionShell
      title="Custom Sections"
      addLabel="Add Section"
      onAdd={addSection}
      isEmpty={sections.length === 0}
      emptyLabel="No custom sections yet — add one for certifications, publications, volunteer work, etc."
    >
      {sections.map((section) => (
        <EntryCard key={section.id} onRemove={() => removeSection(section.id)}>
          <input
            value={section.title}
            onChange={(e) => updateSection(section.id, { title: e.target.value })}
            placeholder="Section title (e.g. Certifications)"
            className={`${fieldClass} font-medium`}
          />
          <textarea
            value={section.content}
            onChange={(e) => updateSection(section.id, { content: e.target.value })}
            placeholder="Free-text content for this section…"
            rows={3}
            className={`${fieldClass} resize-none`}
          />
        </EntryCard>
      ))}
    </EditSectionShell>
  );
}
