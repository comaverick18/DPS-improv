import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
            return;
        }

        const { transcript } = req.body || {};
        if (!Array.isArray(transcript) || transcript.length === 0) {
            res.status(400).json({ error: "transcript[] required" });
            return;
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const rubric = `
You are an improv coach evaluating a 3-minute "Yes, and..." round.
Prioritize: Acceptance Rate, Building Detail, Creativity.
Also consider Positivity and number of consecutive "Yes, and..."-style turns.
Output JSON with:
- badge: one of ["Starter", "Builder", "Yes-And Pro"]
- summary: short 2–3 sentence summary
- wins: array of 3 short bullet strings
- improvements: array of 3 short bullet strings
- references: up to 3 brief examples referencing user turns (quote small fragments)
Keep language simple and encouraging.`;

        const prompt = `${rubric}\n\nTranscript:\n${formatHistory(transcript)}\n\nReturn only JSON.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        let parsed = null;
        try { parsed = JSON.parse(text); } catch {}
        if (!parsed || !parsed.badge) {
            parsed = {
                badge: "Starter",
                summary: "Great start. You accepted ideas and began to build on them.",
                wins: ["Accepted partner ideas", "Added some details", "Positive tone"],
                improvements: ["Use 'Yes, and...' more explicitly", "Add specific details", "Keep replies short and active"],
                references: []
            };
        }

        res.status(200).json(parsed);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Feedback generation failed" });
    }
}

function formatHistory(history) {
    return history.map(m => `${m.role === "user" ? "User" : "Coach"}: ${m.content}`).join("\n");
}


