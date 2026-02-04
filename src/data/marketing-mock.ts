import { pessoasMock } from './pessoas-mock';

// Types
export interface Campanha {
  id: string;
  nome: string;
  objetivo: string;
  periodo: { inicio: string; fim: string };
  orcamento: number;
  gastoReal: number;
  canal: string;
  status: 'planejada' | 'ativa' | 'pausada' | 'finalizada';
  responsavelId: string;
  utm: { source: string; medium: string; campaign: string };
  tags: string[];
  createdAt: string;
}

export interface Canal {
  id: string;
  nome: string;
  tipo: 'organico' | 'pago' | 'social' | 'email' | 'indicacao' | 'eventos' | 'outbound' | 'parceiros';
  ativo: boolean;
  orcamentoMensal?: number;
}

export interface LeadMarketing {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  origem: string;
  campanhaId?: string;
  canalId: string;
  status: 'lead' | 'mql' | 'sql' | 'convertido' | 'descartado';
  score: number;
  utm?: { source: string; medium: string; campaign: string };
  createdAt: string;
  convertidoEm?: string;
}

export interface Segmento {
  id: string;
  nome: string;
  descricao: string;
  criterios: { campo: string; operador: string; valor: string }[];
  totalContatos: number;
  ativo: boolean;
}

export interface ConteudoAsset {
  id: string;
  titulo: string;
  tipo: 'pdf' | 'video' | 'apresentacao' | 'imagem' | 'link';
  url: string;
  tema: string;
  funil: 'topo' | 'meio' | 'fundo';
  campanhasIds: string[];
  downloads: number;
  createdAt: string;
}

export interface LandingPage {
  id: string;
  nome: string;
  url: string;
  status: 'ativa' | 'inativa' | 'rascunho';
  campanhaId?: string;
  conversoes: number;
  visitas: number;
  campos: string[];
}

export interface Automacao {
  id: string;
  nome: string;
  trigger: string;
  acoes: { tipo: string; config: any }[];
  status: 'ativa' | 'pausada' | 'rascunho';
  segmentoId?: string;
  execucoes: number;
}

export interface Evento {
  id: string;
  nome: string;
  tipo: 'webinar' | 'feira' | 'workshop' | 'conferencia';
  data: string;
  local?: string;
  custo: number;
  leadsCaptados: number;
  status: 'planejado' | 'realizado' | 'cancelado';
}

export interface OrcamentoMarketing {
  id: string;
  campanhaId?: string;
  canalId?: string;
  periodo: string;
  orcado: number;
  realizado: number;
  categoria: string;
}

// Canais disponíveis
export const canaisMock: Canal[] = [
  { id: 'canal-1', nome: 'Google Ads', tipo: 'pago', ativo: true, orcamentoMensal: 15000 },
  { id: 'canal-2', nome: 'LinkedIn', tipo: 'social', ativo: true, orcamentoMensal: 8000 },
  { id: 'canal-3', nome: 'SEO/Orgânico', tipo: 'organico', ativo: true },
  { id: 'canal-4', nome: 'Email Marketing', tipo: 'email', ativo: true, orcamentoMensal: 2000 },
  { id: 'canal-5', nome: 'Indicação', tipo: 'indicacao', ativo: true },
  { id: 'canal-6', nome: 'Eventos', tipo: 'eventos', ativo: true, orcamentoMensal: 10000 },
  { id: 'canal-7', nome: 'Outbound', tipo: 'outbound', ativo: true, orcamentoMensal: 5000 },
  { id: 'canal-8', nome: 'Parceiros', tipo: 'parceiros', ativo: true },
];

