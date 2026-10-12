# Validation notes and reusable observations

These notes summarize task-specific observations and the limits of the published workflow. They are not universal performance claims or replacements for current tool definitions.

## Context and coordination

- Read-only routing checks covered intentional Sol full-history inheritance, independently configured Astra with a sufficient handoff, Gemini video sampling claims, and Grok advisory usage reminders.
- Full-history forks inherit the lead's model and reasoning effort under the current interface. Independent overrides require `none` plus task-specific background. Check the active interface before adopting another combination.
- A child can delegate when its tools permit it, but a high reasoning label does not guarantee further delegation. State the responsibility when nesting has a concrete benefit.
- `none` separates conversation history, not files or permissions. Explicit ownership and serialized shared-file edits remain necessary.
- These checks validate instruction routing; they are not a new end-to-end test of every provider or model combination.

## Gemini video path

An October 2026 test used AGY 1.3.2 and `gemini-3.8-flash-high` with High effort to read an approximately 22-second MP4. The broad interpretation was useful, but a brief interface state was omitted and some numbers and time anchors were inaccurate.

The request mentioned 2 fps, but the observed tool invocation did not verify an applied sampling rate. Treat textual sampling requests as preferences until tool arguments, results, or prepared-input records establish the setting. Controlled local frame preparation is an optional route that has not been validated here.

Check timestamps, literal text, numbers, units, and event correspondence separately. A plausible summary or success flag does not establish complete coverage. See [video handoffs](google.md).

## Grok monitoring

The snapshot ledger stores supplied observations; it does not query a provider or inspect authentication. Its daily total is an observed lower bound when sampling misses part of the day. Exactly 30 percentage points does not trigger the above-threshold reminder; a larger observed daily value triggers an advisory state without pausing research.

The threshold, check cadence, and day boundary are configurable workflow choices. Keep written rules and script constants aligned when adapting them. See [usage monitoring](grok-budget.md).

## Recording new observations

Within an authorized project location, record the date, tool version, requested and verified settings, input scope, observable result, remaining uncertainty, and whether any policy changed. Keep historical observations separate from current instructions.

Exclude credentials, cookies, account snapshots, private source text, personal paths, and raw session logs from public notes. Publish only the reusable finding and enough non-sensitive context to understand its limits.
