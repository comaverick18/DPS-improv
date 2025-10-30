## improvU (DPS-improv)

### Project overview
improvU is a static, front-end only site that helps people build conversation confidence through AI practice (JAZZ), real-world challenges (ConvoQuest), and community practice (ImprovCircle). The homepage highlights the value proposition and routes users to try features or join the waitlist via a Typeform CTA.

Key characteristics:
- Pure HTML/CSS/JS, no build step required
- Mobile-responsive layout
- Accessible button and focus states
- Hero CTA links to Typeform waitlist: `https://form.typeform.com/to/R8oNnhtQ`

### Live hosted link (Vercel)
- Production: https://YOUR-VERCEL-DOMAIN.vercel.app

### Getting started (viewing/running locally)
Option 1: Open the file directly
1. Clone/download the repo
2. Open `index.html` in your browser

Option 2: Serve locally (recommended for accurate asset paths and routing)
- Using Node (serve):
  - `npx serve .` then open the printed local URL (e.g., `http://localhost:3000`)
- Using Python:
  - Python 3: `python -m http.server 8000` then visit `http://localhost:8000`

### Project structure
- `index.html`: Main landing page with hero, features, and CTAs
- `styles.css`: Global styles following the design system
- `script.js`: Client interactions (CTA handling, modals, minor animations)
- `jazz.html`, `convoquest.html`, `improvcircle.html`: Feature demo pages
- `DPS-improvU/`: Additional static assets/pages (if used)
- `design.json`: Design tokens and references

### Notable behaviors
- Hero CTA button (`Start Building Confidence`) links directly to the Typeform.


### Deploying to Vercel
1. Push this repository to GitHub/GitLab/Bitbucket
2. In Vercel, click “New Project” → Import the repo
3. Framework preset: “Other” (no build). Build Command: `None`. Output Directory: `/` (root)
4. Deploy
5. Update the “Live hosted link” in this README with your assigned Vercel domain

Optional: If you add a build step later, configure the appropriate framework preset and output directory in Vercel.

### License
Proprietary (update if you wish to open-source).


