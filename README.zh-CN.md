# subagent-manager

[English](README.md) | **简体中文**

Subagent Manager 是一个 Skill，让 Codex 带领一组 AI 子代理协同工作：由它判断哪些工作值得委派，为每一部分选择合适的模型，交接它需要的上下文，并在成果进入最终答案前逐一核对。

- **并行推进，主 Agent 专注核心。** 大量阅读、数据提取和常规修改在各自的上下文中进行，主 Agent 专心做核心分析。
- **每项工作配合适的模型。** Sol 承担繁重的执行，Astra 负责专家咨询和独立复核，Luna Max 承担常规工作；需要时还可以接入 Gemini 分析视频、Grok 调研 X 和网页。
- **交接带着真正的上下文。** 每个子代理都会拿到目标、资料、负责的文件和验收方式，并按任务需要继承完整的项目历史，或拿到一份精简的任务说明。
- **每份成果都经过核对。** 主 Agent 根据原始资料或测试核对交回的成果后才会使用；多个模型结论一致，不算证据。

<img src="assets/subagent-manager-overview.png" alt="主 Agent 通过完整历史分叉与 Sol 子代理协作，向 Astra 请求专家咨询和独立复核，以精简任务说明把常规工作并行交给 Luna Max，并可调用可选的 Gemini 和 Grok。" width="1600">

本项目主要面向 Codex，整理自我日常做研究、写作、数据处理和编程时使用的工作流。首页提供中英文版本；Skill 和详细参考文档使用英文，Agent 仍按你的语言偏好回复。

## 更新亮点

- **更完整的上下文交接。** 通过 `fork_turns: "all"`，Sol 子代理直接继承完整对话；独立咨询拿到的是原始材料，而不只是一段简短摘要。
- **始终使用最新规则。** Skill 带有版本号。Agent 每次收到新请求、以及从中断中恢复时，都会核对版本，规则一有变化就重新读取。
- **中断后接着做。** 遇到中断或上下文压缩，主 Agent 会复用还能继续的子代理，保留已完成的成果，只重新分派剩下的部分。

## 模型分工

6.1 Sol Ultra 这样的强主 Agent 能独立完成很多工作；当独立上下文、并行推进或另一个视角值得花时间准备交接和验收时，它才会委派。可用的模型和思考强度以你的 Codex 环境和账户为准。

| 子代理 | 职责 |
|---|---|
| **GPT-6.1 Sol** | 复杂分析、实现与实质审查，通常继承主 Agent 的完整历史 |
| **GPT-6 Astra** | 专家咨询、独立复核与困难任务执行，有具体理由预期额外收益时使用 |
| **GPT-6 Luna Max** | 标准明确的常规提取、代码定位、小改动与检查 |
| **Gemini 3.8 Flash High** *(可选，通过 AGY CLI)* | 视频理解与相关帧分析，交回证据和时间位置 |
| **Grok CLI** *(可选)* | X 原帖与讨论串，以及网页调研与核验；单日消耗超过周额度的 30% 时提醒 |

思考档位、交接规则和中断恢复的具体步骤，见 [模型选择](skills/subagent-manager/references/native-models.md) 和 [任务交接](skills/subagent-manager/references/delegation.md)。

## 开始使用

用 Codex 内置的子代理就可以开始：

1. 将 `skills/subagent-manager/` 整个文件夹复制到 `$HOME/.agents/skills/` 或项目的 `.agents/skills/`，选一处即可。如果已有同名 Skill，先对比你改动过的规则再替换。
2. 在任务中提及 `$subagent-manager`，或由 Codex 根据上下文自动选用。如果 Skill 没有出现，重启 Codex。参见 [官方 Skill 指南](https://learn.chatgpt.com/docs/build-skills)。
3. 用一个任务试试，让主 Agent 自己决定委派什么：

```text
使用 $subagent-manager 协助核查这份技术方案。

参考资料位于 ./materials/ 目录。
提取指定字段并核对出处。
请判断哪些部分适合委派给子代理，并选择合适的模型、思考强度和上下文交接方式。
主 Agent 继续负责核心方案分析与最终核对。
```

## 可选扩展

Skill 提供的是工作规则，不负责安装工具或取得模型权限。模型或接口不可用时，Codex 会说明情况，并选择可行的路径。

| 扩展 | 用途 | 环境要求 |
|---|---|---|
| [AGY / Gemini](skills/subagent-manager/references/google.md) | 分析视频与相关帧，将证据交回主 Agent | 已安装并登录 AGY CLI；包装脚本需要 PowerShell 7 |
| [Grok](skills/subagent-manager/references/grok.md) | 检索原帖、社群讨论与网页资料 | 已安装并登录 Grok CLI，有免费或订阅额度；本工作流只使用已授权的自带额度 |
| [Grok 用量规则](skills/subagent-manager/references/grok-budget.md) | 每组研究单元后查看用量；单日消耗超过周额度的 30% 时提醒 | 默认每 5 个有效研究单元检查一次；快照账本需要 Python 3 |
| [Windows 代理模块](extras/windows-proxy/README.md) | 为单次 CLI 调用设置进程级代理 | 直连网络无需使用；需要时填入本机客户端的 HTTP(S) 或 Mixed 端口 |

## 适配与文档索引

请根据你实际的权限、工具和时间安排，调整模型档位、思考强度和 Grok 额度。

| 主题 | 对应文档 |
|---|---|
| 委派判断、交接与验收规则 | [SKILL.md](skills/subagent-manager/SKILL.md) |
| 模型候选、思考档位与评测局限 | [模型选择](skills/subagent-manager/references/native-models.md) |
| 专家咨询、任务执行、独立复核、嵌套委派与中断恢复 | [任务交接](skills/subagent-manager/references/delegation.md) |
| 环境检查与默认值调整 | [自定义规则](docs/customization.md) |
| 实践记录与规则演进背景 | [经验记录](skills/subagent-manager/references/experience.md) |

可以单独使用，也可以搭配 [agent-search-booster](https://github.com/LiX-Works/agent-search-booster) 做多源检索。版本更新见 [Releases](https://github.com/LiX-Works/subagent-manager/releases)，基于 [MIT 许可证](LICENSE) 开源。
