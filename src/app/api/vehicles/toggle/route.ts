import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const { vehicle_id, available } = await request.json();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.from("vehicles").update({ available }).eq("id", vehicle_id);
    
    if (error) {
       console.error("❌ Toggle DB Error:", error.message);
       return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Toggle crash:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
