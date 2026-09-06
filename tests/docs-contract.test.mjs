import test from "node:test";
import assert from "node:assert/strict";
import { readLock, scanDocs, validateLock, validateRequiredContent } from "../scripts/check-docs.mjs";

test("current docs contain no stale version or count", () => {
  assert.deepEqual(scanDocs().filter((v) => v.rule === "stale-current-version"), []);
});

test("Convert API is not confused with publishing", () => {
  assert.deepEqual(scanDocs().filter((v) => v.rule.includes("convert")), []);
  assert.deepEqual(validateRequiredContent().filter((v) => /Convert|draft/.test(v)), []);
});

test("platform compatibility is not overclaimed", () => {
  assert.deepEqual(scanDocs().filter((v) => v.rule === "platform-overclaim"), []);
});

test("Markdown fences and local links are valid", () => {
  assert.deepEqual(scanDocs().filter((v) => /fence|link/.test(v.rule)), []);
});

test("required discovery paths are documented", () => {
  assert.deepEqual(validateRequiredContent(), []);
});

test("Guide pins each authority to the reviewed immutable source", () => {
  const lock = readLock();
  assert.deepEqual(Object.keys(lock.sources).sort(), ["platforms", "products", "runtime"]);
  for (const source of Object.values(lock.sources)) assert.match(source.sha, /^[0-9a-f]{40}$/);
  assert.deepEqual(validateLock(), []);
});
