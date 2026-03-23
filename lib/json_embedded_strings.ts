/** Field names whose string values are treated as embedded JSON when beautifying. */
export const EMBEDDED_JSON_FIELD_NAMES = ["header", "body"] as const;

const EMBEDDED_KEYS = new Set<string>(EMBEDDED_JSON_FIELD_NAMES);

export type ExpandEmbeddedResult = {
  value: unknown;
  /** Paths where a string was parsed into nested JSON (e.g. `header`, `[1].body`). */
  expandedPaths: string[];
};

/**
 * Recursively parse JSON strings for configured keys into real nested objects/arrays.
 */
export function expandEmbeddedJsonStrings(
  root: unknown,
  basePath = "",
): ExpandEmbeddedResult {
  const expandedPaths: string[] = [];

  function walk(value: unknown, path: string): unknown {
    if (value === null || typeof value !== "object") {
      return value;
    }
    if (Array.isArray(value)) {
      return value.map((item, i) =>
        walk(item, `${path}[${i}]`),
      );
    }

    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(obj)) {
      const childPath = path ? `${path}.${key}` : key;

      if (EMBEDDED_KEYS.has(key) && typeof val === "string") {
        try {
          const inner = JSON.parse(val) as unknown;
          out[key] = walk(inner, childPath);
          expandedPaths.push(childPath);
        } catch {
          out[key] = walk(val, childPath);
        }
      } else {
        out[key] = walk(val, childPath);
      }
    }

    return out;
  }

  return {
    value: walk(root, basePath),
    expandedPaths,
  };
}

/**
 * Turn nested objects/arrays under configured keys back into compact JSON strings (API shape).
 */
export function collapseEmbeddedJsonStrings(value: unknown): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => collapseEmbeddedJsonStrings(item));
  }

  const obj = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(obj)) {
    if (
      EMBEDDED_KEYS.has(key) &&
      val !== null &&
      typeof val === "object"
    ) {
      out[key] = JSON.stringify(val);
    } else {
      out[key] = collapseEmbeddedJsonStrings(val);
    }
  }

  return out;
}

/** Unique field labels for UI (last segment of each path, e.g. `[0].header` → `header`). */
export function readableFieldLabels(paths: string[]): string {
  const labels = new Set<string>();
  for (const p of paths) {
    const last = p.includes(".") ? p.slice(p.lastIndexOf(".") + 1) : p;
    labels.add(last);
  }
  return [...labels].sort().join(", ");
}

function collectTogglableEmbedKeys(value: unknown, into: Set<string>): void {
  if (value === null || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) {
      collectTogglableEmbedKeys(item, into);
    }
    return;
  }
  const obj = value as Record<string, unknown>;
  for (const key of EMBEDDED_JSON_FIELD_NAMES) {
    if (!(key in obj)) continue;
    const val = obj[key];
    if (val !== null && typeof val === "object") {
      into.add(key);
    } else if (typeof val === "string" && val.trim()) {
      try {
        JSON.parse(val);
        into.add(key);
      } catch {
        /* not JSON */
      }
    }
  }
  for (const val of Object.values(obj)) {
    collectTogglableEmbedKeys(val, into);
  }
}

/** Any `header` / `body` that can switch between string and nested JSON. */
export function embeddedToggleIsAvailable(values: unknown[]): boolean {
  const keys = new Set<string>();
  for (const v of values) {
    collectTogglableEmbedKeys(v, keys);
  }
  return keys.size > 0;
}

/** Current buffer has at least one expanded (object/array) embedded field. */
export function embeddedJsonLooksExpanded(values: unknown[]): boolean {
  return values.some(walkHasExpandedEmbedded);
}

function walkHasExpandedEmbedded(value: unknown): boolean {
  if (value === null || typeof value !== "object") return false;
  if (Array.isArray(value)) {
    return value.some(walkHasExpandedEmbedded);
  }
  const obj = value as Record<string, unknown>;
  for (const key of EMBEDDED_JSON_FIELD_NAMES) {
    if (!(key in obj)) continue;
    const val = obj[key];
    if (val !== null && typeof val === "object") return true;
  }
  return Object.values(obj).some(walkHasExpandedEmbedded);
}

/** Comma-separated field names for the toggle label. */
export function embeddedFieldSummary(values: unknown[]): string {
  const keys = new Set<string>();
  for (const v of values) {
    collectTogglableEmbedKeys(v, keys);
  }
  return [...keys].sort().join(", ");
}
