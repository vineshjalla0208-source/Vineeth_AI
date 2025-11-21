# Vineeth AI - AI Chatbot

A modern, full-stack AI chatbot built with Vercel serverless functions and OpenAI API.

## Features

- 🤖 AI-powered conversations using OpenAI GPT-4o-mini
- 🎨 Modern ChatGPT-style UI with dark theme
- ✨ Smooth animations and loading indicators
- 📱 Fully responsive design
- 🚀 Deployed on Vercel with zero configuration

## Project Structure

```
AI-ChatBot/
├── api/
│   └── chat.js          # Vercel serverless function
├── frontend/
│   ├── index.html       # Frontend HTML
│   ├── script.js        # Frontend JavaScript
│   └── style.css        # Frontend styles
├── package.json         # Dependencies
├── vercel.json          # Vercel configuration
├── .env                 # Environment variables (local only)
├── .gitignore
└── README.md
```

## Local Development Setup

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** (comes with Node.js)
- **Vercel CLI** (for local testing)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### Step-by-Step Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

3. **Create `.env` File**
   
   Create a `.env` file in the root directory:
   ```bash
   OPENAI_API_KEY="your-openai-api-key-here"
   ```
   
   Replace `your-openai-api-key-here` with your actual OpenAI API key.

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   
   This will start Vercel's local development server which simulates the production environment.

5. **Open in Browser**
   
   The server will display a local URL (usually `http://localhost:3000`).
   Open that URL in your browser.

### What You'll See

When you run `npm run dev`, Vercel will:
- Start a local server (usually on port 3000)
- Load your `.env` file automatically
- Serve your frontend files
- Handle `/api/chat` requests via serverless functions

### Troubleshooting

**Error: OPENAI_API_KEY is missing**
- Make sure you created a `.env` file in the root directory
- Check that the file contains: `OPENAI_API_KEY="sk-..."`
- Restart the dev server after creating/updating `.env`

**Error: Vercel CLI not found**
- Install Vercel CLI: `npm i -g vercel`
- Or use: `npx vercel dev` instead of `npm run dev`

**Frontend not loading**
- Make sure you're accessing the URL shown in the terminal
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

- `npm run dev` - Start local development server using Vercel CLI
- `npm install` - Install dependencies

## Technologies Used

- **Backend:** Vercel Serverless Functions (Node.js)
- **AI:** OpenAI API (GPT-4o-mini)
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Styling:** Modern CSS with CSS Variables and animations

## Vercel Deployment

### Prerequisites

- Vercel account ([Sign up here](https://vercel.com))
- GitHub account (recommended)

### Step-by-Step Deployment

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository: `vineshjalla0208-source/Vineeth_AI`
   - Vercel will auto-detect the project settings

3. **Configure Environment Variables**
   - In the project import screen, click "Environment Variables"
   - Add new variable:
     - **Key:** `OPENAI_API_KEY`
     - **Value:** `your-openai-api-key-here`
     - **Environment:** Select all (Production, Preview, Development)
   - Click "Add"

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add OPENAI_API_KEY
   # Paste your API key when prompted
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The project includes `vercel.json` which:
- Configures the runtime for `/api/chat.js` as Node.js 18.x
- Automatically serves frontend files from `/frontend` folder
- Handles routing automatically

### Important Notes for Vercel

- ✅ **No PORT needed** - Vercel automatically assigns ports
- ✅ **No Express server** - Uses serverless functions in `/api/chat.js`
- ✅ **No CORS needed** - Same origin on Vercel
- ✅ **Environment variables** - Set in Vercel dashboard, not `.env` file
- ✅ **Automatic HTTPS** - Vercel provides SSL certificates
- ✅ **Auto-scaling** - Serverless functions scale automatically

### Testing Your Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Test the chat functionality
3. Check Vercel function logs if needed (Dashboard → Your Project → Functions)

### Troubleshooting Vercel Deployment

**Error: OPENAI_API_KEY is not configured**
- Make sure you added the environment variable in Vercel dashboard
- Redeploy after adding environment variables
- Check that the variable is set for all environments (Production, Preview, Development)

**404 on /api/chat**
- Verify `api/chat.js` exists and exports a default handler
- Check Vercel function logs in dashboard
- Ensure `vercel.json` is configured correctly

**Frontend not loading**
- Check that `frontend/` folder exists with all files
- Verify file paths in `index.html` are correct
- Check Vercel build logs for errors

## License

MIT
