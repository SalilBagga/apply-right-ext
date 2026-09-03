import type { ReactNode } from "react";

interface SectionShellProps {
  title: string;
  children: ReactNode;
  isEmpty?: boolean;
}

export default function SectionShell({ title, children, isEmpty }: SectionShellProps) {
  return (
    <section className="bg-surface border border-border rounded-lg shadow-soft p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-3">{title}</h3>
      {isEmpty ? (
        <p className="text-sm text-ink-faint">Nothing added yet.</p>
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}
    </section>
  );
}
