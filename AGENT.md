# Antigravity Agent Configuration (AGENT.md)

## 1. System Identity and Scope
This document governs the operational rules, behavior, architecture, and coding standards for AI agents operating within this workspace. The workspace contains a modern portfolio web application built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## 2. Core Operational Constraints

### 2.1 Browser and UI Testing Rules
- Do not launch physical browser instances (Chrome, Edge, Firefox, Safari) during testing, verification, or execution.
- Automated tests and verification scripts must run exclusively in headless mode via CLI or terminal environments.
- Interactive GUI test modes (such as Cypress GUI or Playwright headed mode) are prohibited.
- Do not spawn unrequested background dev servers or browser preview tabs unless instructed by the user.

### 2.2 System Safety and Command Execution
- Do not execute destructive system commands without explicit user confirmation.
- Restrict file modifications strictly to paths within this workspace.
- Avoid invoking `cd` commands in shell operations; rely on explicit working directories.
- Always check exit codes and stderr for commands executed via terminal.

### 2.3 Style and Content Constraints
- Do not include status badges (shields.io or custom badge images).
- Do not include CSS or SVG gradients in markdown documentation or generated documentation files.
- Maintain direct, technical language without vague catch-alls such as "etc." or filler text.

## 3. Project Architecture

### 3.1 Technology Stack
- Framework: React 19 (`react`, `react-dom`)
- Build Tool: Vite 7 with `@vitejs/plugin-react`
- Language: TypeScript 5.8 (Strict mode configured in `tsconfig.app.json` and `tsconfig.node.json`)
- Styling: Tailwind CSS v4 via `@tailwindcss/vite`
- Animation & Motion: Framer Motion, Lenis smooth scrolling
- Icons: Lucide React, React Icons, Feather Icons
- UI Primitives: Radix UI (`@radix-ui/react-popover`, `@radix-ui/react-slot`)
- Charts: Recharts
- Analytics & Deployment: Vercel Speed Insights, Vercel configuration (`vercel.json`)

### 3.2 Directory Conventions
- `src/components/`: Reusable modular UI components.
- `src/lib/`: Utility functions, helper classes, and shared library initializers.
- `src/types/`: TypeScript type definitions and shared interfaces.
- `src/assets/`: Static image and SVG assets.
- `src/dataset.ts`: Static data sources, portfolio projects, experience records, and metadata.
- `src/index.css`: Global styles, font definitions, and Tailwind CSS imports.
- `public/`: Public static assets served without processing.

## 4. Coding Standards

### 4.1 TypeScript Guidelines
- Avoid the `any` type. Define explicit interfaces or type aliases in `src/types/` or local to the component.
- Ensure strict null checks are respected. Handle `undefined` and `null` explicitly.
- Use TypeScript type inference where obvious, but require explicit return types for library functions and custom hooks.

### 4.2 Component Architecture
- Prefer functional components with React Hooks.
- Ensure component props are typed using TypeScript interfaces or types.
- Encapsulate side effects in `useEffect` with comprehensive dependency arrays.
- Keep components focused on a single responsibility; split complex UI into subcomponents.

### 4.3 Styling and CSS
- Utilize Tailwind CSS utility classes conforming to Tailwind v4 standards.
- Use `clsx` and `tailwind-merge` (via standard utility function in `src/lib/utils.ts`) when merging conditional class names.
- Avoid inline `style={{ ... }}` objects unless calculating dynamic runtime positions or transforms.

### 4.4 Verification and Quality Assurance
- Run linting checks using `npm run lint`.
- Verify build integrity with `npm run build` (`tsc -b && vite build`) after structural changes.
- Ensure zero TypeScript compiler errors before completing tasks.

## 5. Interaction Protocol
- Confirm intent when requests involve irreversible data deletion or major dependency changes.
- Provide direct diffs and explanations of changed logic.
- Reference modified files with exact workspace paths.
