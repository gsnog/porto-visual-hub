import { pessoasMock } from './pessoas-mock';

// Types
export interface Lead {
  id: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  origem: string;
  status: 'novo' | 'quente' | 'morno' | 'frio' | 'convertido' | 'perdido';
  proprietarioId: string;
  ultimaAtividade: string;
  proximaAtividade: string;
  score: number;
  tags: string[];
  createdAt: string;
  notas: string[];
}

export interface Conta {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  segmento: string;
  porte: 'micro' | 'pequena' | 'media' | 'grande';
  cidade: string;
  uf: string;
  site?: string;
  status: 'prospect' | 'cliente' | 'inativo' | 'churned';
  responsavelId: string;
  limiteCredito?: number;
  createdAt: string;
}

export interface Contato {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  papel: 'decisor' | 'influenciador' | 'usuario' | 'compras';
  contaId: string;
  tags: string[];
  preferencias?: string;
}

export interface Oportunidade {
  id: string;
  titulo: string;
  contaId: string;
  contatosIds: string[];
  valorEstimado: number;
  probabilidade: number;
  dataPrevisao: string;
  etapa: string;
  origem: string;
  concorrente?: string;
  motivoPerda?: string;
  proprietarioId: string;
  createdAt: string;
  ultimaAtividade?: string;
  proximaAcao?: string;
  checklist: { item: string; completo: boolean }[];
  historicoEtapas: { etapa: string; data: string; usuario: string }[];
}

export interface Proposta {
  id: string;
  numero: string;
  contaId: string;
  oportunidadeId: string;
  status: 'rascunho' | 'enviada' | 'aprovada' | 'recusada' | 'expirada';
  valor: number;
  validade: string;
  responsavelId: string;
  versao: number;
  itens: { produto: string; quantidade: number; precoUnit: number; desconto: number }[];
  condicoes: { prazoEntrega: string; formaPagamento: string; garantia: string; observacoes: string };
  createdAt: string;
}

export interface Pedido {
  id: string;
  numero: string;
  contaId: string;
  propostaId?: string;
  status: 'aberto' | 'aprovado' | 'faturado' | 'cancelado' | 'entregue';
  valor: number;
  condicaoPagamento: string;
  itens: { produto: string; quantidade: number; precoUnit: number }[];
  createdAt: string;
}

export interface Atividade {
  id: string;
  tipo: 'tarefa' | 'ligacao' | 'reuniao' | 'email' | 'follow-up';
  titulo: string;
  descricao?: string;
  data: string;
  hora?: string;
  status: 'pendente' | 'concluida' | 'cancelada';
  responsavelId: string;
  relacionadoTipo?: 'lead' | 'conta' | 'oportunidade' | 'contato';
  relacionadoId?: string;
  notas?: string;
}

export interface Meta {
  id: string;
  vendedorId: string;
  periodo: string;
  tipo: 'receita' | 'novos_clientes' | 'margem' | 'renovacoes';
  valorMeta: number;
  valorRealizado: number;
}

export interface Comissao {
  id: string;
  vendedorId: string;
  oportunidadeId: string;
  valor: number;
  status: 'prevista' | 'aprovada' | 'paga' | 'estornada';
  percentual: number;
  dataBase: string;
}

export interface ProdutoComercial {
  id: string;
  codigo: string;
  nome: string;
  categoria: string;
  precoBase: number;
  margem: number;
  ativo: boolean;
}

// Etapas do funil
export const etapasFunil = [
  { id: 'prospeccao', nome: 'Prospecção', probabilidade: 10 },
  { id: 'qualificacao', nome: 'Qualificação', probabilidade: 20 },
  { id: 'diagnostico', nome: 'Diagnóstico', probabilidade: 40 },
  { id: 'proposta', nome: 'Proposta Enviada', probabilidade: 60 },
  { id: 'negociacao', nome: 'Negociação', probabilidade: 80 },
  { id: 'aprovacao', nome: 'Aprovação', probabilidade: 90 },
  { id: 'ganho', nome: 'Fechado Ganho', probabilidade: 100 },
  { id: 'perdido', nome: 'Fechado Perdido', probabilidade: 0 },
];

