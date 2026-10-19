# Overview diagram source

`build-overview.mjs` generates the README diagram as a self-contained SVG. Logo artwork is read from `logos/` and embedded, so no network access is needed.

```bash
node assets/source/build-overview.mjs
```

This writes `subagent-manager-overview.svg` (the editable source copy) and a local `subagent-manager-overview.html` wrapper. To reproduce `assets/subagent-manager-overview.png` at 3200 x 2000, open the HTML file in headless Chrome or Edge at a 1600 x 1000 window with a device scale factor of 2 and take a screenshot. For example, on Windows:

```bash
msedge --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1600,1000 --screenshot=subagent-manager-overview.png assets/source/subagent-manager-overview.html
```

Pass `joinA` as the first argument to build the alternative with a white Sol card and two-tone arrows. A second argument sets the middle row: `centered` (default, used in the README) centres the Lead card on the canvas; `balanced` centres the whole row, optional cards included. Colours and icons are defined at the top of the script.

See [asset sources](ASSET_SOURCES.md) for third-party artwork provenance.
