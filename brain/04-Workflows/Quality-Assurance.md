---
title: Quality Assurance & Build Verification
type: workflow
updated: 2026-10-14
tags:
  - workflow
  - qa
  - verification
  - lint
---

# Quality Assurance & Build Verification

## Mandatory Quality Gates

Every code modification in this workspace must satisfy two automated quality gates prior to delivery:

Gate | Command | Criteria
:--- | :--- | :---
1. Static Analysis | `npm run lint` | Zero errors; all ESLint rules satisfied.
2. Build Verification | `npm run build` | Zero TypeScript compiler errors; successful Vite rollup bundle.

## Execution Sequence

```bash
# Step 1: Execute static analysis check
npm run lint

# Step 2: Execute TypeScript compilation & production bundle
npm run build
```

## Handling Build Failures
- If `npm run lint` fails:
  - Check ESLint configuration (`eslint.config.js`).
  - Correct formatting, unused variables, or unsafe type casts.
- If `npm run build` fails:
  - Check `tsc -b` error logs for file paths and line numbers.
  - Review `tsconfig.app.json` rules.
  - Resolve type mismatches before repeating the build command.

## Related Notes
- [[04-Workflows/Feature-Development]]
- [[04-Workflows/Systematic-Debugging]]
- [[00-Index/Quick-Reference]]
