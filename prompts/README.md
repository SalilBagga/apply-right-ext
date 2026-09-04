# Prompts Directory

These files define the exact instructions sent to Claude for generation and
verification. They're kept as plain markdown, not embedded in application code,
so anyone can read them, understand exactly how their resume/cover letter is
being produced, and fork or edit the logic themselves.

## Files

- **`resume.md`** — generates tailored resume content from a candidate profile + JD
- **`cover-letter.md`** — generates a tailored cover letter from a candidate profile + JD
- **`verification.md`** — a required second pass that fact-checks generated output
  against the source profile, flagging any claim not traceable to real data

## Pipeline

```
profile.json + pasted JD
        │
        ▼
  resume.md (or cover-letter.md)  ──►  generated draft (JSON)
        │
        ▼
  verification.md  ──►  { passed, flags[] }
        │
        ▼
  if passed=false and any high-severity flag:
      surface flags to user before finalizing
  else:
      pass to PDF generator
```

## Template Variables

| Variable                 | Used in                                     | Description                                        |
| ------------------------ | ------------------------------------------- | -------------------------------------------------- |
| `{{profile}}`            | resume.md, cover-letter.md, verification.md | Full candidate profile JSON                        |
| `{{job_description}}`    | resume.md, cover-letter.md                  | Raw pasted job posting text                        |
| `{{generated_document}}` | verification.md                             | Output JSON from the generation pass being checked |

Your engine layer (`invoke-claude.ts`) is responsible for substituting these
before sending the prompt to the Agent SDK.

## Editing These Prompts

If you want to change tone, add sections, or adjust the grounding rules, edit
these files directly — no code changes required. The engine layer just reads
the file, substitutes variables, and sends it. Keep the "Grounding Rules"
sections intact (or strengthen them) if you edit — they're the core anti-
hallucination safeguard, not boilerplate.

## Why Verification Is a Separate Pass, Not Just Instructions

Grounding rules in the generation prompt reduce hallucination but don't
eliminate it — a single model call optimizing for "sound good and match the JD"
can still drift. Running a second, independent pass whose only job is fact-
checking against the source profile is a much more reliable safeguard, because
it isn't under the same pressure to produce an impressive-sounding result.
