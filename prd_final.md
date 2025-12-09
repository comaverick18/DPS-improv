# improvU - Final Product Requirements Document

## 1. Product Overview

improvU helps people build conversational confidence by teaching them improv skills. The target users are professionals preparing for high-stakes conversations (interviews, networking, pitches) and anyone experiencing conversation anxiety or awkward silence struggles.

This Phase 3 prototype delivers a fully functional JAZZ feature - an AI-powered practice partner that teaches and coaches the foundational "Yes, and..." improv principle through interactive conversation and real-time feedback.

**Current State:** JAZZ is live and functional at https://dps-improv.vercel.app with complete scenario selection, practice conversations, and automated feedback generation.

## 2. Core Features & Status

### JAZZ - AI Practice Partner [IMPLEMENTED]
- **Scenario Selection:** Users choose from 6 preset scenarios (Networking Event, Job Interview, etc.) or create custom scenarios
- **Tutorial Mode:** First-time users receive interactive teaching of "Yes, and..." principles
- **Practice Sessions:** 3-minute timed conversations where users practice building on AI responses
- **Real-time Feedback:** Post-session analysis tracking "Yes, And" usage, blocking moments, engagement quality, and response metrics
- **Session Tracking:** Live metrics displayed during practice (message count, "Yes, and" detection, timer)

### ConvoQuest - Real-World Challenges [FUTURE]
Gamified IRL micro-challenges to bridge practice to reality. Not built in this phase.

### ImprovCircle - Community Practice [FUTURE]
Live peer practice sessions via WebRTC. Not built in this phase.

## 3. AI Specification (Final)

**What the AI does:**
- Acts as conversational practice partner during 3-minute sessions
- Responds in character based on selected scenario (e.g., as a fellow networking attendee, interviewer, etc.)
- Models "Yes, and..." behavior by accepting and building on user input
- Analyzes completed conversation transcript to generate structured feedback
- Calculates metrics: "Yes, And" count, blocking count, engagement percentage, message totals

**Where it appears:**
1. **Tutorial Phase:** AI teaches "Yes, and..." concept interactively (first session only)
2. **Practice Phase:** AI maintains scenario-appropriate character during timed conversation
3. **Feedback Phase:** AI evaluates session transcript and generates improvement tips

**Model & Implementation:**
- **Model:** Google Gemini 2.5 Flash via Gemini API
- **Integration:** Direct API calls from frontend using serverless architecture
- **API Key:** Stored in Vercel environment variables (not exposed to client)
- **Rate Limiting:** None currently

**Constraints & Guardrails:**
- 3-minute session limit prevents infinite conversations
- System prompts enforce encouraging, judgment-free coaching tone
- No personally identifiable information collected or stored
- Sessions are ephemeral (no database persistence in current version)

## 4. Technical Architecture

**Frontend:**
- Pure HTML/CSS/JavaScript (no frameworks)
- Responsive design using CSS Grid and Flexbox
- Client-side session state management via JavaScript objects

**Backend/API:**
- Vercel serverless hosting with auto-deployment from GitHub
- Direct Gemini API integration
- Environment variable management for API keys

**AI Integration Pattern:**
```
User Input → JavaScript Event Handler → Gemini API Call → 
Response Processing → DOM Update → Session Analysis → Feedback Generation
```

**Hosting & Deployment:**
- GitHub repository: https://github.com/comaverick18/DPS-improv
- Live site: https://dps-improv.vercel.app
- Auto-deploy on push to main branch

## 5. Prompting & Iteration Summary

**Key Prompts Used:**
I put my thoughts into an LLM to have it generate better, more specific prompts.
1. **Initial JAZZ Architecture (Cursor):**
   "Build a conversational AI practice interface where users select scenarios, have timed 3-minute conversations, and receive structured feedback on their 'Yes, and...' usage. Use vanilla JavaScript, no frameworks, integrate with Gemini API."

2. **Feedback System Refinement (Cursor):**
   "The conversation works but feedback generation does not. Analyze the session transcript. Calculate: 'Yes, And' count, blocking count (rejections or shutdowns), engagement score based on response quality, average response time."

3. **UI Polish Iterations (Cursor):**
   "Update the CSS to match improvU brand: navy #1E2875 for headers, blue #4169E1 for CTAs, yellow #FFD700 accents, clean cards with 24px border radius, progress bars for metrics."

**What I Learned:**
- You must be specific with metric definitions in prompts; otherwise, you get vague AI outputs
- Breaking complex features into phases (tutorial → practice → feedback) made prompting and development much more manageable
- Iterating on system prompts for AI personality (encouraging, playful) required multiple refinements to avoid overly formal or emoji-heavy responses. I still don't think I've hit the sweet spot.

## 6. UX & Limitations

**Intended User Journey:**
1. Land on site → Click "Try Jazz" → Select scenario
2. (First time) Complete interactive tutorial on "Yes, and..."
3. Start 3-minute practice session
4. Receive feedback with specific metrics and improvement tips
5. Option to restart with new scenario

**Known Limitations:**
- **No Persistence:** Sessions don't save; no user accounts or history tracking
- **Feedback Accuracy:** "Yes, and..." detection uses keyword matching, may miss nuanced usage
- **No Voice:** Text-only (voice integration planned for future)
- **Single User:** No multi-user or peer practice functionality yet
- **Limited Scenarios:** Only 6 preset options plus custom input

**When Users Should NOT Rely on This:**
- If they need more serious professional therapy or clinical anxiety treatment (this is skill practice, not mental health care)
- Exact scoring as definitive assessment (metrics are directional)
- Privacy-sensitive conversations (no encryption, sessions are not stored but API calls occur)

## 7. Future Roadmap

If development continued:

1. **User Accounts & History:** Save sessions, track progress over time, show improvement trends
2. **Advanced Feedback:** Use sentiment analysis, measure creativity/detail in responses, identify patterns across sessions
3. **Voice Integration:** Add Web Speech API for audio practice mode. Speech to Speech
4. **ConvoQuest Build:** Launch real-world challenge system with XP and badges
5. **Community Features:** Implement ImprovCircle with WebRTC for live peer practice
6. **Mobile App:** Native iOS/Android versions for on-the-go practice
