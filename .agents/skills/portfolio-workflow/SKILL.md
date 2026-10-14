---
name: portfolio-workflow
description: >-
  Use this skill when developing, refactoring, linting, or building the
  React portfolio web application in this workspace.
---

# Portfolio Development & Verification Skill

This skill provides step-by-step procedures for safely modifying, testing, and building the React 19 portfolio web application.

## Prerequisites
- Working Directory: Workspace root (`c:\Users\pacif\Desktop\Programming\Portfolio`)
- Language & Framework: React 19, TypeScript 5.8, Vite 7, Tailwind CSS v4

## Workflow Steps

### 1. Requirements Alignment and File Inspection
- Identify the component or dataset file to be updated.
- Read existing implementations with `view_file` before making modifications.
- Check `src/types/` for relevant TypeScript definitions.

### 2. Surgical Code Implementation
- Apply modifications using single-block or multi-block replacement tools.
- Maintain strict typing: zero implicit or explicit `any` usages.
- Maintain styling consistency using Tailwind CSS v4 utility classes.
- Do not use status badges or CSS gradients.

### 3. Headless Verification Gates
Run the automated verification commands in the terminal:

```bash
# Static analysis
npm run lint

# TypeScript compilation and asset bundling
npm run build
```

### 4. Result Inspection & Remediation
- Confirm exit status 0 for both lint and build commands.
- If errors occur, diagnose line numbers and symbols directly from terminal output.
- Do not spawn physical browser windows for manual or automated inspection.