// Campanhas mock
export const campanhasMock: Campanha[] = [
  {
    id: 'camp-1',
    nome: 'Lançamento ERP 2026',
    objetivo: 'Gerar 200 leads qualificados',
    periodo: { inicio: '2026-01-15', fim: '2026-03-15' },
    orcamento: 50000,
    gastoReal: 28000,
    canal: 'Google Ads',
    status: 'ativa',
    responsavelId: pessoasMock[0].id,
    utm: { source: 'google', medium: 'cpc', campaign: 'erp2026' },
    tags: ['produto', 'lancamento'],
    createdAt: '2026-01-10'
  },
  {
    id: 'camp-2',
    nome: 'Webinar Automação Industrial',
    objetivo: 'Educar mercado e gerar SQLs',
    periodo: { inicio: '2026-02-01', fim: '2026-02-28' },
    orcamento: 15000,
    gastoReal: 8500,
    canal: 'LinkedIn',
    status: 'ativa',
    responsavelId: pessoasMock[1].id,
    utm: { source: 'linkedin', medium: 'sponsored', campaign: 'webinar-automacao' },
    tags: ['webinar', 'educacao'],
    createdAt: '2026-01-20'
  },
  {
    id: 'camp-3',
    nome: 'Nurturing Base Existente',
    objetivo: 'Reativar leads frios',
    periodo: { inicio: '2026-01-01', fim: '2026-06-30' },
    orcamento: 5000,
    gastoReal: 1200,
    canal: 'Email Marketing',
    status: 'ativa',
    responsavelId: pessoasMock[0].id,
    utm: { source: 'email', medium: 'nurturing', campaign: 'reativacao-q1' },
    tags: ['nurturing', 'email'],
    createdAt: '2025-12-20'
  },
  {
    id: 'camp-4',
    nome: 'Feira Tech Summit 2026',
    objetivo: 'Branding e geração de leads',
    periodo: { inicio: '2026-03-10', fim: '2026-03-12' },
    orcamento: 80000,
    gastoReal: 0,
    canal: 'Eventos',
    status: 'planejada',
    responsavelId: pessoasMock[2].id,
    utm: { source: 'evento', medium: 'feira', campaign: 'techsummit2026' },
    tags: ['feira', 'presencial'],
    createdAt: '2026-01-05'
  },
];

// Leads de Marketing
export const leadsMarketingMock: LeadMarketing[] = [
  { id: 'mkt-lead-1', nome: 'Marcos Vieira', email: 'marcos@empresa1.com', empresa: 'Empresa 1', origem: 'Google Ads', campanhaId: 'camp-1', canalId: 'canal-1', status: 'mql', score: 72, createdAt: '2026-01-25' },
  { id: 'mkt-lead-2', nome: 'Julia Santos', email: 'julia@empresa2.com', empresa: 'Empresa 2', origem: 'LinkedIn', campanhaId: 'camp-2', canalId: 'canal-2', status: 'sql', score: 85, createdAt: '2026-02-01' },
  { id: 'mkt-lead-3', nome: 'Roberto Lima', email: 'roberto@empresa3.com', empresa: 'Empresa 3', origem: 'SEO', canalId: 'canal-3', status: 'lead', score: 45, createdAt: '2026-02-02' },
  { id: 'mkt-lead-4', nome: 'Amanda Costa', email: 'amanda@empresa4.com', empresa: 'Empresa 4', origem: 'Google Ads', campanhaId: 'camp-1', canalId: 'canal-1', status: 'mql', score: 68, createdAt: '2026-01-28' },
  { id: 'mkt-lead-5', nome: 'Felipe Oliveira', email: 'felipe@empresa5.com', empresa: 'Empresa 5', origem: 'Indicação', canalId: 'canal-5', status: 'sql', score: 90, createdAt: '2026-01-20' },
  { id: 'mkt-lead-6', nome: 'Carla Mendes', email: 'carla@empresa6.com', empresa: 'Empresa 6', origem: 'Email', campanhaId: 'camp-3', canalId: 'canal-4', status: 'convertido', score: 95, createdAt: '2026-01-15', convertidoEm: '2026-02-01' },
  { id: 'mkt-lead-7', nome: 'Bruno Alves', email: 'bruno@empresa7.com', empresa: 'Empresa 7', origem: 'LinkedIn', campanhaId: 'camp-2', canalId: 'canal-2', status: 'mql', score: 58, createdAt: '2026-02-03' },
];

// Segmentos
export const segmentosMock: Segmento[] = [
  { id: 'seg-1', nome: 'Enterprise TI', descricao: 'Empresas de TI com +100 funcionários', criterios: [{ campo: 'segmento', operador: 'equals', valor: 'TI' }, { campo: 'porte', operador: 'in', valor: 'media,grande' }], totalContatos: 1250, ativo: true },
  { id: 'seg-2', nome: 'Indústria SP', descricao: 'Indústrias localizadas em São Paulo', criterios: [{ campo: 'segmento', operador: 'equals', valor: 'Indústria' }, { campo: 'uf', operador: 'equals', valor: 'SP' }], totalContatos: 890, ativo: true },
  { id: 'seg-3', nome: 'Leads Quentes', descricao: 'Score acima de 70', criterios: [{ campo: 'score', operador: 'gte', valor: '70' }], totalContatos: 320, ativo: true },
];

