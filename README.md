# Vineeth AI - AI Chatbot

A modern, full-stack AI chatbot built with Node.js, Express, and OpenAI API.

## Features

- 🤖 AI-powered conversations using OpenAI GPT
- 🎨 Premium Perplexity-style UI with glassmorphism
- 🌓 Dark/Light mode toggle
- 📱 Responsive design
- 🚀 Deployed on Vercel

## Project Structure

```
Vineeth_AI/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── index.js
│   └── package.json
├── api/
│   ├── chat.js
│   └── package.json
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── vercel.json
└── README.md
```

## Local Development

### Prerequisites

- Node.js 18+
- npm
- OpenAI API Key

### Setup

1. Clone the repository:
```bash
git clone https://github.com/vineshjalla0208-source/Vineeth_AI.git
cd Vineeth_AI
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create `.env` file in `backend/`:
```
OPENAI_API_KEY=your_api_key_here
PORT=5000
```

4. Start backend server:
```bash
node index.js
```

5. Open `frontend/index.html` in your browser

## Deployment

This project is configured for automatic deployment to Vercel via GitHub Actions.

### Environment Variables (Vercel)

Set these in Vercel dashboard:
- `OPENAI_API_KEY` - Your OpenAI API key
- `FRONTEND_URL` - Your frontend URL (optional, for CORS)

### GitHub Secrets

Add these secrets to your GitHub repository:
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

## CI/CD

- **CI Pipeline**: Runs on pull requests and pushes to main/develop
- **Deploy Pipeline**: Automatically deploys to Vercel on push to main

## License

MIT

