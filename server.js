require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");

const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Increase limits for image broadcasting
app.use(express.json({ limit: '50mb' }));
app.use(cors());

/* SUPABASE CONNECTION */
const supabaseUrl = "https://hdujjdioyxnrtbgxiqeb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw";
const supabase = createClient(supabaseUrl, supabaseKey);

/* REQUEST LOGGER */
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("RentKaro Backend: UPDATED AND HEALTHY! ✅");
});

/* SIGNUP */
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(`[Signup] New request for: ${email}`);
    const { error } = await supabase.from("users").insert([{ email, password, role }]);
    if (error) return res.status(500).json({ success: false, message: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* LOGIN */
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.from("users").select("*").eq("email", email).eq("password", password).single();
    if (error) return res.status(401).json({ success: false, message: "Invalid credentials" });
    res.json({ success: true, user: data });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* GET VEHICLES */
app.get("/get-vehicles", async (req, res) => {
  try {
    const { data, error } = await supabase.from("vehicles").select("*").order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json([]);
  }
});

/* ADD VEHICLE - 100% SCHEMA VERIFIED */
app.post("/add-vehicle", async (req, res) => {
  try {
    const data = req.body;
    console.log("📦 Received Broadcast Request for:", data.name);

    // EXACT COLUMNS FOUND IN DATABASE:
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
      features: Array.isArray(data.features) ? [...data.features, `__PROVIDER__:${data.providerEmail || ''}`, `__PROVIDER_NAME__:${data.owner?.name || ''}`] : [`__PROVIDER__:${data.providerEmail || ''}`, `__PROVIDER_NAME__:${data.owner?.name || ''}`],
      image_url: data.image || "",
      gallery_images: Array.isArray(data.images) ? data.images : [],
      available: true
    };

    const { error } = await supabase.from("vehicles").insert([insertPayload]);

    if (error) {
       console.error("❌ Database Error:", error.message);
       return res.status(500).json({ success: false, message: error.message });
    }

    console.log("✅ Success! Vehicle broadcasted.");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Crash:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const PORT = 5000;

/* BOOK VEHICLE */
app.post("/book-vehicle", async (req, res) => {
  try {
    const { user_email, vehicle_id, start_date, end_date } = req.body;
    console.log(`[Booking] New request by ${user_email} for vehicle ${vehicle_id}`);

    const insertPayload = {
      user_id: user_email || "anonymous",
      vehicle_id: String(vehicle_id)
    };

    const { error } = await supabase.from("bookings").insert([insertPayload]);

    if (error) {
       console.error("❌ Booking Database Error:", error.message);
       return res.status(500).json({ success: false, message: error.message });
    }

    // Automatically Lock Vehicle Availability from Marketplace
    const { error: lockError } = await supabase.from("vehicles").update({ available: false }).eq("id", vehicle_id);
    if (lockError) console.error("⚠️ Could not lock vehicle availability:", lockError.message);

    // Formulate Email Delivery
    const { data: vehicleInfo } = await supabase.from("vehicles").select("*").eq("id", vehicle_id).single();
    let providerEmailMatch = null;
    if (vehicleInfo && Array.isArray(vehicleInfo.features)) {
       const providerFeature = vehicleInfo.features.find(f => f.startsWith("__PROVIDER__:"));
       if (providerFeature) providerEmailMatch = providerFeature.split("__PROVIDER__:")[1];
    }
    const providerEmail = providerEmailMatch || "unknown_provider@example.com";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eaeaea; border-radius: 12px; margin: 0 auto;">
        <h2 style="color: #111; border-bottom: 2px solid #111; padding-bottom: 10px; text-transform: uppercase;">RentKaro Secure Deployment</h2>
        <p>A new planetary deployment protocol has been fully confirmed for the <strong>${vehicleInfo?.brand || ''} ${vehicleInfo?.model || 'Vehicle'}</strong>.</p>
        
        <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="margin-top: 0; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; color: #555;">Itinerary Specs</h3>
          <p style="margin: 5px 0;"><strong>Start Orbit:</strong> ${start_date || 'TBD'}</p>
          <p style="margin: 5px 0;"><strong>End Orbit:</strong> ${end_date || 'TBD'}</p>
          <p style="margin: 5px 0;"><strong>Estimated Rate:</strong> ₹${vehicleInfo?.daily_rate || 'N/A'}/day</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
          <p style="margin: 5px 0;"><strong>Provider Link:</strong> ${providerEmail}</p>
          <p style="margin: 5px 0;"><strong>Renter ID:</strong> ${user_email}</p>
        </div>

        <h3 style="color: #111; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">⚠️ Mandatory Pre-Flight Checklist</h3>
        <ul style="line-height: 1.8; color: #444; font-size: 14px;">
          <li><strong>Visual Inspection:</strong> Click full high-fidelity pictures of the vehicle from all 4 exterior angles.</li>
          <li><strong>Cluster Check:</strong> Take a photo of the odometer and fuel/battery gauge cluster before propulsion.</li>
          <li><strong>Component Audit:</strong> Verify tires, glass integrity, and internal upholstery for any pre-existing anomalies.</li>
          <li><strong>Protocol Sign-off:</strong> Ensure both parties confirm physical key handoff protocols securely.</li>
        </ul>

        <p style="margin-top: 40px; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Automated Broadcast from RentKaro Command Center.</p>
      </div>
    `;

    transporter.sendMail({
      from: '"RentKaro Alerts" <' + process.env.EMAIL_USER + '>',
      to: [user_email, providerEmail].filter(Boolean).join(", "),
      subject: `Booking Confirmed: ${vehicleInfo?.brand || ''} ${vehicleInfo?.model || ''}`,
      html: emailHtml
    }).then(info => console.log("📧 E2E Emails sent:", info.messageId))
      .catch(err => console.error("📧 Email delivery failed:", err));

    console.log("✅ Success! Booking confirmed and vehicle locked.");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Booking Crash:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* TOGGLE VEHICLE AVAILABILITY */
app.post("/toggle-availability", async (req, res) => {
  try {
    const { vehicle_id, available } = req.body;
    console.log(`[Toggle] Setting vehicle ${vehicle_id} to available=${available}`);

    const { error } = await supabase.from("vehicles").update({ available }).eq("id", vehicle_id);
    if (error) {
       console.error("❌ Toggle DB Error:", error.message);
       return res.status(500).json({ success: false, message: error.message });
    }

    console.log(`✅ Success! Vehicle ${vehicle_id} availability is now ${available}`);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Toggle Crash:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`==========================================`);
  console.log(`RentKaro FINAL BACKEND: PORT ${PORT}`);
  console.log(`==========================================`);
});