// Conteúdos
export const conteudosMock: ConteudoAsset[] = [
  { id: 'asset-1', titulo: 'E-book: Guia de ERP', tipo: 'pdf', url: '/assets/ebook-erp.pdf', tema: 'ERP', funil: 'topo', campanhasIds: ['camp-1'], downloads: 450, createdAt: '2025-11-01' },
  { id: 'asset-2', titulo: 'Case TechSol', tipo: 'pdf', url: '/assets/case-techsol.pdf', tema: 'Cases', funil: 'fundo', campanhasIds: ['camp-1', 'camp-2'], downloads: 180, createdAt: '2025-12-15' },
  { id: 'asset-3', titulo: 'Webinar: Automação', tipo: 'video', url: 'https://youtube.com/webinar-auto', tema: 'Automação', funil: 'meio', campanhasIds: ['camp-2'], downloads: 320, createdAt: '2026-02-01' },
];

// Landing Pages
export const landingPagesMock: LandingPage[] = [
  { id: 'lp-1', nome: 'ERP 2026 - Demo', url: 'https://serp.com/demo-erp', status: 'ativa', campanhaId: 'camp-1', conversoes: 85, visitas: 1200, campos: ['nome', 'email', 'empresa', 'telefone'] },
  { id: 'lp-2', nome: 'Webinar Automação', url: 'https://serp.com/webinar-automacao', status: 'ativa', campanhaId: 'camp-2', conversoes: 120, visitas: 450, campos: ['nome', 'email', 'empresa'] },
];

// Automações
export const automacoesMock: Automacao[] = [
  { id: 'auto-1', nome: 'Welcome Series', trigger: 'Novo lead captado', acoes: [{ tipo: 'email', config: { template: 'welcome' } }, { tipo: 'score', config: { add: 10 } }], status: 'ativa', execucoes: 450 },
  { id: 'auto-2', nome: 'Score > 70 → MQL', trigger: 'Score atinge 70', acoes: [{ tipo: 'status', config: { novo: 'mql' } }, { tipo: 'notificar', config: { para: 'vendas' } }], status: 'ativa', execucoes: 85 },
  { id: 'auto-3', nome: 'Lead Frio → Nurturing', trigger: 'Sem interação 30 dias', acoes: [{ tipo: 'segmento', config: { add: 'nurturing' } }], status: 'pausada', execucoes: 120 },
];

// Eventos
export const eventosMock: Evento[] = [
  { id: 'evt-1', nome: 'Webinar Automação Industrial', tipo: 'webinar', data: '2026-02-15', custo: 2000, leadsCaptados: 120, status: 'planejado' },
  { id: 'evt-2', nome: 'Tech Summit 2026', tipo: 'feira', data: '2026-03-10', local: 'São Paulo Expo', custo: 80000, leadsCaptados: 0, status: 'planejado' },
  { id: 'evt-3', nome: 'Workshop ERP', tipo: 'workshop', data: '2026-01-20', custo: 5000, leadsCaptados: 45, status: 'realizado' },
];

// Orçamentos
export const orcamentosMock: OrcamentoMarketing[] = [
  { id: 'orc-1', canalId: 'canal-1', periodo: '2026-02', orcado: 15000, realizado: 12500, categoria: 'Mídia Paga' },
  { id: 'orc-2', canalId: 'canal-2', periodo: '2026-02', orcado: 8000, realizado: 6200, categoria: 'Social' },
  { id: 'orc-3', campanhaId: 'camp-1', periodo: '2026-02', orcado: 20000, realizado: 14000, categoria: 'Campanhas' },
];

// Métricas calculadas
export interface MetricasMarketing {
  leads: number;
  mql: number;
  sql: number;
  conversoes: number;
  cpl: number;
  cac: number;
  roi: number;
  pipelineInfluenciado: number;
  receitaAtribuida: number;
}

// Helper functions
export function getLeadsByCanal(canalId: string) {
  return leadsMarketingMock.filter(l => l.canalId === canalId);
}

export function getLeadsByCampanha(campanhaId: string) {
  return leadsMarketingMock.filter(l => l.campanhaId === campanhaId);
}

export function getLeadsByStatus(status: LeadMarketing['status']) {
  return leadsMarketingMock.filter(l => l.status === status);
}

