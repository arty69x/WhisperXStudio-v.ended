import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { text?: string; error?: string };

const BASES = [
  'https://generativelanguage.googleapis.com/v1/models',
  'https://generativelanguage.googleapis.com/v1beta/models',
] as const;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { apiKey, model, prompt } = (req.body ?? {}) as { apiKey?: string; model?: string; prompt?: string };
    if (!apiKey || !model || !prompt) return res.status(400).json({ error: 'apiKey, model, prompt are required' });

    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.6, maxOutputTokens: 4096 },
    };

    let lastError = 'Gemini request failed';
    for (const base of BASES) {
      const r = await fetch(`${base}/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await r.json().catch(() => ({} as any));
      if (r.ok) {
        const text = json?.candidates?.[0]?.content?.parts?.find((p: { text?: string }) => typeof p.text === 'string')?.text || '';
        return res.status(200).json({ text });
      }
      lastError = json?.error?.message || `HTTP ${r.status}`;
    }
    return res.status(502).json({ error: lastError });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error';
    return res.status(500).json({ error: message });
  }
}
