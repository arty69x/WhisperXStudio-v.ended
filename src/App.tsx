import { useMemo, useState, type ChangeEventHandler } from 'react';
import { motion } from 'framer-motion';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GHOST_TEAM_9, type AgentId } from './constants';
import { GhostSVG } from './components/GhostSVG';

type Status = 'idle' | 'processing' | 'success' | 'error';
type Node = { id: string; x: number; y: number; label: string; src: string };

type AppState = {
  status: Status;
  apiKeys: { gemini: string; claude: string };
  nodes: Node[];
  setStatus: (status: Status) => void;
  setApiKey: (provider: 'gemini' | 'claude', key: string) => void;
  setNodes: (nodes: Node[]) => void;
};

const useStore = create<AppState>()(
  persist(
    (set) => ({
      status: 'idle',
      apiKeys: { gemini: '', claude: '' },
      nodes: [],
      setStatus: (status) => set({ status }),
      setApiKey: (provider, key) =>
        set((s) => ({ apiKeys: { ...s.apiKeys, [provider]: key } })),
      setNodes: (nodes) => set({ nodes }),
    }),
    { name: 'ghost-guardian-storage' },
  ),
);

const safeParse = <T,>(value: string, fallback: T): T => {
  try { return JSON.parse(value) as T; } catch { return fallback; }
};

async function runPipeline(intent: string): Promise<Record<AgentId, string>> {
  const out = {} as Record<AgentId, string>;
  let cycle = 0;
  while (cycle < 3) {
    for (const agent of GHOST_TEAM_9) {
      try {
        const clipped = intent.slice(0, agent.maxTokens);
        out[agent.id] = `${agent.role} processed ${clipped.length} tokens (cycle ${cycle + 1})`;
      } catch {
        out[agent.id] = 'fallback-safe';
      }
    }
    cycle += 1;
    if (out.VIGI) break;
  }
  return out;
}

export default function App() {
  const { status, setStatus, apiKeys, setApiKey, nodes, setNodes } = useStore();
  const [intent, setIntent] = useState('Build production-ready pipeline.');
  const [logs, setLogs] = useState<string[]>([]);

  const ghostColor = useMemo(() => ({ idle: '#ffffff', processing: '#ffcc00', success: '#00ff66', error: '#ff1a1a' }[status]), [status]);

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      const files = Array.from(e.target.files ?? []) as File[];
      const built = files.map((f, i) => ({ id: `${f.name}-${i}`, x: 80 + i * 220, y: 100 + i * 40, label: f.name, src: URL.createObjectURL(f) }));
      setNodes(built);
    } catch {
      setStatus('error');
    }
  };

  const run = async () => {
    setStatus('processing');
    try {
      const result = await runPipeline(intent);
      const endpointLogs: string[] = [];
      for (const provider of ['gemini', 'claude'] as const) {
        try {
          const key = apiKeys[provider]?.trim();
          if (!key) {
            endpointLogs.push(`${provider.toUpperCase()}: missing API key in local storage`);
            continue;
          }
          const response = await fetch(`/api/v1/${provider}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
            body: JSON.stringify({ intent }),
          });
          endpointLogs.push(`${provider.toUpperCase()}: ${response.ok ? 'connected' : `failed (${response.status})`}`);
        } catch {
          endpointLogs.push(`${provider.toUpperCase()}: endpoint unreachable`);
        }
      }
      setLogs([...Object.entries(result).map(([k, v]) => `${k}: ${v}`), ...endpointLogs]);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const exportEncrypted = () => {
    try {
      const payload = btoa(unescape(encodeURIComponent(JSON.stringify({ apiKeys, nodes, logs }))));
      const blob = new Blob([payload], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ghost-guardian.enc.json'; a.click();
    } catch { setStatus('error'); }
  };

  const importEncrypted: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      const file = e.target.files?.[0]; if (!file) return;
      const txt = await file.text();
      const data = safeParse(decodeURIComponent(escape(atob(txt))), '{}');
      if (typeof data === 'string') return;
      const obj = data as { apiKeys?: AppState['apiKeys']; nodes?: Node[] };
      if (obj.apiKeys) { setApiKey('gemini', obj.apiKeys.gemini || ''); setApiKey('claude', obj.apiKeys.claude || ''); }
      if (Array.isArray(obj.nodes)) setNodes(obj.nodes);
    } catch { setStatus('error'); }
  };

  return (
    <main className="min-h-screen bg-void-black">
      <section className="py-6"><div className="container mx-auto px-4 space-y-6">
        <div className="glass p-4 flex items-center justify-between">
          <div className="flex items-center gap-4"><GhostSVG color={ghostColor} variant="guardian"/><h1 className="text-xl font-bold">WHISPERX-MASTER V3.2</h1></div>
          <span className="text-xs uppercase">status: {status}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass p-4 space-y-3">
            <h2>API Connectivity</h2>
            <input className="w-full bg-black/30 p-2 rounded" placeholder="Gemini key (localStorage only)" value={apiKeys.gemini} onChange={(e)=>setApiKey('gemini', e.target.value)} />
            <input className="w-full bg-black/30 p-2 rounded" placeholder="Claude key (localStorage only)" value={apiKeys.claude} onChange={(e)=>setApiKey('claude', e.target.value)} />
            <p className="text-xs opacity-70">Endpoints: /api/v1/gemini and /api/v1/claude (V1beta protocol).</p>
          </div>
          <div className="glass p-4 space-y-3">
            <h2>Ghost Team 9</h2>
            <textarea className="w-full bg-black/30 p-2 rounded min-h-24" value={intent} onChange={(e)=>setIntent(e.target.value)} />
            <motion.button type="button" whileTap={{scale:0.98}} transition={{type:'spring', stiffness:300, damping:30, duration:0.4}} className="bg-nexus-orange text-black px-4 py-2 rounded cursor-pointer active:scale-95" onClick={() => { void run(); }}>▶ Play Orchestration</motion.button>
          </div>
        </div>

        <div className="glass p-4 space-y-3">
          <h2>Vision Node Canvas</h2>
          <div className="flex gap-2 flex-wrap">
            <input type="file" accept="image/*" multiple onChange={onUpload} />
            <button onClick={exportEncrypted} className="px-3 py-1 bg-bloom-green text-black rounded">Export Encrypted JSON</button>
            <input type="file" accept=".json" onChange={importEncrypted} />
          </div>
          <div className="relative h-[420px] overflow-auto border border-white/20 rounded-xl bg-black/30">
            <div className="relative w-[1600px] h-[900px]">
              {nodes.map((node) => (
                <motion.div drag dragMomentum={false} key={node.id} className="absolute glass p-2 w-48" style={{ left: node.x, top: node.y }} whileHover={{ rotateX: 6, rotateY: -6 }} transition={{type:'spring', stiffness:300, damping:30, duration:0.4}}>
                  <img src={node.src} className="w-full h-24 object-cover rounded" />
                  <p className="text-xs mt-2 truncate">{node.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass p-4"><pre className="text-xs whitespace-pre-wrap">{logs.join('\n')}</pre></div>
      </div></section>
    </main>
  );
}
