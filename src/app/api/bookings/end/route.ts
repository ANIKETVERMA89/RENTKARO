import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const { booking_id, vehicle_id } = await request.json();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    await supabase.from("bookings").update({ status: "Completed" }).eq("id", booking_id);

    if (vehicle_id) {
      await supabase.from("vehicles").update({ available: true }).eq("id", vehicle_id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("End ride error:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
