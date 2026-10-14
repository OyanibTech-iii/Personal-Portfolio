---
title: Component Catalog & Design System
type: project
updated: 2026-10-14
tags:
  - project
  - components
  - ui
---

# Component Catalog & Design System

## Component Organization
The UI components reside in `src/components/` and are organized by functional domain:

Category | Responsibility
:--- | :---
Layout & Navigation | Navigation bar, header, footer, mobile drawer menu
Hero & Introduction | Primary landing showcase, animated headlines, call-to-action buttons
Projects Showcase | Filterable project cards, modal detail previews, interactive demo links
Skills & Competencies | Categorized tech stack badges, proficiency ratings, experience metrics
Experience & Education | Chronological timeline cards, responsibilities, achievement bullet points
Contact & Inquiry | Interactive contact form with `@emailjs/browser` integration

## Design System Foundations
- Typography: Inter / Sans-serif variable font family.
- Color Palette: High-contrast dark theme with curated accent hues.
- Motion Guidelines: Smooth transitions managed via Framer Motion spring presets and Lenis scroll inertia.
- Utility Classes: Strict adherence to Tailwind CSS utility conventions without inline style hacks.

## Related Notes
- [[05-Project-Knowledge/Portfolio-App-Overview]]
- [[04-Workflows/Feature-Development]]
