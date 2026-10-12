# Google: Gemini through AGY CLI

## Role and model

Gemini is a specialist option for video understanding and related key-frame analysis. Use it when the user names Gemini or when interpreting video content has a clear benefit for the current task. It is no longer a default candidate for general reading, classification, extraction, drafting, long-corpus analysis, or exact matching. Route routine, mechanical work to Luna Max; use the native-model rules for more demanding work. Other Gemini assignments require an explicit user request and task-appropriate verification.

Explicitly request `gemini-3.8-flash-high` and `--effort high`. A High setting neither guarantees detailed output nor removes hallucinations. Do not treat a generic CLI option such as `max` or `xhigh` as a supported higher setting for this model without checking the actual model interface. Gemini 3.1 Pro is not an automatic upgrade; select it only for a specific demonstrated benefit or at the user's request.

AGY is an independent CLI environment. It does not automatically share Codex's conversation, Skills, MCP configuration, or search tools. Give it the necessary task context and accessible materials. Its own tool and MCP features must be configured and verified separately; help text alone does not establish runtime capability.

## Entry point and boundaries

- Resolve `agy` from `PATH`, or pass its executable path through the wrapper's `-Executable` parameter. Reuse the original client's login; the user completes login in that client. Do not read authentication files, copy credentials, switch accounts automatically, or replace API keys after an expiry or quota error.
- Desktop and CLI are separate entry points. Do not launch the desktop app or alter its shortcuts merely to run a CLI task.
- Use only authorized free or included allowance. Do not enable metered APIs, overage, top-ups, or subscriptions. Documented Gemini API features do not authorize switching from the existing AGY entry point to a paid API.
- [invoke-agy.ps1](../scripts/invoke-agy.ps1) accepts a UTF-8 prompt file, workspace, output directory, model, effort, and timeout. It defaults to `plan` with `--sandbox`, and removes optional API-key environment overrides from its child process. These settings and a "read-only" prompt are not proof of filesystem isolation; check the actual workspace, policy, and visible behavior.
- Choose an authorized project directory or a dedicated task directory according to the assignment. Specify file responsibility and permitted actions. Do not bypass permissions or grant unrelated external-write authority. If original files cannot be protected adequately, provide isolated copies of the required materials.

From the Skill directory, with an existing prompt file and workspace:

```powershell
pwsh -NoProfile -File './scripts/invoke-agy.ps1' -PromptFile 'C:/work/video-review/prompt.txt' -Workspace 'C:/work/video-review/work' -OutputDirectory 'C:/work/video-review/result' -Model 'gemini-3.8-flash-high' -Effort high -DryRun
```

Remove `-DryRun` to execute an authorized task. The output directory must be new or empty; existing results are not overwritten. The default timeout is 180 seconds; adjust `-TimeoutSeconds` to the task rather than imposing one universal limit. The wrapper limits prompt length to its Windows argument budget, so put substantial evidence in accessible files and use precise paths instead of an oversized inline prompt. Inspect generated code before executing it.

The wrapper saves the final reply and visible usage metadata, not raw stderr, internal reasoning, or a complete tool audit. Successful process execution is not acceptance of the answer. For authorized editing, `-Mode accept-edits` is available; the lead agent still coordinates file ownership and checks the changes.

The public wrapper has no fixed proxy address. When `-ProxyUri` is omitted, it inherits the process's existing network environment; an empty value does not clear an inherited proxy. To select a proxy explicitly, supply a currently authorized HTTP(S) address without embedded credentials. This override applies only to the child process; do not modify the system proxy, `PATH`, Python, or existing routing configuration. A previously successful route is not guaranteed to work now. If service-region access fails, preserve the actual error; an IP site's location is not proof of Google's acceptance. Check the current CLI help when behavior or version changes.

## Video inputs and sampling

Keep the input route and its verified controls explicit:

| Route | Available control and evidence boundary |
|---|---|
| Existing AGY media tool | A successful AGY 1.3.2 test read an MP4 using `view_file`. The observed call accepted a file path; FPS, time-range, and media-resolution controls were not exposed or verified. Writing "use 2 fps" in the prompt does not prove that rate was applied. Recheck the actual tool schema if it changes. |
| Direct Gemini API | Official static-video processing supports `processing.fps`, `processing.start_offset`, and `processing.end_offset`. Media resolution is a separate setting. This describes an API capability, not the current AGY tool or authorization to use another billing route. |
| Locally prepared frames | A local tool can select frames and record source timestamps, frame IDs, dimensions, and the actual extraction settings in a manifest. Gemini then receives images, rather than the original native-video input. This controlled-frame workflow has not yet been validated locally; confirm its image-reading and task accuracy when first used. |

