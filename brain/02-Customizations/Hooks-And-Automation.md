---
title: Lifecycle Hooks & Event Automation
type: customization
updated: 2026-10-14
tags:
  - customization
  - hooks
  - automation
---

# Lifecycle Hooks & Event Automation

## Purpose
Lifecycle hooks allow engineering teams to execute automated shell scripts or validation tools before or after agent lifecycle events (e.g., pre-tool execution, post-tool execution, session startup).

## Configuration File
Hooks are registered in `hooks.json` inside a customization root:
- Workspace: `.agents/hooks.json`
- Global: `~/.gemini/config/hooks.json`

## Supported Lifecycle Events

Event | Trigger Point | Common Use Case
:--- | :--- | :---
`session_start` | When a new agent conversation initializes | Environment sanity checks, dependency verification
`pre_tool_call` | Immediately prior to tool execution | Security policy enforcement, argument sanitization
`post_tool_call` | Immediately following tool execution | Automated formatting (`prettier`), cache invalidation
`session_end` | When conversation session terminates | Cleanup temporary files, state synchronization

## Hook Definition Format

```json
{
  "hooks": [
    {
      "event": "post_tool_call",
      "matcher": { "tool": "replace_file_content" },
      "command": "npm run lint -- --fix"
    }
  ]
}
```

## Related Notes
- [[02-Customizations/Rules-System]]
- [[03-Tools-And-Environment/Terminal-And-Execution]]
