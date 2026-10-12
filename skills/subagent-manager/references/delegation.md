# Expert consultation, handoff, and delivery

Updated 2026-10-12. Delegate for independent delivery, useful parallelism, focused context, or substantive scrutiny. The user chooses the lead model; another agent is not automatically a capability upgrade.

## Responsibilities

| Responsibility | Suitable situation | Deliverable |
|---|---|---|
| Expert Consultation | The executor can proceed but needs a route choice, assumption check, difficult analysis, or correction | Recommendations, evidence, important conditions, unresolved questions, and a practical next step |
| Task Execution | A difficult bounded portion can be handed over end to end | A directly usable implementation, derivation, analysis, or other result |
| Independent Review | Existing work has a substantive risk or verification gap worth checking | Specific findings, evidence, impact, and necessary corrections |

These are responsibilities, not built-in tools or vendor-specific modes. Consultation is not automatically Astra work. Follow [native-models.md](native-models.md); Astra remains primarily Max with Xhigh where appropriate for all three roles.

## When consultation helps

Consider unresolved assumptions, plausible competing routes, conflicting evidence, consequences of a wrong direction, repeated stalls, and whether the result is directly checkable. Length, file count, importance, or an upcoming release alone does not require consultation. For unfamiliar work affecting substantial later decisions, obtain source material and choose direct progress, independent consultation, or complete handoff according to benefit.

Suitable difficult work can be handed over immediately. Do not require another model to fail first, impose opening or final consultations on every task, or invent parallel work for tightly coupled sequential steps. Short or sequential assignments can still benefit when handoff costs are justified.

## Supply sufficient context

Scale the message to the assignment, without a compulsory form or word count. Include details that affect the result:

- The original user goal, current phase, confirmed decisions, and specific question or work to resolve.
- Necessary source paths or excerpts, actual failures, and verifiable evidence. Distinguish observed facts, assumptions, and the lead's proposal.
- Relevant methods already tried, their outcomes, and reasons for rejecting alternatives, particularly for Astra consultation without inherited conversation history.
- File/module ownership, applicable authorization, the expected result, and meaningful completion criteria.

A short factual check may need only a few sentences. A major judgment may need substantial original phase material. Let the delegate read necessary files instead of copying an entire project, but do not replace essential evidence with only a summary of the lead's view. Do not provide or request hidden chain-of-thought; encrypted reasoning is not an ordinary handoff document.

`none` removes parent conversation history, not instructions, tools, environment information, or filesystem permissions. `all` supplies available history at creation and still needs a concrete assignment. Numeric history limits are optional only where the interface supports them with the intended model selection; a large number does not establish complete historical coverage.

When key context is missing, the delegate should read assigned materials first and then describe the remaining gap to the lead. The lead resolves ordinary clarification. Coordinate a material scope expansion before acting; the lead takes genuinely new authorization or consequential user choices to the user.

## Shared files and live sessions

Agents may share a working directory and immediately see each other's edits. Task names do not reserve files, and a textual read-only request is not an operating-system sandbox.

Assign non-overlapping files/modules before concurrent editing. The lead observes the same ownership. Independent output files can share a project; reconcile them before updating a shared database or final document. Serialize edits to genuinely shared files. Use a copy or worktree when isolation materially helps, not universally. One live Origin session has one writing executor.

Keep work within the user's task and existing authorization. External CLIs have separately configured contexts and integrations; identify their directory and execution restrictions rather than assuming the native agent environment. Textual scope, plan mode, or a sandbox label does not prove a specific file restriction is enforced.

For routine replacement, prefer an in-place patch or complete file replacement over separate deletion and recreation calls. If interrupted, inspect resulting files and restore a missing reference from its preserved backup before resuming. This does not authorize cleanup of unrelated files.

## Follow-ups and acceptance

Use `send_message` to provide information without starting a new turn. Use `followup_task` for additional work under the active interface's behavior. Explain new evidence, changed requirements, and prior results to preserve. Reuse a delegate for related work; start a new one when a genuinely independent view or distinct configuration helps. Use unique names and inspect uncertain outcomes before recreating tasks.

A follow-up should not automatically replay completed writes or regenerate the entire result. State completed and unfinished portions clearly. Notifications or turn completion are not acceptance of the whole assignment. Waiting for updates is not a task deadline.

Accept results through relevant artifacts, sources, coverage, or behavior. Avoid repeating every specialist step, fixed review counts, or automatic final reviewers. Preserve important conditions and uncertainty when integrating results. Resolve disagreements using sources or focused checks rather than model reputation or intuition.

If many steps repeatedly need consultation, consider handing over the difficult portion end to end. Narrow failed work, add missing context, or take over when useful. Do not silently change the user's lead model or retry indefinitely.

## Nested work and evidence

Coordinate one level by default. Nesting is allowed when it has concrete value; specify responsibilities and apply selection, context, ownership, permission, and acceptance rules at each level. Ultra is not required and does not guarantee more active child delegation.

Keep reusable dated observations in [experience.md](experience.md), not universal model rankings, fixed optimal consultation counts, or unsupported Ultra-versus-Max budget claims. Optional [third-party consultation guidance](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool), [cost/quality discussion](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence), and [routing practice](https://arize.com/blog/how-i-cut-coding-agent-costs-with-model-harness-routing/) are methodological background, not runtime integrations or authority to override the user's current choices.
