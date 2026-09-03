import { useState } from "react";
import { fieldClass } from "../../../styles/formStyles";
import { XIcon } from "../../icons";

interface SkillsEditorProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  const [draft, setDraft] = useState("");

  const addSkill = () => {
    const value = draft.trim();
    if (value && !skills.includes(value)) {
      onChange([...skills, value]);
    }
    setDraft("");
  };

  const removeSkill = (skill: string) => onChange(skills.filter((s) => s !== skill));

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Skills</h3>

      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-surface-muted text-ink-muted border border-border"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              title="Remove skill"
              className="text-ink-faint hover:text-accent-strong transition-colors"
            >
              <XIcon className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="Add a skill and press Enter"
          className={fieldClass}
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-3 py-2 text-xs font-medium rounded-md border border-border text-ink hover:bg-surface-muted transition-colors shrink-0"
        >
          Add
        </button>
      </div>
    </section>
  );
}
