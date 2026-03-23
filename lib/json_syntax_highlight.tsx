import type { ReactNode } from "react";

const c = {
  bracket: "text-zinc-500 dark:text-zinc-400",
  key: "text-sky-600 dark:text-sky-400",
  string: "text-emerald-600 dark:text-emerald-400",
  number: "text-amber-600 dark:text-amber-400",
  keyword: "text-violet-600 dark:text-violet-400",
  rest: "text-zinc-800 dark:text-zinc-200",
  ws: "text-transparent",
};

function readString(input: string, start: number): { raw: string; end: number } | null {
  if (input[start] !== '"') return null;
  let j = start + 1;
  const len = input.length;
  while (j < len) {
    const ch = input[j];
    if (ch === "\\" && j + 1 < len) {
      j += 2;
      continue;
    }
    if (ch === '"') {
      return { raw: input.slice(start, j + 1), end: j + 1 };
    }
    j++;
  }
  return null;
}

function readNumber(
  input: string,
  start: number,
): { raw: string; end: number } | null {
  const len = input.length;
  let j = start;
  if (input[j] === "-") j++;
  if (j >= len || !/[0-9]/.test(input[j])) return null;
  while (j < len && /[0-9]/.test(input[j])) j++;
  if (j < len && input[j] === ".") {
    j++;
    while (j < len && /[0-9]/.test(input[j])) j++;
  }
  if (j < len && (input[j] === "e" || input[j] === "E")) {
    j++;
    if (j < len && (input[j] === "+" || input[j] === "-")) j++;
    if (j >= len || !/[0-9]/.test(input[j])) return null;
    while (j < len && /[0-9]/.test(input[j])) j++;
  }
  return { raw: input.slice(start, j), end: j };
}

/** Best-effort JSON token colors while typing (invalid fragments fall back to `rest`). */
export function highlightJson(input: string): ReactNode {
  const out: ReactNode[] = [];
  let k = 0;
  let i = 0;
  const len = input.length;

  const push = (content: string, cls: string) => {
    if (!content) return;
    out.push(
      <span key={`${k++}`} className={cls}>
        {content}
      </span>,
    );
  };

  while (i < len) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      let j = i;
      while (j < len && /\s/.test(input[j])) j++;
      push(input.slice(i, j), c.ws);
      i = j;
      continue;
    }

    if ("{}[],:".includes(ch)) {
      push(ch, c.bracket);
      i++;
      continue;
    }

    if (ch === '"') {
      const parsed = readString(input, i);
      if (!parsed) {
        push(input.slice(i), c.rest);
        break;
      }
      let j = parsed.end;
      while (j < len && /\s/.test(input[j])) j++;
      const isKey = j < len && input[j] === ":";
      push(parsed.raw, isKey ? c.key : c.string);
      i = parsed.end;
      continue;
    }

    if (ch === "-" || /[0-9]/.test(ch)) {
      const parsed = readNumber(input, i);
      if (parsed && parsed.raw.length > 0) {
        push(parsed.raw, c.number);
        i = parsed.end;
        continue;
      }
    }

    if (input.startsWith("true", i)) {
      push("true", c.keyword);
      i += 4;
      continue;
    }
    if (input.startsWith("false", i)) {
      push("false", c.keyword);
      i += 5;
      continue;
    }
    if (input.startsWith("null", i)) {
      push("null", c.keyword);
      i += 4;
      continue;
    }

    push(ch, c.rest);
    i++;
  }

  return out;
}
