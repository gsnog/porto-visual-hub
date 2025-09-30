import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
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
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            
            <SidebarInset className="flex-1">
              <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background px-6">
                <SidebarTrigger className="-ml-2" />
                <h1 className="text-lg font-semibold text-foreground">SerpTech</h1>
              </header>

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
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="/estoque/entradas" element={<EstoqueEntradas />} />
                  <Route path="/estoque/inventario" element={<EstoqueInventario />} />
                  <Route path="/estoque/saidas" element={<EstoqueSaidas />} />
                  <Route path="/estoque/locacoes" element={<EstoqueLocacoes />} />
                  <Route path="/estoque/requisicoes" element={<EstoqueRequisicoes />} />
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
