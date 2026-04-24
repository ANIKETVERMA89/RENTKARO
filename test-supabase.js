const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://hdujjdioyxnrtbgxiqeb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw"
);

async function testInsert() {
  console.log("Testing Supabase connection...\n");

  // Test 1: Can we read vehicles?
  const { data: readData, error: readError } = await supabase
    .from("vehicles")
    .select("*")
    .limit(1);

  if (readError) {
    console.error("❌ READ FAILED:", JSON.stringify(readError, null, 2));
  } else {
    console.log("✅ READ OK — vehicles table accessible");
    console.log("   Sample row columns:", readData[0] ? Object.keys(readData[0]) : "table is empty");
  }

  // Test 2: Can we insert a minimal vehicle?
  console.log("\nTesting minimal INSERT...");
  const { data: insertData, error: insertError } = await supabase
    .from("vehicles")
    .insert([{
      // Required NOT-NULL columns
      name: "TestBrand TestModel",
      type: "car",
      price: 1000,
      provider_email: "test@test.com",
      // Detailed columns
      vehicle_type: "car",
      brand: "TestBrand",
      model: "TestModel",
      variant: "Standard",
      manufacture_year: 2024,
      daily_rate: 1000,
      hourly_rate: 100,
      location: "Mumbai",
      fuel_type: "Petrol",
      transmission: "Automatic",
      seats: 5,
      mileage: "15 km/l",
      km_driven: "10000",
      features: ["AC", "GPS"],
      image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      gallery_images: []
    }])
    .select();

  if (insertError) {
    console.error("❌ INSERT FAILED — Exact Supabase error:");
    console.error(JSON.stringify(insertError, null, 2));
  } else {
    console.log("✅ INSERT SUCCESS! Vehicle was added:");
    console.log(JSON.stringify(insertData, null, 2));
  }
}

testInsert();
