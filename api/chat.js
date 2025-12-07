// Vercel Serverless Function - Proxy for Google Gemini API
// This keeps the API key secure on the server side

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { messages, stream } = req.body;
        
        // Convert OpenAI-style messages to Gemini format
        // Gemini uses "contents" with "parts" and different role names
        const systemInstruction = messages.find(m => m.role === 'system')?.content || '';
        const conversationMessages = messages.filter(m => m.role !== 'system');
        
        const geminiContents = conversationMessages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const apiKey = process.env.GEMINI_API_KEY;
        const model = 'gemini-1.5-flash';
        
        if (stream) {
            // Streaming endpoint
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: systemInstruction }]
                    },
                    contents: geminiContents,
                    generationConfig: {
                        maxOutputTokens: 500,
                        temperature: 0.8
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Gemini API error:', errorData);
                return res.status(response.status).json({ 
                    error: errorData.error?.message || `Gemini API error: ${response.status}` 
                });
            }

            // Set headers for streaming
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            // Stream the response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                res.write(chunk);
            }

            res.end();
        } else {
            // Non-streaming endpoint
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: systemInstruction }]
                    },
                    contents: geminiContents,
                    generationConfig: {
                        maxOutputTokens: 500,
                        temperature: 0.8
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Gemini API error:', errorData);
                return res.status(response.status).json({ 
                    error: errorData.error?.message || `Gemini API error: ${response.status}` 
                });
            }

            const data = await response.json();
            res.status(200).json(data);
        }
    } catch (error) {
        console.error('API route error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
}
