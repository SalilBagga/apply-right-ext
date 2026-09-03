import JobPreviewCard from "./JobPreviewCard";
import { fieldClass, fieldLabelClass } from "../styles/formStyles";

interface JobCaptureFormProps {
  jobPostingText: string;
  onJobPostingTextChange: (value: string) => void;
  onGenerateResume: () => void;
  onGenerateCoverLetter: () => void;
}

export default function JobCaptureForm({
  jobPostingText,
  onJobPostingTextChange,
  onGenerateResume,
  onGenerateCoverLetter,
}: JobCaptureFormProps) {
  const isFilled = jobPostingText.trim().length > 0;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="job-posting" className={fieldLabelClass}>
          Paste the job posting
        </label>
        <textarea
          id="job-posting"
          value={jobPostingText}
          onChange={(e) => onJobPostingTextChange(e.target.value)}
          placeholder="Paste the full job description, including company name and role title..."
          rows={10}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {isFilled && <JobPreviewCard rawText={jobPostingText} />}

      <div className="grid grid-cols-2 gap-3 mt-1">
        <button
          type="button"
          onClick={onGenerateResume}
          className="px-4 py-2.5 rounded-md bg-accent-strong text-white text-sm font-semibold hover:bg-accent-strong-hover transition-colors shadow-soft"
        >
          Generate Resume
        </button>
        <button
          type="button"
          onClick={onGenerateCoverLetter}
          className="px-4 py-2.5 rounded-md bg-accent-strong text-white text-sm font-semibold hover:bg-accent-strong-hover transition-colors shadow-soft"
        >
          Generate Cover Letter
        </button>
      </div>
    </section>
  );
}
