---
title: Systematic Debugging Protocol
type: workflow
updated: 2026-10-14
tags:
  - workflow
  - debugging
  - troubleshooting
---

# Systematic Debugging Protocol

## Principles
Do not attempt random or brute-force code edits. Follow this rigorous 5-step diagnostic loop.

```
+--------------------+
| 1. Reproduce       | Capture exact error messages, stack traces, and failing lines.
+---------+----------+
          |
          v
+--------------------+
| 2. Isolate         | Trace data flow backward to find the root cause component.
+---------+----------+
          |
          v
+--------------------+
| 3. Hypothesize     | Formulate a minimal, testable explanation of failure.
+---------+----------+
          |
          v
+--------------------+
| 4. Minimal Patch   | Apply focused surgical fix using replace_file_content.
+---------+----------+
          |
          v
+--------------------+
| 5. Regression Test | Run npm run build and npm run lint to confirm zero regressions.
+--------------------+
```

## Common Issue Archetypes

### 1. TypeScript Strictness Violations
- Cause: Implicit `any`, unresolved nullable types (`undefined` or `null`).
- Fix: Add explicit optional chaining (`?.`), nullish coalescing (`??`), or correct interface types.

### 2. React 19 / Hook Lifecycle Mismatches
- Cause: Missing dependencies in `useEffect` arrays, or state mutation during render.
- Fix: Ensure purely immutable state updates and explicit dependency listings.

### 3. Tailwind CSS v4 Class Resolution
- Cause: Incorrect class names or dynamic string interpolation failing compiler detection.
- Fix: Use explicit utility classes or `clsx` / `tailwind-merge` utilities.

## Related Notes
- [[04-Workflows/Quality-Assurance]]
- [[01-Architecture/Agent-Runtime]]
