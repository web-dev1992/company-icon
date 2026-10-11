# company-icons

Internal React SVG icon components for product UIs.

```js
import { Coins, Phone, Like } from "company-icons";

<Coins />
```

Icons inherit color from CSS `color` (`currentColor`) and size from `font-size` or `width` / `height` props.

## Documentation gallery

Browse every **public** icon export, search by component name, preview sizes, and copy import statements:

```bash
npm install
npm run docs
```

Opens locally at [http://localhost:5173](http://localhost:5173).

- `npm run docs` — build the library, then start the gallery
- `npm run docs:dev` — start the gallery only (requires an existing `dist/` build)
- `npm run docs:build` — build a static gallery into `docs-dist/`

The gallery imports `dist/index.esm.js` and lists named function exports. It does **not** scan `assets/` directly, so unpublished or unexported SVGs never appear.

## Develop

```bash
npm install
npm run build
```

### Add a new icon

1. Add an SVG under `assets/` (for example `assets/gold.svg`).
2. Prefer `#1D1D1D` for strokes/fills so SVGR rewrites them to `currentColor`.
3. Run `npm run build` — SVGR regenerates `src/` (including `src/index.js` named exports) and Rollup updates `dist/`.
4. Run `npm run docs` — the new export appears in the gallery automatically.

## Installation (GitLab Package Registry)

Authenticate with a GitLab token that can read the package registry, then install:

```ini
# .npmrc
@frontend-team:registry=https://gitlab.com/api/v4/packages/npm/
//gitlab.com/api/v4/packages/npm/:_authToken=${GITLAB_TOKEN}
```

Project-level registry alternative:

```ini
@frontend-team:registry=https://gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/
//gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/:_authToken=${GITLAB_TOKEN}
```

```bash
npm install company-icons
```

If your group requires a scoped name, set `"name": "@frontend-team/company-icon"` in `package.json` before publish; import paths and the gallery copy action follow that name.

Peer dependency: `react` (>= 17).

## Usage

```js
import { Coins, Phone } from "company-icons";

export function Example() {
  return (
    <>
      <Coins width={24} height={24} title="Coins" />
      <Phone style={{ fontSize: 32, color: "#0f766e" }} />
    </>
  );
}
```

- Default SVG size is `1em`, so `font-size` scales the icon.
- Strokes use `currentColor`.
- Pass `title` / `titleId` when the icon conveys meaning on its own.

## Publish

`prepublishOnly` builds `dist/` before publish.

### GitLab

```bash
npm publish --registry=https://gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/
```

Or configure `publishConfig.registry` / `.npmrc` for the project registry, then run `npm publish`.

### Verdaccio / npmjs

See `.npmrc.example` for local Verdaccio or npmjs private-package options.

### Version bumps

```bash
npm version patch   # or minor / major
npm publish
```
