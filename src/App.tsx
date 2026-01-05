import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutShell from "@/layouts/LayoutShell";

import Dashboard from "./pages/Dashboard";
import FluxoCaixa from "./pages/FluxoCaixa";
import RelatorioFluxoCaixa from "./pages/financeiro/RelatorioFluxoCaixa";
import NFe from "./pages/NFe";
import Patrimonio from "./pages/Patrimonio";
import Relatorio from "./pages/Relatorio";
import ContasPagar from "./pages/ContasPagar";
import NovaContaPagar from "./pages/financeiro/NovaContaPagar";
import RelatorioContasPagar from "./pages/financeiro/RelatorioContasPagar";
import ContasReceber from "./pages/ContasReceber";
import NovaContaReceber from "./pages/financeiro/NovaContaReceber";
import RelatorioContasReceber from "./pages/financeiro/RelatorioContasReceber";
import LancamentoSaida from "./pages/LancamentoSaida";
import NovoNFe from "./pages/NovoNFe";
import SaidasPendentes from "./pages/SaidasPendentes";
import EstoqueEntradas from "./pages/EstoqueEntradas";
import NovaEntrada from "./pages/estoque/NovaEntrada";
import UploadNFe from "./pages/estoque/UploadNFe";
import EstoqueInventario from "./pages/EstoqueInventario";
import EstoqueLocacoes from "./pages/EstoqueLocacoes";
import NovaLocacao from "./pages/estoque/NovaLocacao";
import EstoqueRequisicoes from "./pages/EstoqueRequisicoes";
import NovaRequisicao from "./pages/estoque/NovaRequisicao";
import EstoqueSaidas from "./pages/EstoqueSaidas";
import NovaSaida from "./pages/estoque/NovaSaida";
import OrdemCompra from "./pages/OrdemCompra";
import NovaOrdemCompra from "./pages/NovaOrdemCompra";
import OrdemServico from "./pages/OrdemServico";
import NovaOrdemServico from "./pages/NovaOrdemServico";
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";

// Cadastro - Estoque
import FormasApresentacao from "./pages/cadastro/estoque/FormasApresentacao";
import NovaFormaApresentacao from "./pages/cadastro/estoque/NovaFormaApresentacao";
import FornecedoresEstoque from "./pages/cadastro/estoque/Fornecedores";
import NovoFornecedor from "./pages/cadastro/estoque/NovoFornecedor";
import Itens from "./pages/cadastro/estoque/Itens";
import NovoItem from "./pages/cadastro/estoque/NovoItem";
import Setores from "./pages/cadastro/estoque/Setores";
import NovoSetor from "./pages/cadastro/estoque/NovoSetor";
import Unidades from "./pages/cadastro/estoque/Unidades";
import NovaUnidade from "./pages/cadastro/estoque/NovaUnidade";

// Cadastro - Financeiro
import ContaBancaria from "./pages/cadastro/financeiro/ContaBancaria";
import NovaContaBancaria from "./pages/cadastro/financeiro/NovaContaBancaria";
import ConciliacaoBancaria from "./pages/cadastro/financeiro/ConciliacaoBancaria";
import Transferencias from "./pages/cadastro/financeiro/Transferencias";
import NovaTransferencia from "./pages/cadastro/financeiro/NovaTransferencia";
import Clientes from "./pages/cadastro/financeiro/Clientes";
import NovoCliente from "./pages/cadastro/financeiro/NovoCliente";
import CentroCusto from "./pages/cadastro/financeiro/CentroCusto";
import NovoCentroCusto from "./pages/cadastro/financeiro/NovoCentroCusto";
import CentroReceita from "./pages/cadastro/financeiro/CentroReceita";
import NovoCentroReceita from "./pages/cadastro/financeiro/NovoCentroReceita";
import Contabil from "./pages/cadastro/financeiro/Contabil";
import NovoContabil from "./pages/cadastro/financeiro/NovoContabil";
import Categorias from "./pages/cadastro/financeiro/Categorias";
import NovaCategoria from "./pages/cadastro/financeiro/NovaCategoria";
import FornecedoresFinanceiro from "./pages/cadastro/financeiro/Fornecedores";
import NovoFornecedorFinanceiro from "./pages/cadastro/financeiro/NovoFornecedorFinanceiro";
import Subcategorias from "./pages/cadastro/financeiro/Subcategorias";
import NovaSubcategoria from "./pages/cadastro/financeiro/NovaSubcategoria";
import PlanoContas from "./pages/cadastro/financeiro/PlanoContas";
import NovoPlanoContas from "./pages/cadastro/financeiro/NovoPlanoContas";