// Origens de lead
export const origensLead = [
  'Site', 'Google Ads', 'LinkedIn', 'Indicação', 'Evento', 'Cold Call', 'Email Marketing', 'Parceiro'
];

// Motivos de perda
export const motivosPerda = [
  'Preço', 'Concorrência', 'Timing', 'Orçamento', 'Decisor mudou', 'Projeto cancelado', 'Sem retorno', 'Outro'
];

// Mock Data
export const leadsMock: Lead[] = [
  {
    id: 'lead-1',
    nome: 'Ricardo Mendes',
    empresa: 'Tech Solutions Ltda',
    email: 'ricardo@techsolutions.com',
    telefone: '(11) 98765-4321',
    origem: 'LinkedIn',
    status: 'quente',
    proprietarioId: pessoasMock[0].id,
    ultimaAtividade: '2026-02-03',
    proximaAtividade: '2026-02-05',
    score: 85,
    tags: ['enterprise', 'ti'],
    createdAt: '2026-01-15',
    notas: ['Muito interessado no produto X', 'Pediu proposta para 50 licenças']
  },
  {
    id: 'lead-2',
    nome: 'Fernanda Costa',
    empresa: 'Indústria ABC',
    email: 'fernanda@industriaabc.com.br',
    telefone: '(21) 97654-3210',
    origem: 'Google Ads',
    status: 'morno',
    proprietarioId: pessoasMock[1].id,
    ultimaAtividade: '2026-01-28',
    proximaAtividade: '2026-02-10',
    score: 60,
    tags: ['industria', 'producao'],
    createdAt: '2026-01-20',
    notas: ['Interesse em automação']
  },
  {
    id: 'lead-3',
    nome: 'Carlos Eduardo',
    empresa: 'Construtora Nova Era',
    email: 'carlos@novaera.com',
    telefone: '(31) 96543-2109',
    origem: 'Indicação',
    status: 'novo',
    proprietarioId: pessoasMock[0].id,
    ultimaAtividade: '2026-02-02',
    proximaAtividade: '2026-02-04',
    score: 75,
    tags: ['construcao'],
    createdAt: '2026-02-01',
    notas: []
  },
  {
    id: 'lead-4',
    nome: 'Patrícia Lima',
    empresa: 'Farmácia Popular',
    email: 'patricia@farmaciapopular.com',
    telefone: '(41) 95432-1098',
    origem: 'Evento',
    status: 'frio',
    proprietarioId: pessoasMock[2].id,
    ultimaAtividade: '2026-01-10',
    proximaAtividade: '2026-02-15',
    score: 30,
    tags: ['varejo', 'farma'],
    createdAt: '2026-01-05',
    notas: ['Sem budget no momento']
  },
];

export const contasMock: Conta[] = [
  {
    id: 'conta-1',
    razaoSocial: 'Tech Solutions Ltda',
    nomeFantasia: 'TechSol',
    cnpj: '12.345.678/0001-90',
    segmento: 'Tecnologia',
    porte: 'media',
    cidade: 'São Paulo',
    uf: 'SP',
    site: 'www.techsolutions.com',
    status: 'cliente',
    responsavelId: pessoasMock[0].id,
    limiteCredito: 50000,
    createdAt: '2025-06-01'
  },
  {
    id: 'conta-2',
    razaoSocial: 'Indústria ABC S/A',
    nomeFantasia: 'ABC Ind',
    cnpj: '98.765.432/0001-10',
    segmento: 'Indústria',
    porte: 'grande',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    status: 'prospect',
    responsavelId: pessoasMock[1].id,
    createdAt: '2025-11-15'
  },
  {
    id: 'conta-3',
    razaoSocial: 'Construtora Nova Era Ltda',
    nomeFantasia: 'Nova Era',
    cnpj: '11.222.333/0001-44',
    segmento: 'Construção',
    porte: 'media',
    cidade: 'Belo Horizonte',
    uf: 'MG',
    status: 'cliente',
    responsavelId: pessoasMock[0].id,
    limiteCredito: 30000,
    createdAt: '2025-08-20'
  },
];

