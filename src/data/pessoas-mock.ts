// Dados mockados de pessoas para o sistema

export interface Pessoa {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  setor: string;
  setorId: string;
  gestorId: string | null;
  gestorNome: string | null;
  tipoVinculo: 'CLT' | 'PJ' | 'Estagiário' | 'Temporário' | 'Terceirizado';
  dataAdmissao: string;
  status: 'Ativo' | 'Afastado' | 'Desligado';
  salario?: number;
  avatar?: string;
  iniciais: string;
  // Dados pessoais
  dataNascimento?: string;
  cpf?: string;
  rg?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}

export interface Setor {
  id: string;
  nome: string;
  areaPaiId: string | null;
  areaPaiNome: string | null;
  responsavelId: string | null;
  responsavelNome: string | null;
  qtdePessoas: number;
  status: 'Ativo' | 'Inativo';
}

export interface Cargo {
  id: string;
  nome: string;
  descricao: string;
  nivel: string;
  status: 'Ativo' | 'Inativo';
}

// Setores/Áreas da empresa
export const setoresMock: Setor[] = [
  { id: '1', nome: 'Diretoria', areaPaiId: null, areaPaiNome: null, responsavelId: '1', responsavelNome: 'Carlos Silva', qtdePessoas: 2, status: 'Ativo' },
  { id: '2', nome: 'Tecnologia', areaPaiId: '1', areaPaiNome: 'Diretoria', responsavelId: '2', responsavelNome: 'Ana Santos', qtdePessoas: 5, status: 'Ativo' },
  { id: '3', nome: 'RH', areaPaiId: '1', areaPaiNome: 'Diretoria', responsavelId: '3', responsavelNome: 'Maria Oliveira', qtdePessoas: 3, status: 'Ativo' },
  { id: '4', nome: 'Financeiro', areaPaiId: '1', areaPaiNome: 'Diretoria', responsavelId: '4', responsavelNome: 'João Costa', qtdePessoas: 4, status: 'Ativo' },
  { id: '5', nome: 'Operações', areaPaiId: '1', areaPaiNome: 'Diretoria', responsavelId: '5', responsavelNome: 'Pedro Mendes', qtdePessoas: 8, status: 'Ativo' },
  { id: '6', nome: 'Desenvolvimento', areaPaiId: '2', areaPaiNome: 'Tecnologia', responsavelId: '6', responsavelNome: 'Lucas Ferreira', qtdePessoas: 4, status: 'Ativo' },
  { id: '7', nome: 'Infraestrutura', areaPaiId: '2', areaPaiNome: 'Tecnologia', responsavelId: '7', responsavelNome: 'Rafael Lima', qtdePessoas: 2, status: 'Ativo' },
  { id: '8', nome: 'Comercial', areaPaiId: '1', areaPaiNome: 'Diretoria', responsavelId: '8', responsavelNome: 'Fernanda Rocha', qtdePessoas: 6, status: 'Ativo' },
];

// Cargos
export const cargosMock: Cargo[] = [
  { id: '1', nome: 'Diretor', descricao: 'Direção executiva', nivel: 'Executivo', status: 'Ativo' },
  { id: '2', nome: 'Gerente', descricao: 'Gestão de equipe', nivel: 'Gerencial', status: 'Ativo' },
  { id: '3', nome: 'Coordenador', descricao: 'Coordenação de projetos', nivel: 'Coordenação', status: 'Ativo' },
  { id: '4', nome: 'Analista Sênior', descricao: 'Análise especializada', nivel: 'Sênior', status: 'Ativo' },
  { id: '5', nome: 'Analista Pleno', descricao: 'Análise intermediária', nivel: 'Pleno', status: 'Ativo' },
  { id: '6', nome: 'Analista Júnior', descricao: 'Análise inicial', nivel: 'Júnior', status: 'Ativo' },
  { id: '7', nome: 'Assistente', descricao: 'Suporte operacional', nivel: 'Operacional', status: 'Ativo' },
  { id: '8', nome: 'Estagiário', descricao: 'Aprendizado', nivel: 'Estágio', status: 'Ativo' },
];

// Tipos de vínculo
export const tiposVinculo = [
  { value: 'CLT', label: 'CLT' },
  { value: 'PJ', label: 'PJ' },
  { value: 'Estagiário', label: 'Estagiário' },
  { value: 'Temporário', label: 'Temporário' },
  { value: 'Terceirizado', label: 'Terceirizado' },
];

