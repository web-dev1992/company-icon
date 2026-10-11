/**
 * Public gallery icons are derived from the library's published ESM exports.
 * This keeps the docs in sync with the package API (not the raw SVG assets).
 */
import * as IconExports from "company-icons";
import packageJson from "../package.json";

export const packageName = packageJson.name;

export const icons = Object.entries(IconExports)
  .filter(([, value]) => typeof value === "function")
  .map(([name, Component]) => ({ name, Component }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function getImportStatement(iconName) {
  return `import { ${iconName} } from "${packageName}";`;
}
