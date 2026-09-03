import type { ReactNode } from "react";
import { XIcon } from "../../icons";

interface EntryCardProps {
  onRemove: () => void;
  children: ReactNode;
}

export default function EntryCard({ onRemove, children }: EntryCardProps) {
  return (
    <div className="relative border border-border rounded-md p-3 bg-surface">
      <button
        type="button"
        onClick={onRemove}
        title="Remove"
        className="absolute top-2 right-2 p-1 rounded-md text-ink-faint hover:text-accent-strong hover:bg-surface-muted transition-colors"
      >
        <XIcon className="w-3.5 h-3.5" />
      </button>
      <div className="flex flex-col gap-2 pr-6">{children}</div>
    </div>
  );
}
