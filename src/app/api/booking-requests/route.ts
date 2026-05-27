import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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