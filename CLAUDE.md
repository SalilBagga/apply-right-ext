# Apply Right — Project Context for Claude Code

## What this is

An open-source Chrome extension that generates a tailored resume and cover
letter for a specific job description, using the user's own Anthropic API
key. No hosted backend, no vendor lock-in — everything runs locally.

Inspired by career-ops (local, VS Code-based tool) and the Jobright extension.

## Non-negotiable principles

1. **No hosted backend.** All persistence is local plain files (`/data/profile.json`,
   `/data/jobs.json`). No database, no server the maintainer hosts. A small local
   companion process is fine (bridging the extension popup to the Claude Agent SDK),
   but it never talks to any Anthropic-adjacent infra beyond the user's own API key.

2. **Anti-hallucination is the highest design priority.** Every resume/cover
   letter claim must trace back to the user's real profile data. Never invent
   tools, metrics, or experience. There is no such thing as a real "95% ATS
   score" — do not build or reference fake scoring. Use honest relevance framing
   instead (see `/prompts/resume.md`'s `relevanceNotes` field).

3. **Generation is a two-pass pipeline: generate → verify.** Every resume/cover
   letter generation call is followed by a separate verification call
   (`/prompts/verification.md`) that fact-checks the output against the source
   profile. This is not optional — do not collapse it into a single call.

4. **Prompts are plain, editable files, not embedded in code.** They live in
   `/prompts/*.md` with `{{profile}}`, `{{job_description}}`,
   `{{generated_document}}` as string-substitution placeholders. Never move
   prompt logic into TypeScript string literals.

5. **Transparency over automation.** The user should always be able to see
   what the extension knows about them (their profile) and why a document was
   generated the way it was (verification notes). Prefer surfacing information
   to the user over hiding complexity.

## Locked architectural decisions

- **Generation engine:** Claude Agent SDK in headless mode via `query()` —
  not direct raw API calls. Verify current SDK package/invocation details on
  docs.claude.com if anything here seems outdated.
- **Bridge layer:** small local companion process connecting the Chrome
  extension popup to the Agent SDK (required because sandboxed extension JS
  cannot spawn native binaries directly).
- **Frontend:** React + Vite + CRXJS. Not Next.js — no SSR value in an
  extension context.
- **Storage:** plain local JSON files at `/data/profile.json` and
  `/data/jobs.json`, using atomic writes (`src/storage/atomic-write.ts`) to
  avoid corruption on interrupted writes.
- **PDF rendering:** `@react-pdf/renderer`, pure Node, no browser. Puppeteer
  was explicitly considered and rejected — it requires headless Chrome and a
  second running app, which conflicts with the no-backend principle.
- **JD intake:** single paste field (title/company/JD all as one blob) — not
  separate structured inputs. Company/title get extracted from the blob
  during generation, not entered by the user.

## Folder structure

```
/prompts/                  → resume.md, cover-letter.md, verification.md, README.md
/data/                       → profile.json, jobs.json (gitignored, real user data)
/src/
  /extension/                 → popup UI (React), content scripts, background worker
  /engine/                     → invoke-claude.ts, context-selector.ts (Agent SDK calls)
  /pdf-generator/               → fonts.ts, schemas.ts, cover-letter-template.tsx,
                                   resume-template.tsx, index.ts
  /storage/                     → types.ts, profile-store.ts, jobs-store.ts, atomic-write.ts
project-checklist.md          → phase-by-phase build checklist, source of truth for progress
```

## Data shapes (source of truth)

See `src/storage/types.ts` for the canonical `Profile` and `JobEntry`
interfaces once created. Do not invent parallel/duplicate shapes elsewhere —
every part of the system (prompts, PDF generator, UI) should read from these
same types.

## How to work in this repo

- **`project-checklist.md`** is the single source of truth for what's done and
  what's next. Always check it before starting work, and update the checkboxes
  as you complete items.
- Work **one phase at a time**. Do not jump ahead to a later phase's work
  while an earlier phase has unchecked items, unless explicitly told to.
- After completing a phase (or a meaningful chunk of one), **stop and summarize
  what you did** rather than continuing on to the next phase automatically.
  The human reviews and commits between milestones.
- If a decision isn't covered by this file or the checklist, make the most
  reasonable choice consistent with the principles above, note the judgment
  call clearly in your summary, and keep going rather than blocking on it.
