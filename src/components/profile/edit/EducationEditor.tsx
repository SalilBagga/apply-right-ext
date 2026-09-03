import type { EducationEntry } from "../../../types";
import { fieldClass } from "../../../styles/formStyles";
import { makeId } from "../../../utils/id";
import EditSectionShell from "./EditSectionShell";
import EntryCard from "./EntryCard";

interface EducationEditorProps {
  entries: EducationEntry[];
  onChange: (entries: EducationEntry[]) => void;
}

function emptyEntry(): EducationEntry {
  return { id: makeId("edu"), school: "", degree: "", year: "" };
}

export default function EducationEditor({ entries, onChange }: EducationEditorProps) {
  const updateEntry = (id: string, patch: Partial<EducationEntry>) => {
    onChange(entries.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };
  const removeEntry = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const addEntry = () => onChange([...entries, emptyEntry()]);

  return (
    <EditSectionShell
      title="Education"
      addLabel="Add Education"
      onAdd={addEntry}
      isEmpty={entries.length === 0}
    >
      {entries.map((entry) => (
        <EntryCard key={entry.id} onRemove={() => removeEntry(entry.id)}>
          <input
            value={entry.school}
            onChange={(e) => updateEntry(entry.id, { school: e.target.value })}
            placeholder="School"
            className={fieldClass}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={entry.degree}
              onChange={(e) => updateEntry(entry.id, { degree: e.target.value })}
              placeholder="Degree"
              className={fieldClass}
            />
            <input
              value={entry.year}
              onChange={(e) => updateEntry(entry.id, { year: e.target.value })}
              placeholder="Year"
              className={fieldClass}
            />
          </div>
        </EntryCard>
      ))}
    </EditSectionShell>
  );
}
