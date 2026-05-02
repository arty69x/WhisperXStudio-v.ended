import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Cpu, Lock, FileCode, Check, AlertCircle } from 'lucide-react';

const SPEC_ENTRIES = [
  { id: 'SYS-01', title: 'Aether Engine', status: 'Operational', color: '#00e5ff', value: 'v4.2.0-stable' },
  { id: 'NET-02', title: 'Ghost Mesh', status: 'Secured', color: '#9d4edd', value: '128-bit Spectral' },
  { id: 'SEC-03', title: 'Rex Sentinel', status: 'Active', color: '#ff006e', value: 'Level 9 Guard' },
  { id: 'AI-04', title: 'Gemini Core', status: 'Optimized', color: '#00ff9d', value: 'Flash v3.0' },
  { id: 'DATA-05', title: 'Sync Pulse', status: 'Syncing', color: '#ffb300', value: '0.02ms Latency' },
  { id: 'UI-06', title: 'Galaxy Theme', status: 'Rendered', color: '#e2e8f0', value: 'v30.0 Master' },
  { id: 'API-07', title: 'Auth Layer', status: 'Verified', color: '#c084fc', value: 'OAuth 2.1 Nexus' },
  { id: 'ARCH-08', title: 'Module Tree', status: 'Mapped', color: '#f472b6', value: '10/10 Functional' },
  { id: 'LOG-09', title: 'Orch Log', status: 'Capturing', color: '#f59e0b', value: '99.9% Retention' },
  { id: 'NODE-10', title: 'Space Grid', status: 'Expanded', color: '#f97316', value: '8 Types Logic' },
  { id: 'FLOW-11', title: 'Event Bus', status: 'Running', color: '#00ff9d', value: 'Reactive-Omega' },
  { id: 'DEV-12', title: 'Nexus Lab', status: 'Available', color: '#94a3b8', value: 'Internal Dev Only' },
];

export const LockSpecModule: React.FC = () => {
  return (
    <div className="p-6 h-full flex flex-col gap-6 overflow-hidden">
      {/* Top: Terminal Section */}
      <div className="h-1/3 bg-[#02020a] rounded-2xl border border-white/10 p-6 font-mono text-[11px] overflow-hidden flex flex-col group">
         <div className="flex items-center gap-2 mb-4 text-white/40">
           <Terminal className="w-4 h-4" />
           <span className="uppercase tracking-widest font-bold">System Specification Output</span>
           <div className="ml-auto flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-red-500/20" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
             <div className="w-2 h-2 rounded-full bg-green-500/20" />
           </div>
         </div>
         <div className="flex-grow space-y-1 text-aurora-accent/80 opacity-80 overflow-y-auto custom-scrollbar">
            <p><span className="text-white/20 mr-2">[00:00:01]</span> INITIALIZING NEXUS OMEGA KERNEL...</p>
            <p><span className="text-white/20 mr-2">[00:00:02]</span> LOADING MIDNIGHT GALAXY DESIGN TOKENS [OK]</p>
            <p><span className="text-white/20 mr-2">[00:00:03]</span> ESTABLISHING AETHER LINKS TO GHOST AGENTS...</p>
            <p><span className="text-white/20 mr-2">[00:00:05]</span> AGENT REX: SECURITY HANDSHAKE VERIFIED [PASS]</p>
            <p><span className="text-white/20 mr-2">[00:00:06]</span> AGENT ARIA: ORCHESTRATION LAYER BOOTED [PASS]</p>
            <p className="text-cyan-accent"><span className="text-white/20 mr-2">[00:00:08]</span> SYNCING VISUAL NODE STUDIO V30.0...</p>
            <p><span className="text-white/20 mr-2">[00:00:09]</span> MAPPING 10 FUNCTIONAL MODULES TO USE_REDUCER...</p>
            <p className="text-white">// MASTER PRODUCTION SPECIFICATION v30.0 READY</p>
            <p className="text-pulsar-accent animate-pulse">// SYSTEM STATUS: SECURED & OPTIMIZED</p>
         </div>
      </div>

      {/* Bottom: Grid Spec Section */}
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {SPEC_ENTRIES.map((spec, i) => (
             <motion.div
               key={spec.id}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="glass-panel p-4 flex flex-col gap-3 group relative overflow-hidden"
             >
                <div 
                  className="absolute bottom-0 right-0 p-2 opacity-5 translate-x-2 translate-y-2 group-hover:scale-110 transition-transform" 
                  style={{ color: spec.color }}
                >
                  <Lock className="w-16 h-16" />
                </div>

                <div className="flex justify-between items-start">
                   <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{spec.id}</div>
                   <div 
                     className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter"
                     style={{ backgroundColor: `${spec.color}20`, color: spec.color }}
                   >
                     {spec.status}
                   </div>
                </div>

                <div>
                   <h4 className="text-sm font-bold text-white group-hover:text-cyan-accent transition-colors">{spec.title}</h4>
                   <p className="text-[11px] font-mono opacity-60 mt-1">{spec.value}</p>
                </div>

                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Hash ID</span>
                   <span className="text-[9px] font-mono opacity-30">x_{Math.random().toString(36).substr(2, 6)}</span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest opacity-40 py-2 border-t border-white/5">
         <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-aurora-accent" />
            Zero-Trust Protocol V4
         </div>
         <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3 text-cyan-accent" />
            Parallel Processors Active
         </div>
         <div className="flex items-center gap-2">
            <FileCode className="w-3 h-3 text-purple-accent" />
            Strict TypeScript V5
         </div>
         <div className="ml-auto text-stardust-accent">
            Final Spec Commit: May 2026
         </div>
      </div>
    </div>
  );
};
