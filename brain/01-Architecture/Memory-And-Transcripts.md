---
title: Memory, Transcripts, and Knowledge Items
type: architecture
updated: 2026-10-14
tags:
  - architecture
  - memory
  - transcripts
---

# Memory, Transcripts, and Knowledge Items

## Memory Architecture

Antigravity preserves state and learned knowledge across sessions through three complementary mechanisms:

```
+-------------------------------------------------------------+
|                      Antigravity Memory                      |
+-------------------------------------------------------------+
| 1. Knowledge Items (KI)   | Curated repository facts        |
| 2. Conversation Logs      | Chronological JSONL transcripts |
| 3. Local Workspace Vault  | Obsidian Brain & Markdown docs  |
+-------------------------------------------------------------+
```

## 1. Knowledge Items (KIs)
- Location: `<appDataDir>/knowledge/`
- Structure:
  - `metadata.json`: Summary, tags, and source references.
  - `artifacts/`: Supporting documentation, schema dumps, and past implementation artifacts.
- Lifecycle: Injected at session start as lightweight summaries; read in detail only when a task matches the summary.

## 2. Transcript System
- Location: `<appDataDir>/brain/<conversation-id>/.system_generated/logs/`
- Dual-File Logging:
  - `transcript.jsonl`: Token-efficient log with truncated large outputs for rapid scanning.
  - `transcript_full.jsonl`: Complete, untruncated record of every tool call, argument, and output.
- Analysis: Can be parsed using standard terminal utilities (`grep`, `jq`, `head`).

## 3. Obsidian Brain
- Location: `brain/` inside the workspace.
- Purpose: Direct human-readable and agent-navigable documentation graph connecting architecture, guidelines, workflows, and project knowledge.

## Related Notes
- [[01-Architecture/Context-Management]]
- [[00-Index/Quick-Reference]]
