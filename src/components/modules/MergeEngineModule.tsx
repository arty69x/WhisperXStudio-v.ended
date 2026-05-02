import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitMerge, Copy, Download, AlertTriangle, 
  CheckCircle, Zap, Code2, Loader2, Sparkles,
  ChevronRight, ArrowRightLeft
} from 'lucide-react';
import { callGeminiJSON } from '../../services/geminiService';

interface MergeResult {
  mergedCode: string;
  diffSummary: string;
  conflicts: Array<{ location: string; description: string; resolution: string }>;
  warnings: string[];
}

export const MergeEngineModule: React.FC = () => {
  const [codeA, setCodeA] = useState('');
  const [codeB, setCodeB] = useState('');
  const [isMerging, setIsMerging] = useState(false);
  const [result, setResult] = useState<MergeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runMerge = async () => {
    if (!codeA || !codeB || isMerging) return;
    
    setIsMerging(true);
    setResult(null);
    setError(null);

    const prompt = `Merge the following two code versions.
    Version A:
    ${codeA}
    
    Version B:
    ${codeB}
    
    Return a JSON object with: mergedCode, diffSummary, conflicts (array of {location, description, resolution}), and warnings (array of strings).`;

    const systemPrompt = `You are a Senior Systems Architect and Merge Expert. 
    Resolve logic conflicts between two code segments. 
    Prefer modern, clean syntax. 
    If functions are duplicated, merge their logic. 
    Ensure the result is functionally sound.`;

    try {
      const data = await callGeminiJSON<MergeResult>(prompt, systemPrompt);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Merge synthesis failed. The AI core rejected the conflicting logic.");
    } finally {
      setIsMerging(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 h-full flex flex-col gap-6 overflow-hidden">
      <header className="flex justify-between items-center bg-cosmos/80 p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
           <div className="p-2 bg-cyan-accent/20 rounded-xl">
             <GitMerge className="w-6 h-6 text-cyan-accent" />
           </div>
           <div>
             <h2 className="font-display font-bold text-xl">Aether Merge Engine</h2>
             <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest">AI-Powered Conflict Synthesis</p>
           </div>
        </div>
        <button 
          onClick={runMerge}
          disabled={!codeA || !codeB || isMerging}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all ${
            isMerging 
            ? 'bg-stardust text-slate-400' 
            : 'bg-cyan-accent hover:bg-cyan-400 text-void shadow-lg shadow-cyan-900/20 active:scale-95'
          }`}
        >
          {isMerging ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {isMerging ? 'Synthesizing...' : 'Resolve Conflicts'}
        </button>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Left: Input Areas */}
        {!result ? (
          <div className="grid grid-rows-2 gap-6 h-full overflow-hidden">
            <div className="glass-panel p-4 flex flex-col overflow-hidden">
               <div className="flex items-center justify-between mb-2">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-accent">Origin Alpha (Version A)</h4>
                 <Code2 className="w-4 h-4 text-white/20" />
               </div>
               <textarea 
                 value={codeA}
                 onChange={(e) => setCodeA(e.target.value)}
                 className="flex-grow bg-void/50 p-4 font-mono text-xs text-slate-300 border border-white/10 rounded-xl outline-none focus:border-purple-accent resize-none custom-scrollbar"
                 placeholder="Paste primary code version..."
               />
            </div>
            <div className="glass-panel p-4 flex flex-col overflow-hidden">
               <div className="flex items-center justify-between mb-2">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-pulsar-accent">Origin Beta (Version B)</h4>
                 <Code2 className="w-4 h-4 text-white/20" />
               </div>
               <textarea 
                 value={codeB}
                 onChange={(e) => setCodeB(e.target.value)}
                 className="flex-grow bg-void/50 p-4 font-mono text-xs text-slate-300 border border-white/10 rounded-xl outline-none focus:border-pulsar-accent resize-none custom-scrollbar"
                 placeholder="Paste conflicting code version..."
               />
            </div>
          </div>
        ) : (
          /* Result: Merged Output */
          <div className="glass-panel p-4 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-6">
             <div className="flex items-center justify-between mb-4">
               <div>
                 <h4 className="text-xs font-bold uppercase text-aurora-accent mb-1">Synthesized Core</h4>
                 <p className="text-[10px] opacity-40">Integration complete with high functional integrity</p>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => copyToClipboard(result.mergedCode)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button onClick={() => setResult(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
               </div>
             </div>
             <div className="flex-grow bg-void/80 rounded-xl border border-white/10 overflow-hidden relative group">
                <div className="absolute inset-0 overflow-auto p-4 font-mono text-xs text-slate-300 custom-scrollbar">
                   <pre>{result.mergedCode}</pre>
                </div>
             </div>
          </div>
        )}

        {/* Right: Analysis & Feedback */}
        <div className="overflow-hidden flex flex-col gap-6">
           <AnimatePresence mode="wait">
             {result ? (
               <motion.div 
                 key="result-ana"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar"
               >
                  {/* Conflicts Resolved */}
                  <div className="glass-panel p-4">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyan-accent mb-3">Conflict Resolutions ({result.conflicts.length})</h4>
                     <div className="space-y-3">
                        {result.conflicts.map((c, i) => (
                           <div key={i} className="p-3 bg-void/40 rounded-xl border border-white/5">
                              <p className="text-[9px] font-mono text-cyan-accent mb-1">{c.location}</p>
                              <p className="text-xs font-medium text-slate-200 mb-2">{c.description}</p>
                              <div className="flex items-center gap-2 text-[10px] bg-aurora-accent/10 text-aurora-accent p-1.5 rounded">
                                 <CheckCircle className="w-3 h-3" />
                                 {c.resolution}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div className="glass-panel p-4 border-pulsar-accent/20">
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-pulsar-accent mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3" /> System Warnings
                       </h4>
                       <ul className="space-y-1">
                          {result.warnings.map((w, i) => (
                            <li key={i} className="text-[11px] text-pulsar-accent/80">• {w}</li>
                          ))}
                       </ul>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="p-4 bg-cyan-accent/5 rounded-2xl border border-cyan-accent/10">
                     <p className="text-xs text-cyan-accent/80 leading-relaxed italic">
                        "{result.diffSummary}"
                     </p>
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="idle-ana"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex-grow glass-panel flex flex-col items-center justify-center text-center p-8 opacity-40 border-dashed border-white/10"
               >
                  <Zap className="w-12 h-12 mb-4 text-cyan-accent" />
                  <h3 className="font-display font-medium text-lg">Analysis Node Idle</h3>
                  <p className="text-xs max-w-xs mt-2">Upload code origins to begin the multi-threaded synthesis process.</p>
               </motion.div>
             )}
           </AnimatePresence>

           {error && (
             <div className="p-4 bg-pulsar-accent/20 border border-pulsar-accent/40 rounded-2xl flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-pulsar-accent shrink-0" />
                <p className="text-xs text-pulsar-accent font-medium">{error}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
