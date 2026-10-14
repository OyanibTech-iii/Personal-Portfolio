---
title: Model Context Protocol (MCP) Integrations
type: customization
updated: 2026-10-14
tags:
  - customization
  - mcp
  - protocols
---

# Model Context Protocol (MCP) Integrations

## Purpose
The Model Context Protocol (MCP) connects the Antigravity agent to external tool ecosystems, databases, context servers, and remote APIs via a standardized protocol.

## Configuration Architecture
MCP servers are declared in `mcp_config.json`:
- Workspace Level: `.agents/mcp_config.json`
- Global Level: `~/.gemini/config/mcp_config.json`

## Example Configuration Schema

```json
{
  "mcpServers": {
    "git-service": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"],
      "env": {
        "GIT_PATH": "git"
      }
    },
    "filesystem-service": {
      "command": "node",
      "args": ["./tools/mcp-fs-server.js"]
    }
  }
}
```

## Transport Modes
1. `stdio`: Standard input/output communication for local CLI wrappers and node processes.
2. `sse`: Server-Sent Events over HTTP for networked services.

## Operational Best Practices
- Keep server scope restricted to only required capabilities.
- Combine MCP tools with workspace rules to prevent unsafe execution.
- Validate server availability prior to delegating mission-critical operations.

## Related Notes
- [[02-Customizations/Rules-System]]
- [[02-Customizations/Hooks-And-Automation]]
- [[03-Tools-And-Environment/Terminal-And-Execution]]
