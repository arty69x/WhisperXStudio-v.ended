import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, Type, Link2, Layout, 
  Frame, Image as ImageIcon, Box, 
  Compass, ListTree, ChevronRight
} from 'lucide-react';

const BoardCard: React.FC<{ title: string; icon: any; children: React.ReactNode; color: string; span?: string }> = ({ 
  title, icon: Icon, children, color, span = "col-span-1" 
}) => (
  <div className={`bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-4 ${span}`}>
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <h3 className="font-display font-bold text-slate-800 uppercase tracking-widest text-xs">{title}</h3>
    </div>
    <div className="flex-grow">
      {children}
    </div>
  </div>
);

export const DesignBoardModule: React.FC = () => {
  return (
    <div className="h-full bg-[#f8f8f7] overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center mb-12">
           <div>
              <h1 className="text-4xl font-display font-black text-slate-900 leading-none">Design System Board</h1>
              <p className="text-slate-500 font-medium mt-2">v30.0 Master Production Specification — Midnight Galaxy</p>
           </div>
           <div className="flex gap-4">
              <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
                <Box className="w-5 h-5" /> Export Specs
              </button>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Colors */}
          <BoardCard title="Color Palette" icon={Palette} color="#9d4edd">
             <div className="grid grid-cols-5 gap-2 h-20">
               {['#04040e', '#09091f', '#10102e', '#16163a', '#9d4edd'].map(c => (
                 <div key={c} className="h-full rounded-lg shadow-inner group relative">
                    <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: c }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity">
                      <span className="text-[8px] font-bold text-white drop-shadow-md uppercase">{c}</span>
                    </div>
                 </div>
               ))}
             </div>
             <div className="grid grid-cols-5 gap-2 h-20 mt-2">
               {['#00e5ff', '#ff006e', '#00ff9d', '#ffb300', '#e2e8f0'].map(c => (
                 <div key={c} className="h-full rounded-lg shadow-inner group relative">
                    <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: c }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity">
                      <span className="text-[8px] font-bold text-white drop-shadow-md uppercase">{c}</span>
                    </div>
                 </div>
               ))}
             </div>
          </BoardCard>

          {/* Typography */}
          <BoardCard title="Typography" icon={Type} color="#00e5ff">
             <div className="space-y-4">
                <div>
                   <p className="text-[10px] font-bold uppercase opacity-30">Display</p>
                   <h2 className="text-2xl font-display font-black text-slate-800">Syne Heavy</h2>
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase opacity-30">Body</p>
                   <p className="text-sm font-sans text-slate-600">DM Sans Medium - 15px</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase opacity-30">Code</p>
                   <p className="text-xs font-mono text-slate-500">JetBrains Mono - 12px</p>
                </div>
             </div>
          </BoardCard>

          {/* Links */}
          <BoardCard title="Aether Links" icon={Link2} color="#ff006e">
             <div className="space-y-2">
                {['Registry', 'Node Map', 'Logistics', 'Security'].map(l => (
                  <div key={l} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                    <span className="text-xs font-bold text-slate-700">{l} Interface</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </div>
                ))}
             </div>
          </BoardCard>

          {/* HiFi Preview */}
          <BoardCard title="HiFi Canvas" icon={Frame} color="#00ff9d">
             <div className="bg-slate-900 rounded-2xl p-4 h-full relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:10px_10px]" />
                <div className="relative z-10 flex flex-col gap-4">
                   <div className="flex gap-2">
                     <div className="w-2 h-2 rounded-full bg-red-400" />
                     <div className="w-2 h-2 rounded-full bg-yellow-400" />
                     <div className="w-2 h-2 rounded-full bg-green-400" />
                   </div>
                   <div className="w-full h-20 bg-white/5 rounded-xl border border-white/10 animate-pulse" />
                   <div className="flex justify-between items-center">
                     <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                     <div className="w-4 h-4 rounded-full bg-aurora-accent" />
                   </div>
                </div>
             </div>
          </BoardCard>

          {/* Moodboard */}
          <BoardCard title="Moodboard" icon={ImageIcon} color="#ffb300" span="lg:col-span-2">
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-48">
                <div className="bg-slate-200 rounded-2xl overflow-hidden shadow-sm">
                   <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2672" className="w-full h-full object-cover" />
                </div>
                <div className="bg-slate-200 rounded-2xl overflow-hidden shadow-sm">
                   <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672" className="w-full h-full object-cover" />
                </div>
                <div className="bg-slate-200 rounded-2xl overflow-hidden shadow-sm">
                   <img src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=2670" className="w-full h-full object-cover" />
                </div>
                <div className="bg-slate-200 rounded-2xl overflow-hidden shadow-sm">
                   <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2604" className="w-full h-full object-cover" />
                </div>
             </div>
          </BoardCard>

          {/* IA */}
          <BoardCard title="IA Structure" icon={ListTree} color="#94a3b8">
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-slate-200" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                      <Layout className="w-3 h-3" /> Core Workspace
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                      <Compass className="w-3 h-3" /> Navigation Hub
                    </div>
                  </div>
               </div>
             </div>
          </BoardCard>
        </div>
      </div>
    </div>
  );
};
