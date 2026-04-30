import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { user_email, booking_id, pdf_base64, car_name } = await request.json();

    if (!user_email || !pdf_base64) {
      return NextResponse.json({ success: false, message: "Missing data" }, { status: 400 });
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"RentKaro Invoice" <${process.env.EMAIL_USER}>`,
        to: user_email,
        subject: `Final Invoice: ${car_name || 'Your Ride'} (#${String(booking_id).slice(0, 8)})`,
        text: `Hello, thank you for riding with RentKaro! Please find your final invoice attached.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #111;">Ride Completed! ✅</h2>
            <p>Thank you for choosing <strong>RentKaro</strong> for your journey.</p>
            <p>Your final invoice is attached as a PDF.</p>
          </div>
        `,
        attachments: [
          {
            filename: `RentKaro_Invoice_${String(booking_id).slice(0, 8)}.pdf`,
            content: pdf_base64.split("base64,")[1] || pdf_base64,
            encoding: 'base64'
          }
        ]
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Invoice email error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
