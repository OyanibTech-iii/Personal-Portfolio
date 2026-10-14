# Antigravity Agents Specification (AGENTS.md)

This file enforces workspace rules and guidelines for Antigravity AI agents. See [AGENT.md](file:///c:/Users/pacif/Desktop/Programming/Portfolio/AGENT.md) for full architecture and coding standards.

## Core Rules

1. Testing Restrictions:
   - Run tests and verification exclusively in headless mode via CLI/terminal.
   - Do not launch physical browser instances (Chrome, Firefox, Safari, Edge).
   - Prohibit GUI test modes (e.g. Cypress GUI, headed Playwright).

2. Safety and Execution:
   - Do not execute destructive system commands without explicit confirmation.
   - Restrict file modifications strictly to the workspace boundary.
   - Do not use `cd` commands; pass target working directories explicitly.

3. Content Standards:
   - Do not use status badges or shield icons.
   - Do not use CSS or SVG gradients.
   - Write direct technical content without filler words or vague terminology.

4. Quality Gates:
   - Run `npm run lint` for static analysis.
   - Run `npm run build` to verify TypeScript types and production asset bundling.
