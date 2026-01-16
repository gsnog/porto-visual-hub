import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"
import { Topbar } from "@/components/Topbar"
import { ThemeProvider } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

const pageTitles: Record<string, { title: string; description?: string }> = {
  "/": { title: "Dashboard", description: "Visão geral do sistema" },
  "/cadastro": { title: "Cadastro", description: "Gerenciamento de cadastros" },
  "/novo-usuario": { title: "Novo Usuário", description: "Cadastro de novo usuário" },
  
  // Cadastro Estoque - Páginas principais
  "/cadastro/estoque/formas-apresentacao": { title: "Formas de Apresentação", description: "Cadastro de formas de apresentação do estoque" },
  "/cadastro/estoque/fornecedores": { title: "Fornecedores", description: "Cadastro de fornecedores do estoque" },
  "/cadastro/estoque/itens": { title: "Itens", description: "Cadastro de itens do estoque" },
  "/cadastro/estoque/setores": { title: "Setores", description: "Cadastro de setores do estoque" },
  "/cadastro/estoque/unidades": { title: "Unidades", description: "Cadastro de unidades do estoque" },
  
  // Cadastro Estoque - Subpáginas (rotas corretas)
  "/cadastro/estoque/formas-apresentacao/nova": { title: "Formas de Apresentação", description: "Formas de Apresentação > Nova" },
  "/cadastro/estoque/fornecedores/novo": { title: "Fornecedores", description: "Fornecedores > Novo Fornecedor" },
  "/cadastro/estoque/itens/novo": { title: "Itens", description: "Itens > Novo Item" },
  "/cadastro/estoque/setores/novo": { title: "Setores", description: "Setores > Novo Setor" },
  "/cadastro/estoque/unidades/nova": { title: "Unidades", description: "Unidades > Nova Unidade" },
  
  // Cadastro Financeiro - Páginas principais
  "/cadastro/financeiro/conta-bancaria": { title: "Conta Bancária", description: "Cadastro de contas bancárias" },
  "/cadastro/financeiro/clientes": { title: "Clientes", description: "Cadastro de clientes" },
  "/cadastro/financeiro/centro-custo": { title: "Centro de Custo", description: "Cadastro de centros de custo" },
  "/cadastro/financeiro/centro-receita": { title: "Centro de Receita", description: "Cadastro de centros de receita" },
  "/cadastro/financeiro/contabil": { title: "Contábil", description: "Cadastro contábil" },
  "/cadastro/financeiro/categorias": { title: "Categorias", description: "Cadastro de categorias" },
  "/cadastro/financeiro/fornecedores": { title: "Fornecedores", description: "Cadastro de fornecedores financeiros" },
  "/cadastro/financeiro/subcategorias": { title: "Subcategorias", description: "Cadastro de subcategorias" },
  "/cadastro/financeiro/plano-contas": { title: "Plano de Contas", description: "Cadastro do plano de contas" },
  "/cadastro/financeiro/conciliacao-bancaria": { title: "Conciliação Bancária", description: "Conciliação de contas bancárias" },
  "/cadastro/financeiro/transferencias": { title: "Transferências", description: "Cadastro de transferências" },
  
  // Cadastro Financeiro - Subpáginas (rotas corretas)
  "/cadastro/financeiro/conta-bancaria/nova": { title: "Conta Bancária", description: "Conta Bancária > Nova" },
  "/cadastro/financeiro/clientes/novo": { title: "Clientes", description: "Clientes > Novo Cliente" },
  "/cadastro/financeiro/centro-custo/novo": { title: "Centro de Custo", description: "Centro de Custo > Novo" },
  "/cadastro/financeiro/centro-receita/novo": { title: "Centro de Receita", description: "Centro de Receita > Novo" },
  "/cadastro/financeiro/contabil/novo": { title: "Contábil", description: "Contábil > Novo" },
  "/cadastro/financeiro/categorias/nova": { title: "Categorias", description: "Categorias > Nova Categoria" },
  "/cadastro/financeiro/fornecedores/novo": { title: "Fornecedores", description: "Fornecedores > Novo Fornecedor" },
  "/cadastro/financeiro/subcategorias/nova": { title: "Subcategorias", description: "Subcategorias > Nova" },
  "/cadastro/financeiro/plano-contas/novo": { title: "Plano de Contas", description: "Plano de Contas > Novo" },
  "/cadastro/financeiro/transferencias/nova": { title: "Transferências", description: "Transferências > Nova" },
  
  // Estoque - Páginas principais
  "/estoque/entradas": { title: "Entradas de Estoque", description: "Controle de entrada de materiais" },
  "/estoque/saidas": { title: "Saídas de Estoque", description: "Controle de saída de materiais" },
  "/estoque/inventario": { title: "Inventário", description: "Controle de inventário" },
  "/estoque/locacoes": { title: "Locações", description: "Gerencie todas as locações de unidades" },
  "/estoque/ordem-compra": { title: "Ordem de Compra", description: "Gerenciamento de ordens de compra" },
  "/estoque/ordem-servico": { title: "Ordem de Serviço", description: "Gerenciamento de ordens de serviço" },
  "/estoque/requisicoes": { title: "Requisições", description: "Gerenciamento de requisições" },
  
  // Estoque - Subpáginas (rotas corretas)
  "/estoque/entradas/nova": { title: "Entradas de Estoque", description: "Entradas > Nova Entrada" },
  "/estoque/entradas/upload-nfe": { title: "Entradas de Estoque", description: "Entradas > Upload NF-e" },
  "/estoque/saidas/nova": { title: "Saídas de Estoque", description: "Saídas > Nova Saída" },
  "/estoque/locacoes/nova": { title: "Locações", description: "Locações > Nova Locação" },
  "/estoque/requisicoes/nova": { title: "Requisições", description: "Requisições > Nova Requisição" },
  "/estoque/ordem-compra/nova": { title: "Ordem de Compra", description: "Ordem de Compra > Nova" },
  "/estoque/ordem-servico/nova": { title: "Ordem de Serviço", description: "Ordem de Serviço > Nova" },
  
  // Financeiro - Páginas principais
  "/financeiro/contas-receber": { title: "Contas a Receber", description: "Gerenciamento de contas a receber" },
  "/financeiro/contas-pagar": { title: "Contas a Pagar", description: "Gerenciamento de contas a pagar" },
  "/financeiro/fluxo-caixa": { title: "Fluxo de Caixa", description: "Controle de fluxo de caixa" },
  
  // Financeiro - Subpáginas (rotas corretas)
  "/financeiro/contas-receber/nova": { title: "Contas a Receber", description: "Contas a Receber > Nova" },
  "/financeiro/contas-pagar/nova": { title: "Contas a Pagar", description: "Contas a Pagar > Nova" },
  "/financeiro/contas-receber/relatorio": { title: "Contas a Receber", description: "Contas a Receber > Relatório" },
  "/financeiro/contas-pagar/relatorio": { title: "Contas a Pagar", description: "Contas a Pagar > Relatório" },
  "/financeiro/fluxo-caixa/relatorio": { title: "Fluxo de Caixa", description: "Fluxo de Caixa > Relatório" },
  
  // Patrimônio
  "/patrimonio": { title: "Patrimônio", description: "Gerenciamento de patrimônio" },
  
  // Operacional - Páginas principais
  "/operacional/setor": { title: "Setor", description: "Gerenciamento de setores" },
  "/operacional/embarcacoes": { title: "Embarcações", description: "Gerenciamento de embarcações" },
  "/operacional/operacao": { title: "Operação", description: "Gerenciamento de operações" },
  "/operacional/servicos": { title: "Serviços", description: "Gerenciamento de serviços" },
  
  // Operacional - Subpáginas (rotas corretas)
  "/operacional/setor/novo": { title: "Setor", description: "Setor > Novo Setor" },
  "/operacional/embarcacoes/nova": { title: "Embarcações", description: "Embarcações > Nova" },
  "/operacional/operacao/nova": { title: "Operação", description: "Operação > Nova" },
  "/operacional/servicos/novo": { title: "Serviços", description: "Serviços > Novo" },
  
  // NF-e
  "/nfe": { title: "NF-e", description: "Gerenciamento de notas fiscais eletrônicas" },
  "/nfe/nova": { title: "NF-e", description: "NF-e > Nova Nota Fiscal" },
  
  // Usuário
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
