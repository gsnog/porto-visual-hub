export interface NotaFiscalItem {
  id: string;
  itemCadastro: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  desconto: number;
  total: number;
  ncm?: string;
  cst?: string;
}

export interface TributoNota {
  imposto: string;
  baseCalculo: number;
  aliquota: number;
  valorCalculado: number;
  valorFinal: number;
  ajustadoPor?: string;
  ajustadoEm?: string;
  justificativa?: string;
}

export interface EventoAPI {
  id: string;
  data: string;
  tipo: string;
  status: string;
  mensagem: string;
  protocolo?: string;
  tentativa: number;
}

export interface ArquivoNota {
  id: string;
  tipo: string;
  nome: string;
  tamanho: string;
  data: string;
}

export interface AuditoriaFiscal {
  id: string;
  campo: string;
  valorAnterior: string;
  valorNovo: string;
  usuario: string;
  data: string;
  justificativa?: string;
}

export interface NotaFiscal {
  id: number;
  numero: number;
  serie: string;
  tipo: "NF-e" | "NFS-e";
  status: "Rascunho" | "Em validação" | "Enviada" | "Autorizada" | "Rejeitada" | "Cancelada";
  dataEmissao: string;
  naturezaOperacao: string;
  cliente: string;
  clienteCpfCnpj: string;
  clienteEndereco: string;
  clienteMunicipio: string;
  clienteUf: string;
  subtotal: number;
  descontos: number;
  outrasDespesas: number;
  totalFinal: number;
  observacoesFiscais: string;
  revisadoContador: boolean;
  revisadoContadorPor?: string;
  revisadoContadorEm?: string;
  ultimoRetorno: string;
  itens: NotaFiscalItem[];
  tributos: TributoNota[];
  eventos: EventoAPI[];
  arquivos: ArquivoNota[];
  auditoria: AuditoriaFiscal[];
}

