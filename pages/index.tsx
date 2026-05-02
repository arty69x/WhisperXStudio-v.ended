import Head from 'next/head';
import { FormEvent, useMemo, useState } from 'react';

type GeminiModel = 'gemini-2.5-flash' | 'gemini-2.5-pro' | 'gemini-2.0-flash-lite';

export default function HomePage() {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState<GeminiModel>('gemini-2.5-flash');
  const [prompt, setPrompt] = useState('Create a production-ready implementation plan for a Next.js Pages Router app.');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const disabled = useMemo(() => loading || !apiKey.trim() || !prompt.trim(), [loading, apiKey, prompt]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (disabled) return;
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim(), model, prompt: prompt.trim() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((json as { error?: string }).error || `HTTP ${res.status}`);
      setResponse((json as { text?: string }).text || 'No response text.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>WhisperX Studio · Next.js 16 Production</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <section>
          <div className="container mx-auto px-4" style={{ paddingTop: 24, paddingBottom: 32 }}>
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <h1 style={{ margin: 0, fontSize: 26 }}>WhisperX Studio · Full Production</h1>
              <p style={{ color: '#93afcc', marginBottom: 0 }}>Next.js 16 + TypeScript + Tailwind v4 baseline with Gemini latest-compatible integration.</p>
            </div>

            <div className="grid grid-2">
              <form className="card" style={{ padding: 20 }} onSubmit={onSubmit}>
                <h2 style={{ marginTop: 0 }}>Gemini Console</h2>
                <label>API Key</label>
                <input className="input" value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="password" placeholder="AIza..." />
                <div style={{ height: 10 }} />
                <label>Model</label>
                <select className="select" value={model} onChange={(e) => setModel(e.target.value as GeminiModel)}>
                  <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                  <option value="gemini-2.5-pro">gemini-2.5-pro</option>
                  <option value="gemini-2.0-flash-lite">gemini-2.0-flash-lite</option>
                </select>
                <div style={{ height: 10 }} />
                <label>Prompt</label>
                <textarea className="textarea" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <button className="btn btn-primary" disabled={disabled} type="submit">{loading ? 'Running…' : 'Run Gemini'}</button>
                  <button className="btn btn-ghost" type="button" onClick={() => { setPrompt(''); setResponse(''); setError(''); }}>Reset</button>
                </div>
              </form>

              <div className="card" style={{ padding: 20 }}>
                <h2 style={{ marginTop: 0 }}>Output</h2>
                {error ? <p style={{ color: '#ff6987' }}>{error}</p> : null}
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.55, color: '#b8d1ed' }}>{response || 'Run a prompt to see model output.'}</pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
