require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://hdujjdioyxnrtbgxiqeb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdWpqZGlveXhucnRiZ3hpcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTE5NDIsImV4cCI6MjA5MTQ2Nzk0Mn0.cATYqSGr_N7NWF7O_ZjHnMBXC7yUkuRp9r5nDhQBZBw";
const supabase = createClient(supabaseUrl, supabaseKey);

async function testJoin() {
  const { data, error } = await supabase
    .from("bookings")
    .select(`*, vehicles (*)`)
    .limit(1);

  if (error) {
    console.log("Join failed:", error.message);
  } else {
    console.log("Join succeeded:", data);
  }
}

testJoin();
