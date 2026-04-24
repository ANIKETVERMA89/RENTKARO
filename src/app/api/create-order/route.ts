import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR", receipt = "receipt_rcptid_1" } = await req.json();

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.warn("⚠️ Razorpay Keys missing. Using fallback simulation mode.");
      return NextResponse.json({
        simulated: true,
        order_id: `order_sim_${Date.now()}`,
        amount,
        currency,
      });
    }

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: amount, // amount in smallest currency unit (paise for INR)
      currency,
      receipt,
    };

    const order = await instance.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
