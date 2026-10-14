---
title: Feature Development Workflow
type: workflow
updated: 2026-10-14
tags:
  - workflow
  - features
  - development
---

# Feature Development Workflow

## Step-by-Step Delivery Process

### Stage 1: Discovery & Planning
1. Review user request and clarify ambiguous requirements.
2. Inspect target source files using `view_file` or `grep_search`.
3. Check existing Knowledge Items (`metadata.json`) to align with project conventions.
4. Formulate an implementation plan with bounded change scopes.

### Stage 2: Implementation
1. Create or edit TypeScript types in `src/types/` where necessary.
2. Implement or update components in `src/components/`.
3. Apply styling updates conforming to Tailwind CSS v4 patterns.
4. Ensure all changes maintain backward compatibility with active datasets.

### Stage 3: Verification
1. Run static analysis:
   ```bash
   npm run lint
   ```
2. Run TypeScript build verification:
   ```bash
   npm run build
   ```
3. Resolve any compiler errors or lint warnings prior to task completion.

### Stage 4: Reporting
1. Document modified files with clickable markdown links.
2. Provide concise summaries of key architectural decisions.

## Related Notes
- [[04-Workflows/Quality-Assurance]]
- [[04-Workflows/Systematic-Debugging]]
- [[05-Project-Knowledge/Portfolio-App-Overview]]
