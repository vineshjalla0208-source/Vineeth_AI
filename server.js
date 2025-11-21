import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: OPENAI_API_KEY is missing in .env file");
  console.error("Please create a .env file with: OPENAI_API_KEY=your-key-here");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

// API Route: POST /api/chat
app.post("/api/chat", async (req, res) => {
  try {
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
});

// Serve index.html for all other routes (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Frontend served from /frontend`);
  console.log(`🤖 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`✅ Ready to chat!`);
});

