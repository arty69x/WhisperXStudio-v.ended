import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, ZoomIn, ZoomOut, MousePointer2, Move, Maximize, Settings } from 'lucide-react';
import { GhostSVG } from '../GhostSVG';

const NODE_TYPES = ['cute', 'code', 'rocket', 'hero', 'guardian', 'moon', 'flower', 'flow'] as const;

interface Node {
  id: string;
  type: typeof NODE_TYPES[number];
  x: number;
  y: number;
  color: string;
}

interface Edge {
  id: string;
  from: string;
  to: string;
}

export const WorkspaceModule: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'hero', x: 100, y: 100, color: '#ff006e' },
    { id: '2', type: 'code', x: 400, y: 200, color: '#00e5ff' },
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { id: 'e1', from: '1', to: '2' },
  ]);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setOffset(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    } else if (draggingNode) {
      setNodes(prev => prev.map(n => n.id === draggingNode ? {
        ...n,
        x: n.x + e.movementX / zoom,
        y: n.y + e.movementY / zoom
      } : n));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNode(null);
  };

  const addNode = () => {
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      type: NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)],
      x: 100 - offset.x / zoom,
      y: 100 - offset.y / zoom,
      color: Object.values(['#9d4edd', '#00e5ff', '#ff006e', '#00ff9d', '#ffb300'])[Math.floor(Math.random() * 5)]
    };
    setNodes(prev => [...prev, newNode]);
  };

  const deleteNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(e => e.from !== id && e.to !== id));
    if (selectedNode === id) setSelectedNode(null);
  };

  const nodeMap = useMemo(() => {
    const map: Record<string, Node> = {};
    nodes.forEach(n => map[n.id] = n);
    return map;
  }, [nodes]);

  return (
    <div className="flex h-full overflow-hidden bg-void">
      {/* Left Sidebar: Controls */}
      <div className="w-64 glass-panel m-4 flex flex-col p-4 z-10">
        <h2 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-accent" />
          Node Inspector
        </h2>
        
        <div className="flex-grow space-y-4">
          <button 
            onClick={addNode}
            className="w-full py-3 bg-purple-accent hover:bg-purple-600 rounded-xl flex items-center justify-center gap-2 font-bold transition-all"
          >
            <Plus className="w-5 h-5" /> Add Ghost Node
          </button>

          {selectedNode ? (
            <div className="p-4 bg-stardust/40 rounded-xl space-y-4 animate-in fade-in slide-in-from-left-4">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-bold text-purple-accent">Selected Node</span>
                <button onClick={() => deleteNode(selectedNode)} className="p-1.5 hover:bg-pulsar-accent/20 text-pulsar-accent rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold opacity-50">Type</label>
                <select 
                  className="w-full bg-void border border-white/10 rounded-lg p-2 text-sm"
                  value={nodeMap[selectedNode]?.type}
                  onChange={(e) => setNodes(prev => prev.map(n => n.id === selectedNode ? { ...n, type: e.target.value as any } : n))}
                >
                  {NODE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold opacity-50">Color Palette</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'White', hex: '#ffffff' },
                    { name: 'Red', hex: '#ef4444' },
                    { name: 'Yellow', hex: '#f59e0b' },
                    { name: 'Black', hex: '#000000' },
                    { name: 'Green', hex: '#22c55e' }
                  ].map(c => (
                    <button
                      key={c.hex}
                      onClick={() => setNodes(prev => prev.map(n => n.id === selectedNode ? { ...n, color: c.hex } : n))}
                      className="w-6 h-6 rounded-full border border-white/20 transition-transform hover:scale-125 active:scale-95"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
                <input 
                  type="color" 
                  className="w-full h-8 bg-transparent border-none cursor-pointer"
                  value={nodeMap[selectedNode]?.color}
                  onChange={(e) => setNodes(prev => prev.map(n => n.id === selectedNode ? { ...n, color: e.target.value } : n))}
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-stardust/10 rounded-xl border border-dashed border-white/10">
               <MousePointer2 className="w-8 h-8 opacity-20 mx-auto mb-2" />
               <p className="text-xs opacity-40">Select a node to inspect its properties</p>
            </div>
          )}
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between p-2 bg-void/50 rounded-lg">
             <span className="text-[10px] font-bold opacity-50">ZOOM</span>
             <div className="flex gap-2">
                <button onClick={() => setZoom(z => Math.max(0.25, z - 0.25))} className="p-1 hover:bg-white/10 rounded"><ZoomOut className="w-4 h-4" /></button>
                <span className="text-xs font-mono w-8 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-1 hover:bg-white/10 rounded"><ZoomIn className="w-4 h-4" /></button>
             </div>
          </div>
          <button 
            onClick={() => { setZoom(1); setOffset({x: 0, y: 0}); }}
            className="w-full py-2 bg-void border border-white/10 rounded-lg text-xs flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
          >
            <Maximize className="w-3 h-3" /> Reset View
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-grow relative overflow-hidden cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={(e) => {
          const delta = e.deltaY > 0 ? -0.1 : 0.1;
          setZoom(prev => Math.min(3, Math.max(0.25, prev + delta)));
        }}
      >
        {/* Background Grid */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
            backgroundPosition: `${offset.x}px ${offset.y}px`
          }}
        />

        {/* Content Container */}
        <div 
          className="absolute inset-0 origin-center"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          }}
        >
          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {edges.map(edge => {
              const from = nodeMap[edge.from];
              const to = nodeMap[edge.to];
              if (!from || !to) return null;
              
              const x1 = from.x + 40;
              const y1 = from.y + 50;
              const x2 = to.x + 40;
              const y2 = to.y + 50;
              const mx = (x1 + x2) / 2;
              const path = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;

              return (
                <g key={edge.id}>
                  <path d={path} stroke="white" strokeWidth="2" fill="none" opacity="0.1" />
                  <path d={path} stroke={from.color} strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="5,5">
                     <animate attributeName="stroke-dashoffset" from="100" to="0" dur="5s" repeatCount="indefinite" />
                  </path>
                  <circle r="3" fill={from.color}>
                    <animateMotion dur="3s" repeatCount="indefinite" path={path} />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <div
              key={node.id}
              className="absolute cursor-move"
              style={{ left: node.x, top: node.y }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setSelectedNode(node.id);
                setDraggingNode(node.id);
              }}
            >
              <div 
                className={`relative p-2 rounded-2xl transition-all duration-300 ${selectedNode === node.id ? 'bg-white/10 ring-2 ring-white/50' : 'bg-white/5 hover:bg-white/10'}`}
              >
                 <GhostSVG 
                   variant={node.type as any} 
                   color={node.color} 
                   size={60} 
                   selected={selectedNode === node.id}
                 />
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-void/80 px-2 py-0.5 rounded border border-white/10 text-[9px] uppercase tracking-widest font-mono">
                    ID: {node.id}
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tooltips or HUD */}
        <div className="absolute bottom-6 right-6 flex gap-3">
           <div className="glass-panel px-4 py-2 flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-aurora-accent" /> {nodes.length} Nodes</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" /> {edges.length} Edges</div>
              <div className="flex items-center gap-2 text-stardust-accent opacity-50 transition-opacity hover:opacity-100">
                <Move className="w-3 h-3" /> Middle-click to pan
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
