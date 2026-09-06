import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const ROOT_DOCS = fs.readdirSync(ROOT).filter((name) => /^\d\d-.*\.md$|^(README|CONTRIBUTING)\.md$/.test(name));

function lineNumber(text, offset) {
  return text.slice(0, offset).split("\n").length;
}

function addMatches(violations, file, text, rule, pattern, message) {
  for (const match of text.matchAll(pattern)) {
    violations.push({ file, line: lineNumber(text, match.index), rule, message });
  }
}

export function scanDocs(files = ROOT_DOCS) {
  const violations = [];
  const existing = new Set(files);
  for (const file of files) {
    const text = fs.readFileSync(path.join(ROOT, file), "utf8");
    const historical = file === "08-migration-v3.md";
    if (!historical) {
      addMatches(violations, file, text, "stale-current-version", /v3\.1\.0|\b68 个|\b53 个|\b60 项/g, "旧版本或旧数量只能出现在迁移页的历史说明中");
    }
    addMatches(violations, file, text, "wrong-convert-endpoint", /https:\/\/(?!www\.)md2wechat\.cn\/api\/convert/g, "Convert API 必须使用稳定地址");
    addMatches(violations, file, text, "platform-overclaim", /(?:支持|兼容)[^\n。]{0,12}(?:千问办公|DuMate|WorkBuddy|豆包工作)/g, "没有验证证据时不得宣称平台支持或兼容");
    for (const sentence of text.split(/[。\n]/)) {
      if (/Convert API/.test(sentence) && /草稿/.test(sentence) && /(?:创建|生成)/.test(sentence) && !/(?:不|不会|不能)[^。\n]{0,10}(?:创建|生成)[^。\n]{0,8}草稿/.test(sentence)) {
        violations.push({ file, line: lineNumber(text, text.indexOf(sentence)), rule: "convert-draft-confusion", message: "Convert API 不能描述为创建草稿" });
      }
    }
    if ((text.match(/^```/gm) ?? []).length % 2 !== 0) violations.push({ file, line: 1, rule: "unclosed-fence", message: "代码围栏未闭合" });
    for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+\.md)(?:#[^)]+)?\)/g)) {
      const target = path.normalize(path.join(path.dirname(file), match[1]));
      if (!existing.has(target)) violations.push({ file, line: lineNumber(text, match.index), rule: "broken-local-link", message: `找不到 ${match[1]}` });
    }
  }
  return violations;
}

export function readLock() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, ".md2wechat/ecosystem-facts.lock.json"), "utf8"));
}

export function validateLock(lock = readLock()) {
  const violations = [];
  if (lock.schemaVersion !== 1 || lock.reviewedAt !== "2026-09-06") violations.push("lock metadata mismatch");
  const expected = {
    runtime: ["geekjourneyx/md2wechat-skill", "VERSION", "18091983f59ddde8105e566545a0d9e4a12a4f1c", "v3.4.0"],
    products: ["md2wechat/.github", "facts/product-routes.json", "9b25b7142815876f44053cf819842db320408d2a", 1],
    platforms: ["md2wechat/md2wechat-wiki", "evidence/agent-platforms.json", "474ef8b8398e9b21b79ed937e24cb3c13ce1505d", 1]
  };
  if (JSON.stringify(Object.keys(lock.sources ?? {}).sort()) !== JSON.stringify(Object.keys(expected).sort())) violations.push("lock sources mismatch");
  for (const [name, values] of Object.entries(expected)) {
    const source = lock.sources?.[name];
    if (!source || [source.repository, source.path, source.sha, source.schemaVersion].some((value, index) => value !== values[index])) violations.push(`${name} pin mismatch`);
    if (source && !/^[0-9a-f]{40}$/.test(source.sha)) violations.push(`${name} sha is not immutable`);
  }
  return violations;
}

export function validateRequiredContent() {
  const all = ROOT_DOCS.map((file) => fs.readFileSync(path.join(ROOT, file), "utf8")).join("\n");
  const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
  const missing = [];
  for (const command of ["md2wechat version --json", "md2wechat capabilities --json", "md2wechat skills read md2wechat --json", "md2wechat themes list --json", "md2wechat themes show", "md2wechat layout list --json", "md2wechat layout show", "md2wechat providers show minimax --json"]) {
    if (!all.includes(command)) missing.push(command);
  }
  if (!readme.includes("v3.4.0")) missing.push("v3.4.0");
  for (const count of ["48", "77", "56", "63"]) if (!readme.includes(`${count} 个`) && !readme.includes(`${count} 项`)) missing.push(`README count ${count}`);
  if (!all.includes("https://www.md2wechat.cn/api/convert")) missing.push("Convert API endpoint");
  if (!/Convert API[^。\n]*不[^。\n]*创建[^。\n]*草稿/.test(all)) missing.push("Convert API draft boundary");
  if (!/草稿[^。\n]*不等于[^。\n]*(?:发送|群发)/.test(all)) missing.push("draft broadcast boundary");
  return missing;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const errors = [...scanDocs().map((v) => `${v.file}:${v.line} [${v.rule}] ${v.message}`), ...validateLock(), ...validateRequiredContent().map((v) => `missing: ${v}`)];
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Documentation checks passed (${ROOT_DOCS.length} Markdown files).`);
  }
}
