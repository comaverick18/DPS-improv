---
name: Speech to Text Feature
overview: Add a microphone button for speech-to-text input in the JAZZ chat. The button will appear between the text input and Send button, using the Web Speech API with proper error handling and visual feedback.
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

# Speech-to-Text Feature Implementation

## Overview

Add voice input capability to JAZZ chat using the Web Speech API. Users can click a microphone button to speak their responses, which will be transcribed into the text input field.

## Changes to [jazz-ai.html](jazz-ai.html)

### 1. Add Microphone Button CSS (after `.send-btn` styles ~line 170)

- `.mic-btn` - Circular button with mic icon, matches design system
- `.mic-btn:hover` - Blue highlight on hover
- `.mic-btn.recording` - Red pulsing state when actively recording
- `.mic-btn:disabled` - Grayed out for unsupported browsers

### 2. Add Microphone Button HTML (line ~768, between input and Send)

- SVG microphone icon
- `id="micBtn"` for JavaScript binding
- `title` attribute for tooltip (changes based on support)
- `aria-label` for accessibility

### 3. Add Speech Recognition JavaScript

Location: After DOM element declarations (~line 980)

**Setup:**

- Feature detection for `SpeechRecognition` / `webkitSpeechRecognition`
- Configure: `continuous: false`, `interimResults: true`, `lang: 'en-US'`

**Event Handlers:**

- `onresult` - Update input field with transcript (interim and final)
- `onend` - Reset recording state, remove visual feedback
- `onerror` - Handle permission denied, no speech detected, etc.
- `onaudiostart` - Optional: confirm recording started

**Button Click Handler:**

- Toggle recording on/off
- Update button class for visual state
- Update placeholder text ("Listening..." when recording)

**Integration:**

- Disable mic button when `chatInput.disabled` is true
- Sync with existing input enable/disable logic

### 4. Update Input Hint Text

Change placeholder to "Listening..." while recording, restore original on stop.

## Error Handling

- **Unsupported browser**: Button visible but disabled, tooltip explains
- **Permission denied**: Alert user, reset state
- **No speech detected**: Graceful timeout, reset state
- **Network error** (rare): Show error, reset state