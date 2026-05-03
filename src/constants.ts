export const THEME = {
  colors: {
    voidBlack: '#050505',
    starlightWhite: '#ffffff',
    guardianRed: '#ff1a1a',
    architectYellow: '#ffcc00',
    bloomGreen: '#00ff66',
    nexusOrange: '#ff6600',
  },
};

export type AgentId = 'REX' | 'ARIA' | 'KODE' | 'LUMA' | 'SAGE' | 'ECHO' | 'NOVA' | 'ZARA' | 'VIGI';

export interface GhostAgent {
  id: AgentId;
  role: string;
  maxTokens: number;
}

export const GHOST_TEAM_9: GhostAgent[] = [
  { id: 'REX', role: 'Security', maxTokens: 600 },
  { id: 'ARIA', role: 'Orchestrator', maxTokens: 700 },
  { id: 'KODE', role: 'Developer', maxTokens: 900 },
  { id: 'LUMA', role: 'Visuals', maxTokens: 700 },
  { id: 'SAGE', role: 'Data', maxTokens: 650 },
  { id: 'ECHO', role: 'Growth', maxTokens: 550 },
  { id: 'NOVA', role: 'Creative', maxTokens: 650 },
  { id: 'ZARA', role: 'Nexus', maxTokens: 500 },
  { id: 'VIGI', role: 'Quality', maxTokens: 500 },
];

export const G = { bg: { void: '#050505' }, accent: { nexus: '#ff6600' }, border: 'rgba(255,255,255,0.2)' };
export const AGENTS = GHOST_TEAM_9.map((a, i) => ({ id: a.id, name: a.id, role: a.role, color: '#ffffff', position: i + 1, description: a.role }));
