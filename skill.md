---
name: portfolio-workflow
description: >-
  Use this skill when developing, refactoring, linting, or building the
  React portfolio web application in this workspace.
---

# Portfolio Development & Verification Skill

This skill defines the standardized procedure for implementing changes, maintaining code quality, and executing verification in this React and TypeScript repository.

## Pre-Requisites & Context
- Tech Stack: React 19, Vite 7, TypeScript 5.8, Tailwind CSS v4, Framer Motion
- Node Package Manager: `npm`
- Strict Quality Gates: ESLint and TypeScript compilation checks must pass

## Standard Procedure

### Step 1: Pre-Execution Inspection
1. Inspect the target file and related types:
   - Components: `src/components/`
   - Data sets: `src/dataset.ts`
   - Global styles: `src/index.css`
   - Types: `src/types/`
2. Confirm the exact line range and existing implementation using file viewing tools before applying edits.

### Step 2: Code Modification
1. Apply focused surgical updates using code replacement tools.
2. Adhere to TypeScript strict mode:
   - Specify explicit prop types and interfaces.
   - Prohibit the `any` type.
   - Use optional chaining (`?.`) and nullish coalescing (`??`) for nullable values.
3. Adhere to Tailwind CSS v4 conventions:
   - Use utility classes directly.
   - Use `clsx` and `tailwind-merge` for conditional class combinations.
   - Prohibit inline CSS gradients and custom style tags.

### Step 3: Headless Quality Verification
Execute the automated quality verification commands strictly in headless mode via terminal:

```bash
# 1. Run ESLint checks
npm run lint

# 2. Run TypeScript build verification
npm run build
```

### Step 4: Output Validation
- Verify the terminal exit code is 0.
- If linting or build fails, inspect error logs, apply corrections, and re-run verification until all gates pass.
- Never open physical browser windows to test the application.
