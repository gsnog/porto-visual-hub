// Dados mockados de eventos do calendário
import { pessoasMock, getSubordinados } from './pessoas-mock';

export type EventType = 'reuniao' | 'compromisso' | 'atendimento' | 'plantao' | 'evento_interno' | 'outro';

export interface CalendarEvent {
  id: string;
  titulo: string;
  descricao?: string;
  tipo: EventType;
  dataInicio: string;
  horaInicio: string;
  dataFim: string;
  horaFim: string;
  criadorId: string;
  criadorNome: string;
  participantes: { id: string; nome: string; confirmado: boolean }[];
  setorId?: string;
  equipeId?: string;
  local?: string;
  cor: string;
  privado: boolean;
}

export const eventTypes: { value: EventType; label: string; cor: string }[] = [
  { value: 'reuniao', label: 'Reunião', cor: '#3B82F6' },
  { value: 'compromisso', label: 'Compromisso', cor: '#10B981' },
  { value: 'atendimento', label: 'Atendimento', cor: '#F59E0B' },
  { value: 'plantao', label: 'Plantão', cor: '#EF4444' },
  { value: 'evento_interno', label: 'Evento Interno', cor: '#8B5CF6' },
  { value: 'outro', label: 'Outro', cor: '#6B7280' },
];

// Eventos mockados
export const eventosMock: CalendarEvent[] = [
  {
    id: '1',
    titulo: 'Reunião de Sprint',
    descricao: 'Planejamento da sprint 24',
    tipo: 'reuniao',
    dataInicio: '2026-02-04',
    horaInicio: '09:00',
    dataFim: '2026-02-04',
    horaFim: '10:00',
    criadorId: '6',
    criadorNome: 'Lucas Ferreira',
    participantes: [
      { id: '9', nome: 'Pedro Piaes', confirmado: true },
      { id: '10', nome: 'Juliana Martins', confirmado: true },
      { id: '11', nome: 'Bruno Alves', confirmado: false },
    ],
    setorId: '6',
    local: 'Sala de Reuniões A',
    cor: '#3B82F6',
    privado: false,
  },
  {
    id: '2',
    titulo: 'Entrevista - Vaga Dev Jr',
    descricao: 'Entrevista técnica para desenvolvedor júnior',
    tipo: 'atendimento',
    dataInicio: '2026-02-04',
    horaInicio: '14:00',
    dataFim: '2026-02-04',
    horaFim: '15:00',
    criadorId: '3',
    criadorNome: 'Maria Oliveira',
    participantes: [
      { id: '2', nome: 'Ana Santos', confirmado: true },
    ],
    setorId: '3',
    local: 'Sala RH',
    cor: '#F59E0B',
    privado: true,
  },
  {
    id: '3',
    titulo: 'Daily Standup',
    descricao: 'Reunião diária da equipe de desenvolvimento',
    tipo: 'reuniao',
    dataInicio: '2026-02-05',
    horaInicio: '09:30',
    dataFim: '2026-02-05',
    horaFim: '09:45',
    criadorId: '6',
    criadorNome: 'Lucas Ferreira',
    participantes: [
      { id: '9', nome: 'Pedro Piaes', confirmado: true },
      { id: '10', nome: 'Juliana Martins', confirmado: true },
      { id: '11', nome: 'Bruno Alves', confirmado: true },
    ],
    setorId: '6',
    local: 'Online - Teams',
    cor: '#3B82F6',
    privado: false,
  },
  {
    id: '4',
    titulo: 'Plantão TI',
    descricao: 'Plantão de suporte técnico',
    tipo: 'plantao',
    dataInicio: '2026-02-06',
    horaInicio: '18:00',
    dataFim: '2026-02-07',
    horaFim: '08:00',
    criadorId: '7',
    criadorNome: 'Rafael Lima',
    participantes: [
      { id: '16', nome: 'Henrique Dias', confirmado: true },
    ],
    setorId: '7',
    cor: '#EF4444',
    privado: false,
  },
  {
    id: '5',
    titulo: 'Workshop Design System',
    descricao: 'Treinamento sobre o design system do SERP',
    tipo: 'evento_interno',
    dataInicio: '2026-02-07',
    horaInicio: '14:00',
    dataFim: '2026-02-07',
    horaFim: '17:00',
    criadorId: '2',
    criadorNome: 'Ana Santos',
    participantes: [
      { id: '6', nome: 'Lucas Ferreira', confirmado: true },
      { id: '9', nome: 'Pedro Piaes', confirmado: true },
      { id: '10', nome: 'Juliana Martins', confirmado: true },
      { id: '15', nome: 'Gabriela Nunes', confirmado: true },
    ],
    setorId: '2',
    local: 'Auditório',
    cor: '#8B5CF6',
    privado: false,
  },
  {
    id: '6',
    titulo: 'Almoço de integração',
    descricao: 'Confraternização mensal da equipe',
    tipo: 'evento_interno',
    dataInicio: '2026-02-10',
    horaInicio: '12:00',
    dataFim: '2026-02-10',
    horaFim: '14:00',
    criadorId: '3',
    criadorNome: 'Maria Oliveira',
    participantes: [],
    cor: '#8B5CF6',
    privado: false,
  },
  {
    id: '7',
    titulo: 'Reunião de Diretoria',
    descricao: 'Alinhamento estratégico mensal',
    tipo: 'reuniao',
    dataInicio: '2026-02-04',
    horaInicio: '11:00',
    dataFim: '2026-02-04',
    horaFim: '12:30',
    criadorId: '1',
    criadorNome: 'Carlos Silva',
    participantes: [
      { id: '2', nome: 'Ana Santos', confirmado: true },
      { id: '3', nome: 'Maria Oliveira', confirmado: true },
      { id: '4', nome: 'João Costa', confirmado: true },
      { id: '5', nome: 'Pedro Mendes', confirmado: true },
      { id: '8', nome: 'Fernanda Rocha', confirmado: true },
    ],
    local: 'Sala da Diretoria',
    cor: '#3B82F6',
    privado: true,
  },
];

