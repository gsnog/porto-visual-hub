import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

import Dashboard from "./pages/Dashboard";
import FluxoCaixa from "./pages/FluxoCaixa";
import NFe from "./pages/NFe";
import Patrimonio from "./pages/Patrimonio";
import Relatorio from "./pages/Relatorio";
import ContasPagar from "./pages/ContasPagar";
import ContasReceber from "./pages/ContasReceber";
import LancamentoSaida from "./pages/LancamentoSaida";
import NovoNFe from "./pages/NovoNFe";
import SaidasPendentes from "./pages/SaidasPendentes";
import EstoqueEntradas from "./pages/EstoqueEntradas";
import EstoqueInventario from "./pages/EstoqueInventario";
import EstoqueLocacoes from "./pages/EstoqueLocacoes";
import EstoqueRequisicoes from "./pages/EstoqueRequisicoes";
import EstoqueSaidas from "./pages/EstoqueSaidas";
import OrdemCompra from "./pages/OrdemCompra";
import NovaOrdemCompra from "./pages/NovaOrdemCompra";
import OrdemServico from "./pages/OrdemServico";
import NovaOrdemServico from "./pages/NovaOrdemServico";
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";

// Cadastro - Estoque
import FormasApresentacao from "./pages/cadastro/estoque/FormasApresentacao";
import FornecedoresEstoque from "./pages/cadastro/estoque/Fornecedores";
import Itens from "./pages/cadastro/estoque/Itens";
import Setores from "./pages/cadastro/estoque/Setores";
import Unidades from "./pages/cadastro/estoque/Unidades";

// Cadastro - Financeiro
import ContaBancaria from "./pages/cadastro/financeiro/ContaBancaria";
import Clientes from "./pages/cadastro/financeiro/Clientes";
import CentroCusto from "./pages/cadastro/financeiro/CentroCusto";
import CentroReceita from "./pages/cadastro/financeiro/CentroReceita";
import Contabil from "./pages/cadastro/financeiro/Contabil";
import Categorias from "./pages/cadastro/financeiro/Categorias";
import FornecedoresFinanceiro from "./pages/cadastro/financeiro/Fornecedores";
import Subcategorias from "./pages/cadastro/financeiro/Subcategorias";
import PlanoContas from "./pages/cadastro/financeiro/PlanoContas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={true}>
          {/* gap horizontal entre <AppSidebar /> e <SidebarInset /> */}
          <div className="flex min-h-screen w-full gap-x-4 md:gap-x-6">
            <AppSidebar />

            {/* linha divisória + padding interno no conteúdo */}
            <SidebarInset className="flex-1 border-l border-sidebar-border pl-4 md:pl-6">
              <main className="flex-1 bg-background p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/financeiro/fluxo-caixa" element={<FluxoCaixa />} />
                  <Route path="/financeiro/contas-pagar" element={<ContasPagar />} />
                  <Route path="/financeiro/contas-receber" element={<ContasReceber />} />
                  <Route path="/financeiro/lancamento-saida" element={<LancamentoSaida />} />
                  <Route path="/financeiro/saidas-pendentes" element={<SaidasPendentes />} />
                  <Route path="/financeiro/xml" element={<NFe />} />
                  <Route path="/novo-nfe" element={<NovoNFe />} />
                  <Route path="/estoque/xml" element={<NFe />} />
                  <Route path="/patrimonio" element={<Patrimonio />} />
                  <Route path="/relatorio" element={<Relatorio />} />
                  <Route path="/estoque/entradas" element={<EstoqueEntradas />} />
                  <Route path="/estoque/inventario" element={<EstoqueInventario />} />
                  <Route path="/estoque/saidas" element={<EstoqueSaidas />} />
                  <Route path="/estoque/locacoes" element={<EstoqueLocacoes />} />
                  <Route path="/estoque/requisicoes" element={<EstoqueRequisicoes />} />
                  <Route path="/estoque/ordem-compra" element={<OrdemCompra />} />
                  <Route path="/estoque/ordem-compra/nova" element={<NovaOrdemCompra />} />
                  <Route path="/estoque/ordem-servico" element={<OrdemServico />} />
                  <Route path="/estoque/ordem-servico/nova" element={<NovaOrdemServico />} />
                  
                  {/* Cadastro - Estoque */}
                  <Route path="/cadastro/estoque/formas-apresentacao" element={<FormasApresentacao />} />
                  <Route path="/cadastro/estoque/fornecedores" element={<FornecedoresEstoque />} />
                  <Route path="/cadastro/estoque/itens" element={<Itens />} />
                  <Route path="/cadastro/estoque/setores" element={<Setores />} />
                  <Route path="/cadastro/estoque/unidades" element={<Unidades />} />
                  
                  {/* Cadastro - Financeiro */}
                  <Route path="/cadastro/financeiro/conta-bancaria" element={<ContaBancaria />} />
                  <Route path="/cadastro/financeiro/clientes" element={<Clientes />} />
                  <Route path="/cadastro/financeiro/centro-custo" element={<CentroCusto />} />
                  <Route path="/cadastro/financeiro/centro-receita" element={<CentroReceita />} />
                  <Route path="/cadastro/financeiro/contabil" element={<Contabil />} />
                  <Route path="/cadastro/financeiro/categorias" element={<Categorias />} />
                  <Route path="/cadastro/financeiro/fornecedores" element={<FornecedoresFinanceiro />} />
                  <Route path="/cadastro/financeiro/subcategorias" element={<Subcategorias />} />
                  <Route path="/cadastro/financeiro/plano-contas" element={<PlanoContas />} />
                  
                  <Route path="/novo-usuario" element={<Cadastro />} />
                  <Route path="/planos" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
