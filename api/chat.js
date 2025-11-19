import OpenAI from "openai";

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Vercel serverless function handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Check for greetings
    const greetings = ["hi", "hello", "hey", "hiii", "hii"];
    const lowerMessage = message.toLowerCase().trim();
    
    if (greetings.some(greeting => lowerMessage.startsWith(greeting))) {
      return res.json({ reply: "Hi, welcome to Vineeth AI! How can I help you today?" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key is not configured" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are Vineeth's personal AI assistant." },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return res.json({ reply: response.choices[0].message.content });

  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ 
      error: "Server error",
      message: error.message 
    });
  }
}

