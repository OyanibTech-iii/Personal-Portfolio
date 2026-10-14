---
title: Context Management & Progressive Disclosure
type: architecture
updated: 2026-10-14
tags:
  - architecture
  - context-management
  - token-budget
---

# Context Management & Progressive Disclosure

## Concept
Context window efficiency is critical for maintaining high inference accuracy and minimizing hallucinations. Antigravity employs progressive disclosure to balance deep domain knowledge against token limits.

## Levels of Disclosure

Level | Content Loaded | Mechanism | Memory Footprint
:--- | :--- | :--- | :---
0 | System identity, user rules, tool schemas | Always loaded in baseline prompt | Minimal
1 | Skill names & short descriptions, KI summaries | Injected at turn start | Low
2 | Full skill instructions (`SKILL.md`), specific KIs | Read via `view_file` on demand | Medium
3 | Reference manuals (`references/*.md`), raw transcripts | Read specifically when needed | High

## Deduplication Rules
- Rule files (`AGENT.md`, `AGENTS.md`, `GEMINI.md`) discovered across parent paths are deduplicated by absolute path.
- Knowledge items matching multiple criteria are injected once as metadata summaries.
- Re-reading of identical files is minimized by caching active file state in tool observations.

## Guidelines for Authoring Customizations
- Keep main instruction files concise.
- Offload extensive documentation into separate `references/` or `docs/` files.
- Link between documents using standard relative markdown paths.

## Related Notes
- [[01-Architecture/Agent-Runtime]]
- [[02-Customizations/Skills-Framework]]
- [[02-Customizations/Rules-System]]
