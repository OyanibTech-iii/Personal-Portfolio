---
title: Quick Reference
type: reference
updated: 2026-10-14
tags:
  - reference
  - cheatsheet
  - rules
---

# Quick Reference: Operational Policies

## Key File Locations

Item | Location | Purpose
:--- | :--- | :---
Workspace Rules | `AGENT.md`, `AGENTS.md` | Workspace instructions, guidelines, and constraints
Workspace Skills | `.agents/skills/<name>/SKILL.md` | Reusable procedural guides with frontmatter
Global Config | `~/.gemini/config/` | Machine-wide rules, skills, and MCP configurations
Obsidian Brain | `brain/` | Local structured knowledge repository
Transcripts | `<appDataDir>/brain/<conversation-id>/.system_generated/logs/` | Conversation execution history
Artifacts | `<appDataDir>/brain/<conversation-id>/` | Deliverables, diagrams, and reports

## Strict Constraints Checklist

- Browser Execution: Strictly headless. Never launch headed browser windows or GUI test suites.
- Working Directory: Always execute commands with explicit `Cwd` paths; never emit `cd` commands.
- Visual Elements: Prohibit badge graphics, shields, and gradient CSS stylings in documentation.
- Verification Gates: Run `npm run lint` and `npm run build` to confirm zero compilation errors.

## CLI & Slash Commands Reference

Command | Function
:--- | :---
`/help` | Display interactive CLI help and tool listing
`/exit` or `/quit` | Terminate active CLI session
`/goal` | Run an end-to-end task with persistent goal achievement
`/plan` | Generate step-by-step design plan prior to tool execution
`/grill-me` | Conduct interactive requirements interview to clarify ambiguity
`/schedule` | Schedule background cron or delayed timer notification
`/learn` | Persist learned behavior or corrections to workspace memory
