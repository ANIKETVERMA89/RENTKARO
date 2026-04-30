import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.from("vehicles").select("*").order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (err) {
    console.error("GET vehicles error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const insertPayload = {
      name: (data.brand || "") + " " + (data.name || ""),
      type: data.type || "car",
      price: Number(data.price) || 0,
      vehicle_type: data.type || "car",
      brand: data.brand || "",
      model: data.name || "",
      variant: data.subType || "Standard",
      manufacture_year: Number(data.specs?.year) || 2024,
      daily_rate: Number(data.price) || 0,
      hourly_rate: Number(data.hourlyPrice) || 0,
      location: data.location || "Delhi, India",
      fuel_type: data.specs?.fuel || "Petrol",
      transmission: data.specs?.transmission || "Manual",
      seats: Number(data.specs?.seats) || 5,
      mileage: String(data.specs?.mileage || "15 kmpl"),
      km_driven: Number(data.specs?.km) || 0,
      features: Array.isArray(data.features) 
        ? [...data.features, `__PROVIDER__:${data.providerEmail || ''}`, `__PROVIDER_NAME__:${data.owner?.name || ''}`] 
        : [`__PROVIDER__:${data.providerEmail || ''}`, `__PROVIDER_NAME__:${data.owner?.name || ''}`],
      image_url: data.image || "",
      gallery_images: Array.isArray(data.images) ? data.images : [],
      available: true
    };

    const { error } = await supabase.from("vehicles").insert([insertPayload]);

    if (error) {
       console.error("❌ Database Error:", error.message);
       return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST vehicle error:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
