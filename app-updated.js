const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// Increase payload limit for images
app.use(express.json({ limit: '50mb' }));
app.use(cors());

/* SUPABASE CONNECTION */
// These are currently hardcoded for development. For production, use environment variables.
const supabaseUrl = "https://hdujjdioyxnrtbgxiqeb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw";
const supabase = createClient(supabaseUrl, supabaseKey);

/* REQUEST LOGGER */
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("RentKaro Backend is running and healthy! ✅");
});

/* SIGNUP */
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const { error } = await supabase
      .from("users")
      .insert([{ email, password, role }]);

    if (error) {
      console.error("Signup error:", error);
      if (error.code === "23505") {
        return res.status(409).json({ success: false, message: "Email already registered" });
      }
      return res.status(500).json({ success: false, message: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Internal Signup error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* LOGIN */
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    res.json({ success: true, user: data });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* GET VEHICLES */
app.get("/get-vehicles", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Fetch vehicles error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error("Internal fetch error:", err);
    res.status(500).json({ success: false });
  }
});

/* ADD VEHICLE */
app.post("/add-vehicle", async (req, res) => {
  try {
    const data = req.body;
    console.log("Adding vehicle for:", data.providerEmail || data.owner?.email);

    const { error } = await supabase
      .from("vehicles")
      .insert([{
        /* Required NOT-NULL columns for legacy support */
        name: (data.brand || "") + " " + (data.name || ""),
        type: data.type || "car",
        price: Number(data.price) || 0,
        provider_email: data.providerEmail || data.owner?.email || "",

        /* Detailed columns */
        vehicle_type: data.type || "car",
        brand: data.brand,
        model: data.name,
        variant: data.subType || "Standard",
        manufacture_year: Number(data.specs?.year) || 2024,
        daily_rate: Number(data.price) || 0,
        hourly_rate: Number(data.hourlyPrice) || 0,
        location: data.location || "India",
        fuel_type: data.specs?.fuel || "Petrol",
        transmission: data.specs?.transmission || "Manual",
        seats: Number(data.specs?.seats) || 5,
        mileage: data.specs?.mileage || "N/A",
        km_driven: Number(data.specs?.km) || 0,
        features: Array.isArray(data.features) ? data.features : [],
        image_url: data.image || "",
        gallery_images: Array.isArray(data.images) ? data.images : [],
        available: true,
        provider_id: data.owner?.id || null 
      }]);

    if (error) {
      console.error("Add vehicle error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Internal add vehicle error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* BOOK VEHICLE */
app.post("/book-vehicle", async (req, res) => {
  try {
    const { user_email, vehicle_id, start_date, end_date } = req.body;
    
    // Convert vehicle_id to Number if it's a numeric string to avoid PostgreSQL type errors
    const numericVehicleId = !isNaN(vehicle_id) ? Number(vehicle_id) : vehicle_id;

    console.log(`Booking request: User=${user_email}, Vehicle=${numericVehicleId}`);

    const { error } = await supabase
      .from("bookings")
      .insert([{ 
        user_email: user_email, 
        vehicle_id: numericVehicleId, 
        start_date: start_date, 
        end_date: end_date,
        status: 'confirmed' // Pre-approve for now
      }]);

    if (error) {
      console.error("Booking error details:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Internal booking error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* START SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`==========================================`);
  console.log(`RentKaro Backend running on port ${PORT}`);
  console.log(`Connect at: http://10.215.106.78:${PORT}`);
  console.log(`==========================================`);
});
