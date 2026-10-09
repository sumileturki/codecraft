// Minimal, dependency-free interpreter for the small Python subset taught in
// CodeCraft beginner lessons. Used as an offline fallback when the Pyodide
// runtime cannot be loaded. It is intentionally NOT a full Python parser:
// anything outside the supported subset returns a friendly error.

export interface MiniRunResult {
  output: string;
  error: string | null;
  errorLine: number | null;
  iterations: number;
}

type Value =
  | { k: "num"; v: number }
  | { k: "str"; v: string }
  | { k: "bool"; v: boolean }
  | { k: "none" }
  | { k: "list"; v: Value[] }
  | { k: "dict"; v: Map<string, Value> };

const NUM = (v: number): Value => ({ k: "num", v });
const STR = (v: string): Value => ({ k: "str", v });
const BOOL = (v: boolean): Value => ({ k: "bool", v });
const NONE: Value = { k: "none" };

export function pyStr(v: Value): string {
  switch (v.k) {
    case "num":
      return Number.isInteger(v.v) ? String(v.v) : String(v.v);
    case "str":
      return v.v;
    case "bool":
      return v.v ? "True" : "False";
    case "none":
      return "None";
    case "list":
      return `[${v.v.map(pyRepr).join(", ")}]`;
    case "dict":
      return `{${[...v.v.entries()].map(([k, val]) => `${pyRepr(STR(k))}: ${pyRepr(val)}`).join(", ")}}`;
  }
}

function pyRepr(v: Value): string {
  if (v.k === "str") return `'${v.v}'`;
  return pyStr(v);
}

function truthy(v: Value): boolean {
  switch (v.k) {
    case "bool":
      return v.v;
    case "none":
      return false;
    case "num":
      return v.v !== 0;
    case "str":
      return v.v.length > 0;
    case "list":
      return v.v.length > 0;
    case "dict":
      return v.v.size > 0;
  }
}

class PyError extends Error {
  line: number;
  constructor(line: number, message: string) {
    super(message);
    this.line = line;
  }
}

// ---------------- Lexer / expression parser ----------------

type Tok =
  | { t: "num"; v: number }
  | { t: "str"; v: string; f: boolean }
  | { t: "name"; v: string }
  | { t: "op"; v: string }
  | { t: "lparen" }
  | { t: "rparen" }
  | { t: "lbrack" }
  | { t: "rbrack" }
  | { t: "lbrace" }
  | { t: "rbrace" }
  | { t: "comma" }
  | { t: "colon" }
  | { t: "eof" };