export const mockNotasFiscais: NotaFiscal[] = [
  {
    id: 1, numero: 152, serie: "1", tipo: "NF-e",
    status: "Autorizada", dataEmissao: "18/02/2026",
    naturezaOperacao: "Venda de mercadoria",
    cliente: "ABC Ltda", clienteCpfCnpj: "12.345.678/0001-90",
    clienteEndereco: "Rua das Flores, 100", clienteMunicipio: "São Paulo", clienteUf: "SP",
    subtotal: 5400, descontos: 0, outrasDespesas: 0, totalFinal: 5400,
    observacoesFiscais: "", revisadoContador: true,
    revisadoContadorPor: "Carlos Silva (Contador)", revisadoContadorEm: "18/02/2026 09:30",
    ultimoRetorno: "Autorizado - 100",
    itens: [
      { id: "i1", itemCadastro: "PRD-001", descricao: "Parafuso Inox M10", quantidade: 500, valorUnitario: 4.80, desconto: 0, total: 2400, ncm: "73181500", cst: "000" },
      { id: "i2", itemCadastro: "PRD-002", descricao: "Porca Sextavada M10", quantidade: 500, valorUnitario: 6.00, desconto: 0, total: 3000, ncm: "73181600", cst: "000" },
    ],
    tributos: [
      { imposto: "ICMS", baseCalculo: 5400, aliquota: 18, valorCalculado: 972, valorFinal: 972 },
      { imposto: "IPI", baseCalculo: 5400, aliquota: 5, valorCalculado: 270, valorFinal: 270 },
      { imposto: "PIS", baseCalculo: 5400, aliquota: 1.65, valorCalculado: 89.10, valorFinal: 89.10 },
      { imposto: "COFINS", baseCalculo: 5400, aliquota: 7.60, valorCalculado: 410.40, valorFinal: 410.40 },
    ],
    eventos: [
      { id: "e1", data: "18/02/2026 09:15", tipo: "Envio", status: "Sucesso", mensagem: "Lote recebido com sucesso", protocolo: "135260000012345", tentativa: 1 },
      { id: "e2", data: "18/02/2026 09:16", tipo: "Retorno", status: "Autorizada", mensagem: "Autorizado o uso da NF-e - Protocolo 135260000012345", protocolo: "135260000012345", tentativa: 1 },
    ],
    arquivos: [
      { id: "a1", tipo: "XML", nome: "NFe_152_ABC.xml", tamanho: "48 KB", data: "18/02/2026" },
      { id: "a2", tipo: "PDF", nome: "DANFE_152_ABC.pdf", tamanho: "125 KB", data: "18/02/2026" },
    ],
    auditoria: [],
  },
  {
    id: 2, numero: 151, serie: "1", tipo: "NF-e",
    status: "Rejeitada", dataEmissao: "17/02/2026",
    naturezaOperacao: "Venda de mercadoria",
    cliente: "XYZ SA", clienteCpfCnpj: "98.765.432/0001-10",
    clienteEndereco: "Av. Brasil, 500", clienteMunicipio: "Rio de Janeiro", clienteUf: "RJ",
    subtotal: 12800, descontos: 0, outrasDespesas: 0, totalFinal: 12800,
    observacoesFiscais: "", revisadoContador: false,
    ultimoRetorno: "Erro 539 - Duplicidade de NF-e",
    itens: [
      { id: "i3", itemCadastro: "PRD-003", descricao: "Chapa de Aço 3mm", quantidade: 20, valorUnitario: 640, desconto: 0, total: 12800, ncm: "72085100", cst: "000" },
    ],
    tributos: [
      { imposto: "ICMS", baseCalculo: 12800, aliquota: 12, valorCalculado: 1536, valorFinal: 1536 },
      { imposto: "IPI", baseCalculo: 12800, aliquota: 5, valorCalculado: 640, valorFinal: 640 },
      { imposto: "PIS", baseCalculo: 12800, aliquota: 1.65, valorCalculado: 211.20, valorFinal: 211.20 },
      { imposto: "COFINS", baseCalculo: 12800, aliquota: 7.60, valorCalculado: 972.80, valorFinal: 972.80 },
    ],
    eventos: [
      { id: "e3", data: "17/02/2026 14:30", tipo: "Envio", status: "Sucesso", mensagem: "Lote recebido com sucesso", tentativa: 1 },
      { id: "e4", data: "17/02/2026 14:31", tipo: "Retorno", status: "Rejeitada", mensagem: "Rejeição 539 - Duplicidade de NF-e, com diferença na Chave de Acesso", tentativa: 1 },
    ],
    arquivos: [],
    auditoria: [],
  },
  {
    id: 3, numero: 150, serie: "1", tipo: "NF-e",
    status: "Rascunho", dataEmissao: "16/02/2026",
    naturezaOperacao: "Venda de mercadoria",
    cliente: "DEF ME", clienteCpfCnpj: "11.222.333/0001-44",
    clienteEndereco: "Rua Ipanema, 25", clienteMunicipio: "Belo Horizonte", clienteUf: "MG",
    subtotal: 3200, descontos: 0, outrasDespesas: 0, totalFinal: 3200,
    observacoesFiscais: "Nota em elaboração", revisadoContador: false,
    ultimoRetorno: "—",
    itens: [
      { id: "i4", itemCadastro: "PRD-004", descricao: "Tubo PVC 100mm", quantidade: 40, valorUnitario: 80, desconto: 0, total: 3200, ncm: "39172300", cst: "000" },
    ],
    tributos: [
      { imposto: "ICMS", baseCalculo: 3200, aliquota: 18, valorCalculado: 576, valorFinal: 576 },
      { imposto: "PIS", baseCalculo: 3200, aliquota: 1.65, valorCalculado: 52.80, valorFinal: 52.80 },
      { imposto: "COFINS", baseCalculo: 3200, aliquota: 7.60, valorCalculado: 243.20, valorFinal: 243.20 },
    ],
    eventos: [],
    arquivos: [],
    auditoria: [],
  },
  {
    id: 4, numero: 48, serie: "1", tipo: "NFS-e",
    status: "Autorizada", dataEmissao: "15/02/2026",
    naturezaOperacao: "Prestação de serviço de consultoria",
    cliente: "GHI Consultoria", clienteCpfCnpj: "55.666.777/0001-88",
    clienteEndereco: "Rua Augusta, 1500", clienteMunicipio: "São Paulo", clienteUf: "SP",
    subtotal: 8500, descontos: 0, outrasDespesas: 0, totalFinal: 8500,
    observacoesFiscais: "Serviço tributado conforme LC 116/2003", revisadoContador: true,
    revisadoContadorPor: "Carlos Silva (Contador)", revisadoContadorEm: "15/02/2026 11:00",
    ultimoRetorno: "Autorizado",
    itens: [
      { id: "i5", itemCadastro: "SRV-001", descricao: "Consultoria em Gestão Empresarial", quantidade: 1, valorUnitario: 8500, desconto: 0, total: 8500 },
    ],
    tributos: [
      { imposto: "ISS", baseCalculo: 8500, aliquota: 5, valorCalculado: 425, valorFinal: 425 },
      { imposto: "IRRF", baseCalculo: 8500, aliquota: 1.5, valorCalculado: 127.50, valorFinal: 100, ajustadoPor: "Carlos Silva", ajustadoEm: "15/02/2026 10:50", justificativa: "Base de cálculo ajustada conforme dedução legal" },
      { imposto: "PIS", baseCalculo: 8500, aliquota: 0.65, valorCalculado: 55.25, valorFinal: 55.25 },
      { imposto: "COFINS", baseCalculo: 8500, aliquota: 3, valorCalculado: 255, valorFinal: 255 },
    ],
    eventos: [
      { id: "e5", data: "15/02/2026 11:00", tipo: "Envio", status: "Sucesso", mensagem: "RPS enviado com sucesso", protocolo: "NFS202602150048", tentativa: 1 },
      { id: "e6", data: "15/02/2026 11:02", tipo: "Retorno", status: "Autorizada", mensagem: "NFS-e gerada com sucesso", protocolo: "NFS202602150048", tentativa: 1 },
    ],
    arquivos: [
      { id: "a3", tipo: "XML", nome: "NFSe_48_GHI.xml", tamanho: "32 KB", data: "15/02/2026" },
      { id: "a4", tipo: "PDF", nome: "NFSe_48_GHI.pdf", tamanho: "98 KB", data: "15/02/2026" },
    ],
    auditoria: [
      { id: "au1", campo: "IRRF - Valor Final", valorAnterior: "R$ 127,50", valorNovo: "R$ 100,00", usuario: "Carlos Silva", data: "15/02/2026 10:50", justificativa: "Base de cálculo ajustada conforme dedução legal" },
    ],
  },
  {
    id: 5, numero: 149, serie: "1", tipo: "NF-e",
    status: "Cancelada", dataEmissao: "14/02/2026",
    naturezaOperacao: "Venda de mercadoria",
    cliente: "JKL Ind.", clienteCpfCnpj: "33.444.555/0001-22",
    clienteEndereco: "Rod. BR-101, km 45", clienteMunicipio: "Curitiba", clienteUf: "PR",
    subtotal: 22000, descontos: 0, outrasDespesas: 0, totalFinal: 22000,
    observacoesFiscais: "", revisadoContador: true,
    revisadoContadorPor: "Carlos Silva (Contador)", revisadoContadorEm: "14/02/2026 08:00",
    ultimoRetorno: "Cancelamento homologado",
    itens: [
      { id: "i6", itemCadastro: "PRD-005", descricao: "Motor Elétrico 5CV", quantidade: 4, valorUnitario: 5500, desconto: 0, total: 22000, ncm: "85011091", cst: "000" },
    ],
    tributos: [
      { imposto: "ICMS", baseCalculo: 22000, aliquota: 18, valorCalculado: 3960, valorFinal: 3960 },
      { imposto: "IPI", baseCalculo: 22000, aliquota: 10, valorCalculado: 2200, valorFinal: 2200 },
      { imposto: "PIS", baseCalculo: 22000, aliquota: 1.65, valorCalculado: 363, valorFinal: 363 },
      { imposto: "COFINS", baseCalculo: 22000, aliquota: 7.60, valorCalculado: 1672, valorFinal: 1672 },
    ],
    eventos: [
      { id: "e7", data: "14/02/2026 08:10", tipo: "Envio", status: "Sucesso", mensagem: "Lote recebido", protocolo: "135260000099887", tentativa: 1 },
      { id: "e8", data: "14/02/2026 08:11", tipo: "Retorno", status: "Autorizada", mensagem: "Autorizado", protocolo: "135260000099887", tentativa: 1 },
      { id: "e9", data: "14/02/2026 16:00", tipo: "Cancelamento", status: "Homologado", mensagem: "Cancelamento homologado", protocolo: "135260000099888", tentativa: 1 },
    ],
    arquivos: [
      { id: "a5", tipo: "XML", nome: "NFe_149_JKL.xml", tamanho: "52 KB", data: "14/02/2026" },
      { id: "a6", tipo: "XML", nome: "NFe_149_JKL_canc.xml", tamanho: "18 KB", data: "14/02/2026" },
    ],
    auditoria: [],
  },
  {
    id: 6, numero: 148, serie: "1", tipo: "NFS-e",
    status: "Enviada", dataEmissao: "13/02/2026",
    naturezaOperacao: "Prestação de serviço de manutenção",
    cliente: "MNO Serv.", clienteCpfCnpj: "77.888.999/0001-66",
    clienteEndereco: "Rua XV de Novembro, 300", clienteMunicipio: "Florianópolis", clienteUf: "SC",
    subtotal: 1800, descontos: 0, outrasDespesas: 0, totalFinal: 1800,
    observacoesFiscais: "", revisadoContador: false,
    ultimoRetorno: "Aguardando retorno",
    itens: [
      { id: "i7", itemCadastro: "SRV-002", descricao: "Manutenção preventiva de equipamentos", quantidade: 1, valorUnitario: 1800, desconto: 0, total: 1800 },
    ],
    tributos: [
      { imposto: "ISS", baseCalculo: 1800, aliquota: 3, valorCalculado: 54, valorFinal: 54 },
      { imposto: "PIS", baseCalculo: 1800, aliquota: 0.65, valorCalculado: 11.70, valorFinal: 11.70 },
      { imposto: "COFINS", baseCalculo: 1800, aliquota: 3, valorCalculado: 54, valorFinal: 54 },
    ],
    eventos: [
      { id: "e10", data: "13/02/2026 16:45", tipo: "Envio", status: "Sucesso", mensagem: "RPS enviado, aguardando retorno da prefeitura", tentativa: 1 },
    ],
    arquivos: [],
    auditoria: [],
  },
];

