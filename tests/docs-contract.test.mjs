import test from "node:test";
import assert from "node:assert/strict";
import { readLock, scanDocs, scanDocument, validateLock, validateRequiredContent } from "../scripts/check-docs.mjs";

test("current docs contain no stale version or count", () => {
  assert.deepEqual(scanDocs().filter((v) => v.rule === "stale-current-version"), []);
});

test("old facts are allowed only inside explicit historical markers", () => {
  for (const version of ["v3.0.0", "v3.1.0", "v3.2.0", "v3.3.0"]) {
    assert.equal(scanDocument("08-migration-v3.md", `当前仍是 ${version}`).some((v) => v.rule === "stale-current-version"), true);
  }
  assert.equal(scanDocument("08-migration-v3.md", "<!-- historical:start -->\nv3.1.0 有 68 个条目\n<!-- historical:end -->").length, 0);
  assert.equal(scanDocument("08-migration-v3.md", "<!-- historical:start -->\nv3.3.0 迁移记录\n<!-- historical:end -->").length, 0);
  assert.equal(scanDocument("08-migration-v3.md", "<!-- historical:start -->\nv3.1.0").some((v) => v.rule === "historical-markers"), true);
});

test("Convert API is not confused with publishing", () => {
  assert.deepEqual(scanDocs().filter((v) => v.rule.includes("convert")), []);
  assert.deepEqual(validateRequiredContent().filter((v) => /Convert|draft/.test(v)), []);
});

test("platform compatibility is not overclaimed", () => {
  assert.deepEqual(scanDocs().filter((v) => v.rule === "platform-overclaim"), []);
  for (const claim of ["支持千问办公。", "WorkBuddy 已兼容。", "豆包工作已完成兼容测试。", "DuMate 可直接使用。"] ) {
    assert.equal(scanDocument("fixture.md", claim).some((v) => v.rule === "platform-overclaim"), true);
  }
  for (const safe of ["尚未支持千问办公。", "WorkBuddy 未完成兼容测试。", "不应宣称 DuMate 已兼容。"] ) {
    assert.equal(scanDocument("fixture.md", safe).some((v) => v.rule === "platform-overclaim"), false);
  }
  const mixed = scanDocument("fixture.md", "尚未支持 WorkBuddy，但 DuMate 已兼容。").filter((v) => v.rule === "platform-overclaim");
  assert.equal(mixed.length, 1);
});

test("wrong API header is rejected", () => {
  assert.equal(scanDocument("fixture.md", "Md2wechat-API-Key: secret").some((v) => v.rule === "wrong-api-key-header"), true);
  assert.equal(scanDocument("fixture.md", "X-API-Key: secret").some((v) => v.rule === "wrong-api-key-header"), false);
});

test("Markdown fences and local links are valid", () => {
  assert.deepEqual(scanDocs().filter((v) => /fence|link/.test(v.rule)), []);
  assert.equal(scanDocument("fixture.md", "[source](https://github.com/org/repo/blob/sha/README.md)\n[section](#title)").some((v) => v.rule === "broken-local-link"), false);
  assert.equal(scanDocument("fixture.md", "[missing](missing.md)").some((v) => v.rule === "broken-local-link"), true);
});

test("required discovery paths are documented", () => {
  assert.deepEqual(validateRequiredContent(), []);
});

test("Guide pins each authority to the reviewed immutable source", () => {
  const lock = readLock();
  assert.deepEqual(Object.keys(lock.sources).sort(), ["platforms", "products", "runtime"]);
  for (const source of Object.values(lock.sources)) assert.match(source.sha, /^[0-9a-f]{40}$/);
  assert.deepEqual(validateLock(), []);
  assert.equal(validateLock({ ...lock, unexpected: true }).includes("lock keys mismatch"), true);
  assert.equal(validateLock({ ...lock, sources: { ...lock.sources, runtime: { ...lock.sources.runtime, unexpected: true } } }).includes("runtime keys mismatch"), true);
});