// Pessoas da empresa
export const pessoasMock: Pessoa[] = [
  {
    id: '1',
    nome: 'Carlos Silva',
    email: 'carlos.silva@serp.com.br',
    telefone: '(11) 99999-0001',
    cargo: 'Diretor',
    setor: 'Diretoria',
    setorId: '1',
    gestorId: null,
    gestorNome: null,
    tipoVinculo: 'CLT',
    dataAdmissao: '2018-01-15',
    status: 'Ativo',
    salario: 35000,
    iniciais: 'CS',
  },
  {
    id: '2',
    nome: 'Ana Santos',
    email: 'ana.santos@serp.com.br',
    telefone: '(11) 99999-0002',
    cargo: 'Gerente',
    setor: 'Tecnologia',
    setorId: '2',
    gestorId: '1',
    gestorNome: 'Carlos Silva',
    tipoVinculo: 'CLT',
    dataAdmissao: '2019-03-01',
    status: 'Ativo',
    salario: 18000,
    iniciais: 'AS',
  },
  {
    id: '3',
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@serp.com.br',
    telefone: '(11) 99999-0003',
    cargo: 'Gerente',
    setor: 'RH',
    setorId: '3',
    gestorId: '1',
    gestorNome: 'Carlos Silva',
    tipoVinculo: 'CLT',
    dataAdmissao: '2019-06-15',
    status: 'Ativo',
    salario: 16000,
    iniciais: 'MO',
  },
  {
    id: '4',
    nome: 'João Costa',
    email: 'joao.costa@serp.com.br',
    telefone: '(11) 99999-0004',
    cargo: 'Gerente',
    setor: 'Financeiro',
    setorId: '4',
    gestorId: '1',
    gestorNome: 'Carlos Silva',
    tipoVinculo: 'CLT',
    dataAdmissao: '2019-08-01',
    status: 'Ativo',
    salario: 17000,
    iniciais: 'JC',
  },
  {
    id: '5',
    nome: 'Pedro Mendes',
    email: 'pedro.mendes@serp.com.br',
    telefone: '(11) 99999-0005',
    cargo: 'Gerente',
    setor: 'Operações',
    setorId: '5',
    gestorId: '1',
    gestorNome: 'Carlos Silva',
    tipoVinculo: 'CLT',
    dataAdmissao: '2020-01-10',
    status: 'Ativo',
    salario: 16500,
    iniciais: 'PM',
  },
  {
    id: '6',
    nome: 'Lucas Ferreira',
    email: 'lucas.ferreira@serp.com.br',
    telefone: '(11) 99999-0006',
    cargo: 'Coordenador',
    setor: 'Desenvolvimento',
    setorId: '6',
    gestorId: '2',
    gestorNome: 'Ana Santos',
    tipoVinculo: 'CLT',
    dataAdmissao: '2020-06-01',
    status: 'Ativo',
    salario: 12000,
    iniciais: 'LF',
  },
  {
    id: '7',
    nome: 'Rafael Lima',
    email: 'rafael.lima@serp.com.br',
    telefone: '(11) 99999-0007',
    cargo: 'Coordenador',
    setor: 'Infraestrutura',
    setorId: '7',
    gestorId: '2',
    gestorNome: 'Ana Santos',
    tipoVinculo: 'CLT',
    dataAdmissao: '2021-02-15',
    status: 'Ativo',
    salario: 11000,
    iniciais: 'RL',
  },
  {
    id: '8',
    nome: 'Fernanda Rocha',
    email: 'fernanda.rocha@serp.com.br',
    telefone: '(11) 99999-0008',
    cargo: 'Gerente',
    setor: 'Comercial',
    setorId: '8',
    gestorId: '1',
    gestorNome: 'Carlos Silva',
    tipoVinculo: 'CLT',
    dataAdmissao: '2020-03-01',
    status: 'Ativo',
    salario: 15000,
    iniciais: 'FR',
  },
  {
    id: '9',
    nome: 'Pedro Piaes',
    email: 'pedro.piaes@serp.com.br',
    telefone: '(11) 99999-9999',
    cargo: 'Analista Sênior',
    setor: 'Desenvolvimento',
    setorId: '6',
    gestorId: '6',
    gestorNome: 'Lucas Ferreira',
    tipoVinculo: 'CLT',
    dataAdmissao: '2023-03-15',
    status: 'Ativo',
    salario: 8500,
    iniciais: 'PP',
    dataNascimento: '1990-05-15',
    cpf: '123.456.789-00',
    endereco: 'Av. Paulista, 1000',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01310-100',
  },
  {
    id: '10',
    nome: 'Juliana Martins',
    email: 'juliana.martins@serp.com.br',
    telefone: '(11) 99999-0010',
    cargo: 'Analista Pleno',
    setor: 'Desenvolvimento',
    setorId: '6',
    gestorId: '6',
    gestorNome: 'Lucas Ferreira',
    tipoVinculo: 'CLT',
    dataAdmissao: '2022-08-01',
    status: 'Ativo',
    salario: 7000,
    iniciais: 'JM',
  },
  {
    id: '11',
    nome: 'Bruno Alves',
    email: 'bruno.alves@serp.com.br',
    telefone: '(11) 99999-0011',
    cargo: 'Analista Júnior',
    setor: 'Desenvolvimento',
    setorId: '6',
    gestorId: '6',
    gestorNome: 'Lucas Ferreira',
    tipoVinculo: 'CLT',
    dataAdmissao: '2023-01-10',
    status: 'Ativo',
    salario: 4500,
    iniciais: 'BA',
  },
  {
    id: '12',
    nome: 'Camila Souza',
    email: 'camila.souza@serp.com.br',
    telefone: '(11) 99999-0012',
    cargo: 'Analista Pleno',
    setor: 'RH',
    setorId: '3',
    gestorId: '3',
    gestorNome: 'Maria Oliveira',
    tipoVinculo: 'CLT',
    dataAdmissao: '2021-04-01',
    status: 'Ativo',
    salario: 6500,
    iniciais: 'CS',
  },
  {
    id: '13',
    nome: 'Diego Santos',
    email: 'diego.santos@serp.com.br',
    telefone: '(11) 99999-0013',
    cargo: 'Assistente',
    setor: 'RH',
    setorId: '3',
    gestorId: '3',
    gestorNome: 'Maria Oliveira',
    tipoVinculo: 'CLT',
    dataAdmissao: '2022-09-01',
    status: 'Ativo',
    salario: 3500,
    iniciais: 'DS',
  },
  {
    id: '14',
    nome: 'Eduardo Pereira',
    email: 'eduardo.pereira@serp.com.br',
    telefone: '(11) 99999-0014',
    cargo: 'Analista Sênior',
    setor: 'Financeiro',
    setorId: '4',
    gestorId: '4',
    gestorNome: 'João Costa',
    tipoVinculo: 'CLT',
    dataAdmissao: '2020-11-01',
    status: 'Ativo',
    salario: 9000,
    iniciais: 'EP',
  },
  {
    id: '15',
    nome: 'Gabriela Nunes',
    email: 'gabriela.nunes@serp.com.br',
    telefone: '(11) 99999-0015',
    cargo: 'Estagiário',
    setor: 'Tecnologia',
    setorId: '2',
    gestorId: '2',
    gestorNome: 'Ana Santos',
    tipoVinculo: 'Estagiário',
    dataAdmissao: '2024-01-15',
    status: 'Ativo',
    salario: 1800,
    iniciais: 'GN',
  },
  {
    id: '16',
    nome: 'Henrique Dias',
    email: 'henrique.dias@serp.com.br',
    telefone: '(11) 99999-0016',
    cargo: 'Analista Pleno',
    setor: 'Infraestrutura',
    setorId: '7',
    gestorId: '7',
    gestorNome: 'Rafael Lima',
    tipoVinculo: 'CLT',
    dataAdmissao: '2022-05-01',
    status: 'Afastado',
    salario: 7500,
    iniciais: 'HD',
  },
];

