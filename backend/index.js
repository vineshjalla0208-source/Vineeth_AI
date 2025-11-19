import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// Validate environment variables
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "YOUR_KEY_HERE") {
  console.error("❌ ERROR: OPENAI_API_KEY is missing or not set in .env file");
  console.error("Please add your OpenAI API key to backend/.env file:");
  console.error("OPENAI_API_KEY=sk-your-actual-key-here");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Check for greetings
    const greetings = ["hi", "hello", "hey", "hiii", "hii"];
    const lowerMessage = message.toLowerCase().trim();
    
    if (greetings.some(greeting => lowerMessage.startsWith(greeting))) {
      return res.json({ reply: "Hi, welcome to Vineeth AI! How can I help you today?" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        { role: "system", content: "You are Vineeth's personal AI assistant." },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: response.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${process.env.PORT}`)
);