export const mockClientes = [
  { id: "c1", nome: "ABC Ltda", cpfCnpj: "12.345.678/0001-90", endereco: "Rua das Flores, 100", municipio: "São Paulo", uf: "SP" },
  { id: "c2", nome: "XYZ SA", cpfCnpj: "98.765.432/0001-10", endereco: "Av. Brasil, 500", municipio: "Rio de Janeiro", uf: "RJ" },
  { id: "c3", nome: "DEF ME", cpfCnpj: "11.222.333/0001-44", endereco: "Rua Ipanema, 25", municipio: "Belo Horizonte", uf: "MG" },
  { id: "c4", nome: "GHI Consultoria", cpfCnpj: "55.666.777/0001-88", endereco: "Rua Augusta, 1500", municipio: "São Paulo", uf: "SP" },
  { id: "c5", nome: "JKL Ind.", cpfCnpj: "33.444.555/0001-22", endereco: "Rod. BR-101, km 45", municipio: "Curitiba", uf: "PR" },
  { id: "c6", nome: "MNO Serv.", cpfCnpj: "77.888.999/0001-66", endereco: "Rua XV de Novembro, 300", municipio: "Florianópolis", uf: "SC" },
];

export const mockItensCadastro = [
  { id: "PRD-001", descricao: "Parafuso Inox M10", tipo: "Produto", ncm: "73181500", valorRef: 4.80 },
  { id: "PRD-002", descricao: "Porca Sextavada M10", tipo: "Produto", ncm: "73181600", valorRef: 6.00 },
  { id: "PRD-003", descricao: "Chapa de Aço 3mm", tipo: "Produto", ncm: "72085100", valorRef: 640 },
  { id: "PRD-004", descricao: "Tubo PVC 100mm", tipo: "Produto", ncm: "39172300", valorRef: 80 },
  { id: "PRD-005", descricao: "Motor Elétrico 5CV", tipo: "Produto", ncm: "85011091", valorRef: 5500 },
  { id: "SRV-001", descricao: "Consultoria em Gestão Empresarial", tipo: "Serviço", valorRef: 8500 },
  { id: "SRV-002", descricao: "Manutenção preventiva de equipamentos", tipo: "Serviço", valorRef: 1800 },
];