// Função para obter subordinados de uma pessoa
export function getSubordinados(pessoaId: string): Pessoa[] {
  return pessoasMock.filter(p => p.gestorId === pessoaId);
}

// Função para obter a cadeia de gestores acima
export function getCadeiaGestores(pessoaId: string): Pessoa[] {
  const cadeia: Pessoa[] = [];
  let atual = pessoasMock.find(p => p.id === pessoaId);
  
  while (atual?.gestorId) {
    const gestor = pessoasMock.find(p => p.id === atual!.gestorId);
    if (gestor) {
      cadeia.push(gestor);
      atual = gestor;
    } else {
      break;
    }
  }
  
  return cadeia.reverse();
}

// Função para obter estatísticas do RH
export function getEstatisticasRH() {
  const ativos = pessoasMock.filter(p => p.status === 'Ativo').length;
  const afastados = pessoasMock.filter(p => p.status === 'Afastado').length;
  const desligados = pessoasMock.filter(p => p.status === 'Desligado').length;
  const semGestor = pessoasMock.filter(p => !p.gestorId && p.cargo !== 'Diretor').length;
  const semSetor = pessoasMock.filter(p => !p.setorId).length;
  
  const porSetor = setoresMock.map(s => ({
    setor: s.nome,
    quantidade: pessoasMock.filter(p => p.setorId === s.id && p.status === 'Ativo').length
  }));
  
  return {
    ativos,
    afastados,
    desligados,
    total: pessoasMock.length,
    semGestor,
    semSetor,
    porSetor
  };
}
