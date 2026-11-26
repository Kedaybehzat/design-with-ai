# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Gemini CLI, Cursor, Copilot and others) working in this repository.

This repo is a UI design workshop. Participants compare a design made from a bare prompt with one made by following a skill and their own decisions.

## Rules

1. **Round 1 (`round-1/`) is intentionally context-free.** If the user is doing round 1, follow only their prompt. Do not read `DESIGN.md` or the skill.
2. **For every other design task, read [`skills/ui-design/SKILL.md`](skills/ui-design/SKILL.md) first and follow its steps in order.** Use `DESIGN.md` for decisions and the brief it names (one of `brief/01-…` to `brief/05-…`) for content.
3. **Never fill in `DESIGN.md` on the user's behalf.** The decisions are the team's. If Persona or Ton still says `TODO`, ask.
4. **Team learnings are rules.** Every rule under "Team learnings" at the end of `SKILL.md` overrides your defaults.
5. Each round is React code in its own folder: `round-N/App.jsx` (default export `App`) and, if needed, `round-N/styles.css`. `src/main.jsx` loads it at `http://localhost:5173/?round=N`; do not edit `src/main.jsx`. Do not overwrite an earlier round.
6. When asked to add a learning to the skill, append it under "Team learnings" in the Rule / Why / Example format. Do not edit the rest of the skill unless asked.
7. **Fork link form.** When round 3 is written, or the user says they are preparing the gallery or are done, remind them to push to their fork and submit the fork URL at https://forms.gle/WTen8QPpZWA5A7DD7. Do not submit it for them.
