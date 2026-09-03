import type { Profile } from "../../../types";
import { fieldClass, fieldLabelClass } from "../../../styles/formStyles";

type ContactField = "name" | "email" | "phone" | "portfolio" | "linkedin" | "github";

interface ContactFieldsEditorProps {
  profile: Profile;
  onChange: (patch: Partial<Profile>) => void;
}

const FIELDS: { key: ContactField; label: string; placeholder: string }[] = [
  { key: "name", label: "Name", placeholder: "Full name" },
  { key: "email", label: "Email", placeholder: "you@example.com" },
  { key: "phone", label: "Phone", placeholder: "(555) 555-5555" },
  { key: "portfolio", label: "Portfolio", placeholder: "yoursite.dev" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/you" },
  { key: "github", label: "GitHub", placeholder: "github.com/you" },
];

export default function ContactFieldsEditor({ profile, onChange }: ContactFieldsEditorProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Contact Info</h3>
      {FIELDS.map((field) => (
        <div key={field.key} className="flex flex-col gap-1.5">
          <label htmlFor={`contact-${field.key}`} className={fieldLabelClass}>
            {field.label}
          </label>
          <input
            id={`contact-${field.key}`}
            value={profile[field.key]}
            onChange={(e) => onChange({ [field.key]: e.target.value })}
            placeholder={field.placeholder}
            className={fieldClass}
          />
        </div>
      ))}
    </section>
  );
}
