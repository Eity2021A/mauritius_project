import { NextResponse } from "next/server";

interface TransferRequestPayload {
  fullName: string;
  email: string;
  phone: string;
  transferType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  luggage: string;
  childSeat: string;
  flightNumber: string;
  additionalDetails: string;
  consent: boolean;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatField(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #eee7df;font-weight:700;color:#1d2435;width:210px;">${escapeHtml(
        label
      )}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee7df;color:#4b5565;">${escapeHtml(
        value || "-"
      )}</td>
    </tr>
  `;
}

function summaryCard(label: string, value: string) {
  return `
    <div style="min-width:160px;flex:1 1 160px;border:1px solid #efe5db;border-radius:14px;padding:14px 16px;background:#fffdfa;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b38d76;">${escapeHtml(
        label
      )}</p>
      <p style="margin:0;font-size:15px;line-height:1.5;color:#1d2435;">${escapeHtml(
        value || "-"
      )}</p>
    </div>
  `;
}

function validatePayload(payload: Partial<TransferRequestPayload>) {
  const requiredFields: Array<keyof TransferRequestPayload> = [
    "fullName",
    "email",
    "phone",
    "transferType",
    "pickupLocation",
    "dropoffLocation",
    "pickupDate",
    "pickupTime",
    "passengers",
    "luggage",
  ];

  for (const field of requiredFields) {
    if (!payload[field] || String(payload[field]).trim() === "") {
      return `Missing required field: ${field}`;
    }
  }

  if (!payload.consent) {
    return "Consent confirmation is required.";
  }

  return null;
}

async function sendResendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.TRANSFER_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error(
      "Missing RESEND_API_KEY or TRANSFER_FROM_EMAIL environment variable."
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${errorText}`);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<TransferRequestPayload>;
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const notifyEmail1 = process.env.TRANSFER_NOTIFY_EMAIL_1;
    const notifyEmail2 = process.env.TRANSFER_NOTIFY_EMAIL_2;

    if (!notifyEmail1 || !notifyEmail2) {
      return NextResponse.json(
        { error: "Missing transfer notification email configuration." },
        { status: 500 }
      );
    }

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;background:#f6f1eb;padding:32px 18px;color:#1d2435;">
        <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #eadfd3;border-radius:24px;overflow:hidden;box-shadow:0 18px 48px rgba(52,35,18,0.08);">
          <div style="padding:28px 30px;background:linear-gradient(135deg,#f26d21 0%,#ff9653 55%,#ffc08a 100%);color:#ffffff;">
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;opacity:.95;">Mauritius Explored</p>
            <h1 style="margin:0;font-size:30px;line-height:1.15;">New Transfer Request</h1>
            <p style="margin:12px 0 0;font-size:15px;line-height:1.7;max-width:560px;color:rgba(255,255,255,0.92);">
              A new enquiry has been submitted from the Mauritius Transfers page and is ready for follow-up.
            </p>
          </div>

          <div style="padding:28px 30px 12px;">
            <div style="display:flex;flex-wrap:wrap;gap:12px;">
              ${summaryCard("Guest", payload.fullName!)}
              ${summaryCard("Transfer Type", payload.transferType!)}
              ${summaryCard("Date", payload.pickupDate!)}
              ${summaryCard("Time", payload.pickupTime!)}
            </div>
          </div>

          <div style="padding:12px 30px 30px;">
            <div style="border:1px solid #eee7df;border-radius:18px;overflow:hidden;background:#fffdfa;">
              <div style="padding:16px 18px;border-bottom:1px solid #eee7df;background:#fbf7f2;">
                <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#b38d76;">Request Details</p>
              </div>
              <table style="width:100%;border-collapse:collapse;">
                ${formatField("Full Name", payload.fullName!)}
                ${formatField("Email Address", payload.email!)}
                ${formatField("Phone / WhatsApp", payload.phone!)}
                ${formatField("Type of Transfer", payload.transferType!)}
                ${formatField("Pick-Up Location", payload.pickupLocation!)}
                ${formatField("Drop-Off Location", payload.dropoffLocation!)}
                ${formatField("Pick-Up Date", payload.pickupDate!)}
                ${formatField("Pick-Up Time", payload.pickupTime!)}
                ${formatField("Passengers", payload.passengers!)}
                ${formatField("Luggage", payload.luggage!)}
                ${formatField("Child Seat", payload.childSeat || "-")}
                ${formatField("Flight Number", payload.flightNumber || "-")}
                ${formatField("Additional Details", payload.additionalDetails || "-")}
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;background:#f6f1eb;padding:32px 18px;color:#1d2435;">
        <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #eadfd3;border-radius:24px;overflow:hidden;box-shadow:0 18px 48px rgba(52,35,18,0.08);">
          <div style="padding:28px 30px;background:linear-gradient(135deg,#123a63 0%,#0d6b78 58%,#33a4ad 100%);color:#ffffff;">
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;opacity:.95;">Mauritius Explored</p>
            <h1 style="margin:0;font-size:30px;line-height:1.15;">Your transfer request is received</h1>
            <p style="margin:12px 0 0;font-size:15px;line-height:1.7;max-width:560px;color:rgba(255,255,255,0.92);">
              Thanks for reaching out. We&apos;ve shared your request with the selected local provider and you should receive availability and pricing soon.
            </p>
          </div>

          <div style="padding:28px 30px 10px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#4f5a6d;">
              Hi ${escapeHtml(payload.fullName!)},
            </p>
            <p style="margin:0 0 22px;font-size:15px;line-height:1.75;color:#5d6575;">
              We&apos;ve safely received your Mauritius transfer request. Below is a quick summary of what you sent us.
            </p>

            <div style="display:flex;flex-wrap:wrap;gap:12px;">
              ${summaryCard("Route", `${payload.pickupLocation!} -> ${payload.dropoffLocation!}`)}
              ${summaryCard("Date", payload.pickupDate!)}
              ${summaryCard("Time", payload.pickupTime!)}
              ${summaryCard("Passengers", payload.passengers!)}
            </div>
          </div>

          <div style="padding:18px 30px 30px;">
            <div style="border:1px solid #e6ecef;border-radius:18px;background:linear-gradient(180deg,#f8fcfc 0%,#f3f9f9 100%);padding:20px 22px;">
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#0d6b78;">What happens next</p>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.75;color:#4f5a6d;">
                1. Your request is reviewed by the transfer provider.
              </p>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.75;color:#4f5a6d;">
                2. You receive availability and pricing by email.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.75;color:#4f5a6d;">
                3. If you need to add anything, just reply to this email and we&apos;ll see it.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    await Promise.all([
      sendResendEmail({
        to: [notifyEmail1, notifyEmail2],
        subject: `New transfer request from ${payload.fullName}`,
        html: adminHtml,
        replyTo: payload.email,
      }),
      sendResendEmail({
        to: [payload.email!],
        subject: "We received your Mauritius transfer request",
        html: customerHtml,
      }),
    ]);

    return NextResponse.json({
      message:
        "Your request has been sent successfully. Please check your email for confirmation.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send transfer request.",
      },
      { status: 500 }
    );
  }
}