Choose sampling density from the task: scene summaries and brief on-screen transitions need different temporal coverage. FPS controls which moments are observed; resolution affects the detail available within a frame. More frames do not repair unreadable source text, and higher resolution does not recover an unsampled event. Do not enforce a fixed FPS, automatic frame extraction, or one chunk length for every video. When exact controls matter and AGY does not expose them, consider preparing frames locally within the user's authorized scope.

For long videos, segment when it improves coverage or reliability. Preserve source IDs and each clip's global offset. Distinguish clip-relative time, original-video time, model-estimated time, and timestamps recorded during extraction. Check boundaries or use overlap when an event might span clips; do not infer full coverage from a plausible summary. An image-only input does not include the original audio unless audio or a transcript is separately supplied.

Report a setting as applied only when it is established by tool arguments/results or prepared-input records. The model's claim that it sampled at a requested rate is insufficient.

## Evidence handoff

Gemini can return a short answer even at High. Request complete task evidence rather than merely saying "be detailed." Adapt the following prompt to the assignment; do not force a fixed word count, JSON schema, or disclosure of hidden reasoning.

```text
Produce a detailed, evidence-based handoff for the lead agent.

Goal and questions: <what must be established>
Inputs: <authorized media paths, source IDs, and any frame manifest>
Relevant background: <confirmed decisions, constraints, and open issues>
Scope: <requested ranges, permitted actions, and output language>

Report which files, time ranges, or frames you actually inspected,
including gaps or inaccessible inputs.

For each relevant observation, provide a source timestamp or frame ID,
literal visible text or accessible audio content, supporting evidence,
and uncertainty. Preserve identifiers, numbers, signs, decimals, and
units exactly as observed. Mark unreadable or unobserved details as
unknown. Do not fill gaps from expectations or surrounding context.

Separate observations from interpretations. Distinguish clip-relative
timestamps from original-video timestamps. Mark estimated timing as
approximate; do not invent precision. If only images were supplied,
do not claim to have inspected the video's audio or intervening frames.

Return the complete requested timeline, evidence, and findings.
A short summary alone is insufficient. If unfinished, identify the
remaining work and what additional material is needed.

Only report sampling settings as applied when verified by the tool
or prepared inputs. If essential context is missing, read the supplied
materials first, then report the specific gap to the lead agent.
```

Request direct, clear instructions and observable results. Do not rely on repeated "think harder" language, a lengthy chain-of-thought demand, or a default temperature of zero as a universal hallucination remedy. Preserve the requested output language, literal source content, and the distinction between evidence and inference.

## Acceptance and known limits

The lead agent checks consequential details against the media or other original evidence, using targeted inspection rather than automatically replaying every video in full. Check timing, literal text, numbers, units, and entity-to-event correspondence separately from the overall interpretation. For dense interfaces, charts, brief states, or precise time alignment, inspect relevant frames and verify source offsets. If a core claim remains unverified, retain uncertainty or obtain a better input instead of presenting it as established.

The October 2026 local test confirmed direct reading of an approximately 22-second MP4 through AGY 1.3.2 using `gemini-3.8-flash-high` and High effort. Its main interpretation was useful, but it omitted a `Working...` interval and misstated some numbers and time anchors. Requested 2 fps was not confirmed. This establishes a working media-read path and task-specific accuracy limits, not complete video-analysis reliability.

Earlier six-question and writing trials remain historical observations: some answers, code checks, and structural suggestions were useful, while proof presentation, overstated rules, and editorial claims needed correction. They did not validate long-corpus exact matching, broad tool use, or superior writing ability. Those general-purpose roles are no longer the default Gemini assignment. User observations about errors motivate this routing choice; do not turn them into an unsupported universal hallucination rate or assume the web app, AGY, and direct API behave identically.

References checked in October 2026:

- [Google: video understanding](https://ai.google.dev/gemini-api/docs/video-understanding) documents static processing, sampling, clipping, and video-input behavior; it does not establish which controls AGY forwards.
- [Google: Gemini 3 developer guide](https://ai.google.dev/gemini-api/docs/gemini-3#prompting-best-practices) recommends direct instructions and explicit output guidance when more detail is needed.
- [Google AI Developers Forum: reported timestamp drift](https://discuss.ai.google.dev/t/bug-gemini-3-flash-and-3-1-pro-progressive-timestamp-drift-in-audio-transcription/129501) provides user-reported cases supporting separate timing checks. These are case reports, not a general hallucination-rate estimate or proof of the same bug in the current local model.
