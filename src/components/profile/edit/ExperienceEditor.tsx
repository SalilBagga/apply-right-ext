import type { WorkExperienceEntry } from "../../../types";
import { fieldClass, fieldLabelClass } from "../../../styles/formStyles";
import { makeId } from "../../../utils/id";
import { PlusIcon, XIcon } from "../../icons";
import EditSectionShell from "./EditSectionShell";
import EntryCard from "./EntryCard";

interface ExperienceEditorProps {
  entries: WorkExperienceEntry[];
  onChange: (entries: WorkExperienceEntry[]) => void;
}

function emptyEntry(): WorkExperienceEntry {
  return {
    id: makeId("exp"),
    company: "",
    title: "",
    startDate: "",
    endDate: "",
    bullets: [""],
    description: "",
  };
}

export default function ExperienceEditor({ entries, onChange }: ExperienceEditorProps) {
  const updateEntry = (id: string, patch: Partial<WorkExperienceEntry>) => {
    onChange(entries.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const removeEntry = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const addEntry = () => onChange([...entries, emptyEntry()]);

  const updateBullet = (id: string, index: number, value: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    updateEntry(id, { bullets: entry.bullets.map((b, i) => (i === index ? value : b)) });
  };

  const addBullet = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    updateEntry(id, { bullets: [...entry.bullets, ""] });
  };

  const removeBullet = (id: string, index: number) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;
    updateEntry(id, { bullets: entry.bullets.filter((_, i) => i !== index) });
  };

  return (
    <EditSectionShell
      title="Work Experience"
      addLabel="Add Experience"
      onAdd={addEntry}
      isEmpty={entries.length === 0}
    >
      {entries.map((entry) => (
        <EntryCard key={entry.id} onRemove={() => removeEntry(entry.id)}>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={entry.company}
              onChange={(e) => updateEntry(entry.id, { company: e.target.value })}
              placeholder="Company"
              className={fieldClass}
            />
            <input
              value={entry.title}
              onChange={(e) => updateEntry(entry.id, { title: e.target.value })}
              placeholder="Title"
              className={fieldClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={entry.startDate}
              onChange={(e) => updateEntry(entry.id, { startDate: e.target.value })}
              placeholder="Start date"
              className={fieldClass}
            />
            <input
              value={entry.endDate}
              onChange={(e) => updateEntry(entry.id, { endDate: e.target.value })}
              placeholder="End date"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className={fieldLabelClass}>Bullet points</span>
            {entry.bullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <input
                  value={bullet}
                  onChange={(e) => updateBullet(entry.id, index, e.target.value)}
                  placeholder="Key achievement or responsibility"
                  className={fieldClass}
                />
                <button
                  type="button"
                  onClick={() => removeBullet(entry.id, index)}
                  title="Remove bullet"
                  className="p-1.5 rounded-md text-ink-faint hover:text-accent-strong hover:bg-surface-muted transition-colors"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addBullet(entry.id)}
              className="flex items-center gap-1 text-xs font-medium text-accent-strong hover:text-accent-strong-hover transition-colors self-start mt-0.5"
            >
              <PlusIcon className="w-3 h-3" />
              Add bullet
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className={fieldLabelClass}>Description</span>
            <textarea
              value={entry.description}
              onChange={(e) => updateEntry(entry.id, { description: e.target.value })}
              placeholder="Narrative description of this role…"
              rows={3}
              className={`${fieldClass} resize-none`}
            />
          </div>
        </EntryCard>
      ))}
    </EditSectionShell>
  );
}
