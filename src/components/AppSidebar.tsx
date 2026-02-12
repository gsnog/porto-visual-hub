import { useState, useEffect } from "react"
import { 
  LayoutGrid, 
  ClipboardList, 
  Package, 
  TrendingUp,
  Building2,
  UserRoundPlus,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Sun,
  Moon
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/useTheme"
import logoSerp from "@/assets/logo-serp.png"
import logoIcone from "@/assets/SERP - Logo (1).png"

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutGrid },
  { 
    title: "Cadastro", 
    icon: ClipboardList,
    basePath: "/cadastro",
    subItems: [
      { title: "Estoque", subItems: [
        { title: "Formas de Apresentação", url: "/cadastro/estoque/formas-apresentacao" },
        { title: "Fornecedores", url: "/cadastro/estoque/fornecedores" },
        { title: "Itens", url: "/cadastro/estoque/itens" },
        { title: "Setores", url: "/cadastro/estoque/setores" },
        { title: "Unidades", url: "/cadastro/estoque/unidades" },
      ]},
      { title: "Financeiro", subItems: [
        { title: "Conta Bancária", url: "/cadastro/financeiro/conta-bancaria" },
        { title: "Clientes", url: "/cadastro/financeiro/clientes" },
        { title: "Centro de Custo", url: "/cadastro/financeiro/centro-custo" },
        { title: "Centro de Receita", url: "/cadastro/financeiro/centro-receita" },
        { title: "Contábil", url: "/cadastro/financeiro/contabil" },
        { title: "Categorias", url: "/cadastro/financeiro/categorias" },
        { title: "Fornecedores", url: "/cadastro/financeiro/fornecedores" },
        { title: "Subcategorias", url: "/cadastro/financeiro/subcategorias" },
        { title: "Plano de Contas", url: "/cadastro/financeiro/plano-contas" },
      ]},
      { title: "Pessoas", subItems: [
        { title: "Pessoas", url: "/cadastro/pessoas/pessoas" },
        { title: "Setores/Áreas", url: "/cadastro/pessoas/setores" },
      ]},
    ]
  },
  { 
    title: "Comercial", 
    icon: TrendingUp,
    basePath: "/comercial",
    subItems: [
      { title: "Visão Geral", url: "/comercial/visao-geral" },
      { title: "Leads", url: "/comercial/leads" },
      { title: "Contas", url: "/comercial/contas" },
      { title: "Contatos", url: "/comercial/contatos" },
      { title: "Oportunidades", url: "/comercial/oportunidades" },
      { title: "Propostas", url: "/comercial/propostas" },
      { title: "Atividades", url: "/comercial/atividades" },
      { title: "Metas e Forecast", url: "/comercial/metas" },
      { title: "Comissões", url: "/comercial/comissoes" },
    ]
  },
  { 
    title: "Marketing", 
    icon: BarChart3,
    basePath: "/marketing",
    subItems: [
      { title: "Visão Geral", url: "/marketing/visao-geral" },
      { title: "Campanhas", url: "/marketing/campanhas" },
      { title: "Canais", url: "/marketing/canais" },
      { title: "Leads (MQL/SQL)", url: "/marketing/leads" },
      { title: "Atribuição e ROI", url: "/marketing/atribuicao" },
    ]
  },
  { 
    title: "Estoque", 
    icon: Package,
    basePath: "/estoque",
    subItems: [
      { title: "Entradas", url: "/estoque/entradas" },
      { title: "Inventário", url: "/estoque/inventario" },
      { title: "Locações", url: "/estoque/locacoes" },
      { title: "Ordem de Compra", url: "/estoque/ordem-compra" },
      { title: "Ordem de Serviço", url: "/estoque/ordem-servico" },
      { title: "Requisições", url: "/estoque/requisicoes" },
      { title: "Saídas", url: "/estoque/saidas" },
      { title: "Patrimônio", url: "/patrimonio" },
    ]
  },
  { 
    title: "Financeiro", 
    icon: TrendingUp,
    basePath: "/financeiro",
    subItems: [
      { title: "Contas a Receber", url: "/financeiro/contas-receber" },
      { title: "Contas a Pagar", url: "/financeiro/contas-pagar" },
      { title: "Fluxo de Caixa", url: "/financeiro/fluxo-caixa" },
      { title: "XML", url: "/financeiro/xml" },
    ]
  },
  { 
    title: "Operacional", 
    icon: BarChart3,
    basePath: "/operacional",
    subItems: [
      { title: "Setor", url: "/operacional/setor" },
      { title: "Embarcações", url: "/operacional/embarcacoes" },
      { title: "Operação", url: "/operacional/operacao" },
      { title: "Serviços", url: "/operacional/servicos" },
    ]
  },
  
  { 
    title: "Gestão de Pessoas", 
    icon: UserRoundPlus,
    basePath: "/gestao-pessoas",
    subItems: [
      { title: "Visão Geral (RH)", url: "/gestao-pessoas/visao-geral" },
      { title: "Pessoas (360º)", url: "/gestao-pessoas/pessoas" },
      { title: "Hierarquia", url: "/gestao-pessoas/hierarquia" },
      { title: "Acessos", url: "/gestao-pessoas/acessos" },
      { title: "Dashboards", url: "/gestao-pessoas/dashboards" },
      { title: "Auditoria", url: "/gestao-pessoas/auditoria" },
    ]
  },
]

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const [activeItem, setActiveItem] = useState<string>("Dashboard")
  const { theme, toggleTheme } = useTheme()

  const toggleMenu = (label: string, isSubMenu = false) => {
    setOpenMenus((prev) => {
      // Se está fechando o menu, apenas remove
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label)
      }
      
      // Se é um submenu (ex: Cadastro-Estoque), permite múltiplos
      if (isSubMenu) {
        return [...prev, label]
      }
      
      // Se é um menu principal, fecha os outros menus principais e abre apenas este
      const mainMenuTitles = menuItems.filter(item => item.subItems).map(item => item.title)
      const filteredMenus = prev.filter(item => !mainMenuTitles.includes(item))
      return [...filteredMenus, label]
    })
  }

  useEffect(() => {
    for (const item of menuItems) {
      if (item.url && location.pathname === item.url) {
        setActiveItem(item.title)
      } else if (item.basePath && location.pathname.startsWith(item.basePath)) {
        setActiveItem(item.title)
        if (!openMenus.includes(item.title)) {
          setOpenMenus(prev => [...prev, item.title])
        }
      }
    }
  }, [location.pathname])

  const isItemActive = (item: typeof menuItems[0]) => {
    if (item.url) return location.pathname === item.url
    if (item.basePath) return location.pathname.startsWith(item.basePath)
    return false
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col transition-all duration-300 border-r border-border",
        collapsed ? "w-20" : "w-72"
      )}
      style={{ background: "hsl(var(--sidebar-bg))" }}
    >
      {/* Logo */}
      <div className="relative flex h-20 items-center justify-center border-b border-[hsl(var(--sidebar-border))] px-4">
        {collapsed ? (
          <img src={logoIcone} alt="S" className="h-12 object-contain" />
        ) : (
          <img src={logoSerp} alt="SERP" className="h-28 object-contain" />
        )}
        
        {/* Toggle button - aligned with logo divider */}
        <button
          onClick={onToggle}
          className="absolute -right-4 bottom-0 translate-y-1/2 grid place-items-center h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform z-10"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 sidebar-nav-scroll px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "sidebar-item w-full",
                      isItemActive(item) && "active"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0 text-[hsl(var(--sidebar-foreground))]" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left text-sm text-[hsl(var(--sidebar-foreground))]">
                          {item.title}
                        </span>
                        {openMenus.includes(item.title) ? (
                          <ChevronDown className="h-4 w-4 text-[hsl(var(--sidebar-foreground))]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[hsl(var(--sidebar-foreground))]" />
                        )}
                      </>
                    )}
                  </button>
                  
                  {!collapsed && openMenus.includes(item.title) && (
                    <ul className="mt-1 space-y-1 pl-4">
                      {item.subItems.map((subItem) => (
                        'subItems' in subItem && subItem.subItems ? (
                          <li key={subItem.title}>
                            <button
                              onClick={() => toggleMenu(`${item.title}-${subItem.title}`, true)}
                              className="sidebar-item w-full text-sm"
                            >
                              <span className="flex-1 text-left text-[hsl(var(--sidebar-muted))]">
                                {subItem.title}
                              </span>
                              {openMenus.includes(`${item.title}-${subItem.title}`) ? (
                                <ChevronDown className="h-3 w-3 text-primary" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-primary" />
                              )}
                            </button>
                            
                            {openMenus.includes(`${item.title}-${subItem.title}`) && (
                              <ul className="mt-1 space-y-1 pl-4">
                                {subItem.subItems.map((nestedItem) => (
                                  <li key={nestedItem.title}>
                                    <NavLink
                                      to={nestedItem.url}
                                      className={({ isActive }) =>
                                        cn(
                                      "sidebar-item text-xs",
                                          isActive
                                            ? "sidebar-nav-active"
                                            : "text-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-foreground))]"
                                        )
                                      }
                                    >
                                      {nestedItem.title}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ) : (
                          <li key={subItem.title}>
                            <NavLink
                              to={'url' in subItem ? subItem.url : '#'}
                              className={({ isActive }) =>
                                cn(
                                  "sidebar-item text-sm",
                                  isActive
                                    ? "sidebar-nav-active"
                                    : "text-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-foreground))]"
                                )
                              }
                            >
                              {subItem.title}
                            </NavLink>
                          </li>
                        )
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.url!}
                  className={({ isActive }) =>
                    cn("sidebar-item", isActive && "active")
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0 text-[hsl(var(--sidebar-foreground))]" />
                  {!collapsed && (
                    <span className="text-sm text-[hsl(var(--sidebar-foreground))]">
                      {item.title}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-[hsl(var(--sidebar-border))] p-3 space-y-1">

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="sidebar-item w-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 shrink-0 text-[hsl(var(--sidebar-foreground))]" />
          ) : (
            <Moon className="h-5 w-5 shrink-0 text-[hsl(var(--sidebar-foreground))]" />
          )}
          {!collapsed && (
            <span className="text-sm text-[hsl(var(--sidebar-foreground))]">
              {theme === "dark" ? "Modo Diurno" : "Modo Noturno"}
            </span>
          )}
        </button>

        {/* Logout */}
        <button className="sidebar-item w-full text-red-500 hover:bg-red-500/20">
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="text-sm">Sair</span>}
        </button>
      </div>
    </aside>
  )
}
