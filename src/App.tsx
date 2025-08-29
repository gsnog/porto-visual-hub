import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import FluxoCaixa from "./pages/FluxoCaixa";
import NFe from "./pages/NFe";
import Patrimonio from "./pages/Patrimonio";
import Relatorio from "./pages/Relatorio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b border-border bg-background px-4">
                <SidebarTrigger />
              </header>
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/financeiro/fluxo-caixa" element={<FluxoCaixa />} />
                  <Route path="/financeiro/xml" element={<NFe />} />
                  <Route path="/estoque/xml" element={<NFe />} />
                  <Route path="/patrimonio" element={<Patrimonio />} />
                  <Route path="/relatorio" element={<Relatorio />} />
                  <Route path="/cadastro" element={<Dashboard />} />
                  <Route path="/estoque/entradas" element={<Dashboard />} />
                  <Route path="/estoque/inventario" element={<Dashboard />} />
                  <Route path="/estoque/saidas" element={<Dashboard />} />
                  <Route path="/estoque/locacoes" element={<Dashboard />} />
                  <Route path="/estoque/requisicoes" element={<Dashboard />} />
                  <Route path="/financeiro/contas-receber" element={<Relatorio />} />
                  <Route path="/financeiro/contas-pagar" element={<Relatorio />} />
                  <Route path="/novo-usuario" element={<Dashboard />} />
                  <Route path="/planos" element={<Dashboard />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
