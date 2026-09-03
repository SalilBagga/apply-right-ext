import type { Profile, JobHistoryEntry } from "../types";

// Placeholder data only — no persistence, no network, no real user data.

export const mockProfile: Profile = {
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  phone: "(555) 219-4432",
  portfolio: "alexrivera.dev",
  linkedin: "linkedin.com/in/alexrivera",
  github: "github.com/alexrivera",
  experience: [
    {
      id: "exp-1",
      company: "Fieldstone AI",
      title: "Senior Frontend Engineer",
      startDate: "Jan 2023",
      endDate: "Present",
      bullets: [
        "Led the redesign of the core dashboard, cutting median load time by 40%",
        "Mentored two junior engineers and ran the frontend guild's weekly review",
        "Shipped an internal component library adopted across 6 product teams",
      ],
      description:
        "Owned the frontend architecture for Fieldstone's analytics product, partnering closely with design and data science to ship a full rebuild of the reporting suite.",
    },
    {
      id: "exp-2",
      company: "Cedar & Co.",
      title: "Frontend Developer",
      startDate: "Jun 2020",
      endDate: "Dec 2022",
      bullets: [
        "Built the customer-facing billing portal from scratch using React and TypeScript",
        "Reduced bundle size by 30% through code-splitting and dependency audits",
      ],
      description:
        "Worked across the full product surface as one of three frontend engineers at a seed-stage fintech startup.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Apply Right",
      description:
        "A Chrome extension that drafts tailored resumes and cover letters from a pasted job post.",
      narrative:
        "Designed and built the popup UI end-to-end, including the job-capture flow and resume/cover-letter preview states.",
    },
    {
      id: "proj-2",
      name: "Tideline",
      description: "An open-source Markdown-based changelog generator for small teams.",
      narrative:
        "Maintained the CLI and wrote the parser that turns conventional commits into a formatted changelog.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "University of Washington",
      degree: "B.S. in Computer Science",
      year: "2020",
    },
  ],
  skills: ["TypeScript", "React", "Tailwind CSS", "Node.js", "GraphQL", "Figma"],
  customSections: [
    {
      id: "section-1",
      title: "Certifications",
      content: "AWS Certified Cloud Practitioner (2023)",
    },
  ],
};

export const mockJobHistory: JobHistoryEntry[] = [
  {
    id: "1",
    company: "Northwind Labs",
    jobTitle: "Senior Frontend Engineer",
    link: "https://northwindlabs.example.com/careers/1234",
    dateApplied: "Aug 28, 2026",
  },
  {
    id: "2",
    company: "Fieldstone AI",
    jobTitle: "Product Engineer",
    link: "https://fieldstone.example.com/jobs/product-eng",
    dateApplied: "Aug 22, 2026",
  },
  {
    id: "3",
    company: "Cedar & Co.",
    jobTitle: "Full Stack Developer",
    link: "https://cedarco.example.com/careers/fsd",
    dateApplied: "Aug 15, 2026",
  },
  {
    id: "4",
    company: "Marrow Health",
    jobTitle: "Frontend Engineer II",
    link: "https://marrowhealth.example.com/jobs/98",
    dateApplied: "Aug 9, 2026",
  },
];