// Operacional
import SetorOperacional from "./pages/operacional/Setor";
import NovoSetorOperacional from "./pages/operacional/NovoSetor";
import Embarcacoes from "./pages/operacional/Embarcacoes";
import NovaEmbarcacao from "./pages/operacional/NovaEmbarcacao";
import Operacao from "./pages/operacional/Operacao";
import NovaOperacao from "./pages/operacional/NovaOperacao";
import Servicos from "./pages/operacional/Servicos";
import NovoServico from "./pages/operacional/NovoServico";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/financeiro/fluxo-caixa" element={<FluxoCaixa />} />
            <Route path="/financeiro/fluxo-caixa/relatorio" element={<RelatorioFluxoCaixa />} />
            <Route path="/financeiro/contas-pagar" element={<ContasPagar />} />
            <Route path="/financeiro/contas-pagar/nova" element={<NovaContaPagar />} />
            <Route path="/financeiro/contas-pagar/relatorio" element={<RelatorioContasPagar />} />
            <Route path="/financeiro/contas-receber" element={<ContasReceber />} />
            <Route path="/financeiro/contas-receber/nova" element={<NovaContaReceber />} />
            <Route path="/financeiro/contas-receber/relatorio" element={<RelatorioContasReceber />} />
            <Route path="/financeiro/lancamento-saida" element={<LancamentoSaida />} />
            <Route path="/financeiro/saidas-pendentes" element={<SaidasPendentes />} />
            <Route path="/financeiro/xml" element={<NFe />} />
            <Route path="/nfe" element={<NFe />} />
            <Route path="/nfe/nova" element={<NovoNFe />} />
            <Route path="/novo-nfe" element={<NovoNFe />} />
            <Route path="/estoque/xml" element={<NFe />} />
            <Route path="/patrimonio" element={<Patrimonio />} />
            <Route path="/relatorio" element={<Relatorio />} />
            <Route path="/estoque/entradas" element={<EstoqueEntradas />} />
            <Route path="/estoque/entradas/nova" element={<NovaEntrada />} />
            <Route path="/estoque/entradas/upload-nfe" element={<UploadNFe />} />
            <Route path="/estoque/inventario" element={<EstoqueInventario />} />
            <Route path="/estoque/saidas" element={<EstoqueSaidas />} />
            <Route path="/estoque/saidas/nova" element={<NovaSaida />} />
            <Route path="/estoque/locacoes" element={<EstoqueLocacoes />} />
            <Route path="/estoque/locacoes/nova" element={<NovaLocacao />} />
            <Route path="/estoque/requisicoes" element={<EstoqueRequisicoes />} />
            <Route path="/estoque/requisicoes/nova" element={<NovaRequisicao />} />
            <Route path="/estoque/ordem-compra" element={<OrdemCompra />} />
            <Route path="/estoque/ordem-compra/nova" element={<NovaOrdemCompra />} />
            <Route path="/estoque/ordem-servico" element={<OrdemServico />} />
            <Route path="/estoque/ordem-servico/nova" element={<NovaOrdemServico />} />
            
            {/* Cadastro - Estoque */}
            <Route path="/cadastro/estoque/formas-apresentacao" element={<FormasApresentacao />} />
            <Route path="/cadastro/estoque/formas-apresentacao/nova" element={<NovaFormaApresentacao />} />
            <Route path="/cadastro/estoque/fornecedores" element={<FornecedoresEstoque />} />
            <Route path="/cadastro/estoque/fornecedores/novo" element={<NovoFornecedor />} />
            <Route path="/cadastro/estoque/itens" element={<Itens />} />
            <Route path="/cadastro/estoque/itens/novo" element={<NovoItem />} />
            <Route path="/cadastro/estoque/setores" element={<Setores />} />
            <Route path="/cadastro/estoque/setores/novo" element={<NovoSetor />} />
            <Route path="/cadastro/estoque/unidades" element={<Unidades />} />
            <Route path="/cadastro/estoque/unidades/nova" element={<NovaUnidade />} />
            
            {/* Cadastro - Financeiro */}
            <Route path="/cadastro/financeiro/conta-bancaria" element={<ContaBancaria />} />
            <Route path="/cadastro/financeiro/conta-bancaria/nova" element={<NovaContaBancaria />} />
            <Route path="/cadastro/financeiro/conciliacao-bancaria" element={<ConciliacaoBancaria />} />
            <Route path="/cadastro/financeiro/transferencias" element={<Transferencias />} />
            <Route path="/cadastro/financeiro/transferencias/nova" element={<NovaTransferencia />} />
            <Route path="/cadastro/financeiro/clientes" element={<Clientes />} />
            <Route path="/cadastro/financeiro/clientes/novo" element={<NovoCliente />} />
            <Route path="/cadastro/financeiro/centro-custo" element={<CentroCusto />} />
            <Route path="/cadastro/financeiro/centro-custo/novo" element={<NovoCentroCusto />} />
            <Route path="/cadastro/financeiro/centro-receita" element={<CentroReceita />} />
            <Route path="/cadastro/financeiro/centro-receita/novo" element={<NovoCentroReceita />} />
            <Route path="/cadastro/financeiro/contabil" element={<Contabil />} />
            <Route path="/cadastro/financeiro/contabil/novo" element={<NovoContabil />} />
            <Route path="/cadastro/financeiro/categorias" element={<Categorias />} />
            <Route path="/cadastro/financeiro/categorias/nova" element={<NovaCategoria />} />
            <Route path="/cadastro/financeiro/fornecedores" element={<FornecedoresFinanceiro />} />
            <Route path="/cadastro/financeiro/fornecedores/novo" element={<NovoFornecedorFinanceiro />} />
            <Route path="/cadastro/financeiro/subcategorias" element={<Subcategorias />} />
            <Route path="/cadastro/financeiro/subcategorias/nova" element={<NovaSubcategoria />} />
            <Route path="/cadastro/financeiro/plano-contas" element={<PlanoContas />} />
            <Route path="/cadastro/financeiro/plano-contas/novo" element={<NovoPlanoContas />} />
            
            {/* Operacional */}
            <Route path="/operacional/setor" element={<SetorOperacional />} />
            <Route path="/operacional/setor/novo" element={<NovoSetorOperacional />} />
            <Route path="/operacional/embarcacoes" element={<Embarcacoes />} />
            <Route path="/operacional/embarcacoes/nova" element={<NovaEmbarcacao />} />
            <Route path="/operacional/operacao" element={<Operacao />} />
            <Route path="/operacional/operacao/nova" element={<NovaOperacao />} />
            <Route path="/operacional/servicos" element={<Servicos />} />
            <Route path="/operacional/servicos/novo" element={<NovoServico />} />
            
            <Route path="/novo-usuario" element={<Cadastro />} />
            <Route path="/planos" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
