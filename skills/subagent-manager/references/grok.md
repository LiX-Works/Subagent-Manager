# Grok: proactive research and sustained searches

Use the optional Grok CLI when search enhancement can help the task. Original X posts, threads, timelines, competing claims, and cross-post tracking are useful routes; timely web research and dispute checking are also appropriate. Do not wait for other channels to fail before using a suitable route.

Prioritize original sources. Verify authors, dates, versions, and changes in claims; seek counterexamples and relevant official material for disputed topics. Group work around a clear question, follow up when an important gap remains, and wrap up when additional searches mostly repeat existing material. Do not manufacture work to consume quota.

Choose an available stable model and supported reasoning tier for the task. Usually start at High; consider Xhigh or another model when difficulty, coverage, or accuracy justifies it. Check the installed CLI's current help and model list rather than assuming a cached model name proves access.

## Invocation

Prefer the non-interactive CLI. For long Windows prompts, use a UTF-8 prompt file to avoid shell escaping issues. Run from an authorized task directory; specify scope, allowed actions, and output requirements.

Example invocation; verify the model ID and options against the installed CLI:

```powershell
grok --model grok-4.7 --reasoning-effort high --prompt-file 'C:/task/x-research.txt' --permission-mode plan --no-subagents --max-turns 8 --output-format streaming-json
```

Use a process timeout appropriate to the scope and observed progress. A quiet interval or queue is not automatically a failed request; inspect progress before restarting. Do not let repeated searches continue indefinitely without new evidence. `--max-turns` is not a process timeout or a tool-call limit.

For X research, do not copy an ordinary web-search example that restricts the tool set to `--tools web_search`. Historical tests with that restriction recorded ordinary WebSearch, whereas a clear X-search prompt using the default tools recorded XSearch. This is a version-specific observation; verify actual tool events and retrieved posts when material.

Use only supported tool names. Unknown names may be ignored, and a requested tool list is not proof of isolation. A plan mode and read-only prompt do not establish a filesystem sandbox. Assign file ownership, provide isolated copies when needed, and avoid permission bypasses.

Pass only necessary public or authorized material. Resume a session only for the same project and topic; a new session ID must follow the CLI's supported format. Return findings, original source links, relevant dates, disagreements, and unresolved questions. The lead checks consequential claims against original evidence.

## Usage and availability

Follow [usage monitoring](grok-budget.md). Observed daily consumption strictly above 30 percentage points of the full weekly allowance produces an advisory reminder only. Continue authorized research and future dispatches; a failed quota snapshot alone is a monitoring gap.

Use only authorized free or subscription-included capacity. Do not enable metered APIs, extra usage, recharges, or account rotation. Actual quota exhaustion, authentication failure, or service hard limits make the route unavailable; report the error and choose another authorized path. Do not infer account balance or actual charges from token counts or cost estimates.

Historical Grok Build tests found that `/usage` in an authenticated interactive terminal returned weekly account usage and reset time. Check the current interface and response before relying on that route. `grok usage <SESSION_ID>` reports one session's tokens/cost, not weekly remaining allowance; `grok -p "/usage"` has not been established here as an account quota command.

Successful web search does not prove X search works. A completed process does not prove source coverage or factual correctness, and old failures do not establish present service failure. Keep execution, retrieval, and answer acceptance separate.

## References

Consult the [CLI reference](https://docs.x.ai/build/cli/reference), [changelog](https://x.ai/build/changelog), and [usage FAQ](https://docs.x.ai/grok/faq) when current behavior matters. Optional process-level proxy examples are in [Windows proxy support](../../../extras/windows-proxy/README.md); no fixed proxy, account, or login configuration is bundled.
