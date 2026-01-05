import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { Outlet, useLocation } from "react-router-dom"

const pageTitles: Record<string, { title: string; description?: string }> = {
  "/": { title: "Dashboard", description: "Visão geral do sistema" },
  "/cadastro": { title: "Cadastro", description: "Gerenciamento de cadastros" },
  "/estoque/entradas": { title: "Entradas de Estoque", description: "Controle de entrada de materiais" },
  "/estoque/saidas": { title: "Saídas de Estoque", description: "Controle de saída de materiais" },
  "/estoque/inventario": { title: "Inventário", description: "Controle de inventário" },
  "/estoque/locacoes": { title: "Locações", description: "Gerenciamento de locações" },
  "/estoque/ordem-compra": { title: "Ordem de Compra", description: "Gerenciamento de ordens de compra" },
  "/estoque/ordem-servico": { title: "Ordem de Serviço", description: "Gerenciamento de ordens de serviço" },
  "/estoque/requisicoes": { title: "Requisições", description: "Gerenciamento de requisições" },
  "/financeiro/contas-receber": { title: "Contas a Receber", description: "Gerenciamento de contas a receber" },
  "/financeiro/contas-pagar": { title: "Contas a Pagar", description: "Gerenciamento de contas a pagar" },
  "/financeiro/fluxo-caixa": { title: "Fluxo de Caixa", description: "Controle de fluxo de caixa" },
  "/patrimonio": { title: "Patrimônio", description: "Gerenciamento de patrimônio" },
  "/operacional/setor": { title: "Setor", description: "Gerenciamento de setores" },
  "/operacional/embarcacoes": { title: "Embarcações", description: "Gerenciamento de embarcações" },
  "/operacional/operacao": { title: "Operação", description: "Gerenciamento de operações" },
  "/operacional/servicos": { title: "Serviços", description: "Gerenciamento de serviços" },
}

export default function LayoutShell() {
  const location = useLocation()
  const pageInfo = pageTitles[location.pathname] || { title: "SerpTech", description: "Sistema de Gestão" }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <SidebarInset className="flex-1">
          <Header title={pageInfo.title} description={pageInfo.description} />

          <main className="p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
