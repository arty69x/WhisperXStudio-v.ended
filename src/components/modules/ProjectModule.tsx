import React, { useState } from 'react';
import { motion, Reorder } from 'motion/react';
import { 
  Columns, LayoutList, ListTodo, Layers, 
  ChevronRight, Calendar, User, Tag, 
  MoreVertical, Plus, CheckCircle2 
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'queue' | 'progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  start: number; // 0-100 for gantt
  width: number;
}

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Initialize Quantum Core', status: 'progress', priority: 'high', assignee: 'REX', start: 0, width: 20 },
  { id: 't2', title: 'Aether Link Stabilization', status: 'progress', priority: 'medium', assignee: 'ARIA', start: 15, width: 30 },
  { id: 't3', title: 'Spirit Registry Setup', status: 'queue', priority: 'low', assignee: 'KODE', start: 40, width: 25 },
  { id: 't4', title: 'Void Interface Design', status: 'done', priority: 'high', assignee: 'LUMA', start: 5, width: 15 },
  { id: 't5', title: 'Flux Capacitor Calibration', status: 'queue', priority: 'medium', assignee: 'SAGE', start: 60, width: 20 },
];

export const ProjectModule: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [view, setView] = useState<'kanban' | 'gantt'>('kanban');

  const moveTask = (id: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const ganttDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="p-6 h-full flex flex-col gap-6 overflow-hidden">
      <header className="flex justify-between items-center bg-cosmos/80 p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
           <div className="p-2 bg-purple-accent/20 rounded-xl">
             <Layers className="w-6 h-6 text-purple-accent" />
           </div>
           <div>
             <h2 className="font-display font-bold text-xl">Mission Timeline</h2>
             <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest">Operation: Nexus Omega</p>
           </div>
        </div>
        <div className="flex bg-void p-1 rounded-xl">
          <button 
            onClick={() => setView('kanban')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${view === 'kanban' ? 'bg-purple-accent text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Columns className="w-4 h-4" /> Kanban
          </button>
          <button 
            onClick={() => setView('gantt')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${view === 'gantt' ? 'bg-purple-accent text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutList className="w-4 h-4" /> Gantt
          </button>
        </div>
      </header>

      {/* View Content */}
      <div className="flex-grow overflow-hidden relative">
        {view === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden">
            {(['queue', 'progress', 'done'] as const).map(status => (
              <div key={status} className="flex flex-col gap-4 overflow-hidden h-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${status === 'queue' ? 'bg-solar-accent' : status === 'progress' ? 'bg-cyan-accent' : 'bg-aurora-accent'}`} />
                    <h3 className="uppercase text-xs font-bold tracking-widest text-slate-400">
                      {status.replace('-', ' ')}
                    </h3>
                    <span className="bg-stardust px-1.5 py-0.5 rounded text-[10px] font-mono opacity-50">
                      {tasks.filter(t => t.status === status).length}
                    </span>
                  </div>
                  <Plus className="w-4 h-4 text-slate-600 cursor-pointer hover:text-white" />
                </div>

                <div 
                  className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-6"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {}} // Simple drop handling would go here
                >
                  {tasks.filter(t => t.status === status).map(task => (
                    <motion.div
                      key={task.id}
                      layoutId={task.id}
                      draggable
                      onDragStart={() => {}} // Tracking drag
                      className="glass-panel p-4 cursor-grab active:cursor-grabbing hover:border-white/20 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter ${
                          task.priority === 'high' ? 'bg-pulsar-accent/20 text-pulsar-accent' : 
                          task.priority === 'medium' ? 'bg-solar-accent/20 text-solar-accent' : 
                          'bg-stardust text-slate-400'
                        }`}>
                          {task.priority}
                        </span>
                        <MoreVertical className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h4 className="text-sm font-medium mb-3 leading-snug">{task.title}</h4>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-stardust flex items-center justify-center border border-white/10">
                            <span className="text-[10px] font-bold">{task.assignee[0]}</span>
                          </div>
                          <span className="text-[10px] opacity-50">{task.assignee}</span>
                        </div>
                        {status === 'done' && <CheckCircle2 className="w-4 h-4 text-aurora-accent" />}
                      </div>
                    </motion.div>
                  ))}
                  
                  {tasks.filter(t => t.status === status).length === 0 && (
                    <div className="h-32 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-xs opacity-20">
                      Empty Zone
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Gantt View */
          <div className="glass-panel h-full flex flex-col overflow-hidden">
            <div className="flex border-b border-white/10">
               <div className="w-48 border-r border-white/10 p-4 shrink-0 text-xs font-bold uppercase tracking-widest opacity-40">Task Name</div>
               <div className="flex-grow overflow-x-auto flex">
                  {ganttDays.map(d => (
                    <div key={d} className="w-12 shrink-0 text-center py-4 border-r border-white/5 text-[10px] font-mono opacity-30">{d}</div>
                  ))}
               </div>
            </div>
            <div className="flex-grow overflow-y-auto">
               {tasks.map(task => (
                 <div key={task.id} className="flex border-b border-white/5 group hover:bg-white/5 transition-colors">
                    <div className="w-48 border-r border-white/10 p-4 shrink-0 flex flex-col gap-1">
                       <span className="text-sm font-medium">{task.title}</span>
                       <span className="text-[9px] opacity-40 uppercase tracking-widest">{task.assignee}</span>
                    </div>
                    <div className="flex-grow relative h-16 flex items-center">
                       {/* Grid Lines */}
                       <div className="absolute inset-0 flex">
                          {ganttDays.map(d => (
                            <div key={d} className="w-12 shrink-0 border-r border-white/5 h-full" />
                          ))}
                       </div>
                       
                       {/* Task Bar */}
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${task.width}%` }}
                         transition={{ duration: 1, delay: 0.2 }}
                         className="absolute h-8 rounded-lg shadow-lg flex items-center px-3"
                         style={{ 
                            left: `${task.start}%`, 
                            backgroundColor: task.priority === 'high' ? 'rgba(157, 78, 221, 0.4)' : 'rgba(0, 229, 255, 0.4)',
                            border: `1px solid ${task.priority === 'high' ? '#9d4edd' : '#00e5ff'}`
                         }}
                       >
                         <span className="text-[10px] font-bold text-white truncate">{task.title}</span>
                       </motion.div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
