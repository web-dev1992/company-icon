import { useId, useMemo, useState } from "react";
import { getImportStatement, icons, packageName } from "./icons.js";

const SIZES = [16, 24, 32, 48];
const DEFAULT_COLOR = "#1c2430";
const PRESET_COLORS = [
  { label: "Ink", value: "#1c2430" },
  { label: "Teal", value: "#0f766e" },
  { label: "Blue", value: "#1d4ed8" },
  { label: "Rose", value: "#be123c" },
  { label: "Amber", value: "#b45309" },
];

function normalizeHexColor(value) {
  const trimmed = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return null;
}

export default function App() {
  const searchId = useId();
  const sizeGroupId = useId();
  const colorPickerId = useId();
  const colorTextId = useId();
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(24);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [colorInput, setColorInput] = useState(DEFAULT_COLOR);
  const [copiedName, setCopiedName] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  function applyColor(nextColor) {
    setColor(nextColor);
    setColorInput(nextColor);
  }

  function handleColorTextChange(event) {
    const nextValue = event.target.value;
    setColorInput(nextValue);
    const normalized = normalizeHexColor(nextValue);
    if (normalized) setColor(normalized);
  }

  function handleColorTextBlur() {
    const normalized = normalizeHexColor(colorInput);
    if (normalized) {
      applyColor(normalized);
      return;
    }
    setColorInput(color);
  }

  const filteredIcons = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return icons;
    return icons.filter(({ name }) => name.toLowerCase().includes(normalized));
  }, [query]);

  async function copyImport(iconName) {
    const statement = getImportStatement(iconName);

    try {
      await navigator.clipboard.writeText(statement);
      setCopiedName(iconName);
      setStatusMessage(`Copied import for ${iconName}`);
      window.setTimeout(() => {
        setCopiedName((current) => (current === iconName ? null : current));
      }, 1600);
    } catch {
      setStatusMessage(`Could not copy import for ${iconName}`);
    }
  }

  return (
    <div className="page">
      <a className="skip-link" href="#gallery">
        Skip to icon gallery
      </a>

      <header className="hero">
        <p className="eyebrow">{packageName}</p>
        <h1>Icon gallery</h1>
        <p className="lede">
          Browse the published React icon components, preview them at different
          sizes, and copy a ready-to-paste named import.
        </p>
      </header>

      <main>
        <section className="doc-section" aria-labelledby="intro-heading">
          <h2 id="intro-heading">About</h2>
          <p>
            <code>{packageName}</code> is an internal SVG icon library. Each
            asset under <code>assets/</code> is transformed with SVGR into a
            React component and exposed as a named export from the package
            entrypoint.
          </p>
        </section>

        <section className="doc-section" aria-labelledby="install-heading">
          <h2 id="install-heading">Installation</h2>
          <p>
            Install from your private GitLab npm Package Registry. Authenticate
            with a personal access token that has the{" "}
            <code>read_api</code> (or <code>read_package_registry</code>) scope.
          </p>
          <pre>
            <code>{`# .npmrc (consumer project)
@frontend-team:registry=https://gitlab.com/api/v4/packages/npm/
//gitlab.com/api/v4/packages/npm/:_authToken=\${GITLAB_TOKEN}

# or project-level registry
@frontend-team:registry=https://gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/
//gitlab.com/api/v4/projects/<PROJECT_ID>/packages/npm/:_authToken=\${GITLAB_TOKEN}`}</code>
          </pre>
          <pre>
            <code>{`npm install ${packageName}`}</code>
          </pre>
          <p>
            Peer dependency: <code>react</code> &gt;= 17. Update{" "}
            <code>package.json</code> <code>name</code> to a scoped package
            (for example <code>@frontend-team/company-icon</code>) if your
            GitLab group expects that scope.
          </p>
        </section>

        <section className="doc-section" aria-labelledby="usage-heading">
          <h2 id="usage-heading">Usage</h2>
          <pre>
            <code>{`import { Coins, Phone } from "${packageName}";

export function Example() {
  return (
    <>
      <Coins width={24} height={24} title="Coins" />
      <Phone style={{ fontSize: 32, color: "#0f766e" }} />
    </>
  );
}`}</code>
          </pre>
          <ul>
            <li>
              Icons use <code>width=&quot;1em&quot;</code> /{" "}
              <code>height=&quot;1em&quot;</code>, so <code>font-size</code> or
              explicit <code>width</code>/<code>height</code> props control
              size.
            </li>
            <li>
              Strokes use <code>currentColor</code>, so set CSS{" "}
              <code>color</code> (or an inline <code>style.color</code>) to
              theme the icon.
            </li>
            <li>
              Pass <code>title</code> (and optional <code>titleId</code>) for an
              accessible label when the icon is not decorative.
            </li>
          </ul>
        </section>

        <section className="doc-section" aria-labelledby="color-heading">
          <h2 id="color-heading">Color</h2>
          <p>
            Icons inherit the CSS <code>color</code> of their parent because
            strokes are drawn with <code>currentColor</code>. Use the gallery
            color control below to try values, then apply the same approach in
            your app.
          </p>
          <pre>
            <code>{`/* CSS */
.icon-teal {
  color: #0f766e;
}

/* JSX */
<Like className="icon-teal" />
<Phone style={{ color: "${color}" }} />`}</code>
          </pre>
        </section>

        <section className="doc-section" aria-labelledby="add-icon-heading">
          <h2 id="add-icon-heading">Adding a new icon</h2>
          <ol>
            <li>
              Drop an SVG into <code>assets/</code> (for example{" "}
              <code>assets/gold.svg</code>). Prefer a single{" "}
              <code>#1D1D1D</code> stroke/fill so SVGR can rewrite it to{" "}
              <code>currentColor</code>.
            </li>
            <li>
              Run <code>npm run build</code>. SVGR regenerates{" "}
              <code>src/</code> and Rollup updates <code>dist/</code>, including
              the named export in <code>src/index.js</code>.
            </li>
            <li>
              Refresh this gallery (<code>npm run docs</code>). Icons are
              discovered from the package&apos;s public ESM exports, so a new
              named export appears automatically.
            </li>
          </ol>
        </section>

        <section
          className="gallery-section"
          id="gallery"
          aria-labelledby="gallery-heading"
        >
          <div className="gallery-header">
            <div className="gallery-title-row">
              <div className="gallery-title">
                <h2 id="gallery-heading">Icons</h2>
                <p className="gallery-count">
                  {filteredIcons.length} of {icons.length} shown
                </p>
              </div>

              <div className="field search-field">
                <label htmlFor={searchId}>Search icons</label>
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter by component name"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="gallery-toolbar" role="group" aria-label="Preview controls">
              <fieldset className="toolbar-group size-field" aria-labelledby={sizeGroupId}>
                <legend id={sizeGroupId}>Size</legend>
                <div className="size-options" role="radiogroup" aria-label="Preview size">
                  {SIZES.map((value) => {
                    const optionId = `${sizeGroupId}-${value}`;
                    return (
                      <label key={value} className="size-option" htmlFor={optionId}>
                        <input
                          id={optionId}
                          type="radio"
                          name="icon-size"
                          value={value}
                          checked={size === value}
                          onChange={() => setSize(value)}
                        />
                        <span>{value}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="toolbar-divider" aria-hidden="true" />

              <div className="toolbar-group color-controls">
                <div className="field color-field">
                  <label htmlFor={colorPickerId}>Color</label>
                  <div className="color-inputs">
                    <input
                      id={colorPickerId}
                      type="color"
                      value={color}
                      onChange={(event) => applyColor(event.target.value)}
                      aria-label="Choose preview color"
                    />
                    <input
                      id={colorTextId}
                      type="text"
                      value={colorInput}
                      onChange={handleColorTextChange}
                      onBlur={handleColorTextBlur}
                      spellCheck="false"
                      autoComplete="off"
                      aria-label="Preview color hex value"
                      placeholder="#1c2430"
                    />
                    <button
                      type="button"
                      className="text-button reset-color"
                      onClick={() => applyColor(DEFAULT_COLOR)}
                      disabled={color === DEFAULT_COLOR}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div
                  className="swatch-row"
                  role="group"
                  aria-label="Preset preview colors"
                >
                  {PRESET_COLORS.map((preset) => {
                    const selected = color === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        className={`swatch${selected ? " is-selected" : ""}`}
                        style={{ backgroundColor: preset.value }}
                        onClick={() => applyColor(preset.value)}
                        aria-label={`${preset.label} (${preset.value})`}
                        aria-pressed={selected}
                        title={`${preset.label} (${preset.value})`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="status" role="status" aria-live="polite">
            {statusMessage}
          </div>

          {filteredIcons.length === 0 ? (
            <div className="empty-state" role="status">
              <p>No icons match &ldquo;{query.trim()}&rdquo;.</p>
              <p>Try another component name, or clear the search.</p>
              <button type="button" className="text-button" onClick={() => setQuery("")}>
                Clear search
              </button>
            </div>
          ) : (
            <ul className="icon-grid">
              {filteredIcons.map(({ name, Component }) => {
                const copied = copiedName === name;
                return (
                  <li key={name}>
                    <article className="icon-card">
                      <div
                        className="icon-preview"
                        style={{ fontSize: size, color }}
                        aria-hidden="true"
                      >
                        <Component />
                      </div>
                      <h3 className="icon-name">{name}</h3>
                      <button
                        type="button"
                        className="copy-button"
                        onClick={() => copyImport(name)}
                        aria-label={`Copy import statement for ${name}`}
                      >
                        {copied ? "Copied" : "Copy import"}
                      </button>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>
          Gallery source: public exports from <code>dist/index.esm.js</code>.
        </p>
      </footer>
    </div>
  );
}
