import OpenAI from "openai";

// Vercel serverless function handler
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key is not configured" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const message = req.body?.message || "Hello";

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to get response from AI" 
    });
  }
}
