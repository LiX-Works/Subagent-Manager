# Native subagents: model and context selection

Updated 2026-10-12. The reference profile uses GPT-6.1 Sol Ultra for the lead. This reference governs delegated work, not the lead model or global configuration. The active tool definition and runtime instructions determine available combinations.

## Choose by task

| Work | Default candidate | Context and effort |
|---|---|---|
| Routine, clearly scoped extraction, organization, statistics, code location, small edits, and checks | `gpt-6-luna` | Usually `max`; explicit model/effort and a sufficient `none` handoff when required |
| Independent complex analysis, implementation, substantive source verification, and review | `gpt-6.1-sol` | Prefer `all` when the lead has the intended model and effort; usual inheritance is Sol Ultra |
| Selective expert consultation, difficult comparison, independent review, or specialist execution with concrete expected value | `gpt-6-astra` | Primarily `max`, `xhigh` where appropriate; usually `none` plus sufficient background under current override constraints |

These are defaults, not quotas or a mandatory escalation sequence. Luna takes Gemini's former routine text role. Gemini is now a video/frame specialist or an explicitly requested alternative; see [google.md](google.md). Do not select Astra solely because a task is important or named Expert Consultation. Suitable difficult assignments can go directly to Sol or Astra without another model failing first.

## Full-history inheritance

For a Sol assignment that benefits from the lead's background and matches its configuration, prefer `fork_turns: "all"`. This is intentional inheritance: omit model/effort overrides when the runtime says they are incompatible with a full-history fork. Do not use `all` to silently inherit an unintended model from a differently configured lead.

This replaces the former blanket requirement to explicitly set both fields for every new agent. Explicit arguments remain required for independent selection and external CLIs. Describe requested, inherited, and verified settings accurately.

`all` supplies available history at creation, possibly already compacted. It does not synchronize later messages, guarantee complete encrypted-reasoning transfer, or guarantee a prompt-cache hit. Larger input may be acceptable when background matters; raw token estimates are not a new approval gate or a direct measure of subscription allowance.

## Independently configured calls

Use `none` when independently selecting Luna or Astra requires it, or when separation from the lead's prior judgments benefits the work. It does not isolate files or permissions. Supply necessary original requirements, source material, confirmed decisions, relevant attempts, and unresolved issues; see [delegation.md](delegation.md).

If another interface explicitly allows a positive numeric history limit together with independent model/effort selection, a larger supported limit may be considered for phase-specific history. Check its documented semantics rather than assuming complete coverage from the number of user messages. Small partial-history forks are not routine, and a large number is not automatically `all`. Under an interface exposing only `all` and `none`, use those supported values.

For Sol calls intentionally using explicit effort instead of inheritance:

| Effort | Typical use |
|---|---|
| `low` | Clear, readily checked work where speed matters; often suitable for Luna |
| `medium` | Well-supplied, bounded work with some analysis |
| `high` | Complex coding, multi-step analysis, or source verification |
| `xhigh` | Difficult analysis, consultation, or substantive review |
| `max` | Especially difficult reasoning, implementation, or diagnosis |
| `ultra` | Allowed when supported and appropriate, including intentional inheritance from the usual Sol Ultra lead |

There is no rule excluding Ultra from Sol defaults. Do not infer that an Ultra child is necessarily more accurate or more willing to delegate than a Max child. Codex labels and API parameters are not automatically interchangeable; exact single-model reasoning budgets have not been compared here.

## Astra policy remains unchanged

Expert Consultation, Independent Review, and Task Execution are responsibilities, not special runtime modes. When Astra is selected for any of them, use primarily `max`, with `xhigh` as an appropriate task-specific alternative. This revision introduces no Ultra default and does not restore lower efforts as routine Astra routes. Other configurations remain possible when explicitly requested or justified by a concrete task.

Use Astra selectively for useful cross-model scrutiny, closing a consequential gap, or taking over a difficult bounded problem. Agreement between models is not a substitute for evidence. Do not give the expert only the lead's preferred conclusion; consultation without inherited history needs adequate original material.

## Coordination and availability

Coordinate one level by default. If nesting adds value, specify its purpose, file ownership, and expected delivery, then apply the explicit-selection or deliberate-inheritance rule at every level. Tool access, permissions, and concurrency limits still apply. Do not claim a configuration is verified when metadata is unavailable.

Luna normally uses `max`; do not request an unsupported Ultra level. Older GPT-6 Sol and GPT-5.6 models are compatibility or explicitly requested fallbacks, not routine replacements. Retained lower bounds: `xhigh` for GPT-5.6 Luna and `high` for GPT-5.6 Terra; GPT-5.6 Sol has no hard lower bound, with `high` or above preferred for demanding work. Never silently replace an unavailable requested model.

## Evidence boundaries

Model recommendations are configurable workflow defaults, not correctness probabilities or universal rankings. Public benchmarks may inform a choice, but do not establish exact reasoning budgets or an Ultra advantage. Use [current official subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents) and the actual session interface before adopting a new combination.

Evaluate results, omissions, rework, latency, and actual included usage. Do not convert API or benchmark dollar costs into subscription task counts, or enable paid usage to make a route available.
