<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep waitlist submissions and rate-limit records behind a server function with no public database policies, because subscriber emails and request fingerprints are private.
- Expose only static, read-only product information through the public MCP server, because the server has no caller authentication.
- Present ResoluxToolkit as a Swift engine on macOS with a web-based front-end; never describe the UI as a native macOS/iOS app, because the product scope changed from native to web front-end.
- Keep the animated product ecosystem in a dedicated browser-safe component with a source-backed inventory, using official brand paths where available and clearly labeled protocol symbols otherwise; this separates product architecture from the landing stack and avoids invented integrations.- Feed the site AI guide only from content/guide/knowledge.md and validate suggested anchors against the parsed index in code, because the guide must not invent facts or link to missing sections.
