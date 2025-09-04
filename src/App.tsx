import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar, // 👈 vamos usar para fechar quando clicar fora
} from "@/components/ui/sidebar";

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
import NotFound from "./pages/NotFound";
import * as React from "react";

const queryClient = new QueryClient();

/**
 * Componente que fica DENTRO do SidebarProvider.
 * Aqui podemos usar useSidebar() para fechar ao clicar fora.
 */
function AppFrame() {
  const { state, setOpen, isMobile } = useSidebar();

  // Fecha o sidebar quando clicar no conteúdo (fora do sidebar) no DESKTOP.
  const handlePointerDownCapture = React.useCallback(
    (e: React.PointerEvent) => {
      if (isMobile) return; // no mobile o Sheet já fecha ao clicar fora
      if (state !== "expanded") return;

      const target = e.target as HTMLElement;

      // Ignora cliques dentro do próprio sidebar
      if (target.closest('[data-sidebar="sidebar"]')) return;

      // Ignora cliques no botão hamburguer
      if (target.closest('[data-sidebar="trigger"]')) return;

      setOpen(false);
    },
    [isMobile, state, setOpen]
  );

  return (
    <>
      <AppSidebar />

      {/* Qualquer clique aqui fora do sidebar fecha no desktop */}
      <SidebarInset onPointerDownCapture={handlePointerDownCapture}>
        <header className="flex h-12 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger />
          <h1 className="font-semibold">Minha App</h1>
        </header>

        <main className="flex-1 bg-background">
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
            <Route path="/cadastro" element={<Dashboard />} />
            <Route path="/estoque/entradas" element={<Dashboard />} />
            <Route path="/estoque/inventario" element={<Dashboard />} />
            <Route path="/estoque/saidas" element={<Dashboard />} />
            <Route path="/estoque/locacoes" element={<Dashboard />} />
            <Route path="/estoque/requisicoes" element={<Dashboard />} />
            <Route path="/novo-usuario" element={<Dashboard />} />
            <Route path="/planos" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </SidebarInset>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <AppFrame />
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
