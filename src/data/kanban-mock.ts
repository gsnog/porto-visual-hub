// Dados mockados do Kanban - Sistema simplificado estilo Trello
import { pessoasMock } from './pessoas-mock';

// Tipos
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

export interface KanbanCard {
  id: string;
  listId: string;
  title: string;
  description: string;
  position: number;
  assigneeId: string | null; // Responsável único
  dueDate: string | null;
  checklists: KanbanChecklist[];
  observations: string;
  archived: boolean;
  createdAt: string;
  createdBy: string;
}

export interface KanbanList {
  id: string;
  boardId: string;
  title: string;
  position: number;
}

export interface KanbanBoard {
  id: string;
  title: string;
  description: string;
  members: string[]; // IDs das pessoas participantes
  createdAt: string;
  createdBy: string;
}

// Boards
export const kanbanBoardsMock: KanbanBoard[] = [
  {
    id: 'b1',
    title: 'Sprint Atual',
    description: 'Tarefas da sprint em andamento',
    members: ['2', '6', '9', '10', '11'],
    createdAt: '2024-01-15',
    createdBy: '2',
  },
  {
    id: 'b2',
    title: 'Funil de Vendas',
    description: 'Pipeline comercial',
    members: ['8', '1'],
    createdAt: '2024-02-01',
    createdBy: '8',
  },
  {
    id: 'b3',
    title: 'Implementacao ERP',
    description: 'Projeto de implantacao do sistema',
    members: ['1', '2', '9', '4', '5'],
    createdAt: '2024-01-20',
    createdBy: '1',
  },
];

// Listas
export const kanbanListsMock: KanbanList[] = [
  // Board 1 - Sprint Atual
  { id: 'list1', boardId: 'b1', title: 'A Fazer', position: 0 },
  { id: 'list2', boardId: 'b1', title: 'Em Andamento', position: 1 },
  { id: 'list3', boardId: 'b1', title: 'Em Revisao', position: 2 },
  { id: 'list4', boardId: 'b1', title: 'Concluido', position: 3 },

  // Board 2 - Funil de Vendas
  { id: 'list5', boardId: 'b2', title: 'Leads', position: 0 },
  { id: 'list6', boardId: 'b2', title: 'Qualificacao', position: 1 },
  { id: 'list7', boardId: 'b2', title: 'Proposta', position: 2 },
  { id: 'list8', boardId: 'b2', title: 'Fechado', position: 3 },

  // Board 3 - Implementacao ERP
  { id: 'list9', boardId: 'b3', title: 'Planejamento', position: 0 },
  { id: 'list10', boardId: 'b3', title: 'Desenvolvimento', position: 1 },
  { id: 'list11', boardId: 'b3', title: 'Testes', position: 2 },
  { id: 'list12', boardId: 'b3', title: 'Implantacao', position: 3 },
];

// Cards
export const kanbanCardsMock: KanbanCard[] = [
  // Sprint Atual - A Fazer
  {
    id: 'c1',
    listId: 'list1',
    title: 'Implementar modulo de notificacoes',
    description: 'Adicionar suporte a notificacoes no sistema para alertar usuarios sobre eventos importantes.',
    position: 0,
    assigneeId: '9',
    dueDate: '2024-12-20',
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
    observations: 'Priorizar Chrome e Firefox primeiro.',
    archived: false,
    createdAt: '2024-12-08',
    createdBy: '6',
  },
  {
    id: 'c2',
    listId: 'list1',
    title: 'Corrigir bug no relatorio financeiro',
    description: 'O relatorio exibe valores incorretos em lancamentos retroativos.',
    position: 1,
    assigneeId: '10',
    dueDate: '2024-12-15',
    checklists: [],
    observations: '',
    archived: false,
    createdAt: '2024-12-09',
    createdBy: '4',
  },
  // Sprint Atual - Em Andamento
  {
    id: 'c3',
    listId: 'list2',
    title: 'Desenvolver tela de calendario',
    description: 'Criar componente de calendario corporativo com visualizacoes de dia, semana e mes.',
    position: 0,
    assigneeId: '9',
    dueDate: '2024-12-18',
    checklists: [
      {
        id: 'ck2',
        title: 'Componentes',
        items: [
          { id: 'cki4', text: 'Visao diaria', completed: true },
          { id: 'cki5', text: 'Visao semanal', completed: true },
          { id: 'cki6', text: 'Visao mensal', completed: false },
          { id: 'cki7', text: 'Criacao de eventos', completed: false },
        ],
      },
    ],
    observations: 'Ja finalizei as visoes diaria e semanal.',
    archived: false,
    createdAt: '2024-12-05',
    createdBy: '6',
  },
  {
    id: 'c4',
    listId: 'list2',
    title: 'Implementar chat corporativo',
    description: 'Desenvolver modulo de chat interno.',
    position: 1,
    assigneeId: '11',
    dueDate: '2024-12-22',
    checklists: [
      {
        id: 'ck3',
        title: 'Features',
        items: [
          { id: 'cki8', text: 'Chat 1:1', completed: true },
          { id: 'cki9', text: 'Grupos', completed: true },
          { id: 'cki10', text: 'Canais', completed: false },
          { id: 'cki11', text: 'Envio de arquivos', completed: false },
        ],
      },
    ],
    observations: '',
    archived: false,
    createdAt: '2024-12-06',
    createdBy: '6',
  },
  // Sprint Atual - Em Revisao
  {
    id: 'c5',
    listId: 'list3',
    title: 'Refatorar componente de tabela',
    description: 'Melhorar performance e adicionar suporte a virtualizacao.',
    position: 0,
    assigneeId: '9',
    dueDate: '2024-12-14',
    checklists: [],
    observations: 'Codigo aprovado, falta ajustar os testes.',
    archived: false,
    createdAt: '2024-12-01',
    createdBy: '9',
  },
  // Sprint Atual - Concluido
  {
    id: 'c6',
    listId: 'list4',
    title: 'Criar sistema de permissoes RBAC',
    description: 'Implementar controle de acesso baseado em funcoes.',
    position: 0,
    assigneeId: '6',
    dueDate: '2024-12-10',
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
    observations: '',
    archived: false,
    createdAt: '2024-11-20',
    createdBy: '6',
  },
  // Funil de Vendas
  {
    id: 'c7',
    listId: 'list5',
    title: 'Empresa ABC Ltda',
    description: 'Contato inicial via site. Interesse em solucao completa de ERP.',
    position: 0,
    assigneeId: '8',
    dueDate: '2024-12-20',
    checklists: [],
    observations: 'Agendar reuniao de apresentacao.',
    archived: false,
    createdAt: '2024-12-10',
    createdBy: '8',
  },
  // Implementacao ERP
  {
    id: 'c8',
    listId: 'list9',
    title: 'Levantamento de requisitos',
    description: 'Mapear processos e necessidades de cada area.',
    position: 0,
    assigneeId: '2',
    dueDate: '2024-12-25',
    checklists: [
      {
        id: 'ck5',
        title: 'Areas',
        items: [
          { id: 'cki15', text: 'Financeiro', completed: true },
          { id: 'cki16', text: 'Estoque', completed: true },
          { id: 'cki17', text: 'RH', completed: false },
          { id: 'cki18', text: 'Comercial', completed: false },
        ],
      },
    ],
    observations: '',
    archived: false,
    createdAt: '2024-12-01',
    createdBy: '1',
  },
];