function lex(src: string, line: number): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const fail = (m: string): never => {
    throw new PyError(line, m);
  };
  while (i < src.length) {
    const c = src[i]!;
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (c >= "0" && c <= "9") {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j]!)) j++;
      const n = Number(src.slice(i, j));
      if (Number.isNaN(n)) fail("That number doesn't look right.");
      toks.push({ t: "num", v: n });
      i = j;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i;
      let out = "";
      j++;
      while (j < src.length && src[j] !== c) {
        if (src[j] === "\\" && j + 1 < src.length) {
          const esc = src[j + 1]!;
          out += esc === "n" ? "\n" : esc === "t" ? "\t" : esc;
          j += 2;
        } else {
          out += src[j];
          j++;
        }
      }
      if (j >= src.length) fail("A string is missing its closing quote.");
      toks.push({ t: "str", v: out, f: false });
      i = j + 1;
      continue;
    }
    if (c === "f" || c === "F") {
      const nxt = src[i + 1];
      if (nxt === '"' || nxt === "'") {
        const quote = nxt;
        let j = i + 2;
        const parts: Array<{ lit: string } | { expr: string }> = [];
        let lit = "";
        let depth = 0;
        let exprBuf = "";
        let inExpr = false;
        while (j < src.length) {
          const ch = src[j]!;
          if (!inExpr) {
            if (ch === "{" && src[j + 1] === "{") {
              lit += "{";
              j += 2;
              continue;
            }
            if (ch === "}") {
              fail("Single '}' is not allowed in an f-string.");
            }
            if (ch === "{") {
              parts.push({ lit });
              lit = "";
              inExpr = true;
              exprBuf = "";
              depth = 0;
              j++;
              continue;
            }
            if (ch === quote) break;
            lit += ch;
            j++;
          } else {
            if (ch === "{" || ch === "[" || ch === "(") depth++;
            if (ch === "}" || ch === "]" || ch === ")") {
              if (depth === 0 && ch === "}") {
                parts.push({ expr: exprBuf });
                inExpr = false;
                j++;
                continue;
              }
              depth--;
            }
            exprBuf += ch;
            j++;
          }
        }
        if (j >= src.length) fail("A string is missing its closing quote.");
        toks.push({ t: "name", v: `\0fstr:${JSON.stringify(parts)}` });
        i = j + 1;
        continue;
      }
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j]!)) j++;
      toks.push({ t: "name", v: src.slice(i, j) });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (["==", "!=", "<=", ">=", "**", "//"].includes(two)) {
      toks.push({ t: "op", v: two });
      i += 2;
      continue;
    }
    if ("+-*/%<>=!".includes(c)) {
      toks.push({ t: "op", v: c });
      i++;
      continue;
    }
    if (c === "(") {
      toks.push({ t: "lparen" });
      i++;
      continue;
    }
    if (c === ")") {
      toks.push({ t: "rparen" });
      i++;
      continue;
    }
    if (c === "[") {
      toks.push({ t: "lbrack" });
      i++;
      continue;
    }
    if (c === "]") {
      toks.push({ t: "rbrack" });
      i++;
      continue;
    }
    if (c === "{") {
      toks.push({ t: "lbrace" });
      i++;
      continue;
    }
    if (c === "}") {
      toks.push({ t: "rbrace" });
      i++;
      continue;
    }
    if (c === ",") {
      toks.push({ t: "comma" });
      i++;
      continue;
    }
    if (c === ":") {
      toks.push({ t: "colon" });
      i++;
      continue;
    }
    fail(`I don't understand the character '${c}' here.`);
  }
  toks.push({ t: "eof" });
  return toks;
}

// ---------------- Statements ----------------

type Stmt =
  | { t: "assign"; name: string; src: string; line: number }
  | { t: "expr"; src: string; line: number }
  | { t: "if"; cond: string; body: Stmt[]; elifs: { cond: string; body: Stmt[] }[]; elseBody: Stmt[] | null; line: number }
  | { t: "for"; varName: string; iter: string; body: Stmt[]; line: number }
  | { t: "while"; cond: string; body: Stmt[]; line: number }
  | { t: "def"; name: string; params: string[]; body: Stmt[]; line: number }
  | { t: "return"; src: string | null; line: number }
  | { t: "break"; line: number }
  | { t: "continue"; line: number };

interface Line {
  indent: number;
  text: string;
  line: number;
}

function splitLines(code: string): Line[] {
  return code.split("\n").map((raw, i) => {
    const m = raw.match(/^(\s*)/);
    const indent = (m?.[1] ?? "").replace(/\t/g, "    ").length;
    return { indent, text: raw.trim(), line: i + 1 };
  });
}

