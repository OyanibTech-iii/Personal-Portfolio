---
title: Task Scheduling (Cron & Timers)
type: environment
updated: 2026-10-14
tags:
  - environment
  - scheduling
  - background
---

# Task Scheduling (Cron & Timers)

## Purpose
The scheduling subsystem enables Antigravity agents to execute delayed one-shot reminders, recurring background monitors, and periodic health checks without consuming active conversational turns.

## Modes of Operation

### 1. One-Shot Timers (`DurationSeconds`)
Sets an asynchronous timer that sends a high-priority prompt notification when it fires.

#### Early Termination Conditions (`TimerCondition`)
- `never`: Default behavior; fires unconditionally after the duration expires.
- `any`: Cancels early if any message from any sender or subagent is received before expiration.
- `<sender-id>`: Cancels early if a message arrives from the designated task or subagent conversation ID.

### 2. Recurring Cron (`CronExpression`)
Executes a recurring 5-field cron schedule (minute, hour, day-of-month, month, day-of-week).

#### Daemon Setting (`IsDaemon`)
- `false` (Default): Task stays active as part of finishing current work.
- `true`: Task runs independently in the background across sessions.

## Related Notes
- [[01-Architecture/Agent-Runtime]]
- [[03-Tools-And-Environment/Terminal-And-Execution]]