// Função para obter eventos visíveis para um usuário
export function getEventosVisiveis(
  userId: string,
  scope: 'self' | 'team' | 'area' | 'all'
): CalendarEvent[] {
  const user = pessoasMock.find(p => p.id === userId);
  if (!user) return [];

  if (scope === 'all') {
    return eventosMock;
  }

  if (scope === 'team') {
    const subordinados = getSubordinados(userId);
    const subordinadosIds = subordinados.map(s => s.id);
    
    return eventosMock.filter(evento => {
      // Criador é o usuário ou subordinado
      if (evento.criadorId === userId || subordinadosIds.includes(evento.criadorId)) {
        return true;
      }
      // Usuário é participante
      if (evento.participantes.some(p => p.id === userId)) {
        return true;
      }
      // Subordinados são participantes
      if (evento.participantes.some(p => subordinadosIds.includes(p.id))) {
        return true;
      }
      return false;
    });
  }

  // scope === 'self'
  return eventosMock.filter(evento => {
    if (evento.criadorId === userId) return true;
    if (evento.participantes.some(p => p.id === userId)) return true;
    return false;
  });
}

// Função para filtrar eventos por data
export function getEventosPorData(
  eventos: CalendarEvent[],
  data: string
): CalendarEvent[] {
  return eventos.filter(e => e.dataInicio === data || e.dataFim === data);
}

// Função para filtrar eventos por período
export function getEventosPorPeriodo(
  eventos: CalendarEvent[],
  dataInicio: string,
  dataFim: string
): CalendarEvent[] {
  return eventos.filter(e => {
    return e.dataInicio >= dataInicio && e.dataInicio <= dataFim;
  });
}
