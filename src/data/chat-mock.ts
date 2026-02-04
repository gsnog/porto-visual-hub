// Dados mockados de chat corporativo
import { pessoasMock, setoresMock, getSubordinados } from './pessoas-mock';

export interface ChatMessage {
  id: string;
  conversaId: string;
  remetenteId: string;
  remetenteNome: string;
  remetenteIniciais: string;
  conteudo: string;
  tipo: 'texto' | 'arquivo' | 'imagem';
  arquivoUrl?: string;
  arquivoNome?: string;
  dataHora: string;
  lido: boolean;
  mencoes?: string[];
}

export interface ChatConversa {
  id: string;
  tipo: 'direto' | 'grupo' | 'equipe';
  nome: string;
  descricao?: string;
  participantes: { id: string; nome: string; iniciais: string; online: boolean }[];
  ultimaMensagem?: string;
  ultimaMensagemData?: string;
  naoLidas: number;
  criadorId?: string;
  setorId?: string;
  icone?: string;
}

export interface ChatEquipe {
  id: string;
  nome: string;
  descricao: string;
  setorId: string;
  gestorId: string;
  membros: string[];
  canais: { id: string; nome: string; descricao: string }[];
}

// Status online mockado (random)
const getOnlineStatus = () => Math.random() > 0.4;

// Conversas mockadas
export const conversasMock: ChatConversa[] = [
  {
    id: 'c1',
    tipo: 'direto',
    nome: 'Lucas Ferreira',
    participantes: [
      { id: '6', nome: 'Lucas Ferreira', iniciais: 'LF', online: true },
      { id: '9', nome: 'Pedro Piaes', iniciais: 'PP', online: true },
    ],
    ultimaMensagem: 'Pode revisar o PR #142?',
    ultimaMensagemData: '2026-02-04T10:30:00',
    naoLidas: 2,
  },
  {
    id: 'c2',
    tipo: 'direto',
    nome: 'Juliana Martins',
    participantes: [
      { id: '10', nome: 'Juliana Martins', iniciais: 'JM', online: false },
      { id: '9', nome: 'Pedro Piaes', iniciais: 'PP', online: true },
    ],
    ultimaMensagem: 'Obrigada pela ajuda!',
    ultimaMensagemData: '2026-02-03T16:45:00',
    naoLidas: 0,
  },
  {
    id: 'c3',
    tipo: 'grupo',
    nome: 'Squad Frontend',
    descricao: 'Discussões do time de frontend',
    participantes: [
      { id: '9', nome: 'Pedro Piaes', iniciais: 'PP', online: true },
      { id: '10', nome: 'Juliana Martins', iniciais: 'JM', online: false },
      { id: '11', nome: 'Bruno Alves', iniciais: 'BA', online: true },
      { id: '6', nome: 'Lucas Ferreira', iniciais: 'LF', online: true },
    ],
    ultimaMensagem: '@Pedro, pode dar uma olhada no bug do calendário?',
    ultimaMensagemData: '2026-02-04T09:15:00',
    naoLidas: 5,
    criadorId: '6',
  },
  {
    id: 'c4',
    tipo: 'equipe',
    nome: 'Tecnologia',
    descricao: 'Canal geral da área de Tecnologia',
    participantes: [
      { id: '2', nome: 'Ana Santos', iniciais: 'AS', online: true },
      { id: '6', nome: 'Lucas Ferreira', iniciais: 'LF', online: true },
      { id: '7', nome: 'Rafael Lima', iniciais: 'RL', online: false },
      { id: '9', nome: 'Pedro Piaes', iniciais: 'PP', online: true },
      { id: '10', nome: 'Juliana Martins', iniciais: 'JM', online: false },
      { id: '11', nome: 'Bruno Alves', iniciais: 'BA', online: true },
      { id: '15', nome: 'Gabriela Nunes', iniciais: 'GN', online: true },
      { id: '16', nome: 'Henrique Dias', iniciais: 'HD', online: false },
    ],
    ultimaMensagem: 'Lembrem-se do workshop amanhã às 14h!',
    ultimaMensagemData: '2026-02-04T08:00:00',
    naoLidas: 1,
    setorId: '2',
  },
  {
    id: 'c5',
    tipo: 'equipe',
    nome: 'Desenvolvimento',
    descricao: 'Time de Desenvolvimento de Software',
    participantes: [
      { id: '6', nome: 'Lucas Ferreira', iniciais: 'LF', online: true },
      { id: '9', nome: 'Pedro Piaes', iniciais: 'PP', online: true },
      { id: '10', nome: 'Juliana Martins', iniciais: 'JM', online: false },
      { id: '11', nome: 'Bruno Alves', iniciais: 'BA', online: true },
    ],
    ultimaMensagem: 'Deploy concluído com sucesso!',
    ultimaMensagemData: '2026-02-03T18:30:00',
    naoLidas: 0,
    setorId: '6',
  },
];