function parseBlock(lines: Line[], pos: number, indent: number): { stmts: Stmt[]; pos: number } {
  const stmts: Stmt[] = [];
  let i = pos;
  while (i < lines.length) {
    const ln = lines[i]!;
    if (ln.text === "" || ln.text.startsWith("#")) {
      i++;
      continue;
    }
    if (ln.indent < indent) break;
    if (ln.indent > indent) {
      throw new PyError(ln.line, "This line is indented, but the line above doesn't expect an indented block.");
    }
    const text = ln.text;
    const ifM = text.match(/^if\s+(.+):\s*$/);
    const elifM = text.match(/^elif\s+(.+):\s*$/);
    const elseM = text.match(/^else:\s*$/);
    const forM = text.match(/^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+(.+):\s*$/);
    const whileM = text.match(/^while\s+(.+):\s*$/);
    const defM = text.match(/^def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)\s*:\s*$/);
    if (elifM || elseM) break;
    if (ifM) {
      const cond = ifM[1]!;
      const body = parseBlock(lines, i + 1, indent + 1);
      i = body.pos;
      const elifs: { cond: string; body: Stmt[] }[] = [];
      let elseBody: Stmt[] | null = null;
      while (i < lines.length) {
        const nx = lines[i]!;
        if (nx.text === "" || nx.text.startsWith("#")) {
          i++;
          continue;
        }
        if (nx.indent !== indent) break;
        const em = nx.text.match(/^elif\s+(.+):\s*$/);
        const lm = nx.text.match(/^else:\s*$/);
        if (em) {
          const b = parseBlock(lines, i + 1, indent + 1);
          elifs.push({ cond: em[1]!, body: b.stmts });
          i = b.pos;
        } else if (lm) {
          const b = parseBlock(lines, i + 1, indent + 1);
          elseBody = b.stmts;
          i = b.pos;
          break;
        } else break;
      }
      stmts.push({ t: "if", cond, body: body.stmts, elifs, elseBody, line: ln.line });
      continue;
    }
    if (forM) {
      const body = parseBlock(lines, i + 1, indent + 1);
      if (body.stmts.length === 0) throw new PyError(ln.line, "A for loop needs at least one indented line inside it.");
      stmts.push({ t: "for", varName: forM[1]!, iter: forM[2]!, body: body.stmts, line: ln.line });
      i = body.pos;
      continue;
    }
    if (whileM) {
      const body = parseBlock(lines, i + 1, indent + 1);
      if (body.stmts.length === 0) throw new PyError(ln.line, "A while loop needs at least one indented line inside it.");
      stmts.push({ t: "while", cond: whileM[1]!, body: body.stmts, line: ln.line });
      i = body.pos;
      continue;
    }
    if (defM) {
      const params = defM[2]!.trim() === "" ? [] : defM[2]!.split(",").map((s) => s.trim());
      for (const p of params) {
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(p)) throw new PyError(ln.line, `"${p}" isn't a valid parameter name.`);
      }
      const body = parseBlock(lines, i + 1, indent + 1);
      if (body.stmts.length === 0) throw new PyError(ln.line, "A function needs at least one indented line inside it.");
      stmts.push({ t: "def", name: defM[1]!, params, body: body.stmts, line: ln.line });
      i = body.pos;
      continue;
    }
    if (/^(if|for|while|def|else|elif|try|with|class)\b/.test(text) && !text.endsWith(":")) {
      throw new PyError(ln.line, "This line looks like it should end with a colon (:).");
    }
    const retM = text.match(/^return\s*(.*)$/);
    if (retM) {
      stmts.push({ t: "return", src: retM[1]!.trim() === "" ? null : retM[1]!, line: ln.line });
      i++;
      continue;
    }
    if (text === "break") {
      stmts.push({ t: "break", line: ln.line });
      i++;
      continue;
    }
    if (text === "continue") {
      stmts.push({ t: "continue", line: ln.line });
      i++;
      continue;
    }
    const asM = text.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
    if (asM && !/[=!<>]=\s*$/.test(text)) {
      stmts.push({ t: "assign", name: asM[1]!, src: asM[2]!, line: ln.line });
      i++;
      continue;
    }
    stmts.push({ t: "expr", src: text, line: ln.line });
    i++;
  }
  return { stmts, pos: i };
}

// ---------------- Interpreter ----------------

interface Fn {
  params: string[];
  body: Stmt[];
  closure: Env;
}
type Env = Map<string, Value | Fn>;

function isFn(v: Value | Fn): v is Fn {
  return (v as Fn).body !== undefined;
}

const MAX_STEPS = 200_000;
const MAX_LOOP = 5000;
const MAX_OUT = 20_000;

