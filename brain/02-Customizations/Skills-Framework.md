---
title: Skills Framework (SKILL.md)
type: customization
updated: 2026-10-14
tags:
  - customization
  - skills
  - workflows
---

# Skills Framework (SKILL.md)

## Purpose
Skills are modular runbooks that teach the agent how to perform specialized multi-step procedures, interact with custom CLI tools, or follow repository-specific workflows.

## Directory Layout
Skills must be placed in a `skills/<skill_name>/` directory:

```
skills/<skill_name>/
├── SKILL.md          # Required: Frontmatter and step-by-step procedures
├── scripts/          # Optional: Helper executable scripts
├── examples/         # Optional: Example inputs and outputs
├── resources/        # Optional: Templates, assets, configuration snippets
└── references/       # Optional: Detailed subdocumentation loaded on demand
```

## Frontmatter Specification
The `SKILL.md` file must begin with YAML frontmatter containing `name` and `description`:

```markdown
---
name: portfolio-workflow
description: >-
  Use this skill when developing, refactoring, linting, or building the
  React portfolio web application.
---
```

- `name`: Lowercase, hyphen-delimited string matching the folder name.
- `description`: Third-person explanation of what the skill does and exact conditions under which it should be activated.

## Best Practices
1. Progressive Disclosure: Place lengthy reference material in `references/` rather than the main file.
2. Concrete Verification: Provide exact CLI verification commands (e.g., `npm run lint`).
3. Clean Formatting: No badge links, no gradients, and strictly unambiguous instructions.

## Related Notes
- [[01-Architecture/Context-Management]]
- [[02-Customizations/Rules-System]]
- [[04-Workflows/Feature-Development]]
