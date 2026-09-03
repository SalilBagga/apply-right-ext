import type { JobHistoryEntry } from "../types";
import { DownloadIcon, ExternalLinkIcon } from "./icons";

interface JobsTableProps {
  entries: JobHistoryEntry[];
}

const cellClass = "px-2.5 py-2.5";
const truncateClass = "truncate";

export default function JobsTable({ entries }: JobsTableProps) {
  return (
    <section className="bg-surface border border-border rounded-lg shadow-soft overflow-hidden">
      {/* table-fixed + colgroup widths + truncate keeps every column inside
          the popup width so we never fall back to a horizontal scrollbar. */}
      <table className="w-full table-fixed text-sm border-collapse">
        <colgroup>
          <col className="w-[23%]" />
          <col className="w-[23%]" />
          <col className="w-[11%]" />
          <col className="w-[16%]" />
          <col className="w-[27%]" />
        </colgroup>
        <thead>
          <tr className="bg-surface-muted text-left">
            <th className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              Company
            </th>
            <th className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              Job Title
            </th>
            <th className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              Link
            </th>
            <th className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              Date
            </th>
            <th className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr
              key={entry.id}
              className={`border-t border-border ${i % 2 === 1 ? "bg-surface-muted/40" : ""}`}
            >
              <td className={`${cellClass} ${truncateClass} text-ink font-medium`} title={entry.company}>
                {entry.company}
              </td>
              <td className={`${cellClass} ${truncateClass} text-ink-muted`} title={entry.jobTitle}>
                {entry.jobTitle}
              </td>
              <td className={cellClass}>
                <button
                  type="button"
                  title={entry.link}
                  onClick={() => console.log("Stub: open job link", entry.link)}
                  className="text-ink-muted hover:text-accent-strong transition-colors"
                >
                  <ExternalLinkIcon />
                </button>
              </td>
              <td className={`${cellClass} ${truncateClass} text-ink-muted`} title={entry.dateApplied}>
                {entry.dateApplied}
              </td>
              <td className={cellClass}>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    title="Download Resume"
                    onClick={() => console.log("Stub: download resume", entry.id)}
                    className="p-1.5 rounded-md border border-border text-ink-muted hover:text-accent-strong hover:bg-surface-muted transition-colors"
                  >
                    <DownloadIcon />
                  </button>
                  <button
                    type="button"
                    title="Download Cover Letter"
                    onClick={() => console.log("Stub: download cover letter", entry.id)}
                    className="p-1.5 rounded-md border border-border text-ink-muted hover:text-accent-strong hover:bg-surface-muted transition-colors"
                  >
                    <DownloadIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
