import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: data.user, session: data.session });
  } catch (err) {
    console.error("Login exception:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
