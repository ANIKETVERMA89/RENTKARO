import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      console.error("Resend error:", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Verification email resent." });
  } catch (err) {
    console.error("Resend exception:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
