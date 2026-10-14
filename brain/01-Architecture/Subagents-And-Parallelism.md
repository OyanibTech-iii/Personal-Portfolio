---
title: Subagents & Parallel Execution
type: architecture
updated: 2026-10-14
tags:
  - architecture
  - subagents
  - concurrency
---

# Subagents & Parallel Execution

## Architecture
Complex workflows often require parallel investigation or specialized isolation. Antigravity supports hierarchical subagent spawning where a parent agent delegates focused tasks to child subagents.

```
+--------------------+
|    Parent Agent    |
+---------+----------+
          |
          +-----------------------+
          |                       |
          v                       v
+--------------------+  +--------------------+
| Browser Subagent   |  | Custom Subagent    |
| (Headless Testing) |  | (Deep Search/Code) |
+---------+----------+  +---------+----------+
          |                       |
          +-----------+-----------+
                      |
                      v
          +-----------------------+
          | Aggregated Results    |
          | Delivered to Parent   |
          +-----------------------+
```

## Subagent Characteristics
- Isolated Context: Each subagent operates within its own context frame, preventing token pollution in the primary conversation.
- Structured Reporting: Subagents complete tasks and produce a final report returned directly to the calling agent.
- Resumability: Subagents can be resumed via conversation IDs (`ReusedSubagentId`) when incremental iteration is needed.

## Subagent Safety and Headless Enforcements
- All subagents inherit the strict headless policy.
- Subagents are prohibited from launching visual browser frames or opening external desktop GUI apps.

## Related Notes
- [[01-Architecture/Agent-Runtime]]
- [[03-Tools-And-Environment/Headless-Testing-Policy]]
