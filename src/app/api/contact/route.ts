import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact form endpoint.
 *
 * Delivery is opt-in. With no provider configured this returns 503 and an
 * honest message — it never reports a message as sent when nothing was sent.
 * Point CONTACT_FORM_ENDPOINT at a form service (Formspree, Basin, a CRM webhook,
 * or your own handler) to enable delivery.
 *
 * The endpoint URL is server-only; the browser gets a short note via
 * NEXT_PUBLIC_CONTACT_FORM_ENDPOINT for the UI hint, but the secret value here
 * is never exposed to the client bundle.
 */

const ENDPOINT = process.env.CONTACT_FORM_ENDPOINT?.trim();
const MAX_BODY_BYTES = 16_000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  company?: unknown;
  /** "newsletter" relaxes the name requirement for the footer sign-up. */
  intent?: unknown;
};

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ message: "Message is too long." }, { status: 413 });
    }
    body = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ message: "Could not read the form data." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Answer as if it worked.
  if (str(body.company, 200)) {
    return NextResponse.json({ message: "Thanks — we will be in touch shortly." });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const message = str(body.message, 2000);

  const isNewsletter = str(body.intent, 32) === "newsletter";

  const errors: Record<string, string> = {};
  if (!isNewsletter && name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please add a little more detail.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  if (!ENDPOINT) {
    return NextResponse.json(
      {
        message:
          "This form is not connected yet. Please call us or use the online scheduler instead.",
        configured: false,
      },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        ...(isNewsletter ? { intent: "newsletter" } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { message: "We could not send that just now. Please try again or call us." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: isNewsletter
        ? "Thanks — you are signed up for TexStar health tips."
        : "Thanks — we will be in touch shortly.",
    });
  } catch {
    return NextResponse.json(
      { message: "We could not send that just now. Please try again or call us." },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Use POST." }, { status: 405, headers: { allow: "POST" } });
}
