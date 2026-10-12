# Encouraging Grok Use, Quota Checks, and Reminders

Updated 2026-10-06. Strongly encourage proactive Grok use for search enhancement whenever it is expected to help the task; goal-directed, sustained queries are allowed. Use one reminder threshold for quota. It is not a task interruption or dispatch approval condition.

## Invocation Principles

Use Grok's strengths in original X posts, threads, important replies, timelines, differing views, and counterexamples. Valuable ordinary web research, timely information, and dispute checking are also appropriate; there is no need to wait for other search channels to fail. Choose scope, model, and reasoning tier for the task. Do not reduce necessary research because the reminder threshold has not yet been reached or has already been reached. Continue targeted searching when an important gap remains; wrap up when new material is mostly repetitive. Do not create work to consume quota.

Use only free or subscription-included quota that has been authorized. Do not enable pay-per-use APIs, overage spending, automatic recharge, or account rotation. A quota check may itself use a small amount of subscription quota; zero usage is not a requirement.

## Daily 30%: Reminder Only, No Interruption

The accounting basis remains **the portion of the full weekly allowance consumed during a calendar day in Asia/Shanghai**, accumulated across projects. 30% means 30 percentage points of the full weekly allowance consumed in one day; it does not mean weekly cumulative usage is over 30%, or that only 30% remains.

- When observed consumption for the day is **strictly greater than 30%**, give one reminder after the current bounded research step wraps up, stating observed usage and actual remaining quota/reset time when trustworthy data is available.
- After the reminder, continue current research and future dispatches within the already authorized scope. Do not wait for confirmation, forcibly kill the current CLI, or automatically lower the model or reasoning tier.
- Do not repeat the reminder on the same day just because usage remains above 30%. Add an update only for substantial new consumption, a real quota-state change, or when the user asks.
- The old 1/7, 1.5/7, and 2/7 tiers and the default of “no new Grok dispatches” are canceled. Exactly 30% does not trigger a reminder for usage “above” the threshold.

If the account is actually exhausted, authentication fails, or a service hard limit prevents a request, handle it as a real failure of the current path. This is an operating condition, separate from the local reminder threshold. Do not switch to paid usage or bypass account limits to keep calling.

## Check Cadence: Usually After Five Substantive Research Units

Use the following adjustable default to reduce interruptions to the main task:

1. Obtain a trustworthy baseline before the first actual Grok use that day. Reuse an existing baseline if its date, period, and source are reliable; do not reopen the quota page unnecessarily.
2. Usually query and record quota **after completing five substantive research units**. A unit is a meaningful stretch of research or analysis around a clear question. Merge same-topic searches, follow-up reading, questions, and checks. Do not count small instructions, retries, single-post reads, or tiny calls split only to parallelize as separate units.
3. For a clearly long round or sustained multi-round deep research, check at a meaningful progress boundary; do not have to wait for five units. Avoid leaving one long task unchecked indefinitely, and do not check after every tool event.
4. After a substantive batch of research wraps up and Grok will not be used for a while, an end snapshot may be useful. A few very short calls can roll into the next check; not every main-task completion is a mandatory check. Do not query again if quota was checked recently and there has been no new use.
5. Do not query for non-Grok tasks or during idle time, and do not add scheduled polling. If there was substantial use in another project since the last snapshot, refresh at the next suitable check point. Do not revert to per-task checking when usage exceeds the reminder threshold.

Five is an execution default, not a permanently user-mandated count. Merge more units when tasks are fragmented, and adjust around actual stages for long research. Record the result and sampling gaps accurately.

## Trustworthy Query Paths

Historical validation (2026-09-27, Grok Build 1.0.40/1.0.41): entering /usage in a signed-in interactive terminal returned Weekly limit and Next reset; it worked in both the same terminal and a new terminal, and the test session showed no model calls. This is a historical validation; check help and the actual response when using the current version.

Use the installed grok entry point, optionally through a separately configured and authorized process-level proxy wrapper:

    grok --no-alt-screen --minimal

After the interface is ready, enter /usage to read weekly account usage and the next reset time, then enter /quit to exit. If the wrapper command is unavailable, use the original grok command. Settings → Usage in the web interface is an alternative. See the [official usage FAQ](https://docs.x.ai/grok/faq) and [terminal entry point](https://docs.x.ai/build/modes-and-commands).

grok usage <SESSION_ID> queries tokens/cost for one session; it is not the remaining weekly account quota. grok -p "/usage" was not validated as an account quota command. Record a natural-language answer as a snapshot only if it clearly corresponds to actual account data and its source can be checked; a model's guess is not a balance.

If reading quota fails, briefly state the monitoring gap and continue research within the existing authorization. Do not create a new stop or approval gate because there is no snapshot; handle a failure only if the actual service rejects a request. Integer percentages may be rounded, so do not present interface values as exact decimals.

## Calculation and Ledger

If the interface reports weekly used percentage, convert it to remaining percentage with `remaining = 100 - used` before recording it. Confirm the reset-period ID from the actual account interface; do not invent one from the task date or model output.

Subtract the latest remaining-percentage value from the same-period baseline remaining value to obtain observed consumption for that day. If the baseline was not taken at the start of the day or sampling was missed, the result is only a lower bound. Start a new baseline on a new day. Across a weekly reset, record the attributable portion of the old period and then begin a new period; do not guess missing usage, allow negative consumption, or erase the old segment. The day boundary remains Asia/Shanghai.

[quota-ledger.py](../scripts/quota-ledger.py) saves only trusted snapshots supplied to it and calculates a lower bound. It **does not query the account, call Grok, notify automatically, or interrupt tasks**. The report tier is limited to normal/remind/unknown: observed daily consumption above 30% is remind, with advisory_only=true and auto_pause=false. Do not migrate or clear the existing ledger files, account labels, or storage structure.

The public script defaults to %LOCALAPPDATA%/subagent-manager/grok-quota/ on Windows, or ~/.local/share/subagent-manager/grok-quota/ when LOCALAPPDATA is absent. If an installation already uses another ledger directory, preserve it by passing --state-dir; do not silently start a second ledger or migrate existing data. Record only a non-sensitive account label such as 1, reset period, time, source, and percentage; do not store email, tokens, or billing text:

    $skillRoot = 'C:/path/to/skills/subagent-manager'
    python "$skillRoot/scripts/quota-ledger.py" record --account 1 --remaining 82 --period 'Verified reset-period ID' --source 'user-/usage'
    python "$skillRoot/scripts/quota-ledger.py" status --account 1

When there is no trustworthy snapshot, label it unknown; do not infer account percentages from session tokens or dollars. Partial sampling may underestimate daily consumption, so say that the reminder reflects “observed” usage and do not imply false precision.
