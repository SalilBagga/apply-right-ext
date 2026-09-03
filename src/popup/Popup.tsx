import { useState } from "react";
import NavTabs from "../components/NavTabs";
import JobCaptureForm from "../components/JobCaptureForm";
import GenerationResult from "../components/GenerationResult";
import JobsTable from "../components/JobsTable";
import ProfileOverview from "../components/profile/ProfileOverview";
import ProfileEditView from "../components/profile/edit/ProfileEditView";
import { mockJobHistory, mockProfile } from "../data/mockData";
import type { GenerationKind, GenerationStatus, Profile, TabKey } from "../types";

// NOTE: This pass is visual/structural only. Job-posting text, generation
// status, and the profile draft are plain ephemeral React state — nothing
// is persisted (no chrome.storage, no API, no file I/O), and everything
// resets the next time the popup opens. Clicking a "Generate" button fakes
// a brief loading state purely so the result placeholder shape has
// something to trigger it; Save on the profile editor just lifts the draft
// back into this component's state, same idea as the tab switcher.

export default function Popup() {
  const [activeTab, setActiveTab] = useState<TabKey>("generate");

  const [jobPostingText, setJobPostingText] = useState("");

  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>("idle");
  const [generationKind, setGenerationKind] = useState<GenerationKind>("resume");

  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleGenerate = (kind: GenerationKind) => {
    console.log(`Stub: generate ${kind}`, { jobPostingText });
    setGenerationKind(kind);
    setGenerationStatus("loading");
    // Fake delay so the loading -> result shape is visible. No real work happens here.
    window.setTimeout(() => setGenerationStatus("result"), 1100);
  };

  if (isEditingProfile) {
    return (
      <ProfileEditView
        profile={profile}
        onSave={(next) => {
          setProfile(next);
          setIsEditingProfile(false);
        }}
        onCancel={() => setIsEditingProfile(false)}
      />
    );
  }

  return (
    <div className="flex flex-col bg-bg">
      <header className="px-5 pt-6 pb-4 bg-surface">
        <p className="text-[15px] font-medium tracking-tight text-ink">
          Apply <span className="text-accent">Right</span>
        </p>
        <p className="text-xs text-ink-muted tracking-wide mt-1.5">
          Your job application assistant
        </p>
      </header>

      <NavTabs active={activeTab} onChange={setActiveTab} />

      <main className="px-5 py-4 flex flex-col gap-4">
        {activeTab === "generate" && (
          <>
            <JobCaptureForm
              jobPostingText={jobPostingText}
              onJobPostingTextChange={setJobPostingText}
              onGenerateResume={() => handleGenerate("resume")}
              onGenerateCoverLetter={() => handleGenerate("coverLetter")}
            />
            {generationStatus !== "idle" && (
              <GenerationResult status={generationStatus} kind={generationKind} />
            )}
          </>
        )}

        {activeTab === "history" && <JobsTable entries={mockJobHistory} />}

        {activeTab === "profile" && (
          <ProfileOverview profile={profile} onEdit={() => setIsEditingProfile(true)} />
        )}
      </main>
    </div>
  );
}
