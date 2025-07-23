import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:4000",
    "X-Title": "AI Sales CRM",
  },
});

export async function extractMemoryFromText(text) {
  const prompt = `
Extract customer memory insights from this note:

"${text}"

Return only raw JSON (no markdown, no explanation). Format:
[
  { "type": "preference", "content": "Customer prefers Zoom over phone", "confidence": 0.9 },
  { "type": "objection", "content": "Concerned about pricing", "confidence": 0.8 }
]
`;

  const response = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3-0324:free",
    messages: [{ role: "user", content: prompt }],
  });

  let raw = response.choices[0].message.content;

  raw = raw.replace(/```json|```/g, "").trim();

  return JSON.parse(raw);
}
