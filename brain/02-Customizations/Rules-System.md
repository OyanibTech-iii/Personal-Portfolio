---
title: Rules System (AGENT.md & AGENTS.md)
type: customization
updated: 2026-10-14
tags:
  - customization
  - rules
  - governance
---

# Rules System (AGENT.md & AGENTS.md)

## Purpose
The Rules System allows engineers to specify persistent constraints, behavioral policies, code style expectations, and forbidden operations within a workspace or directory hierarchy.

## Discovery Locations & Precedence
The agent searches for rules starting from the active file's folder upwards to the workspace root:

1. Directory Rules: `AGENTS.md`, `AGENT.md`, `GEMINI.md` located in the directory or any ancestor directory.
2. Workspace Rules: `.agents/rules/*.md` within the workspace root.
3. Global Rules: `~/.gemini/config/rules/` on the local machine.

## Structure of a Rule File
Rule files are standard Markdown documents. They are loaded directly into the agent context without requiring frontmatter.

### Core Sections Recommended for Rules
- Operational Constraints: Browser headless policy, file modification boundaries, command safety.
- Tech Stack Conventions: Framework versions, preferred libraries, path aliases.
- Code Style & Patterns: Type strictness, component conventions, formatting requirements.
- Quality Gates: Commands that must pass before task completion (`npm run lint`, `npm run build`).

## Precedence and Merging
- Nearest Scope Wins: Rules closer to the target file take precedence over parent directories.
- Deduplication: Each unique rule path is loaded exactly once per turn.

## Related Notes
- [[00-Index/Quick-Reference]]
- [[02-Customizations/Skills-Framework]]
- [[03-Tools-And-Environment/Headless-Testing-Policy]]
