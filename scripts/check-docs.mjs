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

function maskHistorical(file, text, violations) {
  const starts = text.match(/<!-- historical:start -->/g)?.length ?? 0;
  const ends = text.match(/<!-- historical:end -->/g)?.length ?? 0;
  if (starts !== ends) violations.push({ file, line: 1, rule: "historical-markers", message: "历史段落标记必须成对出现" });
  return text.replace(/<!-- historical:start -->[\s\S]*?<!-- historical:end -->/g, (segment) => segment.replace(/[^\n]/g, " "));
}

export function scanDocument(file, text, existing = new Set(ROOT_DOCS)) {
  const violations = [];
  const currentText = maskHistorical(file, text, violations);
  addMatches(violations, file, currentText, "stale-current-version", /\bv3\.[0-3](?:\.\d+)?\b|\b68 个|\b53 个|\b60 项/g, "旧版本或旧数量只能出现在明确标记的历史段落中");
  addMatches(violations, file, text, "wrong-convert-endpoint", /https:\/\/(?!www\.)md2wechat\.cn\/api\/convert/g, "Convert API 必须使用稳定地址");
  addMatches(violations, file, text, "wrong-api-key-header", /Md2wechat-API-Key/gi, "Convert API 鉴权头必须使用 X-API-Key");
  for (const sentence of text.split(/[。\n]/)) {
    const mentionsPlatform = /千问办公|DuMate|WorkBuddy|豆包工作/i.test(sentence);
    const assertsSupport = /支持|兼容|适配|开箱即用|可直接使用|可以直接使用|已(?:通过|完成).{0,12}(?:验证|测试)/.test(sentence);
    const explicitlyNegated = /不|未|尚未|没有|不得|不能|并非|不应/.test(sentence);
    if (mentionsPlatform && assertsSupport && !explicitlyNegated) {
      violations.push({ file, line: lineNumber(text, text.indexOf(sentence)), rule: "platform-overclaim", message: "没有验证证据时不得宣称平台支持或兼容" });
    }
  }
  for (const sentence of text.split(/[。\n]/)) {
      if (/Convert API/.test(sentence) && /草稿/.test(sentence) && /(?:创建|生成)/.test(sentence) && !/(?:不|不会|不能)[^。\n]{0,10}(?:创建|生成)[^。\n]{0,8}草稿/.test(sentence)) {
        violations.push({ file, line: lineNumber(text, text.indexOf(sentence)), rule: "convert-draft-confusion", message: "Convert API 不能描述为创建草稿" });
      }
  }
  if ((text.match(/^```/gm) ?? []).length % 2 !== 0) violations.push({ file, line: 1, rule: "unclosed-fence", message: "代码围栏未闭合" });
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const destination = match[1].trim().replace(/^<|>$/g, "").split(/\s+["']/)[0];
    if (/^[a-z][a-z0-9+.-]*:/i.test(destination) || destination.startsWith("//") || destination.startsWith("#")) continue;
    const localPath = destination.split("#")[0].split("?")[0];
    if (!localPath.endsWith(".md")) continue;
    const target = path.normalize(path.join(path.dirname(file), localPath));
    if (!existing.has(target)) violations.push({ file, line: lineNumber(text, match.index), rule: "broken-local-link", message: `找不到 ${localPath}` });
  }
  return violations;
}

export function scanDocs(files = ROOT_DOCS) {
  const existing = new Set(files);
  const violations = [];
  for (const file of files) {
    const text = fs.readFileSync(path.join(ROOT, file), "utf8");
    violations.push(...scanDocument(file, text, existing));
  }
  return violations;
}

export function readLock() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, ".md2wechat/ecosystem-facts.lock.json"), "utf8"));
}

export function validateLock(lock = readLock()) {
  const violations = [];
  const sameKeys = (value, keys) => JSON.stringify(Object.keys(value ?? {}).sort()) === JSON.stringify([...keys].sort());
  if (!sameKeys(lock, ["schemaVersion", "reviewedAt", "sources"])) violations.push("lock keys mismatch");
  if (lock.schemaVersion !== 1 || lock.reviewedAt !== "2026-09-06") violations.push("lock metadata mismatch");
  const expected = {
    runtime: ["geekjourneyx/md2wechat-skill", "VERSION", "18091983f59ddde8105e566545a0d9e4a12a4f1c", "v3.4.0"],
    products: ["md2wechat/.github", "facts/product-routes.json", "9b25b7142815876f44053cf819842db320408d2a", 1],
    platforms: ["md2wechat/md2wechat-wiki", "evidence/agent-platforms.json", "474ef8b8398e9b21b79ed937e24cb3c13ce1505d", 1]
  };
  if (JSON.stringify(Object.keys(lock.sources ?? {}).sort()) !== JSON.stringify(Object.keys(expected).sort())) violations.push("lock sources mismatch");
  for (const [name, values] of Object.entries(expected)) {
    const source = lock.sources?.[name];
    if (source && !sameKeys(source, ["repository", "path", "sha", "schemaVersion"])) violations.push(`${name} keys mismatch`);
    if (!source || [source.repository, source.path, source.sha, source.schemaVersion].some((value, index) => value !== values[index])) violations.push(`${name} pin mismatch`);
    if (source && !/^[0-9a-f]{40}$/.test(source.sha)) violations.push(`${name} sha is not immutable`);
  }
  return violations;
}

export function validateRequiredContent() {
  const all = ROOT_DOCS.map((file) => fs.readFileSync(path.join(ROOT, file), "utf8")).join("\n");
  const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
  const images = fs.readFileSync(path.join(ROOT, "05-ai-image.md"), "utf8");
  const publishing = fs.readFileSync(path.join(ROOT, "10-publishing.md"), "utf8");
  const missing = [];
  for (const command of ["md2wechat version --json", "md2wechat capabilities --json", "md2wechat skills read md2wechat --json", "md2wechat themes list --json", "md2wechat themes show", "md2wechat layout list --json", "md2wechat layout show", "md2wechat providers show minimax --json"]) {
    if (!all.includes(command)) missing.push(command);
  }
  if (!readme.includes("v3.4.0")) missing.push("v3.4.0");
  for (const count of ["48", "77", "56", "63"]) if (!readme.includes(`${count} 个`) && !readme.includes(`${count} 项`)) missing.push(`README count ${count}`);
  if (!all.includes("https://www.md2wechat.cn/api/convert")) missing.push("Convert API endpoint");
  if (!all.includes("X-API-Key: YOUR_API_KEY")) missing.push("X-API-Key header");
  if (!/Convert API[^。\n]*不[^。\n]*创建[^。\n]*草稿/.test(all)) missing.push("Convert API draft boundary");
  if (!/草稿[^。\n]*不等于[^。\n]*(?:发送|群发)/.test(all)) missing.push("draft broadcast boundary");
  const configAt = readme.indexOf("md2wechat config init");
  const keyAt = readme.indexOf("MD2WECHAT_API_KEY=\"replace_with_your_key\"");
  const doctorAt = readme.indexOf("md2wechat doctor --json");
  const previewAt = readme.indexOf("md2wechat preview");
  if (!(configAt >= 0 && keyAt > configAt && doctorAt > keyAt && previewAt > doctorAt)) missing.push("README preview credential order");
  if (!(/--plan/.test(images) && /不调用图片 Provider/.test(images) && /不写入微信素材库/.test(images))) missing.push("image plan boundary");
  if (!(/IMAGE_API_KEY/.test(images) && /WECHAT_APPID/.test(images) && /WECHAT_SECRET/.test(images) && /永久素材库/.test(images) && /明确同意/.test(images))) missing.push("direct image confirmation boundary");
  if (!/inspect[\s\S]*--wechat-account ACCOUNT[\s\S]*convert[\s\S]*--wechat-account ACCOUNT/.test(publishing)) missing.push("publishing account consistency");
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
