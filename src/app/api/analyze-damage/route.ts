import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Helper: convert base64 data URL → Gemini part
function base64ToGenerativePart(base64DataUrl: string, mimeType: string) {
  const base64String = base64DataUrl.split(",")[1];
  return { inlineData: { data: base64String, mimeType } };
}

// Helper: fetch a remote URL image and convert to Gemini part
async function urlToGenerativePart(url: string) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = response.headers.get("content-type") || "image/jpeg";
  return { inlineData: { data: base64, mimeType } };
}

// Convert any image (data URL or https URL) to a Gemini-compatible part
async function imageToGenerativePart(image: string) {
  if (image.startsWith("data:")) {
    const mime = image.split(";")[0].split(":")[1];
    return base64ToGenerativePart(image, mime);
  } else if (image.startsWith("http")) {
    return await urlToGenerativePart(image);
  }
  return null;
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return NextResponse.json({
        damageAssessed: true,
        damageFound: false,
        description: "Simulated: No new damage found. Add GEMINI_API_KEY for real AI analysis.",
        deductionAmount: 0,
      });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are an expert vehicle damage assessor for a car rental company.
      You will be shown two vehicle images:
      - Image 1: The PICKUP photo (vehicle condition BEFORE the rental, the baseline).
      - Image 2: The RETURN photo (vehicle condition AFTER the rental, uploaded by the renter).

      Your job is to carefully compare Image 2 against Image 1 and identify any NEW physical damage
      such as scratches, dents, cracks, broken mirrors, or other anomalies that were NOT present in Image 1.

      Be strict but fair. Only flag damage that is clearly NEW compared to the pickup photo.
      If the images show the same condition, report no damage.

      If you find new damage, estimate a reasonable repair cost in INR (Indian Rupees).

      Respond STRICTLY in this JSON format with no extra text or markdown backticks:
      {
        "damageFound": true or false,
        "description": "Clear description of the new damage found, or 'No new damage detected. Vehicle returned in good condition.' if clean.",
        "deductionAmount": integer (0 if no damage, or INR estimate)
      }
    `;

    // Convert both images (supports both data: URLs and https:// URLs)
    const pickupPart = await imageToGenerativePart(pickupImages[0]);
    const returnPart = await imageToGenerativePart(returnImages[0]);

    if (!pickupPart || !returnPart) {
      return NextResponse.json(
        { error: "Could not process one or more images. Please try again." },
        { status: 400 }
      );
    }

    console.log("🤖 Sending images to Gemini for damage analysis...");
    const result = await model.generateContent([prompt, pickupPart, returnPart]);
    const responseText = result.response.text();

    console.log("Gemini Raw Response:", responseText);

    // Parse the JSON output from Gemini
    try {
      const cleanJsonStr = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(cleanJsonStr);

      return NextResponse.json({
        damageAssessed: true,
        damageFound: parsed.damageFound === true,
        description: parsed.description,
        deductionAmount: Number(parsed.deductionAmount) || 0,
      });
    } catch (parseError) {
      console.error("Failed to parse Gemini output:", responseText);
      return NextResponse.json(
        { error: "AI response parsing failed. Please try again." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("AI Analysis Error (Falling back to safe result):", error);
    // Return a safe fallback so the user is not blocked from completing their return
    return NextResponse.json({
      damageAssessed: true,
      damageFound: false,
      description: "AI analysis was temporarily unavailable. Vehicle accepted in current condition (Manual check recommended).",
      deductionAmount: 0,
    });
  }
}
