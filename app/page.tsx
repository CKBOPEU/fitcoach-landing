"use client";
import { useRef, useState, type FormEvent } from "react";
import {
  programmes,
  validateEnquiry,
  type FieldErrors,
  type Programme,
} from "../lib/enquiry";
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 24 14 4h8L12 24Zm10 4 10-20h5L19 28Z" fill="currentColor" />
    </svg>
  );
}
function MovementArt() {
  return (
    <svg
      className="movement-art"
      viewBox="0 0 620 680"
      role="img"
      aria-label="Original illustration of a runner moving through a green landscape"
    >
      <defs>
        <linearGradient id="field" x2="0" y2="1">
          <stop stopColor="#dce3d2" />
          <stop offset="1" stopColor="#b7c8aa" />
        </linearGradient>
        <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e5fa8b" />
          <stop offset="1" stopColor="#a8c94c" />
        </linearGradient>
        <pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".5" fill="#213b2d" opacity=".13" />
        </pattern>
      </defs>
      <rect width="620" height="680" fill="url(#field)" />
      <circle cx="420" cy="164" r="110" fill="#f0f1d7" opacity=".8" />
      <path d="M-100 550Q150 280 680 340V680H0" fill="#99af89" />
      <path d="M-80 610Q210 340 660 450V680H0" fill="#6e8d64" />
      <path
        d="M-80 690Q180 290 720 410"
        fill="none"
        stroke="#dce4bd"
        strokeWidth="110"
      />
      <path
        d="M-70 690Q180 295 720 410"
        fill="none"
        stroke="#fff9d5"
        strokeWidth="2"
        strokeDasharray="16 18"
      />
      <ellipse
        cx="320"
        cy="602"
        rx="140"
        ry="14"
        fill="#314b35"
        opacity=".18"
      />
      <path
        d="m329 371-30 100-112 76"
        fill="none"
        stroke="#263f31"
        strokeWidth="52"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m362 372 49 97-12 112"
        fill="none"
        stroke="#1b3227"
        strokeWidth="55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m184 540-22 17 25 31 58 4q12-5 1-14l-36-21" fill="#f5f2e2" />
      <path d="m379 573-4 32h89q12-8-3-15l-38-12" fill="#f5f2e2" />
      <path
        d="m332 245-64 64-63-30"
        fill="none"
        stroke="#ae724f"
        strokeWidth="29"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m369 247 45 54 55-68"
        fill="none"
        stroke="#bc825b"
        strokeWidth="29"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m321 221 55 8 25 130q-31 41-105 13l-4-85Z" fill="url(#shirt)" />
      <path d="m316 235-31 32 30 27 18-46m38-17 27 28-26 22" fill="#d0e77c" />
      <path d="m337 219 7-31 31 7-4 36" fill="#ae724f" />
      <ellipse
        cx="361"
        cy="172"
        rx="33"
        ry="43"
        transform="rotate(17 361 172)"
        fill="#bc825b"
      />
      <path
        d="M328 172q-13-54 34-55 48 0 35 44l-21-15-23 7-10 26Z"
        fill="#21392b"
      />
      <path d="m388 174 13 13-13 5" fill="#bc825b" />
      <path
        d="M311 312q29 14 57 6"
        fill="none"
        stroke="#809d36"
        strokeWidth="2"
      />
      <path
        d="m108 232 100-28m-117 57 80-21m291 285 64-17"
        stroke="#f6f7df"
        opacity=".6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect width="620" height="680" fill="url(#grain)" />
    </svg>
  );
}
const plans = [
  {
    name: "Foundation" as Programme,
    tag: "Find your rhythm",
    price: "89",
    description:
      "A clear starting point. Build a routine that feels good and fits your week.",
    features: [
      "Personalised training plan",
      "Three sessions per week",
      "Monthly progress check-in",
      "Exercise video library",
    ],
  },
  {
    name: "Build" as Programme,
    tag: "Make progress your habit",
    price: "149",
    description:
      "More guidance, steady progression and support to keep you moving.",
    features: [
      "Everything in Foundation",
      "Weekly plan adjustments",
      "Weekly written check-in",
      "Direct messaging support",
    ],
  },
  {
    name: "Personal" as Programme,
    tag: "Your goals. Your pace.",
    price: "249",
    description:
      "A closer coaching partnership, designed around your individual goals.",
    features: [
      "Everything in Build",
      "Flexible session schedule",
      "Detailed technique feedback",
      "Individual goal reviews",
    ],
  },
];
const faqs = [
  [
    "Do I need to be fit before I start?",
    "No. This coaching concept starts with your current experience, available time and equipment. The Foundation programme is designed as an approachable starting point.",
  ],
  [
    "Can I train at home?",
    "Yes. A plan can be adapted for bodyweight training, basic home equipment or a gym. You can describe your setup in the consultation form.",
  ],
  [
    "What does a typical week look like?",
    "The sample routine balances three strength sessions with mobility, an easy walk and rest. Actual sessions should be tailored to the individual rather than copied as medical advice.",
  ],
  [
    "Is this a real coaching service?",
    "No. FitCoach is an independently built portfolio demonstration. The programmes and prices are illustrative. No coaching is sold, no payment is taken and no email is sent.",
  ],
];
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [programme, setProgramme] = useState<Programme>("Build");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [notice, setNotice] = useState("");
  const [receipt, setReceipt] = useState("");
  const requestId = useRef("");
  const sending = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  function choosePlan(value: Programme) {
    setProgramme(value);
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = new FormData(event.currentTarget);
    requestId.current ||= crypto.randomUUID();
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      programme,
      message: form.get("message"),
      website: form.get("website"),
      consent: form.get("consent") === "on",
      requestId: requestId.current,
    };
    const result = validateEnquiry(payload);
    setErrors(result.errors);
    if (!result.data) {
      setStatus("error");
      setNotice("Please check the highlighted fields.");
      const first = Object.keys(result.errors)[0];
      (
        formRef.current?.elements.namedItem(first) as HTMLElement | null
      )?.focus();
      return;
    }
    sending.current = true;
    setStatus("sending");
    setNotice("");
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 12000);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: abort.signal,
      });
      const body = await response.json();
      if (!response.ok) {
        setErrors(body.errors || {});
        throw new Error(
          body.error || "Unable to save your request. Please try again.",
        );
      }
      setReceipt(body.id);
      setStatus("success");
      setNotice(body.message);
    } catch (error) {
      setStatus("error");
      setNotice(
        error instanceof TypeError
          ? "Connection unavailable. Your details are still here. Please try again when the local server is running."
          : error instanceof Error && error.name !== "AbortError"
            ? error.message
            : "The request timed out. Please try again; a retry will not duplicate the same request.",
      );
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="demo-bar">
        A website concept, made to move.{" "}
        <span>Portfolio demo · No real bookings</span>
      </div>
      <header className="header shell">
        <a className="brand" href="#" aria-label="FitCoach home">
          <Mark />
          fitcoach<span className="brand-dot">.</span>
        </a>
        <nav
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Main navigation"
          id="main-navigation"
        >
          <a href="#approach" onClick={() => setMenuOpen(false)}>
            The approach
          </a>
          <a href="#programmes" onClick={() => setMenuOpen(false)}>
            Programmes
          </a>
          <a href="#questions" onClick={() => setMenuOpen(false)}>
            FAQs
          </a>
          <a
            href="#contact"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Let’s get started <Arrow />
          </a>
        </nav>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
        </button>
      </header>
      <main id="main">
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dot" />
              PERSONAL TRAINING, ON YOUR TERMS
            </p>
            <h1>
              Make room
              <br />
              for a<br />
              <em>stronger you.</em>
            </h1>
            <p className="intro">
              Not a new you. A stronger, more confident version of the person
              you already are. Training that works with your life.
            </p>
            <a className="button primary" href="#programmes">
              Find your programme <Arrow />
            </a>
            <div className="hero-note">
              <span className="small-orbit" aria-hidden="true">
                ✳
              </span>
              <p>
                Small steps. Real intention.
                <br />
                <strong>A routine you can come back to.</strong>
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <MovementArt />
            <div className="visual-caption">
              <span>MOVE WITH PURPOSE</span>
              <span>01 — EVERYDAY STRENGTH</span>
            </div>
            <div className="session-card">
              <div className="session-icon" aria-hidden="true">
                ↗
              </div>
              <div>
                <span>YOUR NEXT CHAPTER</span>
                <strong>Starts with showing up.</strong>
              </div>
            </div>
            <span className="art-label">ILLUSTRATED TRAINING CONCEPT</span>
          </div>
        </section>
        <div className="principles">
          <div className="shell principles-inner">
            <span>Built around you</span>
            <i>✳</i>
            <span>Progress over perfection</span>
            <i>✳</i>
            <span>Strength for real life</span>
            <i>✳</i>
            <span>Room to grow</span>
          </div>
        </div>
        <section id="approach" className="section shell approach">
          <div>
            <p className="eyebrow">01 / THE APPROACH</p>
            <h2>
              Less all-or-nothing.
              <br />
              <em>More you, moving.</em>
            </h2>
            <p className="section-intro">
              You don’t need to turn your life upside down. You need a
              thoughtful plan, a little structure and space to be human.
            </p>
            <a href="#contact" className="text-link">
              Let’s find your starting point <Arrow />
            </a>
          </div>
          <div className="steps">
            {[
              [
                "01",
                "Start where you are",
                "Your goals, your experience, your schedule. A good plan begins by listening.",
              ],
              [
                "02",
                "Build a rhythm",
                "Purposeful sessions, manageable steps and recovery that gets the attention it deserves.",
              ],
              [
                "03",
                "Keep moving forward",
                "Check in, adjust and repeat. A plan should evolve as you do.",
              ],
            ].map(([n, title, text]) => (
              <article className="step" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="week-section">
          <div className="shell week-layout">
            <div>
              <p className="eyebrow">
                A LITTLE STRUCTURE. A LOT OF POSSIBILITY.
              </p>
              <h2>
                A week with
                <br />
                <em>room to breathe.</em>
              </h2>
              <p>
                This is what balance could look like.
                <br />
                Movement, recovery, and the life in between.
              </p>
              <span className="sample-label">
                ILLUSTRATIVE ROUTINE · NOT A PERSONALISED PLAN
              </span>
            </div>
            <div className="week-board">
              <div className="week-heading">
                <span>Your weekly rhythm</span>
                <span>EXAMPLE WEEK ↗</span>
              </div>
              {[
                ["MON", "Full-body strength", "35 min", "strength"],
                ["TUE", "Walk & reset", "Your pace", "rest"],
                ["WED", "Strength & stability", "35 min", "strength"],
                ["THU", "A little mobility", "15 min", "mobility"],
                ["FRI", "Full-body strength", "35 min", "strength"],
                ["SAT / SUN", "Make space for life", "Rest & recharge", "rest"],
              ].map(([day, name, time, type]) => (
                <div className="week-row" key={day}>
                  <span>{day}</span>
                  <strong>
                    <i className={type} />
                    {name}
                  </strong>
                  <small>{time}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="programmes" className="section shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / FIND YOUR FIT</p>
              <h2>
                A little support.
                <br />
                <em>A stronger foundation.</em>
              </h2>
            </div>
            <p>
              Choose the level of guidance that feels right.
              <br />
              Every programme starts with you.
              <br />
              <span className="muted">
                Illustrative plans and prices. Nothing is sold here.
              </span>
            </p>
          </div>
          <div className="plans-grid">
            {plans.map((plan) => (
              <article
                className={`plan ${plan.name === "Build" ? "featured" : ""}`}
                key={plan.name}
              >
                {plan.name === "Build" && (
                  <span className="plan-badge">A LITTLE EXTRA GUIDANCE</span>
                )}
                <p className="plan-tag">{plan.tag}</p>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="price">
                  <span>${plan.price}</span>
                  <small>/ month</small>
                </div>
                <button
                  className={`button ${plan.name === "Build" ? "lime" : "outline"}`}
                  onClick={() => choosePlan(plan.name)}
                >
                  Explore {plan.name} <Arrow />
                </button>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section id="questions" className="section shell faq-layout">
          <div>
            <p className="eyebrow">03 / GOOD QUESTIONS</p>
            <h2>
              A little clarity
              <br />
              <em>before you start.</em>
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section shell">
          <div className="contact-copy">
            <p className="eyebrow">04 / YOUR NEXT SMALL STEP</p>
            <h2>
              Let’s make
              <br />
              <em>your move.</em>
            </h2>
            <p>
              Tell us a little about your goals and the kind of support you’re
              looking for.
            </p>
            <div className="contact-note">
              <span aria-hidden="true">↗</span>
              <p>
                <strong>Try the demo, not a real booking.</strong>
                <br />
                Use fictional details. Your request stays on this local server.
                No email is sent.
              </p>
            </div>
            <div className="contact-decoration" aria-hidden="true">
              ✳
            </div>
          </div>
          <div className="form-wrap">
            {status === "success" ? (
              <div className="success-panel" role="status">
                <span className="success-icon" aria-hidden="true">
                  ✓
                </span>
                <p className="eyebrow">ALL SET</p>
                <h3>
                  Your demo request
                  <br />
                  is saved.
                </h3>
                <p>{notice}</p>
                <p className="receipt">Reference: {receipt}</p>
                <button
                  className="button primary"
                  onClick={() => {
                    setStatus("idle");
                    setNotice("");
                    requestId.current = "";
                  }}
                >
                  Try another request <Arrow />
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate>
                <div className="form-title">
                  <h3>Your starting point</h3>
                  <span>DEMO FORM</span>
                </div>
                <fieldset disabled={status === "sending"}>
                  <legend className="sr-only">Consultation details</legend>
                  <div className="form-two">
                    <label htmlFor="name">
                      Your name
                      <input
                        id="name"
                        name="name"
                        autoComplete="off"
                        placeholder="Alex Example"
                        maxLength={80}
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <small className="field-error" id="name-error">
                          {errors.name}
                        </small>
                      )}
                    </label>
                    <label htmlFor="email">
                      Email address
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        placeholder="alex@example.com"
                        maxLength={254}
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <small className="field-error" id="email-error">
                          {errors.email}
                        </small>
                      )}
                    </label>
                  </div>
                  <label htmlFor="programme">
                    Your programme
                    <select
                      id="programme"
                      name="programme"
                      value={programme}
                      onChange={(event) =>
                        setProgramme(event.target.value as Programme)
                      }
                    >
                      {programmes.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="message">
                    What would you like to work on?
                    <textarea
                      id="message"
                      name="message"
                      placeholder="For example: finding a consistent routine and feeling stronger…"
                      rows={4}
                      minLength={10}
                      maxLength={1000}
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <small className="field-error" id="message-error">
                        {errors.message}
                      </small>
                    )}
                  </label>
                  <div hidden aria-hidden="true">
                    <label>
                      Leave this field empty
                      <input name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <label className="checkbox-label">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      aria-invalid={!!errors.consent}
                      aria-describedby={
                        errors.consent ? "consent-error" : undefined
                      }
                    />
                    <span>
                      I’m using fictional details and understand this is a
                      portfolio demo.
                    </span>
                  </label>
                  {errors.consent && (
                    <small className="field-error" id="consent-error">
                      {errors.consent}
                    </small>
                  )}
                  <button
                    className="button primary submit-button"
                    type="submit"
                  >
                    {status === "sending"
                      ? "Saving your request…"
                      : "Send demo request"}{" "}
                    <Arrow />
                  </button>
                </fieldset>
                {notice && (
                  <p className="form-notice" role="alert">
                    {notice}
                  </p>
                )}
                <p className="form-footnote">
                  Local demo only. No payment, email or real appointment.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer className="shell footer">
        <a href="#" className="brand" aria-label="FitCoach home">
          <Mark />
          fitcoach.
        </a>
        <p>Make room for a stronger you.</p>
        <span>Independent portfolio concept · 2026</span>
        <a href="#main" aria-label="Back to top">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}
