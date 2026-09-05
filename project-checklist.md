# Project Checklist — JD-Tailored Resume & Cover Letter Extension

## Phase 0 — Architecture Decisions
- [x] Decide: Direct API vs Claude Code Agent SDK → **Agent SDK (headless, via query())**
- [x] Decide: React vs Next → **React + Vite + CRXJS**
- [x] Decide: storage model → **local plain files (profile.json, jobs.json), no hosted backend**
- [ ] Confirm current Agent SDK package name/install steps on docs.claude.com before wiring engine layer

## Phase 1 — Frontend UI (current phase)
- [ ] Explore existing boilerplate structure with Claude Code
- [ ] Scaffold Profile Preview view (read-only, mock data)
- [ ] Scaffold Job Capture view (title/link/JD paste-in + confirmation glimpse)
- [ ] Scaffold Generate Resume / Generate Cover Letter buttons (non-functional)
- [ ] Scaffold Applied Jobs table view (mock rows)
- [ ] Scaffold Loading/Result placeholder state
- [ ] Apply Anthropic-inspired color scheme + typography via CSS variables
- [ ] Review UI end-to-end with mock data, adjust before wiring backend

## Phase 2 — Data Schemas & Local Storage
- [ ] Finalize `profile.json` schema
- [ ] Finalize `jobs.json` schema
- [ ] Decide file location convention (e.g. project-root `/data/`) and document it
- [ ] Build simple read/write utilities for both files

## Phase 3 — Prompt Files
- [ ] Write `resume.md` prompt template with `{{profile}}` / `{{job_description}}` variables
- [ ] Write `cover-letter.md` prompt template
- [ ] Write `/prompts/README.md` documenting available template variables

## Phase 4 — Engine Layer (Agent SDK integration)
- [ ] Set up local companion process to bridge extension ↔ Agent SDK (since extension JS can't spawn native binaries directly)
- [ ] Build `invoke-claude.ts` — wraps SDK `query()`, injects prompt + context
- [ ] Build `context-selector.ts` — selects relevant profile slices per JD (avoid full-context stuffing)
- [ ] Test engine layer standalone via script (outside extension) before wiring UI
- [ ] Handle `ANTHROPIC_API_KEY` setup flow (settings field → local config file)

## Phase 5 — Wire Extension to Engine
- [ ] Connect "Generate Resume" button → engine → render output
- [ ] Connect "Generate Cover Letter" button → engine → render output
- [ ] Save generated output + job metadata into `jobs.json`
- [ ] Populate Applied Jobs table from real `jobs.json` data
- [ ] Add "Edit Profile" functionality (raw file edit or lightweight form)

## Phase 6 — PDF Generation
- [ ] Confirm interface contract: input JSON → output PDF (reuse prior resume PDF API design)
- [ ] Integrate resume PDF generator
- [ ] Integrate cover letter PDF generator (or decide if cover letter stays text/doc format)

## Phase 7 — Polish & Open Source Release
- [ ] Write setup README (installation, API key setup, running locally)
- [ ] Document prompt editing for end users
- [ ] Document profile schema for end users
- [ ] Package/test on a clean machine to verify onboarding experience
- [ ] Publish repo

## Future (Post-MVP)
- [ ] JD auto-detect for top ATS platforms (LinkedIn, Greenhouse, Lever)
- [ ] Inline profile editing UI in popup (instead of raw file edit)
- [ ] Local job-search/matching feature (long-term vision)
