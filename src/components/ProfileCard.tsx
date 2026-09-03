import type { Profile } from "../types";

interface ProfileCardProps {
  profile: Profile;
  onEdit: () => void;
}

type ContactField = "name" | "email" | "phone" | "portfolio" | "linkedin" | "github";

const FIELDS: { key: ContactField; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "portfolio", label: "Portfolio" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "github", label: "GitHub" },
];

export default function ProfileCard({ profile, onEdit }: ProfileCardProps) {
  return (
    <section className="bg-surface border border-border rounded-lg shadow-soft p-5">
      <header className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-semibold text-ink">{profile.name}</h2>
          <p className="text-xs text-ink-muted mt-0.5">Your applicant profile</p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md border border-border text-ink hover:bg-surface-muted transition-colors"
        >
          Edit Profile
        </button>
      </header>

      <dl className="divide-y divide-border">
        {FIELDS.filter((f) => f.key !== "name").map((field) => (
          <div key={field.key} className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-xs font-medium text-ink-muted">{field.label}</dt>
            <dd className="text-sm text-ink text-right truncate">{profile[field.key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
