interface JobPreviewCardProps {
  rawText: string;
}

const PREVIEW_LENGTH = 180;

export default function JobPreviewCard({ rawText }: JobPreviewCardProps) {
  const trimmed = rawText.trim();
  const truncated =
    trimmed.length > PREVIEW_LENGTH ? `${trimmed.slice(0, PREVIEW_LENGTH).trim()}…` : trimmed;

  return (
    <div className="bg-accent-subtle border border-accent/40 rounded-md px-3.5 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-accent-strong mb-1">
        Ready to generate against
      </p>
      <p className="text-xs text-ink-muted leading-relaxed whitespace-pre-wrap">{truncated}</p>
    </div>
  );
}
