// Dados mockados do Kanban - Sistema estilo Trello
import { pessoasMock, setoresMock } from './pessoas-mock';

// Tipos
export interface KanbanLabel {
  id: string;
  name: string;
  color: string;
}

export interface KanbanChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface KanbanChecklist {
  id: string;
  title: string;
  items: KanbanChecklistItem[];
}

export interface KanbanComment {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface KanbanActivity {
  id: string;
  type: 'created' | 'moved' | 'edited' | 'comment' | 'checklist' | 'member' | 'label' | 'archived';
  description: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface KanbanAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface KanbanCard {
  id: string;
  listId: string;
  title: string;
  description: string;
  position: number;
  assignees: string[]; // IDs das pessoas
  labels: string[]; // IDs das labels
  dueDate?: string;
  startDate?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  checklists: KanbanChecklist[];
  comments: KanbanComment[];
  attachments: KanbanAttachment[];
  activities: KanbanActivity[];
  watchers: string[];
  archived: boolean;
  createdAt: string;
  createdBy: string;
}

export interface KanbanList {
  id: string;
  boardId: string;
  title: string;
  position: number;
  cardLimit?: number;
}

export interface KanbanAutomation {
  id: string;
  boardId: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
}

export interface KanbanBoard {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  background: string;
  starred: boolean;
  visibility: 'private' | 'workspace' | 'public';
  members: { userId: string; role: 'owner' | 'admin' | 'member' | 'viewer' }[];
  automations: KanbanAutomation[];
  createdAt: string;
  createdBy: string;
}

export interface KanbanWorkspace {
  id: string;
  name: string;
  description: string;
  type: 'team' | 'sales' | 'projects' | 'personal' | 'custom';
  icon: string;
  color: string;
  members: { userId: string; role: 'owner' | 'admin' | 'member' }[];
  createdAt: string;
  createdBy: string;
}

// Labels predefinidas
export const kanbanLabelsMock: KanbanLabel[] = [
  { id: 'l1', name: 'Urgente', color: '#EF4444' },
  { id: 'l2', name: 'Bug', color: '#F97316' },
  { id: 'l3', name: 'Feature', color: '#22C55E' },
  { id: 'l4', name: 'Melhoria', color: '#3B82F6' },
  { id: 'l5', name: 'Em Análise', color: '#A855F7' },
  { id: 'l6', name: 'Bloqueado', color: '#EC4899' },
  { id: 'l7', name: 'Documentação', color: '#6366F1' },
  { id: 'l8', name: 'Design', color: '#14B8A6' },
];

// Workspaces
export const kanbanWorkspacesMock: KanbanWorkspace[] = [
  {
    id: 'ws1',
    name: 'Equipe Tecnologia',
    description: 'Projetos e tarefas do time de desenvolvimento',
    type: 'team',
    icon: '💻',
    color: '#3B82F6',
    members: [
      { userId: '2', role: 'owner' },
      { userId: '6', role: 'admin' },
      { userId: '7', role: 'member' },
      { userId: '9', role: 'member' },
      { userId: '10', role: 'member' },
      { userId: '11', role: 'member' },
    ],
    createdAt: '2024-01-15',
    createdBy: '2',
  },
  {
    id: 'ws2',
    name: 'Pipeline de Vendas',
    description: 'Acompanhamento de leads e oportunidades',
    type: 'sales',
    icon: '💰',
    color: '#22C55E',
    members: [
      { userId: '8', role: 'owner' },
      { userId: '1', role: 'admin' },
    ],
    createdAt: '2024-02-01',
    createdBy: '8',
  },
  {
    id: 'ws3',
    name: 'Projetos Internos',
    description: 'Gerenciamento de projetos corporativos',
    type: 'projects',
    icon: '📊',
    color: '#A855F7',
    members: [
      { userId: '1', role: 'owner' },
      { userId: '2', role: 'admin' },
      { userId: '3', role: 'admin' },
      { userId: '4', role: 'member' },
      { userId: '5', role: 'member' },
    ],
    createdAt: '2024-01-20',
    createdBy: '1',
  },
  {
    id: 'ws4',
    name: 'Meu Espaço',
    description: 'Tarefas pessoais e anotações',
    type: 'personal',
    icon: '📝',
    color: '#F97316',
    members: [
      { userId: '9', role: 'owner' },
    ],
    createdAt: '2024-03-01',
    createdBy: '9',
  },
];

// Boards
export const kanbanBoardsMock: KanbanBoard[] = [
  {
    id: 'b1',
    workspaceId: 'ws1',
    title: 'Sprint Atual',
    description: 'Tarefas da sprint em andamento',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    starred: true,
    visibility: 'workspace',
    members: [
      { userId: '2', role: 'owner' },
      { userId: '6', role: 'admin' },
      { userId: '9', role: 'member' },
      { userId: '10', role: 'member' },
    ],
    automations: [
      { id: 'a1', boardId: 'b1', name: 'Auto-arquivar concluídos', trigger: 'Quando mover para "Concluído"', action: 'Arquivar após 7 dias', enabled: true },
    ],
    createdAt: '2024-01-15',
    createdBy: '2',
  },
  {
    id: 'b2',
    workspaceId: 'ws1',
    title: 'Backlog',
    description: 'Itens pendentes para futuras sprints',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    starred: false,
    visibility: 'workspace',
    members: [
      { userId: '2', role: 'owner' },
      { userId: '6', role: 'admin' },
    ],
    automations: [],
    createdAt: '2024-01-16',
    createdBy: '2',
  },
  {
    id: 'b3',
    workspaceId: 'ws2',
    title: 'Funil de Vendas',
    description: 'Pipeline comercial',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    starred: true,
    visibility: 'workspace',
    members: [
      { userId: '8', role: 'owner' },
    ],
    automations: [
      { id: 'a2', boardId: 'b3', name: 'Notificar vencimento', trigger: 'Quando due date vencer', action: 'Notificar responsáveis', enabled: true },
    ],
    createdAt: '2024-02-01',
    createdBy: '8',
  },
  {
    id: 'b4',
    workspaceId: 'ws3',
    title: 'Implementação ERP',
    description: 'Projeto de implantação do sistema',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    starred: false,
    visibility: 'workspace',
    members: [
      { userId: '1', role: 'owner' },
      { userId: '2', role: 'admin' },
      { userId: '9', role: 'member' },
    ],
    automations: [],
    createdAt: '2024-01-20',
    createdBy: '1',
  },
  {
    id: 'b5',
    workspaceId: 'ws4',
    title: 'Minhas Tarefas',
    description: 'Lista pessoal de atividades',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    starred: true,
    visibility: 'private',
    members: [
      { userId: '9', role: 'owner' },
    ],
    automations: [],
    createdAt: '2024-03-01',
    createdBy: '9',
  },
];

// Listas
export const kanbanListsMock: KanbanList[] = [
  // Board 1 - Sprint Atual
  { id: 'list1', boardId: 'b1', title: 'A Fazer', position: 0 },
  { id: 'list2', boardId: 'b1', title: 'Em Andamento', position: 1, cardLimit: 5 },
  { id: 'list3', boardId: 'b1', title: 'Em Revisão', position: 2, cardLimit: 3 },
  { id: 'list4', boardId: 'b1', title: 'Concluído', position: 3 },
  
  // Board 2 - Backlog
  { id: 'list5', boardId: 'b2', title: 'Ideias', position: 0 },
  { id: 'list6', boardId: 'b2', title: 'Refinamento', position: 1 },
  { id: 'list7', boardId: 'b2', title: 'Pronto para Sprint', position: 2 },
  
  // Board 3 - Funil de Vendas
  { id: 'list8', boardId: 'b3', title: 'Leads', position: 0 },
  { id: 'list9', boardId: 'b3', title: 'Qualificação', position: 1 },
  { id: 'list10', boardId: 'b3', title: 'Proposta', position: 2 },
  { id: 'list11', boardId: 'b3', title: 'Negociação', position: 3 },
  { id: 'list12', boardId: 'b3', title: 'Fechado', position: 4 },
  
  // Board 4 - Implementação ERP
  { id: 'list13', boardId: 'b4', title: 'Planejamento', position: 0 },
  { id: 'list14', boardId: 'b4', title: 'Desenvolvimento', position: 1 },
  { id: 'list15', boardId: 'b4', title: 'Testes', position: 2 },
  { id: 'list16', boardId: 'b4', title: 'Implantação', position: 3 },
  
  // Board 5 - Minhas Tarefas
  { id: 'list17', boardId: 'b5', title: 'Hoje', position: 0 },
  { id: 'list18', boardId: 'b5', title: 'Esta Semana', position: 1 },
  { id: 'list19', boardId: 'b5', title: 'Depois', position: 2 },
  { id: 'list20', boardId: 'b5', title: 'Feito', position: 3 },
];

// Cards
export const kanbanCardsMock: KanbanCard[] = [
  // Sprint Atual - A Fazer
  {
    id: 'c1',
    listId: 'list1',
    title: 'Implementar módulo de notificações push',
    description: 'Adicionar suporte a notificações push no sistema para alertar usuários sobre eventos importantes.',
    position: 0,
    assignees: ['9', '10'],
    labels: ['l3', 'l4'],
    dueDate: '2024-12-20',
    priority: 'high',
    checklists: [
      {
        id: 'ck1',
        title: 'Etapas',
        items: [
          { id: 'cki1', text: 'Configurar service worker', completed: true },
          { id: 'cki2', text: 'Implementar API de push', completed: false },
          { id: 'cki3', text: 'Testar em diferentes navegadores', completed: false },
        ],
      },
    ],
    comments: [
      { id: 'cm1', authorId: '6', authorName: 'Lucas Ferreira', text: 'Vamos priorizar Chrome e Firefox primeiro', createdAt: '2024-12-10T10:00:00' },
    ],
    attachments: [],
    activities: [
      { id: 'act1', type: 'created', description: 'Card criado', userId: '6', userName: 'Lucas Ferreira', createdAt: '2024-12-08T09:00:00' },
    ],
    watchers: ['6', '2'],
    archived: false,
    createdAt: '2024-12-08',
    createdBy: '6',
  },
  {
    id: 'c2',
    listId: 'list1',
    title: 'Corrigir bug no relatório financeiro',
    description: 'O relatório está exibindo valores incorretos quando há lançamentos retroativos.',
    position: 1,
    assignees: ['9'],
    labels: ['l1', 'l2'],
    dueDate: '2024-12-15',
    priority: 'urgent',
    checklists: [],
    comments: [],
    attachments: [],
    activities: [
      { id: 'act2', type: 'created', description: 'Card criado', userId: '4', userName: 'João Costa', createdAt: '2024-12-09T14:00:00' },
    ],
    watchers: ['4'],
    archived: false,
    createdAt: '2024-12-09',
    createdBy: '4',
  },
  // Sprint Atual - Em Andamento
  {
    id: 'c3',
    listId: 'list2',
    title: 'Desenvolver tela de calendário',
    description: 'Criar componente de calendário corporativo com visualizações de dia, semana e mês.',
    position: 0,
    assignees: ['9'],
    labels: ['l3', 'l8'],
    startDate: '2024-12-05',
    dueDate: '2024-12-18',
    priority: 'medium',
    checklists: [
      {
        id: 'ck2',
        title: 'Componentes',
        items: [
          { id: 'cki4', text: 'Visão diária', completed: true },
          { id: 'cki5', text: 'Visão semanal', completed: true },
          { id: 'cki6', text: 'Visão mensal', completed: false },
          { id: 'cki7', text: 'Criação de eventos', completed: false },
        ],
      },
    ],
    comments: [
      { id: 'cm2', authorId: '9', authorName: 'Pedro Piaes', text: 'Já finalizei as visões diária e semanal!', createdAt: '2024-12-12T16:00:00' },
    ],
    attachments: [],
    activities: [
      { id: 'act3', type: 'created', description: 'Card criado', userId: '6', userName: 'Lucas Ferreira', createdAt: '2024-12-05T09:00:00' },
      { id: 'act4', type: 'moved', description: 'Movido de "A Fazer" para "Em Andamento"', userId: '9', userName: 'Pedro Piaes', createdAt: '2024-12-05T10:00:00' },
    ],
    watchers: ['6', '2'],
    archived: false,
    createdAt: '2024-12-05',
    createdBy: '6',
  },
  {
    id: 'c4',
    listId: 'list2',
    title: 'Implementar chat corporativo',
    description: 'Desenvolver módulo de chat interno estilo Teams.',
    position: 1,
    assignees: ['10', '11'],
    labels: ['l3'],
    dueDate: '2024-12-22',
    priority: 'high',
    checklists: [
      {
        id: 'ck3',
        title: 'Features',
        items: [
          { id: 'cki8', text: 'Chat 1:1', completed: true },
          { id: 'cki9', text: 'Grupos', completed: true },
          { id: 'cki10', text: 'Equipes/Canais', completed: false },
          { id: 'cki11', text: 'Envio de arquivos', completed: false },
        ],
      },
    ],
    comments: [],
    attachments: [],
    activities: [],
    watchers: ['6'],
    archived: false,
    createdAt: '2024-12-06',
    createdBy: '6',
  },
  // Sprint Atual - Em Revisão
  {
    id: 'c5',
    listId: 'list3',
    title: 'Refatorar componente de tabela',
    description: 'Melhorar performance e adicionar suporte a virtualização.',
    position: 0,
    assignees: ['9'],
    labels: ['l4'],
    dueDate: '2024-12-14',
    priority: 'medium',
    checklists: [],
    comments: [
      { id: 'cm3', authorId: '6', authorName: 'Lucas Ferreira', text: 'Código aprovado! Só falta ajustar os testes.', createdAt: '2024-12-13T11:00:00' },
    ],
    attachments: [],
    activities: [],
    watchers: [],
    archived: false,
    createdAt: '2024-12-01',
    createdBy: '9',
  },
  // Sprint Atual - Concluído
  {
    id: 'c6',
    listId: 'list4',
    title: 'Criar sistema de permissões RBAC',
    description: 'Implementar controle de acesso baseado em funções.',
    position: 0,
    assignees: ['9', '6'],
    labels: ['l3', 'l7'],
    dueDate: '2024-12-10',
    priority: 'high',
    checklists: [
      {
        id: 'ck4',
        title: 'Tarefas',
        items: [
          { id: 'cki12', text: 'Definir roles', completed: true },
          { id: 'cki13', text: 'Implementar context', completed: true },
          { id: 'cki14', text: 'Integrar com rotas', completed: true },
        ],
      },
    ],
    comments: [],
    attachments: [],
    activities: [],
    watchers: [],
    archived: false,
    createdAt: '2024-11-20',
    createdBy: '6',
  },
  // Funil de Vendas - Leads
  {
    id: 'c7',
    listId: 'list8',
    title: 'Empresa ABC Ltda',
    description: 'Contato inicial via site. Interesse em solução completa de ERP.',
    position: 0,
    assignees: ['8'],
    labels: [],
    dueDate: '2024-12-20',
    priority: 'medium',
    checklists: [],
    comments: [],
    attachments: [],
    activities: [],
    watchers: [],
    archived: false,
    createdAt: '2024-12-10',
    createdBy: '8',
  },
  // Minhas Tarefas - Hoje
  {
    id: 'c8',
    listId: 'list17',
    title: 'Reunião de alinhamento 10h',
    description: 'Daily com o time de desenvolvimento',
    position: 0,
    assignees: ['9'],
    labels: [],
    dueDate: '2024-12-13',
    priority: 'high',
    checklists: [],
    comments: [],
    attachments: [],
    activities: [],
    watchers: [],
    archived: false,
    createdAt: '2024-12-13',
    createdBy: '9',
  },
  {
    id: 'c9',
    listId: 'list17',
    title: 'Revisar PR do Lucas',
    description: 'Code review do módulo de relatórios',
    position: 1,
    assignees: ['9'],
    labels: ['l5'],
    priority: 'medium',
    checklists: [],
    comments: [],
    attachments: [],
    activities: [],
    watchers: [],
    archived: false,
    createdAt: '2024-12-13',
    createdBy: '9',
  },
];

// Funções auxiliares
export function getWorkspacesByUser(userId: string): KanbanWorkspace[] {
  return kanbanWorkspacesMock.filter(ws => 
    ws.members.some(m => m.userId === userId)
  );
}

export function getBoardsByWorkspace(workspaceId: string): KanbanBoard[] {
  return kanbanBoardsMock.filter(b => b.workspaceId === workspaceId);
}

export function getBoardsByUser(userId: string): KanbanBoard[] {
  return kanbanBoardsMock.filter(b => 
    b.members.some(m => m.userId === userId)
  );
}

export function getListsByBoard(boardId: string): KanbanList[] {
  return kanbanListsMock
    .filter(l => l.boardId === boardId)
    .sort((a, b) => a.position - b.position);
}

export function getCardsByList(listId: string): KanbanCard[] {
  return kanbanCardsMock
    .filter(c => c.listId === listId && !c.archived)
    .sort((a, b) => a.position - b.position);
}

export function getCardsByBoard(boardId: string): KanbanCard[] {
  const listIds = kanbanListsMock.filter(l => l.boardId === boardId).map(l => l.id);
  return kanbanCardsMock.filter(c => listIds.includes(c.listId) && !c.archived);
}

export function getStarredBoards(userId: string): KanbanBoard[] {
  return getBoardsByUser(userId).filter(b => b.starred);
}

export function getRecentBoards(userId: string): KanbanBoard[] {
  return getBoardsByUser(userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
}

export function searchKanban(userId: string, query: string): {
  workspaces: KanbanWorkspace[];
  boards: KanbanBoard[];
  cards: KanbanCard[];
} {
  const lowerQuery = query.toLowerCase();
  
  const userWorkspaces = getWorkspacesByUser(userId);
  const userBoards = getBoardsByUser(userId);
  const userBoardIds = userBoards.map(b => b.id);
  const userListIds = kanbanListsMock.filter(l => userBoardIds.includes(l.boardId)).map(l => l.id);
  
  return {
    workspaces: userWorkspaces.filter(ws => 
      ws.name.toLowerCase().includes(lowerQuery) || 
      ws.description.toLowerCase().includes(lowerQuery)
    ),
    boards: userBoards.filter(b => 
      b.title.toLowerCase().includes(lowerQuery) || 
      b.description.toLowerCase().includes(lowerQuery)
    ),
    cards: kanbanCardsMock.filter(c => 
      userListIds.includes(c.listId) &&
      !c.archived &&
      (c.title.toLowerCase().includes(lowerQuery) || 
       c.description.toLowerCase().includes(lowerQuery))
    ),
  };
}

export function getUserRole(workspaceOrBoard: KanbanWorkspace | KanbanBoard, userId: string): string | null {
  const member = workspaceOrBoard.members.find(m => m.userId === userId);
  return member ? member.role : null;
}

export function canManageBoard(board: KanbanBoard, userId: string): boolean {
  const role = getUserRole(board, userId);
  return role === 'owner' || role === 'admin';
}

export function canManageCards(board: KanbanBoard, userId: string): boolean {
  const role = getUserRole(board, userId);
  return role !== 'viewer' && role !== null;
}

export function getMyCards(userId: string): KanbanCard[] {
  return kanbanCardsMock.filter(c => 
    !c.archived && c.assignees.includes(userId)
  );
}

export function getMyCardsThisWeek(userId: string): KanbanCard[] {
  const now = new Date();
  const weekEnd = new Date(now);
  weekEnd.setDate(now.getDate() + 7);
  
  return getMyCards(userId).filter(c => {
    if (!c.dueDate) return false;
    const dueDate = new Date(c.dueDate);
    return dueDate >= now && dueDate <= weekEnd;
  });
}

export function getOverdueCards(userId: string): KanbanCard[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  return getMyCards(userId).filter(c => {
    if (!c.dueDate) return false;
    const dueDate = new Date(c.dueDate);
    return dueDate < now;
  });
}

export function getKanbanNotifications(userId: string): number {
  const myCards = getMyCards(userId);
  const overdueCount = getOverdueCards(userId).length;
  const mentionedComments = kanbanCardsMock
    .flatMap(c => c.comments)
    .filter(cm => cm.text.includes(`@${pessoasMock.find(p => p.id === userId)?.nome}`))
    .length;
  
  return overdueCount + mentionedComments;
}
