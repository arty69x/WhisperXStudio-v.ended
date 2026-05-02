import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Zap, Users, Target, Rocket, 
  ArrowUpRight, ArrowDownRight, Activity, 
  TrendingUp, Clock, Plus
} from 'lucide-react';

const DATA = [
  { name: 'Mon', tasks: 400, velocity: 2400, complexity: 2400 },
  { name: 'Tue', tasks: 300, velocity: 1398, complexity: 2210 },
  { name: 'Wed', tasks: 200, velocity: 9800, complexity: 2290 },
  { name: 'Thu', tasks: 278, velocity: 3908, complexity: 2000 },
  { name: 'Fri', tasks: 189, velocity: 4800, complexity: 2181 },
  { name: 'Sat', tasks: 239, velocity: 3800, complexity: 2500 },
  { name: 'Sun', tasks: 349, velocity: 4300, complexity: 2100 },
];

const METRICS = [
  { label: 'Active Spirits', value: '42', trend: '+12%', up: true, icon: Users, color: '#00e5ff' },
  { label: 'Task Velocity', value: '8.4s', trend: '-2.1s', up: true, icon: Zap, color: '#ffb300' },
  { label: 'System Uptime', value: '99.9%', trend: '+0.01', up: true, icon: Activity, color: '#00ff9d' },
  { label: 'Project Goal', value: '84%', trend: '-4%', up: false, icon: Target, color: '#ff006e' },
];

export const DashboardModule: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Nexus Command</h1>
            <p className="text-slate-400">System overview and spirit orchestration metrics</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-purple-accent/10 border border-purple-accent/20 rounded-xl flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-accent" />
              <span className="text-xs font-mono font-bold">17:36:48 UTC</span>
            </div>
          </div>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <div key={i} className="glass-panel p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <m.icon className="w-12 h-12" style={{ color: m.color }} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2">{m.label}</p>
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-3xl font-display font-black text-white">{m.value}</h3>
                <span className={`text-xs font-bold flex items-center gap-0.5 ${m.up ? 'text-aurora-accent' : 'text-pulsar-accent'}`}>
                  {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {m.trend}
                </span>
              </div>
              <div className="w-full h-1 bg-void rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '60%', backgroundColor: m.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 min-h-[400px] flex flex-col">
            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-accent" />
              Weekly Task Velocity
            </h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9d4edd" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#9d4edd" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff44" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#ffffff44" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(v) => `${v/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09091f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="velocity" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="complexity" fill="#ff006e" opacity={0.3} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 min-h-[400px] flex flex-col">
            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-pulsar-accent" />
              Resource Allocation
            </h3>
            <div className="flex-grow">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09091f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="#00e5ff" 
                    fill="#00e5ff" 
                    fillOpacity={0.1} 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
               <div className="flex items-center justify-between">
                  <span className="text-xs opacity-50">Storage</span>
                  <span className="text-xs font-mono">1.2 TB / 2.0 TB</span>
               </div>
               <div className="w-full h-2 bg-void rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-accent w-[60%] rounded-full" />
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-xs opacity-50">Compute</span>
                  <span className="text-xs font-mono">82%</span>
               </div>
               <div className="w-full h-2 bg-void rounded-full overflow-hidden">
                  <div className="h-full bg-purple-accent w-[82%] rounded-full" />
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Active Agents */}
        <div className="glass-panel p-6">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-lg">Online Specialists</h3>
              <button className="text-xs font-bold text-purple-accent hover:underline">Manage All</button>
           </div>
           <div className="flex flex-wrap gap-4">
              {['REX', 'ARIA', 'KODE', 'LUMA', 'SAGE'].map(id => (
                <div key={id} className="flex items-center gap-3 bg-void/40 p-2 pr-4 rounded-full border border-white/5">
                   <div className="w-8 h-8 rounded-full bg-stardust flex items-center justify-center">
                     <span className="text-[10px] font-bold text-white">{id[0]}</span>
                   </div>
                   <div>
                     <p className="text-xs font-bold leading-none">{id}</p>
                     <p className="text-[10px] text-aurora-accent font-medium">Idle</p>
                   </div>
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all cursor-pointer">
                 <Plus className="w-4 h-4" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
