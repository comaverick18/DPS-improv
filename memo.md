# Implementation & Ethics Memo - improvU JAZZ Feature

## 1. How I Actually Used AI While Building

I used three AI tools during this project: Google AI Studio, Cursor IDE with Claude, and Claude Code for final touches.

Google AI Studio served as my initial prototyping environment. I used it to test system prompts before implementation in my actual app. The "Build" feature helped me generate the initial HTML structure and test different ways to call the Gemini API. I iterated on system prompts there until JAZZ's coaching tone felt encouraging rather than robotic.

Cursor with Claude became my main development partner. I used it for architecture decisions, debugging API integration issues, CSS refinement to match improvU's brand identity, and building the feedback analysis logic that calculates "Yes, and..." usage. Claude Code helped with final deployment issues and environment variable setup for Vercel.

Human judgment was critical. I had to define what constitutes a "Yes, and..." response versus a more normal response. The three-minute session length came from manual testing until it felt right. I chose which metrics actually matter for feedback rather than tracking everything possible. I wrote system prompts that balance helpfulness with over-praising. Most importantly, I decided when to stop adding features and ship the prototype. I itereated and tested a lot.


## 2. Why the AI Feature Looks the Way It Does

I chose practice conversations with feedback instead of just a chatbot because improvU's value is building conversational confidence through practice. JAZZ needed to model good behavior, let users practice, and show them what to improve. A basic chatbot wouldn't teach anything.

The full JAZZ concept had multiple phases, voice input, user accounts, and adaptive difficulty. I simplified significantly. Text-only avoids complexity without proving the concept. The single practice flow of tutorial to practice to feedback keeps things focused. No accounts means avoiding database and privacy issues entirely.

This matters because someone anxious about networking can select "Networking Event," practice building on small talk, and see concrete feedback. The AI stays patient and judgment-free, creating the safe space improvU promises.

For technical choices, I picked Gemini Flash over Pro because speed matters more than perfect responses in practice conversations. The "Yes, and..." detection uses keyword matching, which isn't perfect but works well enough for a prototype. Building a custom model would be overkill at this stage.

## 3. Risks, Trade-offs, and Integrity

The biggest privacy risk was API key exposure. I moved it from hardcoded in Phase 2 testing to Vercel environment variables for deployment. User messages go to Google's API but nothing gets stored. Sessions disappear when you close the page. The trade-off is that users can't track progress over time, but it avoids privacy complications and database costs.

Gemini's training data has biases, and the AI might default to American norms that don't work everywhere. System prompts tell JAZZ to be encouraging regardless of style, and feedback focuses on improv principles not social conventions. But it's not perfect. AI bias is hard to eliminate completely.

Users might treat feedback as critical assessment when it's really directional guidance. The "Yes, and..." counter is just keyword matching, so you could game it by repeating "yes and" without actually building good responses. I scored engagement quality, not just keywords, and planning to add disclaimers that this is practice, not professional assessment.

For academic integrity, I used AI to serve as a coach and guide, but I made all the decisions. I defined requirements based on improv principles I already knew, made UX choices, wrote system prompts, and tested everything. AI was a code generation tool, but I spent well over 12 hours iterating and refining to my preferences.

## 4. What I Learned About Building with GenAI

The biggest surprise was how much prompt specificity changes everything. Generic prompts got generic UIs and bad results. Adding exact colors, measurements, and patterns made the output quality much better.

If I had to teach another founder one thing, it would be to use AI for speed, not thinking. GenAI accelerates implementing ideas you have. It's terrible at defining what to build. You have to get specific and put the time into knowing what you want and how to prompt to get it. IF you prompt "build me an app that..." you will get mediocre results because they fill in the gaps on their own.Human judgment matters and you need to give it to the LLM.

This project showed me several things that will affect my capstone. AI features need to solve real problems. It's useless otherwise. Simple works better than complex to get a working prototype. Ethics around privacy and bias need design decisions upfront. AI tools are crazy powerful but require strong supervision to use well.

I'm more confident building AI products but more skeptical of "AI-first" solutions. The best products use AI where it helps, not everywhere.