import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { validateEnquiry } from "../lib/enquiry.ts";
import { storeEnquiry } from "../lib/store.ts";
const valid = () => ({
  name: "Demo Visitor",
  email: "visitor@example.com",
  programme: "Build",
  message: "A fictional request for a consistent routine.",
  consent: true,
  website: "",
  requestId: randomUUID(),
});
test("valid submission is trimmed and preserves selected programme", () => {
  const result = validateEnquiry({
    ...valid(),
    name: "  Demo Visitor  ",
    programme: "Personal",
  });
  assert.equal(result.data?.name, "Demo Visitor");
  assert.equal(result.data?.programme, "Personal");
});
test("invalid payload types fail without throwing", () => {
  for (const value of [null, [], 42, "hello", {}, { name: 123, email: [] }])
    assert.ok(Object.keys(validateEnquiry(value).errors).length);
});
test("rejects malformed email, missing consent and unsupported programme", () => {
  const result = validateEnquiry({
    ...valid(),
    email: "bad",
    consent: false,
    programme: "Other",
  });
  assert.ok(result.errors.email);
  assert.ok(result.errors.consent);
  assert.ok(result.errors.programme);
  assert.equal(result.data, undefined);
});
test("enforces lengths and honeypot", () => {
  const result = validateEnquiry({
    ...valid(),
    name: "a",
    message: "x".repeat(1001),
    website: "bot",
  });
  assert.ok(result.errors.name);
  assert.ok(result.errors.message);
  assert.ok(result.errors.website);
});
test("rejects path traversal instead of accepting a storage filename", () => {
  assert.ok(
    validateEnquiry({ ...valid(), requestId: "../../secret" }).errors.requestId,
  );
});
test("retry stores one file and refuses altered content with the same ID", async () => {
  await mkdir(path.join(process.cwd(), ".test-data"), { recursive: true });
  const dir = await mkdtemp(path.join(process.cwd(), ".test-data", "storage-"));
  const data = validateEnquiry(valid()).data!;
  assert.equal((await storeEnquiry(data, dir)).duplicate, false);
  assert.equal((await storeEnquiry(data, dir)).duplicate, true);
  assert.equal((await readdir(dir)).length, 1);
  await assert.rejects(
    () =>
      storeEnquiry(
        { ...data, message: "Changed contents of the request." },
        dir,
      ),
    /ID_CONFLICT/,
  );
});
