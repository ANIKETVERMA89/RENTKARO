require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");

const app = express();

let transporter;

async function setupTransporter() {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("📧 Gmail Transporter Ready");
  } else {
    // Fallback to Ethereal for testing
    let testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("📧 Ethereal Test Account Created:");
    console.log(`   User: ${testAccount.user}`);
    console.log(`   Pass: ${testAccount.pass}`);
    console.log(`   Check emails at: https://ethereal.email/messages`);
  }
}

setupTransporter();

// Increase limits for image broadcasting
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/* SUPABASE CONNECTION */
const supabaseUrl = "https://hdujjdioyxnrtbgxiqeb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw";
const supabase = createClient(supabaseUrl, supabaseKey);

/* REQUEST LOGGER */
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode}`);
  });
  next();
});

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("RentKaro Backend: UPDATED AND HEALTHY! ✅");
});

/* SIGNUP */
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;
    console.log(`[Signup] New request for: ${email} as ${role || 'renter'}`);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role || 'renter',
        }
      }
    });

    if (error) {
      console.error("Signup error:", error.message);
      return res.status(400).json({ success: false, message: error.message });
    }

    res.json({ success: true, user: data.user, session: data.session });
  } catch (err) {
    console.error("Signup exception:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* LOGIN */
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      // Pass the specific error message to the frontend (e.g., "Email not confirmed")
      return res.status(401).json({ success: false, message: error.message });
    }

    res.json({ success: true, user: data.user, session: data.session });
  } catch (err) {
    console.error("Login exception:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* RESEND VERIFICATION EMAIL */
app.post("/auth/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;
    
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      console.error("Resend error:", error.message);
      return res.status(400).json({ success: false, message: error.message });
    }

    res.json({ success: true, message: "Verification email resent." });
  } catch (err) {
    console.error("Resend exception:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
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

/* GET SINGLE VEHICLE */
app.get("/get-vehicle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ success: false, message: "Vehicle not found" });
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
      from: '"RentKaro Alerts" <' + (process.env.EMAIL_USER || "noreply@rentkaro.com") + '>',
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

/* GET BOOKINGS FOR USER */
app.get("/get-bookings/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log(`[GetBookings] Fetching bookings for: ${email}`);
    
    // 1. Fetch bookings for this user
    const { data: bookingsData, error: bookingsError } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", email)
      .order('created_at', { ascending: false });

    if (bookingsError) throw bookingsError;

    if (!bookingsData || bookingsData.length === 0) {
      return res.json([]);
    }

    // 2. Fetch corresponding vehicle details manually
    const vehicleIds = bookingsData.map(b => b.vehicle_id);
    const { data: vehiclesData, error: vehiclesError } = await supabase
      .from("vehicles")
      .select("*")
      .in("id", vehicleIds);

    if (vehiclesError) throw vehiclesError;

    // 3. Map into the dashboard format
    const formattedBookings = bookingsData.map(booking => {
      const vehicle = vehiclesData.find(v => String(v.id) === String(booking.vehicle_id));
      
      // Default placeholder if vehicle got deleted
      if (!vehicle) {
        return {
          id: booking.id,
          car: "Unknown Vehicle",
          detail: "Vehicle no longer exists",
          status: "Completed",
          statusDot: "#3f3f46",
          period: "Unknown Dates",
          duration: "N/A",
          location: "",
          amount: "₹0",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4dyieFQltQJAxjynRu1ck8kq8Gt1sME0tKjmUqMHuF8MGRBvyylrXrbrN6lkMYwsj47cBVfIXLVX-uEloHbt1aHQ-f7elx_7k6iioR8_YpbQyhl5rPNeOPdQ2_vF1XkrSAWrwNPh_5Gto-Y_M99roRIetDslnRdZaX50PH1BXZJL5BgyEOEfMj2Kmtny_YoMzFPUvKipUJo9m4SUnfy7_PQ803OvxDLPLQU7GyPI91eJHhPgFTM8-2hI5x1M5VikLiZHl82m8IwrO",
          ctaLabel: "Invoice",
          ctaPrimary: false,
        };
      }

      // Convert UTC timestamp to readable date "Oct 15, 2023"
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
        img: vehicle.image_url || vehicle.gallery_images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuC4dyieFQltQJAxjynRu1ck8kq8Gt1sME0tKjmUqMHuF8MGRBvyylrXrbrN6lkMYwsj47cBVfIXLVX-uEloHbt1aHQ-f7elx_7k6iioR8_YpbQyhl5rPNeOPdQ2_vF1XkrSAWrwNPh_5Gto-Y_M99roRIetDslnRdZaX50PH1BXZJL5BgyEOEfMj2Kmtny_YoMzFPUvKipUJo9m4SUnfy7_PQ803OvxDLPLQU7GyPI91eJHhPgFTM8-2hI5x1M5VikLiZHl82m8IwrO",
        ctaLabel: "Manage",
        ctaPrimary: true,
      };
    });

    res.json(formattedBookings);
  } catch (err) {
    console.error("❌ GetBookings Crash:", err);
    res.status(500).json([]);
  }
});

/* SEND INVOICE EMAIL */
/* GET PROVIDER VEHICLES */
app.get("/get-provider-vehicles/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log(`[Fleet] Fetching vehicles for provider: ${email}`);
    
    const { data: allVehicles, error } = await supabase
      .from("vehicles")
      .select("*");

    if (error) throw error;

    const data = allVehicles?.filter(v => 
      Array.isArray(v.features) && v.features.some((f) => f === `__PROVIDER__:${email}`)
    );

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error("❌ Fleet Crash:", err);
    res.status(500).json([]);
  }
});

/* GET PROVIDER BOOKINGS */
app.get("/get-provider-bookings/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log(`[ProviderBookings] Fetching bookings for provider: ${email}`);

    // 1. Get vehicles owned by this provider
    const { data: allVehicles, error: vError } = await supabase
      .from("vehicles")
      .select("id, name, brand, model, image_url, daily_rate, features");

    if (vError) throw vError;
    
    const providerVehicles = allVehicles?.filter(v => 
      Array.isArray(v.features) && v.features.some((f) => f === `__PROVIDER__:${email}`)
    );

    if (vError) throw vError;
    if (!providerVehicles || providerVehicles.length === 0) return res.json([]);

    const vehicleIds = providerVehicles.map(v => String(v.id));

    // 2. Get bookings for these vehicles
    const { data: bookings, error: bError } = await supabase
      .from("bookings")
      .select("*")
      .in("vehicle_id", vehicleIds)
      .order('created_at', { ascending: false });

    if (bError) throw bError;

    // 3. Format response
    const formatted = bookings.map(b => {
      const v = providerVehicles.find(veh => String(veh.id) === String(b.vehicle_id));
      return {
        ...b,
        vehicle_name: v?.name || `${v?.brand} ${v?.model}`,
        vehicle_img: v?.image_url,
        amount: v?.daily_rate,
        status: b.status || "Active"
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error("❌ ProviderBookings Crash:", err);
    res.status(500).json([]);
  }
});

/* END RIDE / COMPLETE BOOKING */
app.post("/end-ride", async (req, res) => {
  try {
    const { booking_id, vehicle_id } = req.body;
    console.log(`[EndRide] Finalizing booking ${booking_id} for vehicle ${vehicle_id}`);

    // 1. Update booking status to "Completed"
    const { error: bError } = await supabase
      .from("bookings")
      .update({ status: "Completed" })
      .eq("id", booking_id);

    if (bError) throw bError;

    // 2. Unlock vehicle for next renter
    if (vehicle_id) {
      const { error: vError } = await supabase
        .from("vehicles")
        .update({ available: true })
        .eq("id", vehicle_id);
      if (vError) console.error("⚠️ Failed to unlock vehicle:", vError.message);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ EndRide Crash:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/send-invoice", async (req, res) => {
  try {
    const { user_email, booking_id, pdf_base64, car_name } = req.body;
    console.log(`[Invoice] Sending to ${user_email} for booking ${booking_id}`);

    if (!user_email || !pdf_base64) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }

    const mailOptions = {
      from: `"RentKaro Invoice" <${process.env.EMAIL_USER || "noreply@rentkaro.com"}>`,
      to: user_email,
      subject: `Final Invoice: ${car_name || 'Your Ride'} (#${String(booking_id).slice(0, 8)})`,
      text: `Hello, thank you for riding with RentKaro! Please find your final invoice attached.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #111;">Ride Completed! ✅</h2>
          <p>Thank you for choosing <strong>RentKaro</strong> for your journey with the <strong>${car_name || 'Vehicle'}</strong>.</p>
          <p>Your final invoice is attached to this email as a PDF.</p>
          <br/>
          <p style="font-size: 12px; color: #777;">Safe travels,<br/>The RentKaro Team</p>
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
    console.log("✅ Invoice email sent successfully");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Invoice Email Crash:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`==========================================`);
  console.log(`RentKaro FINAL BACKEND: RUNNING`);
  console.log(`- Port: ${PORT}`);
  console.log(`- Time: ${new Date().toISOString()}`);
  console.log(`==========================================`);
}).on('error', (err) => {
  console.error("❌ SERVER FAILED TO START:", err);
});
