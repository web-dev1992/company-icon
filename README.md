# company-icons

Internal React SVG icon components.

```js
import { Coins, Phone, Like } from "company-icons";

<Coins />
```

Icons inherit color from CSS `color` (`currentColor`).

## Develop

```bash
npm install
npm run build
```

Add SVGs under `assets/`, then rebuild. Filenames become PascalCase named exports (`info-circle.svg` → `InfoCircle`).

## Publish

`private` is off so the package can be published. `prepublishOnly` builds `dist/` before publish.

### Option A — Verdaccio

1. Start Verdaccio (once):

   ```bash
   npx verdaccio
   ```

2. Create a user and log in:

   ```bash
   npm adduser --registry http://localhost:4873
   ```

3. Publish:

   ```bash
   npm publish --registry http://localhost:4873
   ```

   Or copy `.npmrc.example` → `.npmrc`, set the Verdaccio registry, then run `npm publish`.

### Option B — npmjs.com (private)

Requires an npm org and a plan that allows private packages. Prefer a scoped name, e.g. `@your-org/company-icons`.

1. Log in: `npm login`
2. Set `"name": "@your-org/company-icons"` in `package.json` if you use a scope
3. Publish:

   ```bash
   npm publish --access restricted
   ```

`publishConfig.access` is already `"restricted"`.

### Version bumps

Before each publish:

```bash
npm version patch   # or minor / major
npm publish --registry <your-registry>
```

## Install in other projects

### Verdaccio

In the consumer project `.npmrc`:

```ini
registry=http://localhost:4873/
@babel:registry=https://registry.npmjs.org/
```

Then:

```bash
npm install company-icons
```

Pointing only this package at Verdaccio (recommended if most deps stay on npmjs):

```ini
company-icons:registry=http://localhost:4873/
```

### npmjs private / scoped

```ini
@your-org:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

```bash
npm install @your-org/company-icons
```

## Peer dependency

Consumers must have `react` (>= 17) installed.