export function calcularMetricasCanal(canalId: string): Partial<MetricasMarketing> {
  const leads = getLeadsByCanal(canalId);
  const canal = canaisMock.find(c => c.id === canalId);
  
  const totalLeads = leads.length;
  const mqls = leads.filter(l => ['mql', 'sql', 'convertido'].includes(l.status)).length;
  const sqls = leads.filter(l => ['sql', 'convertido'].includes(l.status)).length;
  const conversoes = leads.filter(l => l.status === 'convertido').length;
  
  const gastoMensal = canal?.orcamentoMensal || 0;
  const cpl = totalLeads > 0 ? gastoMensal / totalLeads : 0;
  
  return {
    leads: totalLeads,
    mql: mqls,
    sql: sqls,
    conversoes,
    cpl
  };
}

export function calcularMetricasCampanha(campanhaId: string): Partial<MetricasMarketing> {
  const campanha = campanhasMock.find(c => c.id === campanhaId);
  const leads = getLeadsByCampanha(campanhaId);
  
  const totalLeads = leads.length;
  const mqls = leads.filter(l => ['mql', 'sql', 'convertido'].includes(l.status)).length;
  const sqls = leads.filter(l => ['sql', 'convertido'].includes(l.status)).length;
  const conversoes = leads.filter(l => l.status === 'convertido').length;
  
  const gastoReal = campanha?.gastoReal || 0;
  const cpl = totalLeads > 0 ? gastoReal / totalLeads : 0;
  
  // ROI simulado (receita atribuída seria calculada com dados reais)
  const receitaSimulada = conversoes * 50000; // ticket médio hipotético
  const roi = gastoReal > 0 ? ((receitaSimulada - gastoReal) / gastoReal) * 100 : 0;
  
  return {
    leads: totalLeads,
    mql: mqls,
    sql: sqls,
    conversoes,
    cpl,
    roi,
    receitaAtribuida: receitaSimulada
  };
}

export function getMetricasGerais(): MetricasMarketing {
  const totalLeads = leadsMarketingMock.length;
  const mqls = leadsMarketingMock.filter(l => ['mql', 'sql', 'convertido'].includes(l.status)).length;
  const sqls = leadsMarketingMock.filter(l => ['sql', 'convertido'].includes(l.status)).length;
  const conversoes = leadsMarketingMock.filter(l => l.status === 'convertido').length;
  
  const gastoTotal = campanhasMock.reduce((sum, c) => sum + c.gastoReal, 0);
  const cpl = totalLeads > 0 ? gastoTotal / totalLeads : 0;
  const cac = conversoes > 0 ? gastoTotal / conversoes : 0;
  
  const receitaAtribuida = conversoes * 85000; // ticket médio
  const roi = gastoTotal > 0 ? ((receitaAtribuida - gastoTotal) / gastoTotal) * 100 : 0;
  const pipelineInfluenciado = mqls * 120000; // valor médio oportunidade
  
  return {
    leads: totalLeads,
    mql: mqls,
    sql: sqls,
    conversoes,
    cpl,
    cac,
    roi,
    pipelineInfluenciado,
    receitaAtribuida
  };
}

// Dados para gráficos
export const leadsPorCanalData = canaisMock.map(canal => ({
  canal: canal.nome,
  leads: getLeadsByCanal(canal.id).length,
  mql: getLeadsByCanal(canal.id).filter(l => ['mql', 'sql', 'convertido'].includes(l.status)).length,
  sql: getLeadsByCanal(canal.id).filter(l => ['sql', 'convertido'].includes(l.status)).length,
}));

export const funilMarketingData = [
  { etapa: 'Leads', valor: leadsMarketingMock.length },
  { etapa: 'MQL', valor: leadsMarketingMock.filter(l => ['mql', 'sql', 'convertido'].includes(l.status)).length },
  { etapa: 'SQL', valor: leadsMarketingMock.filter(l => ['sql', 'convertido'].includes(l.status)).length },
  { etapa: 'Oportunidade', valor: leadsMarketingMock.filter(l => l.status === 'convertido').length },
  { etapa: 'Venda', valor: 1 }, // simplificado
];

export const roiPorCampanhaData = campanhasMock.map(camp => {
  const metrics = calcularMetricasCampanha(camp.id);
  return {
    campanha: camp.nome.substring(0, 20) + (camp.nome.length > 20 ? '...' : ''),
    roi: metrics.roi || 0,
    gasto: camp.gastoReal,
    receita: metrics.receitaAtribuida || 0,
  };
});
