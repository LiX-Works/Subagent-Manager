# Optional Windows CLI proxy support

Direct connections do not require this module. If a CLI needs an already authorized local proxy, the included helper applies an HTTP(S) proxy to one invocation. It does not configure a proxy client, system networking, service login, or billing.

## Find the actual port

Check your client's HTTP(S) or Mixed port. Do not substitute a SOCKS-only port or a controller API port. Replace `PORT` below with the real configured value; no fixed port or proxy node is bundled. See [Mihomo inbound-port documentation](https://wiki.metacubex.one/en/config/inbound/port/).

```powershell
Test-NetConnection 127.0.0.1 -Port PORT
```

A successful connection only proves that a port is listening. It does not prove that a target website is reachable or that a CLI supports proxy environment variables.

## Apply a proxy to one command

From the repository root, inspect the invocation with `-DryRun` before executing an authorized command:

```powershell
& './extras/windows-proxy/Invoke-CliWithProxy.ps1' `
  -Executable 'grok' -ProxyUri 'http://127.0.0.1:PORT' `
  -CliArgs @('--version') -DryRun
```

Remove `-DryRun` to execute. If the CLI is absent from PATH, provide its executable path. Adapt arguments to the installed CLI's help and the task's permissions. The wrapper can also launch AGY or another compatible command; it does not bundle their login or model configuration.

The script temporarily sets `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` for the invocation, then restores the PowerShell process's original values. Loopback addresses are excluded by default. It does not start the proxy client, change routing rules, copy credentials, or enable paid usage.

Some programs ignore these variables or use other proxy settings. Check the program's documentation and actual result when needed.
