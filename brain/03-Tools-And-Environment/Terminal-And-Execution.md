---
title: Terminal Commands & Process Lifecycle
type: environment
updated: 2026-10-14
tags:
  - environment
  - terminal
  - execution
---

# Terminal Commands & Process Lifecycle

## Operational Principles

1. No `cd` Commands:
   - Operating shells maintain process-isolated working directories.
   - The agent must always specify the absolute target directory in the `Cwd` parameter rather than invoking `cd`.

2. Synchronous Threshold (`WaitMsBeforeAsync`):
   - Commands that complete quickly (e.g. `npm run lint`, `git status`) specify a sufficient timeout to return results synchronously.
   - Long-running processes (e.g., continuous build watchers, background servers) transition to asynchronous tasks automatically.

3. Process Supervision:
   - Asynchronous tasks are monitored via the task management interface.
   - Standard actions include checking status, sending standard input, and terminating execution.

## Shell Standard Practices

Environment | Shell | Syntax Rules
:--- | :--- | :---
Windows | PowerShell (`pwsh`) | Quote compound paths with spaces, avoid UNIX-specific shell piping when native cmdlets exist
POSIX | `bash` / `zsh` | Use standard quoting and POSIX signals

## Related Notes
- [[00-Index/Quick-Reference]]
- [[03-Tools-And-Environment/Headless-Testing-Policy]]
- [[03-Tools-And-Environment/Task-Scheduling]]
