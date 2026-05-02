/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useReducer, useState } from 'react';
import { 
  Users, Layout, BarChart3, Pipette, 
  Calendar, Ghost, Palette, GitMerge, 
  Terminal, Cpu, Menu, X, 
  Settings, LogOut, Bell, Search,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Module Imports
import { AgentsModule } from './components/modules/AgentsModule';
import { WorkspaceModule } from './components/modules/WorkspaceModule';
import { DashboardModule } from './components/modules/DashboardModule';
import { AnalyticsModule } from './components/modules/AnalyticsModule';
import { ProjectModule } from './components/modules/ProjectModule';
import { CollectionModule } from './components/modules/CollectionModule';
import { DesignBoardModule } from './components/modules/DesignBoardModule';
import { MergeEngineModule } from './components/modules/MergeEngineModule';
import { LockSpecModule } from './components/modules/LockSpecModule';
import { StudioModule } from './components/modules/StudioModule';

import { MODULES, G } from './constants';

type State = {
  activeModule: string;
  isSidebarOpen: boolean;
};

type Action = 
  | { type: 'SET_MODULE'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODULE':
      return { ...state, activeModule: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    default:
      return state;
  }
};

const ICON_MAP: Record<string, any> = {
  Users, Layout, BarChart3, Pipette, 
  Calendar, Ghost, Palette, GitMerge, 
  Terminal, Cpu
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    activeModule: 'AGENTS',
    isSidebarOpen: true,
  });

  const renderModule = () => {
    switch (state.activeModule) {
      case 'AGENTS': return <AgentsModule />;
      case 'WORKSPACE': return <WorkspaceModule />;
      case 'DASHBOARD': return <DashboardModule />;
      case 'ANALYTICS': return <AnalyticsModule />;
      case 'PROJECT': return <ProjectModule />;
      case 'COLLECTION': return <CollectionModule />;
      case 'DESIGN': return <DesignBoardModule />;
      case 'MERGE': return <MergeEngineModule />;
      case 'LOCKSPEC': return <LockSpecModule />;
      case 'STUDIO': return <StudioModule />;
      default: return <AgentsModule />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-void overflow-hidden text-slate-200">
      {/* Sidebar Navigation */}
      <AnimatePresence mode="wait">
        {state.isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full border-r border-white/5 bg-cosmos flex flex-col z-50 shrink-0 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-purple-accent flex items-center justify-center shadow-lg shadow-purple-900/40">
                   <Ghost className="w-6 h-6 text-white" />
                </div>
                <div>
                   <h1 className="text-lg font-display font-black tracking-tight text-white leading-none">WhisperX</h1>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-accent mt-1">Nexus Omega</p>
                </div>
              </div>

              <nav className="space-y-1">
                {MODULES.map((item) => {
                  const Icon = ICON_MAP[item.icon];
                  const isActive = state.activeModule === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => dispatch({ type: 'SET_MODULE', payload: item.id })}
                      className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive 
                        ? 'bg-purple-accent text-white shadow-lg shadow-purple-900/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                      <span className="text-sm font-bold tracking-tight">{item.label}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="nav-glow"
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full shadow-[0_0_15px_#ffffffaa]"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="mt-auto p-6 space-y-4">
              <div className="bg-void/50 p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-aurora-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="relative z-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stardust flex items-center justify-center text-[10px] font-bold">JD</div>
                    <div className="overflow-hidden">
                       <p className="text-xs font-bold text-white truncate">Nexus Master</p>
                       <p className="text-[10px] text-slate-500 truncate">session_429a</p>
                    </div>
                    <LogOut className="w-4 h-4 ml-auto text-slate-600 hover:text-pulsar-accent cursor-pointer transition-colors" />
                 </div>
              </div>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                <Settings className="w-4 h-4" />
                Preferences
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main View Area */}
      <main className="flex-grow flex flex-col h-full relative overflow-hidden bg-void/50">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-cosmos/20 backdrop-blur-md z-40">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                {state.isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
              
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500">
                 <span className="opacity-40">SYSTEM</span>
                 <ChevronRight className="w-3 h-3 opacity-20" />
                 <span className="text-slate-300">{MODULES.find(m => m.id === state.activeModule)?.label.toUpperCase()}</span>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-void/80 px-3 py-1.5 rounded-xl border border-white/5">
                 <Search className="w-3.5 h-3.5 text-slate-500" />
                 <input 
                   placeholder="SEARCH COMMANDS..." 
                   className="bg-transparent border-none outline-none text-[10px] font-mono tracking-widest w-32 focus:w-48 transition-all"
                 />
              </div>
              <div className="relative">
                 <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-pulsar-accent rounded-full border-2 border-void" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-aurora-accent/20 border border-aurora-accent/30 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-aurora-accent animate-pulse" />
              </div>
           </div>
        </header>

        {/* Dynamic Module Content */}
        <div className="flex-grow relative overflow-hidden">
           <AnimatePresence mode="wait">
             <motion.div
               key={state.activeModule}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="h-full w-full"
             >
               {renderModule()}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Global Footer / Status Bar */}
        <footer className="h-8 border-t border-white/5 bg-cosmos/40 flex items-center justify-between px-6 px-4">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-aurora-accent" />
                 <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Core Status: Stable</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Latency: 2ms</span>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-mono opacity-30">
                 [ ARIA-ORCH v30.0.4-LOCKED ]
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono opacity-30">
                 {new Date().toLocaleTimeString()}
              </div>
           </div>
        </footer>
      </main>
    </div>
  );
}
