import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"
import { Topbar } from "@/components/Topbar"
import { ThemeProvider } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

const pageTitles: Record<string, { title: string; description?: string }> = {
  "/": { title: "Dashboard", description: "Visão geral do sistema" },
  "/cadastro": { title: "Cadastro", description: "Gerenciamento de cadastros" },
  "/cadastro/estoque/formas-apresentacao": { title: "Formas de Apresentação", description: "Cadastro de formas de apresentação do estoque" },
  "/cadastro/estoque/fornecedores": { title: "Fornecedores", description: "Cadastro de fornecedores do estoque" },
  "/cadastro/estoque/itens": { title: "Itens", description: "Cadastro de itens do estoque" },
  "/cadastro/estoque/setores": { title: "Setores", description: "Cadastro de setores do estoque" },
  "/cadastro/estoque/unidades": { title: "Unidades", description: "Cadastro de unidades do estoque" },
  "/cadastro/financeiro/conta-bancaria": { title: "Conta Bancária", description: "Cadastro de contas bancárias" },
  "/cadastro/financeiro/clientes": { title: "Clientes", description: "Cadastro de clientes" },
  "/cadastro/financeiro/centro-custo": { title: "Centro de Custo", description: "Cadastro de centros de custo" },
  "/cadastro/financeiro/centro-receita": { title: "Centro de Receita", description: "Cadastro de centros de receita" },
  "/cadastro/financeiro/contabil": { title: "Contábil", description: "Cadastro contábil" },
  "/cadastro/financeiro/categorias": { title: "Categorias", description: "Cadastro de categorias" },
  "/cadastro/financeiro/fornecedores": { title: "Fornecedores", description: "Cadastro de fornecedores financeiros" },
  "/cadastro/financeiro/subcategorias": { title: "Subcategorias", description: "Cadastro de subcategorias" },
  "/cadastro/financeiro/plano-contas": { title: "Plano de Contas", description: "Cadastro do plano de contas" },
  "/estoque/entradas": { title: "Entradas de Estoque", description: "Controle de entrada de materiais" },
  "/estoque/saidas": { title: "Saídas de Estoque", description: "Controle de saída de materiais" },
  "/estoque/inventario": { title: "Inventário", description: "Controle de inventário" },
  "/estoque/locacoes": { title: "Locações", description: "Gerencie todas as locações de unidades" },
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
  "/notificacoes": { title: "Notificações", description: "Central de notificações do sistema" },
  "/usuario/visualizar": { title: "Meu Perfil", description: "Visualizar informações do perfil" },
  "/usuario/editar": { title: "Editar Perfil", description: "Alterar informações do perfil" },
  "/usuario/excluir": { title: "Excluir Conta", description: "Remover conta permanentemente" },
}

function LayoutContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const pageInfo = pageTitles[location.pathname] || { title: "SerpTech", description: "Sistema de Gestão" }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarCollapsed ? "ml-20" : "ml-72"
        )}
      >
        <Topbar 
          sidebarCollapsed={sidebarCollapsed}
          pageTitle={pageInfo.title}
          pageDescription={pageInfo.description}
        />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function LayoutShell() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  )
}
