export const G = {
  bg: {
    void: "#04040e",
    cosmos: "#09091f",
    nebula: "#10102e",
    stardust: "#16163a",
  },
  accent: {
    purple: "#9d4edd",
    cyan: "#00e5ff",
    pulsar: "#ff006e",
    aurora: "#00ff9d",
    solar: "#ffb300",
  },
  border: "rgba(255,255,255,0.08)",
};

export type AgentId = "REX" | "ARIA" | "KODE" | "LUMA" | "SAGE" | "ECHO" | "NOVA" | "ZARA" | "VIGI";

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  color: string;
  position: number;
  description: string;
}

export const AGENTS: Agent[] = [
  { id: "REX", name: "REX", role: "Security", color: "#ff006e", position: 1, description: "Pre-flight security check" },
  { id: "ARIA", name: "ARIA", role: "Orchestrator", color: "#c084fc", position: 2, description: "Strategic direction" },
  { id: "KODE", name: "KODE", role: "Developer", color: "#00e5ff", position: 3, description: "Technical implementation" },
  { id: "LUMA", name: "LUMA", role: "Designer", color: "#f472b6", position: 4, description: "UX/UI strategy" },
  { id: "SAGE", name: "SAGE", role: "Analyst", color: "#f59e0b", position: 5, description: "Data insights" },
  { id: "ECHO", name: "ECHO", role: "Strategist", color: "#00ff9d", position: 6, description: "Growth strategy" },
  { id: "NOVA", name: "NOVA", role: "Creative", color: "#f97316", position: 7, description: "Creative ideation" },
  { id: "ZARA", name: "ZARA", role: "Data Nexus", color: "#ffb300", position: 8, description: "Data synthesis" },
  { id: "VIGI", name: "VIGI", role: "Critic", color: "#e2e8f0", position: 9, description: "Risk assessment" },
];

export const MODULES = [
  { id: "AGENTS", label: "Agents", icon: "Users" },
  { id: "WORKSPACE", label: "Workspace", icon: "Layout" },
  { id: "DASHBOARD", label: "Dashboard", icon: "BarChart3" },
  { id: "ANALYTICS", label: "Analytics", icon: "Pipette" },
  { id: "PROJECT", label: "Project", icon: "Calendar" },
  { id: "COLLECTION", label: "Collection", icon: "Ghost" },
  { id: "DESIGN", label: "Design Board", icon: "Palette" },
  { id: "MERGE", label: "Merge Engine", icon: "GitMerge" },
  { id: "LOCKSPEC", label: "LockSpec", icon: "Terminal" },
  { id: "STUDIO", label: "Studio", icon: "Cpu" },
];
