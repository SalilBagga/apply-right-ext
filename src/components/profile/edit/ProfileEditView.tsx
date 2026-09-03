import { useState } from "react";
import type { Profile } from "../../../types";
import ContactFieldsEditor from "./ContactFieldsEditor";
import ExperienceEditor from "./ExperienceEditor";
import ProjectsEditor from "./ProjectsEditor";
import EducationEditor from "./EducationEditor";
import SkillsEditor from "./SkillsEditor";
import CustomSectionsEditor from "./CustomSectionsEditor";

interface ProfileEditViewProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}

// Dedicated full-screen editor (replaces the tab bar while open) rather than
// a modal — a modal has little room to work with at popup width. Draft state
// here is local and thrown away on Cancel; Save lifts it back to Popup's
// in-memory profile state. Nothing is written to storage.
export default function ProfileEditView({ profile, onSave, onCancel }: ProfileEditViewProps) {
  const [draft, setDraft] = useState<Profile>(profile);

  const patchContact = (patch: Partial<Profile>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div className="flex flex-col bg-bg">
      <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-surface border-b border-border/50">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-ink-muted hover:text-ink transition-colors"
        >
          Cancel
        </button>
        <h2 className="text-sm font-medium tracking-tight text-ink">Edit Profile</h2>
        <button
          type="button"
          onClick={() => onSave(draft)}
          className="text-sm font-semibold text-accent-strong hover:text-accent-strong-hover transition-colors"
        >
          Save
        </button>
      </header>

      <main className="px-5 py-5 flex flex-col gap-6">
        <ContactFieldsEditor profile={draft} onChange={patchContact} />
        <ExperienceEditor
          entries={draft.experience}
          onChange={(experience) => setDraft((d) => ({ ...d, experience }))}
        />
        <ProjectsEditor
          entries={draft.projects}
          onChange={(projects) => setDraft((d) => ({ ...d, projects }))}
        />
        <EducationEditor
          entries={draft.education}
          onChange={(education) => setDraft((d) => ({ ...d, education }))}
        />
        <SkillsEditor skills={draft.skills} onChange={(skills) => setDraft((d) => ({ ...d, skills }))} />
        <CustomSectionsEditor
          sections={draft.customSections}
          onChange={(customSections) => setDraft((d) => ({ ...d, customSections }))}
        />
      </main>
    </div>
  );
}