export const contatosMock: Contato[] = [
  {
    id: 'contato-1',
    nome: 'Ricardo Mendes',
    cargo: 'Diretor de TI',
    email: 'ricardo@techsolutions.com',
    telefone: '(11) 98765-4321',
    papel: 'decisor',
    contaId: 'conta-1',
    tags: ['executivo', 'tecnico']
  },
  {
    id: 'contato-2',
    nome: 'Ana Paula Silva',
    cargo: 'Gerente de Compras',
    email: 'ana.paula@techsolutions.com',
    telefone: '(11) 98765-4322',
    papel: 'compras',
    contaId: 'conta-1',
    tags: ['compras']
  },
  {
    id: 'contato-3',
    nome: 'João Fernandes',
    cargo: 'CEO',
    email: 'joao@industriaabc.com.br',
    telefone: '(21) 97654-3211',
    papel: 'decisor',
    contaId: 'conta-2',
    tags: ['executivo']
  },
];

export const oportunidadesMock: Oportunidade[] = [
  {
    id: 'op-1',
    titulo: 'Licenças Enterprise - TechSol',
    contaId: 'conta-1',
    contatosIds: ['contato-1', 'contato-2'],
    valorEstimado: 120000,
    probabilidade: 80,
    dataPrevisao: '2026-03-15',
    etapa: 'negociacao',
    origem: 'LinkedIn',
    proprietarioId: pessoasMock[0].id,
    createdAt: '2026-01-20',
    ultimaAtividade: '2026-02-03',
    proximaAcao: 'Enviar contrato revisado',
    checklist: [
      { item: 'Reunião de descoberta', completo: true },
      { item: 'Apresentação técnica', completo: true },
      { item: 'Enviar proposta', completo: true },
      { item: 'Negociar valores', completo: false },
    ],
    historicoEtapas: [
      { etapa: 'prospeccao', data: '2026-01-20', usuario: 'Pedro Paulo' },
      { etapa: 'qualificacao', data: '2026-01-25', usuario: 'Pedro Paulo' },
      { etapa: 'proposta', data: '2026-02-01', usuario: 'Pedro Paulo' },
      { etapa: 'negociacao', data: '2026-02-03', usuario: 'Pedro Paulo' },
    ]
  },
  {
    id: 'op-2',
    titulo: 'Automação Industrial - ABC',
    contaId: 'conta-2',
    contatosIds: ['contato-3'],
    valorEstimado: 250000,
    probabilidade: 40,
    dataPrevisao: '2026-04-30',
    etapa: 'diagnostico',
    origem: 'Google Ads',
    concorrente: 'Competitor X',
    proprietarioId: pessoasMock[1].id,
    createdAt: '2026-01-10',
    ultimaAtividade: '2026-01-28',
    proximaAcao: 'Agendar visita técnica',
    checklist: [
      { item: 'Reunião de descoberta', completo: true },
      { item: 'Levantamento técnico', completo: false },
      { item: 'Visita técnica', completo: false },
    ],
    historicoEtapas: [
      { etapa: 'prospeccao', data: '2026-01-10', usuario: 'Maria Costa' },
      { etapa: 'qualificacao', data: '2026-01-18', usuario: 'Maria Costa' },
      { etapa: 'diagnostico', data: '2026-01-25', usuario: 'Maria Costa' },
    ]
  },
  {
    id: 'op-3',
    titulo: 'ERP Construção - Nova Era',
    contaId: 'conta-3',
    contatosIds: [],
    valorEstimado: 85000,
    probabilidade: 60,
    dataPrevisao: '2026-02-28',
    etapa: 'proposta',
    origem: 'Indicação',
    proprietarioId: pessoasMock[0].id,
    createdAt: '2026-01-05',
    ultimaAtividade: '2026-02-01',
    proximaAcao: 'Follow-up proposta',
    checklist: [
      { item: 'Reunião inicial', completo: true },
      { item: 'Demo do sistema', completo: true },
      { item: 'Proposta enviada', completo: true },
    ],
    historicoEtapas: [
      { etapa: 'prospeccao', data: '2026-01-05', usuario: 'Pedro Paulo' },
      { etapa: 'proposta', data: '2026-01-25', usuario: 'Pedro Paulo' },
    ]
  },
  {
    id: 'op-4',
    titulo: 'Consultoria Estratégica',
    contaId: 'conta-1',
    contatosIds: ['contato-1'],
    valorEstimado: 45000,
    probabilidade: 20,
    dataPrevisao: '2026-05-15',
    etapa: 'qualificacao',
    origem: 'Site',
    proprietarioId: pessoasMock[2].id,
    createdAt: '2026-02-01',
    checklist: [],
    historicoEtapas: [
      { etapa: 'prospeccao', data: '2026-02-01', usuario: 'Carlos Santos' },
      { etapa: 'qualificacao', data: '2026-02-03', usuario: 'Carlos Santos' },
    ]
  },
];

