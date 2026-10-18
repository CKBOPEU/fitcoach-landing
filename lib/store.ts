import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import type { Enquiry } from "./enquiry.ts";
export async function storeEnquiry(
  data: Enquiry,
  directory = path.join(process.cwd(), ".data", "enquiries"),
) {
  await mkdir(directory, { recursive: true });
  const id = data.requestId;
  const filename = path.join(directory, `${id}.json`);
  const { website: _website, ...safeData } = data;
  try {
    await writeFile(
      filename,
      JSON.stringify(
        { ...safeData, createdAt: new Date().toISOString(), demo: true },
        null,
        2,
      ),
      { flag: "wx", mode: 0o600 },
    );
    return { id, duplicate: false };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    const existing = JSON.parse(await readFile(filename, "utf8"));
    for (const key of [
      "name",
      "email",
      "programme",
      "message",
      "consent",
    ] as const) {
      if (existing[key] !== data[key]) throw new Error("ID_CONFLICT");
    }
    return { id, duplicate: true };
  }
}
