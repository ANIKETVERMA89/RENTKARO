import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = params;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: allVehicles, error: vError } = await supabase.from("vehicles").select("*");
    if (vError) throw vError;
    
    const providerVehicles = allVehicles?.filter((v: any) => 
      Array.isArray(v.features) && v.features.some((f: string) => f === `__PROVIDER__:${email}`)
    );

    if (!providerVehicles || providerVehicles.length === 0) return NextResponse.json([]);

    const vehicleIds = providerVehicles.map((v: any) => String(v.id));

    const { data: bookings, error: bError } = await supabase
      .from("bookings")
      .select("*")
      .in("vehicle_id", vehicleIds)
      .order('created_at', { ascending: false });

    if (bError) throw bError;

    const formatted = bookings.map((b: any) => {
      const v = providerVehicles.find((veh: any) => String(veh.id) === String(b.vehicle_id));
      return {
        ...b,
        vehicle_name: v?.name || `${v?.brand} ${v?.model}`,
        vehicle_img: v?.image_url,
        amount: v?.daily_rate,
        status: b.status || "Active"
      };
    });

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("GET provider bookings error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
