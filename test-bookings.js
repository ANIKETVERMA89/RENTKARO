const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://hdujjdioyxnrtbgxiqeb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw"
);

async function testBookings() {
  console.log("Testing bookings table...\n");

  // Check bookings table structure
  const { data: readData, error: readError } = await supabase
    .from("bookings")
    .select("*")
    .limit(1);

  if (readError) {
    console.error("❌ READ FAILED:", JSON.stringify(readError, null, 2));
  } else {
    console.log("✅ READ OK — bookings table columns:");
    console.log("  ", readData[0] ? Object.keys(readData[0]) : "(table is empty, no columns visible)");
  }

  // Try inserting a test booking
  console.log("\nTesting INSERT...");
  const { data: insertData, error: insertError } = await supabase
    .from("bookings")
    .insert([{
      user_email: "test@test.com",
      vehicle_id: 1,
      start_date: "2026-04-15",
      end_date: "2026-04-17"
    }])
    .select();

  if (insertError) {
    console.error("❌ INSERT FAILED:", JSON.stringify(insertError, null, 2));
  } else {
    console.log("✅ INSERT SUCCESS:", JSON.stringify(insertData, null, 2));
  }
}

testBookings();
