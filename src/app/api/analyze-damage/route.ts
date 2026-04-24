import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Helper to convert base64 data URL to GoogleGenerativeAI Part object
function base64ToGenerativePart(base64DataUrl: string, mimeType: string) {
  // Remove the data:image/[type];base64, prefix
  const base64String = base64DataUrl.split(',')[1];
  return {
    inlineData: {
      data: base64String,
      mimeType
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pickupImages = [], returnImages = [] } = body;

    if (!pickupImages.length || !returnImages.length) {
      return NextResponse.json({ error: "Missing images" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ No GEMINI_API_KEY found. Running simulated damage analysis.");
      // Fallback: Simulate a scan if the user hasn't set up the API key yet.
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay
      
      const isDamaged = Math.random() > 0.5; // 50% chance of damage in simulation
      return NextResponse.json({
        damageAssessed: true,
        damageFound: isDamaged,
        description: isDamaged ? "Simulated API Response: Scratch detected on the front bumper. (Add GEMINI_API_KEY for real AI analysis)" : "Simulated API Response: No new damage found. Vehicle is clean. (Add GEMINI_API_KEY for real AI analysis)",
        deductionAmount: isDamaged ? 1500 : 0
      });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare prompt
    const prompt = `
      You are an expert vehicle damage assessor. 
      You are given two sets of images of the same rental vehicle. 
      Set 1: Images taken at PICKUP (before rental).
      Set 2: Images taken at RETURN (after rental).
      
      Compare the Return images against the Pickup images.
      Identify any NEW physical damage (scratches, dents, broken parts, etc.) that did not exist in the Pickup images.
      
      If you find new damage, estimate a logical repair cost deduction in INR (Indian Rupees).
      
      Respond STRICTLY in the following JSON format without formatting backticks or extra text:
      {
        "damageFound": true/false,
        "description": "Short description of the new damage found, or 'No new damage found' if clean.",
        "deductionAmount": integer number (0 if no damage, or estimated INR amount)
      }
    `;

    // Process images. Assuming payload sends base64 data URLs: 'data:image/jpeg;base64,...'
    // To keep the payload small, we'll just take the first pickup image and first return image for the analysis prompt.
    // (A real production system would send all angles).
    
    let parts: any[] = [prompt];
    
    // Add first pickup image
    if (pickupImages[0].startsWith('data:')) {
      const mime = pickupImages[0].split(';')[0].split(':')[1];
      parts.push(base64ToGenerativePart(pickupImages[0], mime));
    }
    
    // Add first return image
    if (returnImages[0].startsWith('data:')) {
      const mime = returnImages[0].split(';')[0].split(':')[1];
      parts.push(base64ToGenerativePart(returnImages[0], mime));
    }

    if (parts.length < 3) {
      return NextResponse.json({ error: "Invalid image format. Expected base64 data URLs." }, { status: 400 });
    }

    const result = await model.generateContent(parts);
    const responseText = result.response.text();
    
    console.log("Gemini Raw Response:", responseText); // Debugging

    // Parse the JSON output from Gemini
    try {
       // Clean up potential markdown formatting block
      const cleanJsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonStr);
      
      return NextResponse.json({
        damageAssessed: true,
        damageFound: parsed.damageFound,
        description: parsed.description,
        deductionAmount: parsed.deductionAmount
      });
    } catch (parseError) {
      console.error("Failed to parse Gemini output:", responseText);
      return NextResponse.json({ error: "AI response parsing failed" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