export function runMiniPython(code: string): MiniRunResult {
  const out: string[] = [];
  let outLen = 0;
  let steps = 0;
  const emit = (s: string) => {
    outLen += s.length;
    if (outLen > MAX_OUT) throw new PyError(0, "Output grew too large — the program was stopped.");
    out.push(s);
  };

  const lines = splitLines(code);
  let program: Stmt[];
  try {
    program = parseBlock(lines, 0, 0).stmts;
  } catch (e) {
    const err = e as PyError;
    return { output: "", error: err.message, errorLine: err.line || null, iterations: 0 };
  }

  class ReturnSignal {
    constructor(public value: Value) {}
  }
  class BreakSignal {}
  class ContinueSignal {}

  const evalExpr = (src: string, line: number, env: Env): Value => {
    if (++steps > MAX_STEPS) throw new PyError(line, "This is taking too many steps — it may contain an infinite loop.");
    const toks = lex(src, line);
    let p = 0;
    const peek = () => toks[p]!;
    const eat = () => toks[p++]!;

    const parseOr = (): Value => {
      let left = parseAnd();
      while (peek().t === "name" && (peek() as { v: string }).v === "or") {
        eat();
        const right = parseAnd();
        left = BOOL(truthy(left) || truthy(right));
      }
      return left;
    };
    const parseAnd = (): Value => {
      let left = parseNot();
      while (peek().t === "name" && (peek() as { v: string }).v === "and") {
        eat();
        const right = parseNot();
        left = BOOL(truthy(left) && truthy(right));
      }
      return left;
    };
    const parseNot = (): Value => {
      if (peek().t === "name" && (peek() as { v: string }).v === "not") {
        eat();
        return BOOL(!truthy(parseNot()));
      }
      return parseCmp();
    };
    const eqVal = (a: Value, b: Value): boolean => {
      if (a.k !== b.k) {
        if (a.k === "num" && b.k === "bool") return a.v === (b.v ? 1 : 0);
        if (a.k === "bool" && b.k === "num") return (a.v ? 1 : 0) === b.v;
        return false;
      }
      if (a.k === "num" && b.k === "num") return a.v === b.v;
      if (a.k === "str" && b.k === "str") return a.v === b.v;
      if (a.k === "bool" && b.k === "bool") return a.v === b.v;
      if (a.k === "none") return true;
      return false;
    };
    const parseCmp = (): Value => {
      let left = parseAdd();
      for (;;) {
        const t = peek();
        if (t.t !== "op" || !["==", "!=", "<", "<=", ">", ">="].includes(t.v)) return left;
        eat();
        const right = parseAdd();
        let r = false;
        if (t.v === "==") r = eqVal(left, right);
        else if (t.v === "!=") r = !eqVal(left, right);
        else if (left.k === "num" && right.k === "num") {
          const [a, b] = [left.v, right.v];
          r = t.v === "<" ? a < b : t.v === "<=" ? a <= b : t.v === ">" ? a > b : a >= b;
        } else if (left.k === "str" && right.k === "str") {
          const [a, b] = [left.v, right.v];
          r = t.v === "<" ? a < b : t.v === "<=" ? a <= b : t.v === ">" ? a > b : a >= b;
        } else throw new PyError(line, "You can't compare those two types of values.");
        left = BOOL(r);
      }
    };
    const parseAdd = (): Value => {
      let left = parseMul();
      for (;;) {
        const t = peek();
        if (t.t !== "op" || (t.v !== "+" && t.v !== "-")) return left;
        eat();
        const right = parseMul();
        if (t.v === "+") {
          if (left.k === "num" && right.k === "num") left = NUM(left.v + right.v);
          else if (left.k === "str" && right.k === "str") left = STR(left.v + right.v);
          else if (left.k === "list" && right.k === "list") left = { k: "list", v: [...left.v, ...right.v] };
          else throw new PyError(line, "You can only add numbers, or join strings with +.");
        } else {
          if (left.k === "num" && right.k === "num") left = NUM(left.v - right.v);
          else throw new PyError(line, "You can only subtract numbers.");
        }
      }
    };
    const parseMul = (): Value => {
      let left = parsePow();
      for (;;) {
        const t = peek();
        if (t.t !== "op" || !["*", "/", "//", "%"].includes(t.v)) return left;
        eat();
        const right = parsePow();
        if (t.v === "*") {
          if (left.k === "num" && right.k === "num") left = NUM(left.v * right.v);
          else if (left.k === "str" && right.k === "num") {
            if (right.v > 500) throw new PyError(line, "That would repeat the text too many times.");
            left = STR(left.v.repeat(Math.max(0, Math.floor(right.v))));
          } else if (left.k === "num" && right.k === "str") {
            if (left.v > 500) throw new PyError(line, "That would repeat the text too many times.");
            left = STR(right.v.repeat(Math.max(0, Math.floor(left.v))));
          } else throw new PyError(line, "You can only multiply numbers (or repeat text with *).");
        } else {
          if (left.k !== "num" || right.k !== "num") throw new PyError(line, "You can only do arithmetic with numbers.");
          if (right.v === 0) throw new PyError(line, "You divided by zero — check the number after / or %.");
          if (t.v === "/") left = NUM(left.v / right.v);
          else if (t.v === "//") left = NUM(Math.floor(left.v / right.v));
          else left = NUM(left.v % right.v);
        }
      }
    };
    const parsePow = (): Value => {
      const base = parseUnary();
      const t = peek();
      if (t.t === "op" && t.v === "**") {
        eat();
        const exp = parsePow();
        if (base.k !== "num" || exp.k !== "num") throw new PyError(line, "You can only use ** with numbers.");
        const r = Math.pow(base.v, exp.v);
        if (!Number.isFinite(r) || Math.abs(r) > 1e12) throw new PyError(line, "That power is too large to compute.");
        return NUM(r);
      }
      return base;
    };
    const parseUnary = (): Value => {
      const t = peek();
      if (t.t === "op" && t.v === "-") {
        eat();
        const v = parseUnary();
        if (v.k !== "num") throw new PyError(line, "You can only negate a number.");
        return NUM(-v.v);
      }
      return parsePostfix();
    };
    const parsePostfix = (): Value => {
      let v = parsePrimary();
      for (;;) {
        const t = peek();
        if (t.t === "lbrack") {
          eat();
          const idx = parseOr();
          if (eat().t !== "rbrack") throw new PyError(line, "Missing ] after the index.");
          if (v.k === "list" && idx.k === "num") {
            const i = Math.floor(idx.v);
            if (i < 0 || i >= v.v.length) throw new PyError(line, "That index is outside the list.");
            v = v.v[i]!;
          } else if (v.k === "str" && idx.k === "num") {
            const i = Math.floor(idx.v);
            if (i < 0 || i >= v.v.length) throw new PyError(line, "That index is outside the text.");
            v = STR(v.v[i]!);
          } else if (v.k === "dict" && idx.k === "str") {
            const got = v.v.get(idx.v);
            if (got === undefined) throw new PyError(line, `There is no key '${idx.v}' in that dictionary.`);
            v = got;
          } else throw new PyError(line, "You can't look that up with [...].");
        } else return v;
      }
    };
    const parsePrimary = (): Value => {
      const t = eat();
      if (t.t === "num") return NUM(t.v);
      if (t.t === "str") return t.f ? STR("") : STR(t.v);
      if (t.t === "name") {
        const name = t.v;
        if (name.startsWith("\0fstr:")) {
          const parts = JSON.parse(name.slice(6)) as Array<{ lit: string } | { expr: string }>;
          let s = "";
          for (const part of parts) {
            if ("lit" in part) s += part.lit;
            else s += pyStr(evalExpr(part.expr, line, env));
          }
          return STR(s);
        }
        if (name === "True") return BOOL(true);
        if (name === "False") return BOOL(false);
        if (name === "None") return NONE;
        if (peek().t === "lparen") {
          eat();
          const args: Value[] = [];
          if (peek().t !== "rparen") {
            for (;;) {
              if (peek().t === "name" && (peek() as { v: string }).v !== "True" && (peek() as { v: string }).v !== "False" && (peek() as { v: string }).v !== "None") {
                // keyword args like sep= are handled for print below; parse generically
              }
              args.push(parseOr());
              if (peek().t === "comma") {
                eat();
                continue;
              }
              break;
            }
          }
          if (eat().t !== "rparen") throw new PyError(line, "Missing ) after the function call.");
          return callFn(name, args, line, env);
        }
        const v = env.get(name);
        if (v === undefined) throw new PyError(line, `'${name}' isn't defined yet. Create it before using it.`);
        if (isFn(v)) throw new PyError(line, `'${name}' is a function — call it with parentheses, like ${name}().`);
        return v;
      }
      if (t.t === "lparen") {
        const v = parseOr();
        if (eat().t !== "rparen") throw new PyError(line, "Missing ) to close the bracket.");
        return v;
      }
      if (t.t === "lbrack") {
        const items: Value[] = [];
        if (peek().t !== "rbrack") {
          for (;;) {
            items.push(parseOr());
            if (peek().t === "comma") {
              eat();
              continue;
            }
            break;
          }
        }
        if (eat().t !== "rbrack") throw new PyError(line, "Missing ] to close the list.");
        return { k: "list", v: items };
      }
      if (t.t === "lbrace") {
        const m = new Map<string, Value>();
        if (peek().t !== "rbrace") {
          for (;;) {
            const k = parseOr();
            if (eat().t !== "colon") throw new PyError(line, "Dictionary entries look like \"key\": value.");
            const val = parseOr();
            if (k.k !== "str" && k.k !== "num") throw new PyError(line, "Dictionary keys must be text or numbers.");
            m.set(pyStr(k), val);
            if (peek().t === "comma") {
              eat();
              continue;
            }
            break;
          }
        }
        if (eat().t !== "rbrace") throw new PyError(line, "Missing } to close the dictionary.");
        return { k: "dict", v: m };
      }
      throw new PyError(line, "I couldn't understand that expression — the offline runner supports only basic Python.");
    };

    const callFn = (name: string, args: Value[], ln: number, env: Env): Value => {
      if (name === "print") return doPrint(args, ln);
      if (name === "range") {
        let start = 0,
          stop: number,
          step = 1;
        const nums = args.map((a) => {
          if (a.k !== "num" || !Number.isInteger(a.v)) throw new PyError(ln, "range() needs whole numbers.");
          return a.v;
        });
        if (nums.length === 1) stop = nums[0]!;
        else if (nums.length === 2) {
          start = nums[0]!;
          stop = nums[1]!;
        } else if (nums.length === 3) {
          start = nums[0]!;
          stop = nums[1]!;
          step = nums[2]!;
          if (step === 0) throw new PyError(ln, "range() step can't be zero.");
        } else throw new PyError(ln, "range() takes 1 to 3 numbers.");
        const out: Value[] = [];
        if (step > 0) for (let x = start; x < stop && out.length <= MAX_LOOP; x += step) out.push(NUM(x));
        else for (let x = start; x > stop && out.length <= MAX_LOOP; x += step) out.push(NUM(x));
        return { k: "list", v: out };
      }
      if (name === "len") {
        if (args.length !== 1) throw new PyError(ln, "len() takes exactly one value.");
        const a = args[0]!;
        if (a.k === "list") return NUM(a.v.length);
        if (a.k === "str") return NUM(a.v.length);
        if (a.k === "dict") return NUM(a.v.size);
        throw new PyError(ln, "len() works on lists, text, and dictionaries.");
      }
      if (name === "str") {
        if (args.length !== 1) throw new PyError(ln, "str() takes exactly one value.");
        return STR(pyStr(args[0]!));
      }
      if (name === "int") {
        if (args.length !== 1) throw new PyError(ln, "int() takes exactly one value.");
        const a = args[0]!;
        if (a.k === "num") return NUM(Math.trunc(a.v));
        if (a.k === "str") {
          const n = Number(a.v.trim());
          if (!Number.isFinite(n)) throw new PyError(ln, `Can't turn '${a.v}' into a whole number.`);
          return NUM(Math.trunc(n));
        }
        throw new PyError(ln, "int() works on numbers and numeric text.");
      }
      if (name === "float") {
        if (args.length !== 1) throw new PyError(ln, "float() takes exactly one value.");
        const a = args[0]!;
        if (a.k === "num") return NUM(a.v);
        if (a.k === "str") {
          const n = Number(a.v.trim());
          if (!Number.isFinite(n)) throw new PyError(ln, `Can't turn '${a.v}' into a number.`);
          return NUM(n);
        }
        throw new PyError(ln, "float() works on numbers and numeric text.");
      }
      if (name === "input") return STR("");
      if (name === "type") {
        if (args.length !== 1) throw new PyError(ln, "type() takes exactly one value.");
        const a = args[0]!;
        return STR(a.k === "num" ? (Number.isInteger(a.v) ? "<class 'int'>" : "<class 'float'>") : a.k === "str" ? "<class 'str'>" : a.k === "bool" ? "<class 'bool'>" : a.k === "list" ? "<class 'list'>" : "<class 'dict'>");
      }
      const fn = env.get(name);
      if (fn === undefined) throw new PyError(ln, `'${name}' isn't defined. The offline runner knows print, range, len, str, int, float, input, and functions you define with def.`);
      if (!isFn(fn)) throw new PyError(ln, `'${name}' isn't a function, so you can't call it.`);
      if (args.length !== fn.params.length) throw new PyError(ln, `${name}() takes ${fn.params.length} value(s), but you gave ${args.length}.`);
      if (env.size > 400) throw new PyError(ln, "Functions are calling each other too deeply — check for endless recursion.");
      const local: Env = new Map(fn.closure);
      fn.params.forEach((p, i) => local.set(p, args[i]!));
      try {
        execBlock(fn.body, local);
      } catch (e) {
        if (e instanceof ReturnSignal) return e.value;
        throw e;
      }
      return NONE;
    };

    const doPrint = (args: Value[], ln: number): Value => {
      void ln;
      emit(args.map(pyStr).join(" ") + "\n");
      return NONE;
    };

    const v = parseOr();
    if (peek().t !== "eof") throw new PyError(line, "There's something extra at the end of that line.");
    return v;
  };

  const execBlock = (stmts: Stmt[], env: Env): void => {
    for (const s of stmts) {
      if (++steps > MAX_STEPS) throw new PyError(s.line, "This is taking too many steps — it may contain an infinite loop.");
      switch (s.t) {
        case "assign":
          env.set(s.name, evalExpr(s.src, s.line, env));
          break;
        case "expr":
          evalExpr(s.src, s.line, env);
          break;
        case "return":
          throw new ReturnSignal(s.src === null ? NONE : evalExpr(s.src, s.line, env));
        case "break":
          throw new BreakSignal();
        case "continue":
          throw new ContinueSignal();
        case "def":
          env.set(s.name, { params: s.params, body: s.body, closure: new Map(env) });
          break;
        case "if": {
          const c = evalExpr(s.cond, s.line, env);
          if (truthy(c)) execBlock(s.body, env);
          else {
            let done = false;
            for (const e of s.elifs) {
              if (truthy(evalExpr(e.cond, s.line, env))) {
                execBlock(e.body, env);
                done = true;
                break;
              }
            }
            if (!done && s.elseBody) execBlock(s.elseBody, env);
          }
          break;
        }
        case "for": {
          const it = evalExpr(s.iter, s.line, env);
          let items: Value[];
          if (it.k === "list") items = it.v;
          else if (it.k === "str") items = [...it.v].map(STR);
          else if (it.k === "dict") items = [...it.v.keys()].map(STR);
          else throw new PyError(s.line, "You can only loop over a list, text, or range().");
          if (items.length > MAX_LOOP) throw new PyError(s.line, `That loop would run ${items.length} times — keep it under ${MAX_LOOP} for the offline runner.`);
          for (const item of items) {
            env.set(s.varName, item);
            try {
              execBlock(s.body, env);
            } catch (e) {
              if (e instanceof BreakSignal) break;
              if (e instanceof ContinueSignal) continue;
              throw e;
            }
          }
          break;
        }
        case "while": {
          let n = 0;
          for (;;) {
            if (!truthy(evalExpr(s.cond, s.line, env))) break;
            if (++n > MAX_LOOP) throw new PyError(s.line, `This loop ran ${MAX_LOOP} times without stopping — it may be infinite (like 'while True:' with no break).`);
            try {
              execBlock(s.body, env);
            } catch (e) {
              if (e instanceof BreakSignal) break;
              if (e instanceof ContinueSignal) continue;
              throw e;
            }
          }
          break;
        }
      }
    }
  };

  try {
    execBlock(program, new Map());
    return { output: out.join(""), error: null, errorLine: null, iterations: steps };
  } catch (e) {
    if (e instanceof ReturnSignal) {
      return { output: out.join(""), error: "return can only be used inside a function.", errorLine: null, iterations: steps };
    }
    const err = e as PyError;
    return { output: out.join(""), error: err.message ?? "Something went wrong.", errorLine: err.line || null, iterations: steps };
  }
}
