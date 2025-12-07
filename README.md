## improvU (DPS-improv)

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

### Getting Started

#### Option 1: Open directly
1. Clone/download the repo
2. Open `index.html` in your browser

#### Option 2: Local server (recommended)
```bash
# Using Node (serve)
npx serve .
# Then open http://localhost:3000

# Or using Python 3
python -m http.server 8000
# Then open http://localhost:8000
```

### Setting Up JAZZ AI
The JAZZ feature requires a Google Gemini API key:

1. Get a free API key at: https://makersuite.google.com/app/apikey
2. When you first visit the JAZZ page, you'll be prompted to enter your key
3. The key is stored in localStorage for convenience

> **Note**: For production, implement a backend proxy to protect your API key.

### Project Structure
```
├── index.html          # Landing page with hero, features, CTAs
├── jazz-ai.html        # AI chat practice (Gemini integration)
├── convoquest.html     # Real-world challenges feature
├── improvcircle.html   # Community practice feature
├── styles.css          # Global styles and design system
├── script.js           # Client interactions and animations
├── design.json         # Design tokens and references
└── .env.local          # API keys (gitignored)
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
6. Deploy and update the live link above

### Tech Stack
- HTML5 / CSS3 / Vanilla JavaScript
- Google Generative AI (Gemini 2.5 Flash)
- Inter font family

### License
Proprietary (update if you wish to open-source).
