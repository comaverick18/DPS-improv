# Session Handoff — refactor/landing-modernize-v1

## Where we stopped
Paused after Step 1 of the "visuals-only" pivot. Branch is clean (index.html and styles.css identical to main). styleguide.html deleted. Dev server was running at http://localhost:3000.

## Branch commit log (above main baseline 726e30d)
- 9db418d chore: remove styleguide.html
- 3bcdf8e feat(styleguide): preview new landing design system (file now deleted)
- db6bbe3 docs: apply plan corrections
- 103326a docs: add landing refactor plan

## Active task
Task 2 (pivot): surgical visual upgrade to the three feature-benefit rows (JAZZ, ConvoQuest, ImprovCircle) only. Keep all other sections untouched. Reference: pinecone.io, workspace.google.com/products/vids (Veo 3 section), seamless.ai/products/chrome-extension.

## Next step when resumed
Step 2 of the pivot: propose screenshots vs upgraded SVGs, plus highlight-card copy (eyebrow + one-line headline) for each of the three pillars. Then Step 3–5 implement JAZZ, ConvoQuest, ImprovCircle one at a time with approval between each.

## Remaining roadmap (advisor session tracks these)
3. Step-by-step to update Gemini API key for JAZZ
4. Review and improve JAZZ's "Yes, and…" practice system prompt
5. Consolidate directory; decide if .env.example stays

## How to resume
- Pull latest on this branch
- Restart dev server: `npx --yes serve . -l 3000`
- Open http://localhost:3000
- Tell Claude Code: "Resume Task 2 visuals-only pivot. Proceed to Step 2."
