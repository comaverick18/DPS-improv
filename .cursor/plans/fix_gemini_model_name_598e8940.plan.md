---
name: Fix Gemini Model Name
overview: Fix the invalid Gemini model name causing connection failures. Change from non-existent "gemini-2.5-flash" to the valid "gemini-1.5-flash" model.
todos:
  - id: mic-css
    content: Add microphone button CSS styles (normal, hover, recording, disabled states)
    status: completed
  - id: mic-html
    content: Add mic button HTML between input and Send button
    status: completed
  - id: speech-js
    content: Add Speech Recognition setup, event handlers, and button click logic
    status: completed
---

# Fix Gemini Model Name

## Problem
The API call uses `"gemini-2.5-flash"` which is not a valid Google Gemini model name, causing all API requests to fail with "Connection issue."

## Solution
Change to `"gemini-1.5-flash"` (Google's fast, production-ready model).

## Changes Required

### 1. Fix API Model Name ([jazz-ai.html](jazz-ai.html) line 1247)
```javascript
// Change from:
model: "gemini-2.5-flash",

// To:
model: "gemini-1.5-flash",
```

### 2. Fix UI Display ([jazz-ai.html](jazz-ai.html) line 875)
```html
<!-- Change from: -->
<span class="setting-value">Gemini 2.5 Flash</span>

<!-- To: -->
<span class="setting-value">Gemini 1.5 Flash</span>
```

### 3. Commit and Push
Deploy to Vercel to make the fix live.

## Expected Result
- API calls will succeed
- Jazz AI will respond to users
- No more "Connection issue" errors