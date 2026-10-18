import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
const base = "http://127.0.0.1:3100";
const payload = {
  name: "API Test",
  email: "qa@example.com",
  programme: "Foundation",
  message: "Synthetic integration test. No real contact details.",
  consent: true,
  website: "",
  requestId: randomUUID(),
};
async function post(body, headers = {}) {
  return fetch(`${base}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: base, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
const created = await post(payload);
assert.equal(created.status, 201);
assert.equal((await created.json()).id, payload.requestId);
assert.equal((await post(payload)).status, 200);
assert.equal(
  (
    await post({
      ...payload,
      message: "Changed content with the same request identifier.",
    })
  ).status,
  409,
);
assert.equal((await post({ ...payload, email: "invalid" })).status, 422);
assert.equal(
  (await post(payload, { Origin: "https://unrelated.example" })).status,
  403,
);
assert.equal(
  (await post(payload, { "Content-Type": "text/plain" })).status,
  415,
);
assert.equal((await post("{")).status, 400);
assert.equal((await post("x".repeat(9000))).status, 413);
console.log(
  "PASS: 8 live HTTP checks (create, retry, conflict, validation, origin, content type, malformed JSON, size limit).",
);
