import SectionShell from "./SectionShell";

interface SkillsPreviewProps {
  skills: string[];
}

export default function SkillsPreview({ skills }: SkillsPreviewProps) {
  return (
    <SectionShell title="Skills" isEmpty={skills.length === 0}>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs rounded-full bg-surface-muted text-ink-muted border border-border"
          >
            {skill}
          </span>
        ))}
      </div>
    </SectionShell>
  );
}
