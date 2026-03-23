/**
 * Parse a string that may contain several JSON values with whitespace between them
 * (NDJSON, log streams, or `}{` concatenation).
 * Uses longest-prefix JSON.parse at each position so `12` stays one number, not `1` + `2`.
 */
export function parseMultipleJsonValues(input: string): unknown[] {
  const s = input.trim();
  if (!s) return [];

  const values: unknown[] = [];
  let i = 0;

  while (i < s.length) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (i >= s.length) break;

    let nextI = -1;
    let parsed: unknown;

    for (let end = s.length; end > i; end--) {
      const slice = s.slice(i, end);
      if (!slice.trim()) continue;
      try {
        parsed = JSON.parse(slice);
        nextI = end;
        break;
      } catch {
        continue;
      }
    }

    if (nextI === -1) {
      throw new Error(`Invalid JSON starting near position ${i + 1}`);
    }

    values.push(parsed);
    i = nextI;
  }

  return values;
}

export function stringifyMultipleBeautified(values: unknown[]): string {
  return values.map((v) => JSON.stringify(v, null, 2)).join("\n\n");
}

export function stringifyMultipleMinified(values: unknown[]): string {
  return values.map((v) => JSON.stringify(v)).join("\n");
}
