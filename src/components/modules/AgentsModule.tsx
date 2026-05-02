import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Activity, MessageSquare, Shield, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GhostSVG } from '../GhostSVG';
import { AGENTS, AgentId, G } from '../../constants';
import { callGemini } from '../../services/geminiService';

export const AgentsModule: React.FC = () => {
  const [task, setTask] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<AgentId, string>>({} as any);
  const [error, setError] = useState<string | null>(null);
  const [currentSpeech, setCurrentSpeech] = useState<string | null>(null);

  const runOrchestration = async () => {
    if (!task || isRunning) return;
    
    setIsRunning(true);
    setResponses({} as any);
    setError(null);
    let accumulatedContext = `Task: ${task}\n\n`;

    try {
      for (let i = 0; i < AGENTS.length; i++) {
        const agent = AGENTS[i];
        setActiveAgentIndex(i);
        
        const systemPrompt = `You are ${agent.name}, the ${agent.role} ghost agent.
        Your specific responsibility: ${agent.description}.
        
        Current full context of the project so far:
        ${accumulatedContext}
        
        Please provide your specific contribution, review, or action based on your role. Keep it concise but professional (2-3 sentences).`;

        const response = await callGemini(task, systemPrompt, 400);
        
        setResponses(prev => ({ ...prev, [agent.id]: response }));
        setCurrentSpeech(response);
        accumulatedContext += `[${agent.name}]: ${response}\n\n`;

        // Wait a bit for the user to read/see the animation
        await new Promise(r => setTimeout(r, 2200));
        setCurrentSpeech(null);
      }
    } catch (err) {
      console.error(err);
      setError("Orchestration failed. Please check your connection or API key.");
    } finally {
      setIsRunning(false);
      setActiveAgentIndex(null);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden p-6">
        {/* Left: Input & Log */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
          <div className="glass-panel p-4 flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-pulsar-accent" />
              Mission Input
            </h3>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a task to orchestrate (e.g., 'Build a secure cosmic payment portal')"
              className="w-full bg-void/50 border border-white/10 rounded-xl p-3 text-sm focus:border-purple-accent outline-none min-h-[100px] resize-none"
              disabled={isRunning}
            />
            <button
              onClick={runOrchestration}
              disabled={!task || isRunning}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                isRunning 
                ? 'bg-stardust text-slate-400 cursor-not-allowed' 
                : 'bg-purple-accent hover:bg-purple-600 text-white shadow-lg shadow-purple-900/20 active:scale-95'
              }`}
            >
              {isRunning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Orchestrating...' : 'Launch Agents'}
            </button>
          </div>

          <div className="glass-panel p-4 flex-grow overflow-hidden flex flex-col">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-accent" />
              Communication Log
            </h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {Object.keys(responses).length === 0 && !isRunning && (
                <div className="h-full flex flex-col items-center justify-center opacity-40 text-center">
                  <GhostSVG variant="cute" size={48} color="#94a3b8" />
                  <p className="mt-2 text-sm">System idle. Awaiting mission.</p>
                </div>
              )}
              {AGENTS.map((agent) => responses[agent.id] && (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-lg bg-stardust/30 border-l-2"
                  style={{ borderLeftColor: agent.color }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: agent.color }}>
                      {agent.name}
                    </span>
                    <CheckCircle2 className="w-3 h-3 text-aurora-accent" />
                  </div>
                  <p className="text-sm opacity-90 leading-relaxed font-mono">{responses[agent.id]}</p>
                </motion.div>
              ))}
              {error && (
                <div className="p-3 rounded-lg bg-pulsar-accent/10 border border-pulsar-accent/30 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-pulsar-accent mt-0.5" />
                  <p className="text-sm text-pulsar-accent">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Agent Canvas */}
        <div className="lg:col-span-2 relative glass-panel overflow-hidden bg-void/40">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff22 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full p-12">
              {/* Agent Grid */}
              <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-8">
                {AGENTS.map((agent, index) => {
                  const isActive = activeAgentIndex === index;
                  const isDone = responses[agent.id];
                  
                  return (
                    <div key={agent.id} className="relative flex flex-col items-center justify-center">
                      <motion.div
                        animate={isActive ? { scale: [1, 1.1, 1], boxShadow: `0 0 30px ${agent.color}55` } : {}}
                        transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                        className={`relative p-4 rounded-3xl transition-all duration-500 flex flex-col items-center gap-2 ${
                          isActive ? 'bg-stardust/60 border-2' : isDone ? 'bg-stardust/20 opacity-80' : 'bg-void/20 opacity-40'
                        }`}
                        style={{ borderColor: isActive ? agent.color : 'transparent' }}
                      >
                        <GhostSVG 
                          variant={agent.id === 'KODE' ? 'code' : agent.id === 'REX' ? 'hero' : 'cute'} 
                          color={agent.color} 
                          size={80}
                          talking={isActive}
                          selected={isActive}
                        />
                        <div className="text-center">
                          <p className="text-xs font-bold font-display" style={{ color: agent.color }}>{agent.name}</p>
                          <p className="text-[10px] opacity-60 uppercase tracking-tighter">{agent.role}</p>
                        </div>

                        {/* Speech Bubble */}
                        <AnimatePresence>
                          {isActive && currentSpeech && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.8 }}
                              animate={{ opacity: 1, y: -80, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute z-20 w-48 bg-white text-void p-3 rounded-2xl rounded-bl-none shadow-2xl text-xs font-medium"
                            >
                              {currentSpeech}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Connection Line to next agent (sequential) */}
                      {index < AGENTS.length - 1 && (
                        <div className="absolute z-0 pointer-events-none opacity-20">
                           {/* Simplified visualization of sequential flow */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 bg-void/80 px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold">
              <span className={`w-2 h-2 rounded-full animate-pulse ${isRunning ? 'bg-aurora-accent' : 'bg-stardust'}`} />
              Orchestration Node: v4.2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
