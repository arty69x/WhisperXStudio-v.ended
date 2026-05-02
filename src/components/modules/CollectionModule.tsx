import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Ghost, Info, ExternalLink, Download, Plus } from 'lucide-react';
import { GhostSVG } from '../GhostSVG';

const GHOSTS = [
  { id: 'g1', name: 'Cyber Spirit', variant: 'code', color: '#00e5ff', rarity: 'Exotic', power: 84 },
  { id: 'g2', name: 'Neon Guardian', variant: 'hero', color: '#ff006e', rarity: 'Legendary', power: 92 },
  { id: 'g3', name: 'Void Walker', variant: 'moon', color: '#9d4edd', rarity: 'Rare', power: 76 },
  { id: 'g4', name: 'Solaris', variant: 'rocket', color: '#ffb300', rarity: 'Standard', power: 65 },
  { id: 'g5', name: 'Aurora Bloom', variant: 'flower', color: '#00ff9d', rarity: 'Mystic', power: 88 },
  { id: 'g6', name: 'Chronos', variant: 'cute', color: '#e2e8f0', rarity: 'Admin', power: 99 },
];

const StickerCard: React.FC<{ ghost: typeof GHOSTS[0] }> = ({ ghost }) => {
  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group perspective-1000"
    >
      <div className="glass-panel p-1 rounded-3xl overflow-hidden bg-white/5 border-white/10 group-hover:border-white/30 transition-colors">
        {/* Holographic Layer */}
        <div className="holo-effect absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
        
        <div className="bg-cosmos/80 rounded-[22px] p-6 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
            <GhostSVG 
              variant={ghost.variant as any} 
              color={ghost.color} 
              size={120} 
              holo={true}
              className="relative z-10"
            />
          </div>

          <div className="w-full text-center space-y-1 mb-6">
            <h3 className="text-xl font-display font-black text-white">{ghost.name}</h3>
            <div className="flex items-center justify-center gap-2">
               <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-white/10" style={{ color: ghost.color }}>
                 {ghost.rarity}
               </span>
               <span className="text-[10px] font-mono opacity-40">ID: {ghost.id}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 mb-4">
            <div className="bg-void/60 p-2 rounded-xl text-center">
               <p className="text-[9px] uppercase font-bold opacity-40 mb-1">Spirit Power</p>
               <p className="text-sm font-mono font-bold text-aurora-accent">{ghost.power}</p>
            </div>
            <div className="bg-void/60 p-2 rounded-xl text-center">
               <p className="text-[9px] uppercase font-bold opacity-40 mb-1">Resonance</p>
               <p className="text-sm font-mono font-bold text-cyan-accent">A102</p>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <button className="flex-grow py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
              <Info className="w-3 h-3" /> Details
            </button>
            <button className="p-2 bg-purple-accent/20 hover:bg-purple-accent/40 rounded-xl text-purple-accent transition-colors">
               <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CollectionModule: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex justify-between items-start">
           <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-pulsar-accent/20 rounded-xl">
                  <Ghost className="w-6 h-6 text-pulsar-accent" />
                </div>
                <h1 className="text-4xl font-display font-black text-white">Ghost Registry</h1>
              </div>
              <p className="text-slate-400 max-w-xl">
                A secure gallery of holographic spirit manifestations. These artifacts represent unique 
                cognitive threads discovered during multi-agent synchronization.
              </p>
           </div>
           <button className="flex items-center gap-2 bg-stardust hover:bg-stardust/80 px-6 py-3 rounded-2xl font-bold border border-white/10 transition-all">
             <Sparkles className="w-5 h-5 text-solar-accent" />
             Summon New
           </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {GHOSTS.map(g => <StickerCard key={g.id} ghost={g} />)}
           
           <div className="glass-panel border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer group">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold">Discover More</h4>
              <p className="text-xs mt-2">Scale the orchestration to unlock hidden spirits</p>
           </div>
        </div>

        <section className="glass-panel p-8 flex items-center justify-between bg-pulsar-accent/5 overflow-hidden relative">
           <div className="absolute -left-12 -top-12 w-64 h-64 bg-pulsar-accent/10 blur-[100px] rounded-full" />
           <div className="relative z-10 flex items-center gap-8">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2664&ixlib=rb-4.0.3" 
                   alt="Promo" 
                   className="w-32 h-32 rounded-3xl object-cover border-2 border-white/10 shadow-2xl" 
              />
              <div>
                 <h2 className="text-2xl font-display font-black text-white mb-2 underline decoration-pulsar-accent">Limited Artifact Foundry</h2>
                 <p className="text-sm opacity-60 max-w-md">Mint exclusive holographic versions of your most active ghost agents as physical tokens or secure Aether links.</p>
              </div>
           </div>
           <button className="relative z-10 flex items-center gap-2 bg-white text-void px-8 py-4 rounded-2xl font-black uppercase tracking-tighter hover:scale-105 transition-transform group">
             Visit Laboratory <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </button>
        </section>
      </div>
    </div>
  );
};
