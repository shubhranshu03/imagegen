import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const TABLE_NAME = process.env.SUPABASE_TABLE_NAME || "waitlist";

function missingEnvResponse(name: string) {
  return NextResponse.json(
    { error: `Missing required environment variable: ${name}` },
    { status: 500 }
  );
}

async function sendAdminEmail({ email, note }: { email: string; note?: string }) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const admin = process.env.ADMIN_EMAIL;

  if (!host || !user || !pass || !admin) {
    // Email not configured; skip but don't fail the whole request.
    console.warn("SMTP/ADMIN_EMAIL not configured, skipping admin email");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `New waitlist signup: ${email}`;
  const text = `New waitlist entry:\n\nEmail: ${email}\nNote: ${note || ""}\n\nTime: ${new Date().toISOString()}`;
  const html = `<p>New waitlist entry:</p><ul><li><strong>Email:</strong> ${email}</li><li><strong>Note:</strong> ${note || ""}</li><li><strong>Time:</strong> ${new Date().toISOString()}</li></ul>`;

  await transporter.sendMail({
    from: user,
    to: admin,
    subject,
    text,
    html,
  });
}

export async function POST(req: Request) {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL) return missingEnvResponse("NEXT_PUBLIC_SUPABASE_URL");
    if (!SUPABASE_SERVICE_ROLE_KEY) return missingEnvResponse("SUPABASE_SERVICE_ROLE_KEY");

    const body = await req.json();
    const email = (body.email || "").toString().trim();
    const note = body.note ? String(body.note).trim() : "";

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Create client inside handler after validating envs
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Insert into Supabase table
    const { error: insertError } = await supabase.from(TABLE_NAME).insert([{ email, note }]);
    if (insertError) {
      console.error("Supabase insert error:", insertError);
      // Provide clearer guidance if hostname looks placeholder-like
      if (SUPABASE_URL.includes("your-project")) {
        return NextResponse.json(
          { error: "Invalid NEXT_PUBLIC_SUPABASE_URL — replace placeholder with your project URL" },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
    }

    // Send admin notification (best-effort)
    try {
      await sendAdminEmail({ email, note });
    } catch (err) {
      console.warn("Failed to send admin email:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

