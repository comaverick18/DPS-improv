## improvU (DPS-improv)

## What It Does

improvU helps people overcome conversation anxiety and build confidence through improv training. The core feature, **JAZZ**, is an AI-powered practice partner that teaches the foundational "Yes, and..." improv technique through interactive conversation and personalized feedback.

**Live Demo:** https://dps-improv.vercel.app/

**Demo Video:** https://youtu.be/S033lU-Y3rc

## How to Use

1. Visit https://dps-improv.vercel.app/
2. Click "Try JAZZ" from the homepage
3. Select a practice scenario (Networking Event, Job Interview, etc.)
4. Have a 3-minute conversation with the AI coach
5. Receive feedback on your "Yes, and..." usage and engagement

## How This Project Uses AI

JAZZ uses Google's Gemini 1.5 Flash model to power conversational practice sessions. The AI acts as your practice partner in realistic scenarios—like a networking event or job interview—and responds in character while modeling good improv behavior.

After each 3-minute session, the AI analyzes your conversation transcript to generate personalized feedback. It tracks how often you used "Yes, and..." responses (building on ideas), identifies blocking moments (shutting down conversations), and measures your engagement quality. The feedback includes specific improvement tips based on your session.

The AI integration makes practice adaptive and judgment-free. Unlike static tutorials, JAZZ responds to whatever you say and adjusts its coaching to your actual performance.

## Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **AI Model:** Google Gemini 1.5 Flash via Gemini API
- **Hosting:** Vercel with serverless functions
- **API Integration:** Secure server-side proxy (API key in environment variables)

## Project Documentation

- [Final PRD](prd_final.md) - Complete product requirements and technical specifications
- [Implementation & Ethics Memo](memo.md) - AI usage, decisions, and ethical considerations


---
---
### Project Overview
improvU is a web application that helps people build conversation confidence through:
- **JAZZ** - AI-powered practice partner using Google's Gemini API
- **ConvoQuest** - Real-world conversation challenges
- **ImprovCircle** - Community practice sessions

The homepage highlights the value proposition and routes users to try features or join the waitlist via Typeform.

### Key Feature Developement:
- **JAZZ AI Chat**: Real-time conversation practice with Gemini 2.5 Flash
  - "Yes, and..." improv technique coaching
  - Multiple scenario options (Coffee Shop, Job Interview, Networking, etc.)
  - Real-time streaming responses
  - Session feedback and metrics
  - Interactive onboarding tutorial
- Pure HTML/CSS/JS
- Mobile-responsive layout
- Accessible button and focus states

### Live Hosted Link (Vercel)
- Production: https://dps-improv.vercel.app/

### Setup

Follow these steps to run the app locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/comaverick18/DPS-improv.git
   cd DPS-improv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local

   # Then edit .env.local and add your own Gemini API key
   # Get a free key at: https://aistudio.google.com/apikey
   ```

4. **Run a local development server**
   ```bash
   # Using Vercel CLI (recommended - supports API routes)
   npx vercel dev

   # Or use a simple HTTP server (frontend only)
   npx serve .
   # Then open http://localhost:3000

   # Or using Python 3
   python -m http.server 8000
   # Then open http://localhost:8000
   ```

5. **Open the app**
   - Navigate to `http://localhost:3000` (or the port shown)
   - Click "Try JAZZ" to start practicing improv with AI

### JAZZ AI Feature
The JAZZ AI chat uses Google's **Gemini 2.5 Flash** model with a secure server-side proxy:

- API key is stored securely in environment variables (not exposed to the browser)
- Real-time streaming responses for natural conversation flow
- System instructions guide the AI to act as an improv coach
- Pattern detection for "Yes, and..." technique and blocking behaviors

### Project Structure
```
├── index.html          # Landing page with hero, features, CTAs
├── jazz-ai.html        # AI chat practice (Gemini integration)
├── convoquest.html     # Real-world challenges feature
├── improvcircle.html   # Community practice feature
├── api/
│   └── chat.js         # Vercel serverless function - Gemini API proxy
├── styles.css          # Global styles and design system
├── script.js           # Client interactions and animations
├── design.json         # Design tokens and references
├── .env.example        # Example environment variables
└── .env.local          # Your API keys (gitignored, create from .env.example)
```

### Notable Behaviors
- Hero CTA button links directly to Typeform waitlist: `https://form.typeform.com/to/R8oNnhtQ`
- JAZZ uses streaming responses for real-time AI feedback
- "Yes, and..." detection rewards users for good improv technique

### Deploying to Vercel
1. Push this repository to GitHub/GitLab/Bitbucket
2. In Vercel, click "New Project" → Import the repo
3. Framework preset: "Other" (no build)
4. Build Command: `None`
5. Output Directory: `/` (root)
6. **Add environment variable**: Go to Settings → Environment Variables → Add `GEMINI_API_KEY`
7. Deploy and update the live link above

**Important**: Make sure to add your `GEMINI_API_KEY` in Vercel's environment variables for the serverless function to work in production.

### Tech Stack
- HTML5 / CSS3 / Vanilla JavaScript
- Google Generative AI (Gemini 2.5 Flash)
- Inter font family

### License
Proprietary (update if you wish to open-source).
