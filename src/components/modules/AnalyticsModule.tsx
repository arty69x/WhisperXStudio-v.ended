import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BrainCircuit, Fingerprint, Network, Scan, Activity } from 'lucide-react';

const SemiGauge: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => {
  const radius = 57;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-24 overflow-hidden">
        <svg className="w-40 h-40 -rotate-180 origin-center" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset="0"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeOut" }}
            strokeLinecap="round"
          />
          {/* Ticks */}
          {[0, 25, 50, 75, 100].map(tick => {
            const angle = (tick / 100) * 180;
            return (
              <line
                key={tick}
                x1="70" y1="13" x2="70" y2="18"
                stroke="white"
                opacity="0.2"
                transform={`rotate(${angle - 90} 70 70)`}
              />
            );
          })}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <h4 className="text-2xl font-display font-black" style={{ color }}>{value}%</h4>
          <p className="text-[10px] uppercase font-bold opacity-50 tracking-tighter">{label}</p>
        </div>
      </div>
    </div>
  );
};

const DATA = [
  { time: '00h', intensity: 30 },
  { time: '04h', intensity: 45 },
  { time: '08h', intensity: 85 },
  { time: '12h', intensity: 65 },
  { time: '16h', intensity: 95 },
  { time: '20h', intensity: 55 },
  { time: '24h', intensity: 40 },
];

export const AnalyticsModule: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gauges Panel */}
          <div className="lg:col-span-1 glass-panel p-6 flex flex-col gap-6">
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-accent" />
              Cognitive Load
            </h3>
            <div className="flex flex-col gap-4">
              <SemiGauge value={78} label="Neural Density" color="#9d4edd" />
              <SemiGauge value={42} label="Sync Latency" color="#00e5ff" />
              <SemiGauge value={91} label="Buffer Health" color="#00ff9d" />
            </div>
            <div className="mt-auto p-4 bg-void/40 rounded-xl border border-white/5">
               <div className="flex items-center gap-2 mb-2">
                 <Scan className="w-4 h-4 text-cyan-accent" />
                 <span className="text-xs font-bold uppercase">System Snapshot</span>
               </div>
               <p className="text-[10px] opacity-60 leading-relaxed font-mono">
                 Spectral analysis indicates high ethereal resonance in the primary node cluster. 
                 Orchestration efficiency optimal at 98.4%.
               </p>
            </div>
          </div>

          {/* Deep Analytics */}
          <div className="lg:col-span-2 space-y-6">
             <div className="glass-panel p-6 min-h-[350px] flex flex-col">
                <h3 className="font-display font-bold text-lg mb-6 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Network className="w-5 h-5 text-aurora-accent" />
                     Pulse Intensity Trend
                   </div>
                   <div className="flex gap-2">
                      <span className="px-2 py-1 bg-aurora-accent/10 rounded text-[9px] font-bold text-aurora-accent tracking-widest uppercase">Real-time</span>
                   </div>
                </h3>
                <div className="flex-grow">
                   <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA}>
                      <defs>
                        <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="time" stroke="#ffffff22" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#09091f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="intensity" 
                        stroke="#00ff9d" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorInt)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="glass-panel p-6 flex flex-col items-center text-center">
                   <Fingerprint className="w-8 h-8 text-pulsar-accent mb-3" />
                   <h4 className="text-3xl font-display font-black text-white">4.2<span className="text-sm opacity-40 ml-1">PB</span></h4>
                   <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest">Spectral Data Througput</p>
                </div>
                <div className="glass-panel p-6 flex flex-col items-center text-center">
                   <Activity className="w-8 h-8 text-solar-accent mb-3" />
                   <h4 className="text-3xl font-display font-black text-white">0.02<span className="text-sm opacity-40 ml-1">ms</span></h4>
                   <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest">Aether Latency</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