export const propostasMock: Proposta[] = [
  {
    id: 'prop-1',
    numero: 'PROP-2026-001',
    contaId: 'conta-1',
    oportunidadeId: 'op-1',
    status: 'enviada',
    valor: 120000,
    validade: '2026-02-28',
    responsavelId: pessoasMock[0].id,
    versao: 2,
    itens: [
      { produto: 'Licença Enterprise', quantidade: 50, precoUnit: 2000, desconto: 10 },
      { produto: 'Suporte Premium', quantidade: 1, precoUnit: 20000, desconto: 0 },
    ],
    condicoes: {
      prazoEntrega: '30 dias',
      formaPagamento: '30/60/90',
      garantia: '12 meses',
      observacoes: 'Inclui treinamento'
    },
    createdAt: '2026-02-01'
  },
  {
    id: 'prop-2',
    numero: 'PROP-2026-002',
    contaId: 'conta-3',
    oportunidadeId: 'op-3',
    status: 'enviada',
    valor: 85000,
    validade: '2026-02-15',
    responsavelId: pessoasMock[0].id,
    versao: 1,
    itens: [
      { produto: 'ERP Módulo Obras', quantidade: 1, precoUnit: 60000, desconto: 0 },
      { produto: 'Implantação', quantidade: 1, precoUnit: 25000, desconto: 0 },
    ],
    condicoes: {
      prazoEntrega: '60 dias',
      formaPagamento: '50% entrada + 50% na entrega',
      garantia: '6 meses',
      observacoes: ''
    },
    createdAt: '2026-01-25'
  },
];

export const pedidosMock: Pedido[] = [
  {
    id: 'ped-1',
    numero: 'PED-2026-001',
    contaId: 'conta-1',
    propostaId: 'prop-1',
    status: 'aberto',
    valor: 120000,
    condicaoPagamento: '30/60/90',
    itens: [
      { produto: 'Licença Enterprise', quantidade: 50, precoUnit: 1800 },
      { produto: 'Suporte Premium', quantidade: 1, precoUnit: 20000 },
    ],
    createdAt: '2026-02-03'
  },
];

export const atividadesMock: Atividade[] = [
  {
    id: 'atv-1',
    tipo: 'reuniao',
    titulo: 'Apresentação de proposta TechSol',
    data: '2026-02-05',
    hora: '14:00',
    status: 'pendente',
    responsavelId: pessoasMock[0].id,
    relacionadoTipo: 'oportunidade',
    relacionadoId: 'op-1'
  },
  {
    id: 'atv-2',
    tipo: 'ligacao',
    titulo: 'Follow-up ABC Indústria',
    data: '2026-02-04',
    hora: '10:00',
    status: 'pendente',
    responsavelId: pessoasMock[1].id,
    relacionadoTipo: 'oportunidade',
    relacionadoId: 'op-2'
  },
  {
    id: 'atv-3',
    tipo: 'tarefa',
    titulo: 'Preparar proposta Nova Era',
    data: '2026-02-03',
    status: 'concluida',
    responsavelId: pessoasMock[0].id,
    relacionadoTipo: 'oportunidade',
    relacionadoId: 'op-3'
  },
  {
    id: 'atv-4',
    tipo: 'email',
    titulo: 'Enviar materiais para lead',
    data: '2026-02-04',
    status: 'pendente',
    responsavelId: pessoasMock[0].id,
    relacionadoTipo: 'lead',
    relacionadoId: 'lead-3'
  },
];

