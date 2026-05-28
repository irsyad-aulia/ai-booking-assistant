import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type CreateBookingRequestBody = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  preferredDate: string;
  message?: string;
};

type SavedBookingRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  preferred_date: string;
  message: string | null;
  status: string;
  ai_reply: string | null;
  created_at: string;
};

function createFallbackReply(data: CreateBookingRequestBody) {
  return `Hi ${data.name}, thanks for your booking request for ${data.service}. We received your preferred schedule and will confirm availability shortly.`;
}

async function generateAiReply(data: CreateBookingRequestBody) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return createFallbackReply(data);
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const prompt = `
You are an AI booking assistant for a professional service business.

Write a short, warm, and professional booking reply in English.

Customer details:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || "Not provided"}
- Service: ${data.service}
- Preferred date: ${data.preferredDate}
- Customer message: ${data.message || "No additional message"}

Rules:
- Keep it under 90 words.
- Do not confirm the appointment yet.
- Say that the team will check availability first.
- Sound helpful and professional.
- Do not mention that you are an AI.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text?.trim() || createFallbackReply(data);
  } catch (error) {
    console.error("Gemini API error:", error);
    return createFallbackReply(data);
  }
}

async function sendBookingToN8n(bookingRequest: SavedBookingRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Missing N8N_WEBHOOK_URL. Skipping n8n notification.");
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "booking_request_created",
        source: "ai-booking-assistant",
        bookingRequest: {
          id: bookingRequest.id,
          name: bookingRequest.name,
          email: bookingRequest.email,
          phone: bookingRequest.phone,
          service: bookingRequest.service,
          preferredDate: bookingRequest.preferred_date,
          message: bookingRequest.message,
          status: bookingRequest.status,
          aiReply: bookingRequest.ai_reply,
          createdAt: bookingRequest.created_at,
        },
      }),
    });
  } catch (error) {
    console.error("n8n webhook error:", error);
  }
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("booking_requests")
    .select(
      "id, name, email, phone, service, preferred_date, message, status, ai_reply, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    bookingRequests: data,
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateBookingRequestBody;

  if (!body.name || !body.email || !body.service || !body.preferredDate) {
    return NextResponse.json(
      {
        message: "Missing required booking fields.",
      },
      {
        status: 400,
      }
    );
  }

  const aiReply = await generateAiReply(body);

  const { data, error } = await supabaseAdmin
    .from("booking_requests")
    .insert({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      service: body.service,
      preferred_date: body.preferredDate,
      message: body.message || null,
      status: "New Request",
      ai_reply: aiReply,
    })
    .select(
      "id, name, email, phone, service, preferred_date, message, status, ai_reply, created_at"
    )
    .single();

  if (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }

  await sendBookingToN8n(data);

  return NextResponse.json({
    bookingRequest: data,
  });
}