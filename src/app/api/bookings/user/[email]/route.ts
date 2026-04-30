import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: bookingsData, error: bookingsError } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", email)
      .order('created_at', { ascending: false });

    if (bookingsError) throw bookingsError;
    if (!bookingsData || bookingsData.length === 0) return NextResponse.json([]);

    const vehicleIds = bookingsData.map((b: any) => b.vehicle_id);
    const { data: vehiclesData, error: vehiclesError } = await supabase
      .from("vehicles")
      .select("*")
      .in("id", vehicleIds);

    if (vehiclesError) throw vehiclesError;

    const formattedBookings = bookingsData.map((booking: any) => {
      const vehicle = vehiclesData.find((v: any) => String(v.id) === String(booking.vehicle_id));
      if (!vehicle) return { id: booking.id, car: "Unknown", detail: "Deleted", amount: "₹0" };
      
      const dateStr = new Date(booking.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      return {
        id: booking.id,
        vehicle_id: booking.vehicle_id,
        car: vehicle.name || `${vehicle.brand} ${vehicle.model}`,
        detail: `${vehicle.manufacture_year || 2024} · ${vehicle.fuel_type || "Petrol"}`,
        status: booking.status || "In Progress",
        statusDot: booking.status === "Completed" ? "#3f3f46" : "#34d399",
        period: `Booked: ${dateStr}`,
        duration: "Active",
        location: vehicle.location || "Pickup Location",
        amount: `₹${vehicle.price || vehicle.daily_rate || 0}`,
        img: vehicle.image_url || vehicle.gallery_images?.[0],
        ctaLabel: "Manage",
        ctaPrimary: true,
      };
    });

    return NextResponse.json(formattedBookings);
  } catch (err) {
    console.error("GET user bookings error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
