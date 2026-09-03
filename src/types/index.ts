export interface WorkExperienceEntry {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  description: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  narrative: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  portfolio: string;
  linkedin: string;
  github: string;
  experience: WorkExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  skills: string[];
  customSections: CustomSection[];
}

export interface JobHistoryEntry {
  id: string;
  company: string;
  jobTitle: string;
  link: string;
  dateApplied: string;
}

export type TabKey = "generate" | "history" | "profile";

export type GenerationKind = "resume" | "coverLetter";

export type GenerationStatus = "idle" | "loading" | "result";
