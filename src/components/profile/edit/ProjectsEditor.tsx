import type { ProjectEntry } from "../../../types";
import { fieldClass, fieldLabelClass } from "../../../styles/formStyles";
import { makeId } from "../../../utils/id";
import EditSectionShell from "./EditSectionShell";
import EntryCard from "./EntryCard";

interface ProjectsEditorProps {
  entries: ProjectEntry[];
  onChange: (entries: ProjectEntry[]) => void;
}

function emptyEntry(): ProjectEntry {
  return { id: makeId("proj"), name: "", description: "", narrative: "" };
}

export default function ProjectsEditor({ entries, onChange }: ProjectsEditorProps) {
  const updateEntry = (id: string, patch: Partial<ProjectEntry>) => {
    onChange(entries.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };
  const removeEntry = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const addEntry = () => onChange([...entries, emptyEntry()]);

  return (
    <EditSectionShell
      title="Projects"
      addLabel="Add Project"
      onAdd={addEntry}
      isEmpty={entries.length === 0}
    >
      {entries.map((entry) => (
        <EntryCard key={entry.id} onRemove={() => removeEntry(entry.id)}>
          <input
            value={entry.name}
            onChange={(e) => updateEntry(entry.id, { name: e.target.value })}
            placeholder="Project name"
            className={fieldClass}
          />
          <div className="flex flex-col gap-1.5">
            <span className={fieldLabelClass}>Short description</span>
            <input
              value={entry.description}
              onChange={(e) => updateEntry(entry.id, { description: e.target.value })}
              placeholder="One-line summary"
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={fieldLabelClass}>Narrative</span>
            <textarea
              value={entry.narrative}
              onChange={(e) => updateEntry(entry.id, { narrative: e.target.value })}
              placeholder="What did you build, and what was the impact?"
              rows={3}
              className={`${fieldClass} resize-none`}
            />
          </div>
        </EntryCard>
      ))}
    </EditSectionShell>
  );
}
