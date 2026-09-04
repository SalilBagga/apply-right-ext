import { z } from "zod";

// --- Cover letter -----------------------------------------------------

const contactSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().min(1, "email is required"),
  phone: z.string().min(1, "phone is required"),
});

export const coverLetterInputSchema = z.object({
  contact: contactSchema,
  // Pre-composed final text, paragraphs separated by a blank line (\n\n).
  body: z.string().min(1, "body is required"),
});

export type CoverLetterInput = z.infer<typeof coverLetterInputSchema>;

// --- Resume (schema only for now — see resume-template.tsx for the stub) ---

const resumeContactSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().min(1, "email is required"),
  phone: z.string().min(1, "phone is required"),
  // Not every candidate has all three of these, so they're allowed to be empty
  // rather than required — unlike name/email/phone, which any resume needs.
  portfolio: z.string(),
  linkedin: z.string(),
  github: z.string(),
});

const resumeExperienceEntrySchema = z.object({
  company: z.string().min(1, "company is required"),
  title: z.string().min(1, "title is required"),
  start: z.string().min(1, "start is required"),
  end: z.string().min(1, "end is required"),
  bullets: z.array(z.string()),
});

const resumeProjectEntrySchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string(),
});

const resumeCustomSectionSchema = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string(),
});

export const resumeInputSchema = z.object({
  contact: resumeContactSchema,
  summary: z.string(),
  experience: z.array(resumeExperienceEntrySchema),
  projects: z.array(resumeProjectEntrySchema),
  skills: z.array(z.string()),
  customSections: z.array(resumeCustomSectionSchema),
});

export type ResumeInput = z.infer<typeof resumeInputSchema>;
