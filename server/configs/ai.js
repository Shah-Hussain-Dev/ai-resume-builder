import OpenAI from "openai";

export const generateGeminiContent = async (systemPrompt, userPrompt, jsonMode = false) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || !apiKey.trim()) {
        throw new Error("GEMINI_API_KEY is missing in server/.env file. Please get an API key from https://aistudio.google.com/app/apikey");
    }

    let model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    if (!model || model.includes("2.5") || model.includes("2.0")) {
        model = "gemini-2.5-flash";
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;

    const bodyPayload = {
        contents: [
            {
                role: "user",
                parts: [
                    { text: `${systemPrompt}\n\n${userPrompt}` }
                ]
            }
        ]
    };

    if (jsonMode) {
        bodyPayload.generationConfig = {
            responseMimeType: "application/json"
        };
    }

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        console.error("Google Gemini API Error Response:", data);
        const errorMsg = data.error?.message || `Google Gemini API returned HTTP ${response.status} (${response.statusText})`;
        throw new Error(errorMsg);
    }

    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResult) {
        throw new Error("Empty response received from Google Gemini API");
    }

    return textResult;
};

export const getAiClient = () => {
    return new OpenAI({
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/"
    });
};

const ai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default ai;