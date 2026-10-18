import { validateEnquiry } from "../../../lib/enquiry";
import { storeEnquiry } from "../../../lib/store";
export const runtime = "nodejs";
const LIMIT = 8192;
export async function POST(request: Request) {
  const json = (body: unknown, status = 200) =>
    Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  if (
    origin &&
    !["http://127.0.0.1:3100", "http://localhost:3100"].includes(origin)
  )
    return json({ error: "Cross-origin requests are not accepted." }, 403);
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return json({ error: "JSON is required." }, 415);
  if (Number(request.headers.get("content-length")) > LIMIT)
    return json({ error: "Request is too large." }, 413);
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  const reader = request.body?.getReader();
  if (!reader) return json({ error: "Request body is required." }, 400);
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > LIMIT) {
        await reader.cancel();
        return json({ error: "Request is too large." }, 413);
      }
      chunks.push(value);
    }
    const { data, errors } = validateEnquiry(
      JSON.parse(Buffer.concat(chunks).toString("utf8")),
    );
    if (!data)
      return json(
        { error: "Please check the highlighted fields.", errors },
        422,
      );
    const result = await storeEnquiry(data);
    return json(
      { id: result.id, message: "Demo request saved locally; no email sent." },
      result.duplicate ? 200 : 201,
    );
  } catch (error) {
    if (error instanceof SyntaxError)
      return json({ error: "Invalid JSON." }, 400);
    if (error instanceof Error && error.message === "ID_CONFLICT")
      return json(
        {
          error:
            "The previous request changed. Reload the page to start a new request.",
        },
        409,
      );
    return json(
      { error: "We could not save your demo request. Please try again." },
      500,
    );
  }
}
