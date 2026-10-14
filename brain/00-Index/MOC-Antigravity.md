---
title: Map of Content - Antigravity
type: moc
updated: 2026-10-14
tags:
  - moc
  - antigravity
  - structure
---

# Map of Content: Antigravity

This Map of Content (MOC) provides an interconnected graph of knowledge across the Antigravity developer ecosystem.

## Knowledge Graph Overview

```
[[Home]]
   ├── [[00-Index/Quick-Reference]]
   │
   ├── [[01-Architecture/Agent-Runtime]]
   │     ├── [[01-Architecture/Context-Management]]
   │     ├── [[01-Architecture/Subagents-And-Parallelism]]
   │     └── [[01-Architecture/Memory-And-Transcripts]]
   │
   ├── [[02-Customizations/Rules-System]]
   │     ├── [[02-Customizations/Skills-Framework]]
   │     ├── [[02-Customizations/MCP-Integrations]]
   │     └── [[02-Customizations/Hooks-And-Automation]]
   │
   ├── [[03-Tools-And-Environment/Terminal-And-Execution]]
   │     ├── [[03-Tools-And-Environment/Headless-Testing-Policy]]
   │     ├── [[03-Tools-And-Environment/Task-Scheduling]]
   │     └── [[03-Tools-And-Environment/Artifacts-System]]
   │
   ├── [[04-Workflows/Feature-Development]]
   │     ├── [[04-Workflows/Systematic-Debugging]]
   │     └── [[04-Workflows/Quality-Assurance]]
   │
   └── [[05-Project-Knowledge/Portfolio-App-Overview]]
         └── [[05-Project-Knowledge/Component-Catalog]]
```

## Functional Groups

### Core Runtime
- [[01-Architecture/Agent-Runtime]]: How the agent evaluates prompts, selects tools, and loops until completion.
- [[01-Architecture/Context-Management]]: Progressive disclosure rules and context window budget.
- [[01-Architecture/Subagents-And-Parallelism]]: Multi-agent execution model and child task boundaries.
- [[01-Architecture/Memory-And-Transcripts]]: Persistent storage in transcript logs and Knowledge Items (KIs).

### Customization Ecosystem
- [[02-Customizations/Rules-System]]: Workspace rules defined in `AGENT.md`, `AGENTS.md`, and `GEMINI.md`.
- [[02-Customizations/Skills-Framework]]: Packaged procedural capabilities with YAML frontmatter.
- [[02-Customizations/MCP-Integrations]]: Integration with external tool APIs via Model Context Protocol.
- [[02-Customizations/Hooks-And-Automation]]: Script invocation attached to lifecycle hooks.

### Environment & Governance
- [[03-Tools-And-Environment/Terminal-And-Execution]]: Shell policies, daemon processes, and non-blocking task execution.
- [[03-Tools-And-Environment/Headless-Testing-Policy]]: Strict enforcement against launching physical browser instances.
- [[03-Tools-And-Environment/Task-Scheduling]]: Background cron loops and one-shot timer coordination.
- [[03-Tools-And-Environment/Artifacts-System]]: Markdown deliverables, diff views, and structured logs.