// Mensagens mockadas
export const mensagensMock: ChatMessage[] = [
  // Conversa c1 - Lucas Ferreira
  {
    id: 'm1',
    conversaId: 'c1',
    remetenteId: '6',
    remetenteNome: 'Lucas Ferreira',
    remetenteIniciais: 'LF',
    conteudo: 'Oi Pedro, tudo bem?',
    tipo: 'texto',
    dataHora: '2026-02-04T10:00:00',
    lido: true,
  },
  {
    id: 'm2',
    conversaId: 'c1',
    remetenteId: '9',
    remetenteNome: 'Pedro Piaes',
    remetenteIniciais: 'PP',
    conteudo: 'Tudo ótimo! E você?',
    tipo: 'texto',
    dataHora: '2026-02-04T10:05:00',
    lido: true,
  },
  {
    id: 'm3',
    conversaId: 'c1',
    remetenteId: '6',
    remetenteNome: 'Lucas Ferreira',
    remetenteIniciais: 'LF',
    conteudo: 'Bem! Acabei de subir o PR #142 com as correções do bug do calendário',
    tipo: 'texto',
    dataHora: '2026-02-04T10:25:00',
    lido: true,
  },
  {
    id: 'm4',
    conversaId: 'c1',
    remetenteId: '6',
    remetenteNome: 'Lucas Ferreira',
    remetenteIniciais: 'LF',
    conteudo: 'Pode revisar o PR #142?',
    tipo: 'texto',
    dataHora: '2026-02-04T10:30:00',
    lido: false,
  },
  // Conversa c3 - Squad Frontend
  {
    id: 'm5',
    conversaId: 'c3',
    remetenteId: '11',
    remetenteNome: 'Bruno Alves',
    remetenteIniciais: 'BA',
    conteudo: 'Bom dia pessoal!',
    tipo: 'texto',
    dataHora: '2026-02-04T08:30:00',
    lido: true,
  },
  {
    id: 'm6',
    conversaId: 'c3',
    remetenteId: '10',
    remetenteNome: 'Juliana Martins',
    remetenteIniciais: 'JM',
    conteudo: 'Bom dia! 👋',
    tipo: 'texto',
    dataHora: '2026-02-04T08:32:00',
    lido: true,
  },
  {
    id: 'm7',
    conversaId: 'c3',
    remetenteId: '6',
    remetenteNome: 'Lucas Ferreira',
    remetenteIniciais: 'LF',
    conteudo: '@Pedro, pode dar uma olhada no bug do calendário?',
    tipo: 'texto',
    dataHora: '2026-02-04T09:15:00',
    lido: false,
    mencoes: ['9'],
  },
  // Conversa c4 - Tecnologia
  {
    id: 'm8',
    conversaId: 'c4',
    remetenteId: '2',
    remetenteNome: 'Ana Santos',
    remetenteIniciais: 'AS',
    conteudo: 'Lembrem-se do workshop amanhã às 14h!',
    tipo: 'texto',
    dataHora: '2026-02-04T08:00:00',
    lido: false,
  },
  // Conversa c5 - Desenvolvimento
  {
    id: 'm9',
    conversaId: 'c5',
    remetenteId: '6',
    remetenteNome: 'Lucas Ferreira',
    remetenteIniciais: 'LF',
    conteudo: 'Deploy concluído com sucesso!',
    tipo: 'texto',
    dataHora: '2026-02-03T18:30:00',
    lido: true,
  },
];

// Equipes baseadas em setores
export const equipesMock: ChatEquipe[] = setoresMock
  .filter(s => s.responsavelId)
  .map(setor => ({
    id: `equipe-${setor.id}`,
    nome: setor.nome,
    descricao: `Equipe do setor ${setor.nome}`,
    setorId: setor.id,
    gestorId: setor.responsavelId!,
    membros: pessoasMock.filter(p => p.setorId === setor.id).map(p => p.id),
    canais: [
      { id: `canal-geral-${setor.id}`, nome: 'Geral', descricao: 'Discussões gerais' },
      { id: `canal-anuncios-${setor.id}`, nome: 'Anúncios', descricao: 'Comunicados importantes' },
    ],
  }));

// Função para obter conversas do usuário
export function getConversasUsuario(userId: string): ChatConversa[] {
  return conversasMock.filter(c => 
    c.participantes.some(p => p.id === userId)
  ).map(c => ({
    ...c,
    participantes: c.participantes.map(p => ({
      ...p,
      online: getOnlineStatus(),
    })),
  }));
}

// Função para obter mensagens de uma conversa
export function getMensagensConversa(conversaId: string): ChatMessage[] {
  return mensagensMock
    .filter(m => m.conversaId === conversaId)
    .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
}

// Função para contar mensagens não lidas
export function getTotalNaoLidas(userId: string): number {
  const conversas = getConversasUsuario(userId);
  return conversas.reduce((total, c) => total + c.naoLidas, 0);
}
