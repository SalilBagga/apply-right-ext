import type { TabKey } from "../types";

const TABS: { key: TabKey; label: string }[] = [
  { key: "generate", label: "Generate" },
  { key: "history", label: "Job History" },
  { key: "profile", label: "Profile" },
];

interface NavTabsProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export default function NavTabs({ active, onChange }: NavTabsProps) {
  return (
    <nav className="flex gap-5 px-5 bg-surface border-b border-border/50">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={[
              "relative py-3 text-sm transition-colors",
              isActive ? "text-ink font-medium" : "text-ink-muted font-normal hover:text-ink",
            ].join(" ")}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
