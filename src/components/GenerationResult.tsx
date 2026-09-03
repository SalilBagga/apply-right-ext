import type { GenerationKind, GenerationStatus } from "../types";
import { SpinnerIcon } from "./icons";

interface GenerationResultProps {
  status: Exclude<GenerationStatus, "idle">;
  kind: GenerationKind;
}

const KIND_LABEL: Record<GenerationKind, string> = {
  resume: "resume",
  coverLetter: "cover letter",
};

const KIND_TITLE: Record<GenerationKind, string> = {
  resume: "Resume Draft",
  coverLetter: "Cover Letter Draft",
};

export default function GenerationResult({ status, kind }: GenerationResultProps) {
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2.5 bg-surface border border-border rounded-lg shadow-soft px-4 py-4 text-accent-strong">
        <SpinnerIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Generating {KIND_LABEL[kind]}…</span>
      </div>
    );
  }

  // status === "result" — placeholder shape only, no real generated content yet.
  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-ink">{KIND_TITLE[kind]}</h3>
        <span className="text-[11px] font-medium text-accent-strong bg-accent-subtle px-2 py-0.5 rounded-full">
          Preview
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-4/5 rounded bg-surface-muted" />
        <div className="h-3 w-full rounded bg-surface-muted" />
        <div className="h-3 w-11/12 rounded bg-surface-muted" />
        <div className="h-3 w-3/5 rounded bg-surface-muted" />
        <div className="h-3 w-full rounded bg-surface-muted mt-2" />
        <div className="h-3 w-2/3 rounded bg-surface-muted" />
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={() => console.log("Stub: copy to clipboard")}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-border text-ink hover:bg-surface-muted transition-colors"
        >
          Copy to Clipboard
        </button>
        <button
          type="button"
          onClick={() => console.log("Stub: regenerate")}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-border text-ink hover:bg-surface-muted transition-colors"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}
