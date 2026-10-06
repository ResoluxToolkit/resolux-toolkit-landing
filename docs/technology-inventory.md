# ResoluxToolkit technology audit

Source: all text files in the supplied `docs_2.zip`, including the Arena MCP instructions fixture. The user’s later scope change supersedes the original native UI descriptions: Swift engine on macOS, web frontend in progress. This inventory is product architecture, not the landing-site stack.

| Technology | Relationship and status | Original evidence |
| --- | --- | --- |
| Swift, macOS, Swift Package Manager | Engine and modular packages | ESTADO-E-ROADMAP.md:9 |
| MCP, stdio, JSON-RPC, Unix sockets | Engine → Arena tools; ProcessMCPTransport and readiness probe | ESTADO-E-ROADMAP.md:18–19 |
| Bonjour, mDNS, _http._tcp | Local discovery of Arena | ESTADO-E-ROADMAP.md:18; REVISAO-SESSAO.md:106 |
| REST, HTTP, /api/v1 | Read-only ArenaREST state/monitor; one-second polling | ESTADO-E-ROADMAP.md:27–28 |
| Apple Foundation Models, Ollama | Preferred local AI and fallback, not simultaneous required services | ESTADO-E-ROADMAP.md:20–21 |
| ToolPolicy, ToolSchemaNormalizer, ToolCallTextRescue | Restricted tool loop, normalization and model compatibility | ESTADO-E-ROADMAP.md:21–23 |
| WriteJournal, JSONL | Experimental measured journal, not committed in original snapshot | ESTADO-E-ROADMAP.md:25 |
| TimelineCalculator, OperationMode, ModeGate | Timeline calculations; performance mode restricts operations | ESTADO-E-ROADMAP.md:26–27 |
| AVFoundation, Continuity Camera | Local camera preview documented in prior Mac shell; do not claim web camera implementation | ITERACOES.md:38 |
| Filesystem, tar.gz, OpenClaw, .spike | Backup targets, not agent/API integrations | ESTADO-E-ROADMAP.md:14–15 |
| Keychain, UserDefaults, /chat/completions | Provider configuration, local credential/settings storage | ITERACOES.md:24 |
| SwiftUI, AppKit, UIKit | Previous native UI; superseded by web scope, iOS was scaffold | ESTADO-E-ROADMAP.md:9,23–29 |
| Metal, MEVOLIT, BorderBeamKit | Previous design system shaders; not a new web or video dependency | AGY-CONTRIB.md:11,38; ITERACOES.md:28–29 |
| Telegram | Previous QR card only; no documented bot or API | ESTADO-E-ROADMAP.md:14; AGY-CONTRIB.md:135 |
| TouchDesigner, OSC | Proposed external execution/processing bridge, not working landing integration | NDI-POLICY.md:14; REVISAO-SESSAO.md:20–24 |
| NDI® | Policy/planning only: explicitly no code or dependency; license prerequisites | NDI-POLICY.md:5,11,50; ESTADO-E-ROADMAP.md:59 |
| Syphon | Existing Arena framework; proposed short macOS bridge only, no Resolux video code | HANDOFF.md:492–505 |
| DXV/DXV3, DXT1/DXT5, BC1/BC3, squish, H.264, HEVC, ProRes, MJPEG, Alley, MoltenVK | Arena analysis/context, not Resolux engine integrations | HANDOFF.md:470–505 |
| Web frontend | Current user requirement; transport/framework not specified in supplied original docs | User scope change, 2026-10-06 |

## Representation rules
- Main animated connections show only documented engine/AI/Arena relationships.
- Dashed web connection expresses scope, not an invented HTTP/WebSocket transport.
- Planned video/venue bridges are separate and explicitly inactive.
- Official logo paths come from Simple Icons; Resolume logo comes from the official Resolume asset host. Generic labeled symbols are used for unbranded protocols and technologies without available official artwork. No invented logo claims.
- The map is an architectural illustration, not live telemetry.