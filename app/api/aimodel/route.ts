import { NextRequest, NextResponse } from "next/server";

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions about the following details in order, and wait for the user's answer before asking the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip Duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along with your response, you must identify the current topic.
Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with the following JSON schema. The "ui" field must be one of the following exact string values: 'startingLocation', 'destination', 'groupSize', 'budget', 'tripDuration', 'travelInterests', 'specialRequirements', or 'final'.
{
"resp": "Text Resp",
"ui": "The current topic, e.g., 'startingLocation'"
}`;

export async function POST(req: NextRequest) {
  console.log("--- API Route Hit ---");

  try {
    const apiKey = process.env.OPENROUTER_APIKEY;
    if (!apiKey) {
      console.error(
        "CRITICAL: OPENROUTER_APIKEY environment variable not found."
      );
      throw new Error("Server configuration error.");
    }
    console.log("API Key located.");

    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      console.error("Request body is missing 'messages' field.");
      return new NextResponse(
        JSON.stringify({ error: "Messages are required" }),
        { status: 400 }
      );
    }
    console.log(
      `Received ${messages.length} messages. Calling OpenRouter with Gemini Flash...`
    );

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // --- THE ONLY CHANGE IS HERE ---
          model: "google/gemini-flash-1.5",
          messages: [{ role: "system", content: PROMPT }, ...messages],
          // Gemini models often benefit from being explicitly told to return JSON again
          response_format: { type: "json_object" },
        }),
      }
    );
    console.log(`OpenRouter responded with status: ${response.status}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenRouter API Error:", errorBody);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("OpenRouter response parsed successfully.");

    // Gemini's response structure might be slightly different, so we access it safely
    const messageContent = data.choices[0]?.message?.content;
    if (!messageContent) {
      console.error("AI response content is empty. Full response:", data);
      throw new Error("AI returned empty content.");
    }
    console.log("Raw AI Response:", messageContent);

    // The JSON parsing logic remains the same. It's robust.
    const jsonStart = messageContent.indexOf("{");
    const jsonEnd = messageContent.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("No JSON object found in AI response.");
      // If Gemini fails to return JSON, we'll wrap its text in a valid response
      return NextResponse.json({ resp: messageContent, ui: "" });
    }

    const jsonString = messageContent.substring(jsonStart, jsonEnd + 1);
    const parsedContent = JSON.parse(jsonString);
    console.log("Successfully parsed JSON. Sending to client.");

    return NextResponse.json(parsedContent);
  } catch (error: any) {
    console.error("[FATAL_API_ERROR]", error.message);
    return new NextResponse(
      JSON.stringify({ error: "An internal server error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
