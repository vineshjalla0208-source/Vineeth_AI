# Vineeth AI - AI Chatbot

A modern, full-stack AI chatbot built with Node.js, Express, and OpenAI API.

## Features

- 🤖 AI-powered conversations using OpenAI GPT-4o-mini
- 🎨 Modern ChatGPT/Perplexity-style UI
- 🌓 Dark theme with smooth animations
- 📱 Fully responsive design
- 🚀 Ready for local development and Vercel deployment

## Project Structure

```
AI-ChatBot/
├── api/
│   └── chat.js          # (Vercel serverless function - not used locally)
├── frontend/
│   ├── index.html       # Frontend HTML
│   ├── script.js        # Frontend JavaScript
│   └── style.css        # Frontend styles
├── server.js            # Express server (local development)
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (create this)
├── .env.example         # Example environment file
├── vercel.json          # Vercel configuration (for deployment)
└── README.md
```

## Local Development Setup

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** (comes with Node.js)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### Step-by-Step Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` File**
   
   Create a `.env` file in the root directory:
   ```bash
   OPENAI_API_KEY="your-openai-api-key-here"
   PORT=5000
   ```
   
   Replace `your-openai-api-key-here` with your actual OpenAI API key.
   The `.env` file is already created with placeholder values - just update the API key.

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   
   **Option 1 (Recommended):** Navigate to: **http://localhost:5000**
   
   The Express server will:
   - Serve the frontend from `/frontend` folder automatically
   - Handle API requests at `/api/chat`
   - Display helpful startup messages in the terminal
   
   **Option 2:** Open `frontend/index.html` directly in browser
   - The frontend will automatically detect and use `http://localhost:5000/api/chat`
   - Make sure the server is running first!

### What You'll See

When you run `npm run dev`, you should see:
```
🚀 Server running on http://localhost:5000
📁 Frontend served from /frontend
🤖 API endpoint: http://localhost:5000/api/chat
✅ Ready to chat!
```

### Troubleshooting

**Error: OPENAI_API_KEY is missing**
- Make sure you created a `.env` file in the root directory
- Check that the file contains: `OPENAI_API_KEY=sk-...`
- Restart the server after creating/updating `.env`

**Error: Port 5000 already in use**
- Close other applications using port 5000
- Or modify `PORT` in `server.js` to use a different port

**CORS Errors**
- The server includes CORS middleware, so this shouldn't happen
- If you see CORS errors, make sure you're accessing `http://localhost:5000` (not `file://`)

**Frontend not loading**
- Make sure you're accessing via `http://localhost:5000` (not opening HTML file directly)
- Check that `frontend/` folder exists with all files

## API Endpoint

### POST `/api/chat`

Send a message to the AI chatbot.

**Request:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "reply": "Hello! I'm doing well, thank you for asking..."
}
```

**Error Response:**
```json
{
  "error": "Error message here"
}
```

## Scripts

- `npm run dev` - Start the development server (port 5000)
- `npm start` - Same as `npm run dev`

## Technologies Used

- **Backend:** Node.js, Express.js
- **AI:** OpenAI API (GPT-4o-mini)
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Styling:** Modern CSS with CSS Variables

## Vercel Deployment

After your local setup is working perfectly, follow these steps to deploy to Vercel:

### Prerequisites

- Vercel account ([Sign up here](https://vercel.com))
- GitHub account (recommended) or Vercel CLI

### Step-by-Step Deployment

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Import Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the project settings

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your-openai-api-key-here`
   - **Important:** Do NOT add PORT variable (Vercel handles this automatically)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add OPENAI_API_KEY
   # Paste your API key when prompted
   ```

5. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The project includes `vercel.json` which:
- Automatically detects `/api/chat.js` as a serverless function
- Serves frontend files from `/frontend` folder
- Routes all requests to `index.html` for SPA support

### Important Notes for Vercel

- ✅ **No PORT needed** - Vercel automatically assigns ports
- ✅ **No Express server** - Uses serverless functions in `/api/chat.js`
- ✅ **Environment variables** - Set in Vercel dashboard, not `.env` file
- ✅ **CORS not needed** - Same origin on Vercel
- ✅ **Automatic HTTPS** - Vercel provides SSL certificates

### Testing Your Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Test the chat functionality
3. Check Vercel logs if you encounter issues

### Troubleshooting Vercel Deployment

**Error: OPENAI_API_KEY is not configured**
- Make sure you added the environment variable in Vercel dashboard
- Redeploy after adding environment variables

**404 on /api/chat**
- Verify `api/chat.js` exists and exports a default handler
- Check Vercel function logs in dashboard

**Frontend not loading**
- Check that `vercel.json` routes are correct
- Verify `frontend/` folder structure

## License

MIT
