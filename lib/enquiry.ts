export const programmes = ["Foundation", "Build", "Personal"] as const;
export type Programme = (typeof programmes)[number];
export type Enquiry = {
  name: string;
  email: string;
  programme: Programme;
  message: string;
  consent: boolean;
  website: string;
  requestId: string;
};
export type FieldErrors = Partial<Record<keyof Enquiry, string>>;
export function validateEnquiry(input: unknown): {
  data?: Enquiry;
  errors: FieldErrors;
} {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { errors: { name: "Please complete the form." } };
  const raw = input as Record<string, unknown>;
  const read = (key: string) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
  const data = {
    name: read("name"),
    email: read("email"),
    programme: read("programme") as Programme,
    message: read("message"),
    consent: raw.consent === true,
    website: read("website"),
    requestId: read("requestId"),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 2 || data.name.length > 80)
    errors.name = "Enter a name between 2 and 80 characters.";
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";
  if (!programmes.includes(data.programme))
    errors.programme = "Choose a coaching programme.";
  if (data.message.length < 10 || data.message.length > 1000)
    errors.message = "Use 10–1,000 characters to tell us about your goals.";
  if (!data.consent)
    errors.consent = "Please confirm you are using fictional demo details.";
  if (data.website) errors.website = "Unable to accept this request.";
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      data.requestId,
    )
  )
    errors.requestId = "Please reload the page and try again.";
  return { data: Object.keys(errors).length ? undefined : data, errors };
}