export const metasMock: Meta[] = [
  { id: 'meta-1', vendedorId: pessoasMock[0].id, periodo: '2026-02', tipo: 'receita', valorMeta: 200000, valorRealizado: 120000 },
  { id: 'meta-2', vendedorId: pessoasMock[1].id, periodo: '2026-02', tipo: 'receita', valorMeta: 150000, valorRealizado: 85000 },
  { id: 'meta-3', vendedorId: pessoasMock[2].id, periodo: '2026-02', tipo: 'receita', valorMeta: 100000, valorRealizado: 45000 },
  { id: 'meta-4', vendedorId: pessoasMock[0].id, periodo: '2026-02', tipo: 'novos_clientes', valorMeta: 5, valorRealizado: 3 },
];

export const comissoesMock: Comissao[] = [
  { id: 'com-1', vendedorId: pessoasMock[0].id, oportunidadeId: 'op-1', valor: 6000, status: 'prevista', percentual: 5, dataBase: '2026-02-03' },
  { id: 'com-2', vendedorId: pessoasMock[0].id, oportunidadeId: 'op-3', valor: 4250, status: 'prevista', percentual: 5, dataBase: '2026-01-25' },
];

export const produtosComercialMock: ProdutoComercial[] = [
  { id: 'prod-1', codigo: 'LIC-ENT', nome: 'Licença Enterprise', categoria: 'Software', precoBase: 2000, margem: 60, ativo: true },
  { id: 'prod-2', codigo: 'SUP-PREM', nome: 'Suporte Premium', categoria: 'Serviço', precoBase: 20000, margem: 80, ativo: true },
  { id: 'prod-3', codigo: 'IMPL-STD', nome: 'Implantação Standard', categoria: 'Serviço', precoBase: 15000, margem: 50, ativo: true },
  { id: 'prod-4', codigo: 'ERP-OBR', nome: 'ERP Módulo Obras', categoria: 'Software', precoBase: 60000, margem: 55, ativo: true },
  { id: 'prod-5', codigo: 'CONS-EST', nome: 'Consultoria Estratégica', categoria: 'Serviço', precoBase: 3000, margem: 70, ativo: true },
];

// Helper functions
export function getLeadsByOwner(ownerId: string) {
  return leadsMock.filter(l => l.proprietarioId === ownerId);
}

export function getOportunidadesByEtapa(etapa: string) {
  return oportunidadesMock.filter(o => o.etapa === etapa);
}

export function getOportunidadesByOwner(ownerId: string) {
  return oportunidadesMock.filter(o => o.proprietarioId === ownerId);
}

export function getPipelineTotal() {
  return oportunidadesMock
    .filter(o => !['ganho', 'perdido'].includes(o.etapa))
    .reduce((sum, o) => sum + o.valorEstimado, 0);
}

export function getForecastPonderado() {
  return oportunidadesMock
    .filter(o => !['ganho', 'perdido'].includes(o.etapa))
    .reduce((sum, o) => sum + (o.valorEstimado * o.probabilidade / 100), 0);
}

export function getAtividadesPendentes(userId: string) {
  return atividadesMock.filter(a => a.responsavelId === userId && a.status === 'pendente');
}

export function getContaById(id: string) {
  return contasMock.find(c => c.id === id);
}

export function getContatosByContaId(contaId: string) {
  return contatosMock.filter(c => c.contaId === contaId);
}
