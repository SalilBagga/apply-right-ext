import type { CoverLetterInput } from "../schemas";

export const mockCoverLetterInput: CoverLetterInput = {
  contact: {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "(555) 219-4432",
  },
  body: [
    "I'm excited to apply for the Senior Frontend Engineer role at Fieldstone AI. Your team's work on making complex analytics approachable for non-technical users is exactly the kind of problem I've spent the last few years solving.",
    "At Cedar & Co., I built a customer-facing billing portal from scratch and led a 30% reduction in bundle size through code-splitting and dependency audits — the same performance discipline your posting calls out as a priority for this role. More recently, at Fieldstone I led a dashboard redesign that cut median load time by 40%.",
    "I'd welcome the chance to talk about how my background in React, TypeScript, and design-system work could contribute to your team's next stage of growth.",
    "Thank you for your consideration — I look forward to hearing from you.",
  ].join("\n\n"),
};
