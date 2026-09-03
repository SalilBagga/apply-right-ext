import type { ReactNode } from "react";
import { PlusIcon } from "../../icons";

interface EditSectionShellProps {
  title: string;
  addLabel: string;
  onAdd: () => void;
  children: ReactNode;
  isEmpty?: boolean;
  emptyLabel?: string;
}

export default function EditSectionShell({
  title,
  addLabel,
  onAdd,
  children,
  isEmpty,
  emptyLabel = "Nothing added yet.",
}: EditSectionShellProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-xs font-medium text-accent-strong hover:text-accent-strong-hover transition-colors"
        >
          <PlusIcon className="w-3 h-3" />
          {addLabel}
        </button>
      </div>
      {isEmpty ? (
        <p className="text-xs text-ink-faint">{emptyLabel}</p>
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}
    </section>
  );
}
