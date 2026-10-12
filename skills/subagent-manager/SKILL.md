---
name: subagent-manager
description: Coordinate Codex subagents and external CLI specialists, choose models and context handoffs, assign file ownership, verify deliverables, and monitor Grok usage. Use for delegated research, material processing, coding, video analysis, and delegation-rule maintenance when coordination improves the task.
---

# Subagent Manager

The lead agent owns the user goal, coordination, and final delivery. Delegate when independent work, useful parallelism, specialized tools, or substantive review offers a practical benefit. Existing user authorization permits suitable delegation without asking each time; it does not expand the task or override runtime constraints. Later explicit user instructions supersede earlier tentative preferences.

## Language

Use the user's language for user-facing replies and progress updates. Follow the requested language for deliverables. Preserve code, tool names, parameters, paths, and identifiers verbatim. These English instructions do not require English conversation.

## Routing

The reference profile uses GPT-6.1 Sol Ultra for the lead. Adapt model choices to the user's actual environment; do not change the lead model or global configuration to implement this skill.

| Delegate | Suitable work | Default and reference |
|---|---|---|
| GPT-6.1 Sol | Independent complex analysis, implementation, substantive verification, and review | Prefer `fork_turns: "all"` when the intended configuration matches the lead; [native models](references/native-models.md) |
| GPT-6 Luna | Routine extraction, organization, statistics, code location, bounded edits, and readily checked work | Usually `max`, with explicit model/effort and a sufficient `none` handoff; [native models](references/native-models.md) |
| GPT-6 Astra | Selective expert consultation, independent review, difficult execution, or useful cross-model comparison | Primarily `max`, `xhigh` when appropriate; sufficient `none` context when independent selection requires it; [delegation](references/delegation.md) |
| Gemini through Antigravity CLI (AGY) | Video and related frame analysis when requested or when visual understanding materially helps a video task | `gemini-3.8-flash-high` with `high`; [video workflow](references/google.md) |
| Grok CLI | Useful search enhancement, particularly original X posts, threads, competing claims, and timely research | Proactive, focused research is encouraged; [Grok](references/grok.md) and [usage monitoring](references/grok-budget.md) |

Luna replaces Gemini's former routine text-processing role. Ordinary drafting, classification, and long-text matching do not independently trigger Gemini. Outside video/frame specialization, use Gemini only when the user explicitly requests it. Expert Consultation is a responsibility, not a special vendor tool mode or automatic model upgrade. Astra is selective, not a routine requirement. Suitable difficult work may go directly to a capable delegate without first making a smaller model fail.

## Model and context selection

- Deliberate `all` inheritance is an exception to explicit model/effort arguments. Where the interface requires full-history forks to inherit both settings, omit incompatible overrides and state the intended inheritance. Do not avoid `all` solely to reduce raw token counts; cache hits are not guaranteed.
- For independently configured native agents and external CLIs, explicitly set the model and supported effort in the actual call. Naming a model in `message` is not configuration. Report an unavailable combination rather than silently substituting another one.
- `none` omits parent conversation history, not system instructions, tools, environment information, or file access. Supply the background needed for the assignment. Important Astra consultation may require substantial phase-specific source material, decisions, prior attempts, and unresolved questions beyond a short summary.
- If an interface explicitly supports numeric history limits together with independent selection, a sufficiently large supported limit may be considered for relevant phase history. Do not assume a number equals `all`, count it as task executions, or pass unsupported values. Small numeric forks are not the routine default.
- Available history may already be compacted; later parent messages require explicit updates. Treat encrypted reasoning as system-managed state, not an ordinary handoff document or guaranteed full transfer.
- Briefly identify the responsibility and requested or inherited settings. Check actual metadata when available and material; distinguish requests from verified settings. Reuse a confirmed configuration for follow-ups.

## Handoff and execution

- Scale the message to the assignment: goal, current stage and confirmed decisions, necessary inputs, evidence versus assumptions, writable scope, expected result, and completion criteria where relevant. Provide source paths or excerpts rather than making the delegate reconstruct the project. Short self-contained work can use short instructions; there is no fixed word count or compulsory form. Read [delegation](references/delegation.md) for substantive consultation or shared-file work.
- Allow delegates to question assumptions. If key context is missing, they should read assigned materials first, then tell the lead what is missing. The lead handles ordinary clarification; genuinely new authorization or consequential user choices remain with the user.
- Assign files or modules before concurrent editing, and have the lead respect the same ownership. Independent outputs can share a project directory. Serialize changes to shared files; use a copy or worktree when isolation materially helps, not for every task. A task name or textual read-only request is not a filesystem sandbox. One live Origin session has one writing executor.
- Reuse a delegate for useful related follow-ups. State new evidence, changed requirements, and results to preserve. Do not replay completed writes or rebuild artifacts merely because another message arrived. A completed turn and an accepted overall assignment are different.
- Native agents use capabilities actually exposed in their session. External CLIs have separate contexts and integrations; they do not automatically inherit Codex's Skills, MCPs, search tools, or credentials. Use an identified authorized workspace and suitable runtime limits, without mixing projects or bypassing permissions.
- The lead checks delivered files, coverage, evidence, and relevant behavior proportionally to the task. A success flag, fluent answer, or stronger model name does not establish correctness. Preserve specialist results and uncertainty without repeating all their work or requiring a second reviewer every time. Resolve real disagreements with sources or focused checks.
- Inspect uncertain outcomes before retrying. Narrow a task, add context, reuse the agent, or take over as useful. Avoid indefinite retries, duplicate names, and overlapping writes. Prefer an in-place update or complete file replacement over separate deletion and recreation calls.
- Coordinate one level by default; nesting is allowed when it has a concrete benefit. Apply selection, handoff, ownership, and runtime rules at every level. Ultra is not required for delegation and does not guarantee that a child will delegate.
- Native spawning and external CLI calls do not require a new user-facing app chat. Create a separate app task only when the user asks.

## Usage and maintenance

Use only authorized free or subscription-included capacity. Do not enable metered APIs, overage, automatic recharge, credential copying, or account rotation to bypass limits. Report missing tools or dependencies with the affected stage and minimum preparation while independent authorized work continues.

Grok research remains encouraged when useful. Observed daily consumption strictly above 30% of the full weekly allowance triggers an advisory reminder, not a pause or approval gate. Query around five substantive research units, adjusted to the actual work. Preserve the existing Asia/Shanghai ledger boundary and storage; see [grok-budget.md](references/grok-budget.md). Do not infer subscription capacity from API prices or raw token totals.

Load only the reference needed for the selected route. Use [experience.md](references/experience.md) for validation boundaries and reusable observations. Record new experience only within an authorized task location, without changing global memory or unrelated Skills. Historical entries are not current policy. When available, use the companion `agent-search-booster` skill for search acquisition and its GitHub access guidance; otherwise use available authorized tools. Do not duplicate its tool catalog here.
