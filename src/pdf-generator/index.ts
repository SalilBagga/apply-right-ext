import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import "./fonts"; // side effect: Font.register() must run before any render
import { coverLetterInputSchema, resumeInputSchema } from "./schemas";
import type { CoverLetterInput, ResumeInput } from "./schemas";
import { CoverLetterDocument } from "./cover-letter-template";

/**
 * Renders a cover letter PDF from validated input and returns it as a
 * Buffer — no disk write, no stream handling; the caller decides what to
 * do with the bytes (write to disk, attach to a response, etc).
 */
export async function generateCoverLetterPDF(input: CoverLetterInput): Promise<Buffer> {
  const result = coverLetterInputSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid cover letter PDF input: ${result.error.message}`);
  }

  return renderToBuffer(createElement(CoverLetterDocument, { input: result.data }));
}

/**
 * Not yet implemented — resume-template.tsx is a layout stub. Input is
 * still validated so callers can integrate against this function now and
 * get the real error (rather than a silent no-op) once wired up elsewhere.
 */
export async function generateResumePDF(input: ResumeInput): Promise<Buffer> {
  const result = resumeInputSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid resume PDF input: ${result.error.message}`);
  }

  throw new Error(
    "generateResumePDF is not yet implemented — resume-template.tsx is a layout stub."
  );
}
