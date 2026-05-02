import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Plus, Save, Play, 
  Database, Calculator, Shapes, Monitor, 
  Trash2, X, Share2, Grid3X3
} from 'lucide-react';

const NODE_CATEGORIES = {
  Input: { icon: Database, color: '#00e5ff', types: ['Trigger', 'Data Key', 'System State'] },
  Math: { icon: Calculator, color: '#9d4edd', types: ['Multiply', 'Logic Gate', 'Sync Flux'] },
  Shape: { icon: Shapes, color: '#ffb300', types: ['Circle Gen', 'Box Vector', 'Star Grid'] },
  Output: { icon: Monitor, color: '#00ff9d', types: ['Display', 'API Push', 'WebHook'] },
};

interface StudioNode {
  id: string;
  category: keyof typeof NODE_CATEGORIES;
  type: string;
  x: number;
  y: number;
}

interface StudioEdge {
  id: string;
  fromId: string;
  toId: string;
}

export const StudioModule: React.FC = () => {
  const [nodes, setNodes] = useState<StudioNode[]>([
    { id: 'S1', category: 'Input', type: 'Trigger', x: 50, y: 150 },
    { id: 'S2', category: 'Output', type: 'Display', x: 450, y: 150 },
  ]);
  const [edges, setEdges] = useState<StudioEdge[]>([]);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const addNode = (category: keyof typeof NODE_CATEGORIES, type: string) => {
    const newNode: StudioNode = {
      id: `S${Date.now().toString().slice(-4)}`,
      category,
      type,
      x: 100 + Math.random() * 50,
      y: 100 + Math.random() * 50,
    };
    setNodes([...nodes, newNode]);
  };

  const handlePortClick = (id: string, isInput: boolean) => {
    if (isInput) {
      if (connectingFrom && connectingFrom !== id) {
        setEdges([...edges, { id: `E${Date.now()}`, fromId: connectingFrom, toId: id }]);
        setConnectingFrom(null);
      }
    } else {
      setConnectingFrom(id);
    }
  };

  const deleteEdge = (id: string) => {
    setEdges(edges.filter(e => e.id !== id));
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setEdges(edges.filter(e => e.fromId !== id && e.toId !== id));
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Studio Toolbar (Left) */}
      <div className="w-72 glass-panel m-4 flex flex-col p-6 gap-6 z-10 shrink-0">
         <header className="flex items-center gap-3">
            <div className="p-2 bg-purple-accent/20 rounded-xl">
               <Cpu className="w-5 h-5 text-purple-accent" />
            </div>
            <h2 className="font-display font-bold text-lg">Nexus Studio</h2>
         </header>

         <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-8">
            {Object.entries(NODE_CATEGORIES).map(([cat, info]) => (
               <div key={cat}>
                  <div className="flex items-center gap-2 mb-3 text-[10px] font-bold uppercase tracking-widest opacity-40">
                     <info.icon className="w-3.5 h-3.5" />
                     {cat}
                  </div>
                  <div className="space-y-2">
                     {info.types.map(type => (
                        <button 
                          key={type}
                          onClick={() => addNode(cat as any, type)}
                          className="w-full p-3 bg-void/60 hover:bg-void border border-white/5 hover:border-white/20 rounded-xl text-left text-xs font-medium transition-all group flex justify-between items-center"
                        >
                           {type}
                           <Plus className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                     ))}
                  </div>
               </div>
            ))}
         </div>

         <div className="pt-6 border-t border-white/5 space-y-3">
            <button className="w-full py-3 bg-purple-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-600 transition-all shadow-lg shadow-purple-900/20">
               <Play className="w-4 h-4 fill-current" /> Compile Logic
            </button>
            <div className="flex gap-2">
               <button className="flex-grow py-2 bg-void border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-slate-400 hover:text-white">
                  <Save className="w-3.5 h-3.5" /> Save
               </button>
               <button className="p-2 bg-void border border-white/10 rounded-lg text-slate-400 hover:text-cyan-accent hover:border-cyan-accent/50 transition-all">
                  <Share2 className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

      {/* Logic Canvas (Right/Center) */}
      <div 
        className="flex-grow relative overflow-hidden bg-void cursor-crosshair"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setConnectingFrom(null);
        }}
      >
        {/* Global Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] bg-[length:24px_24px]" />
        
        {/* Connection Visual (Active) */}
        {connectingFrom && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {(() => {
              const fromNode = nodes.find(n => n.id === connectingFrom);
              if (!fromNode) return null;
              const x1 = fromNode.x + 180;
              const y1 = fromNode.y + 36;
              const x2 = mousePos.x;
              const y2 = mousePos.y;
              return <path d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`} stroke={NODE_CATEGORIES[fromNode.category].color} strokeWidth="3" fill="none" opacity="0.6" />;
            })()}
          </svg>
        )}

        {/* Established Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {edges.map(edge => {
            const from = nodes.find(n => n.id === edge.fromId);
            const to = nodes.find(n => n.id === edge.toId);
            if (!from || !to) return null;
            const x1 = from.x + 180;
            const y1 = from.y + 36;
            const x2 = to.x;
            const y2 = to.y + 36;
            return (
              <g key={edge.id} className="pointer-events-auto cursor-pointer" onClick={() => deleteEdge(edge.id)}>
                <path d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`} stroke={NODE_CATEGORIES[from.category].color} strokeWidth="2" fill="none" opacity="0.3" />
                <path d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`} stroke={NODE_CATEGORIES[from.category].color} strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-pulse" />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <motion.div
            key={node.id}
            drag
            dragMomentum={false}
            onDrag={(e, info) => {
              setNodes(prev => prev.map(n => n.id === node.id ? { ...n, x: n.x + info.delta.x, y: n.y + info.delta.y } : n));
            }}
            className="absolute z-20 group"
            style={{ left: node.x, top: node.y }}
          >
            <div className="w-48 glass-panel bg-void/90 border-white/20 p-4 shadow-2xl relative">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: NODE_CATEGORIES[node.category].color }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{node.id}</span>
                  </div>
                  <button onClick={() => deleteNode(node.id)} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-pulsar-accent/20 text-pulsar-accent transition-all">
                     <X className="w-3 h-3" />
                  </button>
               </div>
               <h4 className="text-sm font-bold text-white mb-1">{node.type}</h4>
               <p className="text-[10px] opacity-40 uppercase tracking-tighter">{node.category} MODULE</p>

               {/* Ports */}
               <button 
                 onClick={() => handlePortClick(node.id, true)}
                 className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-void border border-white/20 rounded-full hover:scale-150 transition-transform active:bg-cyan-accent"
                />
               <button 
                 onClick={() => handlePortClick(node.id, false)}
                 className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-white/20 rounded-full hover:scale-150 transition-transform active:bg-cyan-accent ${connectingFrom === node.id ? 'bg-cyan-accent' : 'bg-void'}`}
               />
            </div>
          </motion.div>
        ))}

        {/* Canvas HUD */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
           <div className="glass-panel px-4 py-2 flex items-center gap-2 text-[10px] font-bold bg-void/80 border-white/10 uppercase tracking-widest">
              <Grid3X3 className="w-3 h-3 text-purple-accent" />
              Logic Grid V4.2
           </div>
           {connectingFrom && (
             <div className="px-4 py-2 rounded-lg bg-cyan-accent text-void text-[10px] font-black uppercase tracking-tighter animate-pulse shadow-xl shadow-cyan-900/40">
               Connection Mode Active
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
