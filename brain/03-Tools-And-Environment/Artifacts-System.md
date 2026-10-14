---
title: Artifacts System & Deliverables
type: environment
updated: 2026-10-14
tags:
  - environment
  - artifacts
  - reporting
---

# Artifacts System & Deliverables

## Purpose
Artifacts provide durable, rich markdown presentations for complex analysis, architectural plans, diff reports, and structured tables.

## Storage Location
Artifacts are stored inside the conversation workspace:
`<appDataDir>/brain/<conversation-id>/<artifact_name>.md`

Temporary data and one-off scripts are stored in:
`<appDataDir>/brain/<conversation-id>/scratch/`

## Metadata Schema
Every artifact created or modified includes `ArtifactMetadata`:
- `Summary`: Multi-line explanation of the artifact contents and intent.
- `UserFacing`: Boolean flag indicating whether the user should see the artifact in the presentation UI.
- `RequestFeedback`: Boolean flag indicating if user input or a proceed approval is requested.

## Formatting Guidelines
- Use fenced code blocks with explicit language identifiers.
- Use GitHub Flavored Markdown alerts (`[!NOTE]`, `[!TIP]`, `[!WARNING]`).
- Do not use status badges or shields.
- Do not use CSS or SVG gradients.
- Do not summarize artifact text inside conversation responses; direct the user to the artifact path.

## Related Notes
- [[01-Architecture/Memory-And-Transcripts]]
- [[04-Workflows/Feature-Development]]
