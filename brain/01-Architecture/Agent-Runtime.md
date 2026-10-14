---
title: Agent Runtime & Execution Loop
type: architecture
updated: 2026-10-14
tags:
  - architecture
  - runtime
  - agent-loop
---

# Agent Runtime & Execution Loop

## Overview
The Antigravity agent runtime is an autonomous execution loop driven by the Gemini model family. The runtime operates on a cycle of observation, planning, tool execution, and reactive evaluation.

```
+--------------------+
|    User Prompt     |
+---------+----------+
          |
          v
+--------------------+
| Context Assembly   |<--------------------+
| (Rules, KIs, Meta) |                     |
+---------+----------+                     |
          |                                |
          v                                |
+--------------------+                     |
| Model Evaluation   |                     |
+---------+----------+                     |
          |                                |
          +-------------> Tool Call?       |
          |               |                |
          |               | Yes            |
          |               v                |
          |        +--------------+        |
          |        | Tool Exec    |        |
          |        +-------+------+        |
          |                |               |
          |                v               |
          |        +--------------+        |
          |        | Tool Result  |--------+
          |        +--------------+
          | No
          v
+--------------------+
|  Response to User  |
+--------------------+
```

## Key Runtime Principles

### 1. Synchronous vs Asynchronous Command Handling
Commands launched via execution tools can complete synchronously within a specified threshold (`WaitMsBeforeAsync`) or transition to background tasks. When sent to the background, the agent receives periodic notifications or is resumed on completion.

### 2. Reactive Wakeup
The agent runtime does not require polling loops. When asynchronous background tasks complete or timers expire, the runtime receives a notification message and resumes execution automatically.

### 3. Progressive Disclosure
To maintain context window hygiene, secondary resources (such as full skill instructions, reference files, and historical conversation logs) are not injected upfront. They are retrieved on demand when specifically relevant to the task.

## Related Notes
- [[01-Architecture/Context-Management]]
- [[01-Architecture/Subagents-And-Parallelism]]
- [[03-Tools-And-Environment/Terminal-And-Execution]]
