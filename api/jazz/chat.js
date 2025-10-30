import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
            return;
        }

        const { phase, messages, warmupPrompt } = req.body || {};
        if (!phase || !Array.isArray(messages)) {
            res.status(400).json({ error: "phase and messages[] required" });
            return;
        }

        const unsafe = (text) => /suicide|self-harm|hate|violence|nsfw|terror/i.test(text || "");
        if (messages.some(m => unsafe(m.content))) {
            res.status(200).json({ reply: "Let’s keep it safe and supportive. Please rephrase so we can continue." });
            return;
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemTeach = `
You are an improv coach. Teach "Yes, and..." briefly using simple words.
- 2–3 short bullets (very few words).
- Then a 4-line example (User/Coach alternating).
- Ask: "Do you want to use your own prompt, or should I pick one?"
Keep all lines short.`;

        const systemPlay = `
You are an improv partner playing "Yes, and..." with the user.
- Replies must be short (1–2 sentences), friendly, and mostly in "Yes, and..." spirit.
- Stay in character, build on the user's idea with specific detail.
- Keep the game upbeat and imaginative.
If user deviates, gently steer back, but keep it playful.`;

        let prompt;
        if (phase === "teach") {
            prompt = `${systemTeach}\n\nContext:\n${formatHistory(messages)}\n`;
        } else if (phase === "play") {
            const startLine = warmupPrompt ? `Warmup prompt chosen: ${warmupPrompt}` : "";
            prompt = `${systemPlay}\n${startLine}\n\nConversation so far:\n${formatHistory(messages)}\nCoach:`;
        } else {
            res.status(400).json({ error: "Unknown phase. Use 'teach' or 'play'." });
            return;
        }

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        res.status(200).json({ reply: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI request failed" });
    }
}

function formatHistory(history) {
    return history.map(m => `${m.role === "user" ? "User" : "Coach"}: ${m.content}`).join("\n");
}


