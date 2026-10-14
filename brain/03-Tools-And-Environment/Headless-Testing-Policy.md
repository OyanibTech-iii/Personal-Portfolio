---
title: Headless Testing & Browser Isolation
type: environment
updated: 2026-10-14
tags:
  - environment
  - testing
  - headless
  - policy
---

# Headless Testing & Browser Isolation

## Absolute Rule: Strict No-Open Policy
Antigravity agents are strictly forbidden from launching, spawning, or triggering any physical browser window (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari) or headed automation frameworks during test execution, verification, or routine runs.

## Mandated Constraints

Policy Area | Constraint
:--- | :---
Physical Browsers | Never open desktop browser windows.
Test Runners | Prohibit `--headed` or GUI modes (e.g., `playwright test --headed`, Cypress GUI).
Automated Verification | All tests must execute purely in headless/CI mode via CLI.
Web Server Previews | Do not trigger unrequested browser preview tabs or launch visual viewers.
Subagents | Browser subagents must run strictly headless and record media artifacts headlessly.

## Verification Protocol
1. Capture terminal stdout and stderr.
2. Inspect test runner exit codes (0 = Success, >0 = Failure).
3. Report results via structured text summary tables and logs.

## Related Notes
- [[00-Index/Quick-Reference]]
- [[02-Customizations/Rules-System]]
- [[04-Workflows/Quality-Assurance]]
