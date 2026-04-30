import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const { user_email, vehicle_id, start_date, end_date } = await request.json();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const insertPayload = {
      user_id: user_email || "anonymous",
      vehicle_id: String(vehicle_id)
    };

    const { error } = await supabase.from("bookings").insert([insertPayload]);

    if (error) {
       console.error("❌ Booking Database Error:", error.message);
       return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    // Automatically Lock Vehicle Availability
    await supabase.from("vehicles").update({ available: false }).eq("id", vehicle_id);

    // Fetch vehicle/provider info for email
    const { data: vehicleInfo } = await supabase.from("vehicles").select("*").eq("id", vehicle_id).single();
    let providerEmailMatch = null;
    if (vehicleInfo && Array.isArray(vehicleInfo.features)) {
       const providerFeature = vehicleInfo.features.find((f: string) => f.startsWith("__PROVIDER__:"));
       if (providerFeature) providerEmailMatch = providerFeature.split("__PROVIDER__:")[1];
    }
    const providerEmail = providerEmailMatch || "unknown_provider@example.com";

    // Email logic
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eaeaea; border-radius: 12px; margin: 0 auto;">
          <h2 style="color: #111; border-bottom: 2px solid #111; padding-bottom: 10px; text-transform: uppercase;">RentKaro Secure Deployment</h2>
          <p>A new planetary deployment protocol has been fully confirmed for the <strong>${vehicleInfo?.brand || ''} ${vehicleInfo?.model || 'Vehicle'}</strong>.</p>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p><strong>Start Orbit:</strong> ${start_date || 'TBD'}</p>
            <p><strong>End Orbit:</strong> ${end_date || 'TBD'}</p>
            <p><strong>Estimated Rate:</strong> ₹${vehicleInfo?.daily_rate || 'N/A'}/day</p>
          </div>
          <p style="font-size: 11px; color: #888; text-align: center;">Automated Broadcast from RentKaro Command Center.</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"RentKaro Alerts" <${process.env.EMAIL_USER}>`,
        to: [user_email, providerEmail].filter(Boolean).join(", "),
        subject: `Booking Confirmed: ${vehicleInfo?.brand || ''} ${vehicleInfo?.model || ''}`,
        html: emailHtml
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking crash:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
