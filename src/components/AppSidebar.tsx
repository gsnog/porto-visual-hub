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

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutGrid },
  { 
    title: "Cadastro", 
    icon: ClipboardList,
    basePath: "/cadastro",
    subItems: [
      { 
        title: "Estoque", 
        subItems: [
          { title: "Formas de Apresentação", url: "/cadastro/estoque/formas-apresentacao" },
          { title: "Fornecedores", url: "/cadastro/estoque/fornecedores" },
          { title: "Itens", url: "/cadastro/estoque/itens" },
          { title: "Setores", url: "/cadastro/estoque/setores" },
          { title: "Unidades", url: "/cadastro/estoque/unidades" },
        ]
      },
      { 
        title: "Financeiro", 
        subItems: [
          { title: "Conta Bancária", url: "/cadastro/financeiro/conta-bancaria" },
          { title: "Clientes", url: "/cadastro/financeiro/clientes" },
          { title: "Centro de Custo", url: "/cadastro/financeiro/centro-custo" },
          { title: "Centro de Receita", url: "/cadastro/financeiro/centro-receita" },
          { title: "Contábil", url: "/cadastro/financeiro/contabil" },
          { title: "Categorias", url: "/cadastro/financeiro/categorias" },
          { title: "Fornecedores", url: "/cadastro/financeiro/fornecedores" },
          { title: "Subcategorias", url: "/cadastro/financeiro/subcategorias" },
          { title: "Plano de Contas", url: "/cadastro/financeiro/plano-contas" },
        ]
      },
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
  { title: "Patrimônio", url: "/patrimonio", icon: Building2 },
  { title: "Novo Usuário", url: "/novo-usuario", icon: UserRoundPlus },
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

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
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
        "fixed left-0 top-0 z-50 flex h-screen flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-72"
      )}
      style={{ background: "hsl(var(--sidebar-bg))" }}
    >
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-white/10 px-4">
        {collapsed ? (
          <span className="text-2xl font-bold text-primary">S</span>
        ) : (
          <img src={logoSerp} alt="SERP" className="h-10 object-contain" />
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-4 top-16 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform"
      >
        <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
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
                              onClick={() => toggleMenu(`${item.title}-${subItem.title}`)}
                              className="sidebar-item w-full text-sm"
                            >
                              <span className="flex-1 text-left text-[hsl(var(--sidebar-muted))]">
                                {subItem.title}
                              </span>
                              {openMenus.includes(`${item.title}-${subItem.title}`) ? (
                                <ChevronDown className="h-3 w-3" />
                              ) : (
                                <ChevronRight className="h-3 w-3" />
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
                                            ? "text-primary font-semibold"
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
                                    ? "text-primary font-semibold"
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
      <div className="border-t border-white/10 p-4 space-y-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="sidebar-item w-full"
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5 text-[hsl(var(--sidebar-foreground))]" />
          ) : (
            <Sun className="h-5 w-5 text-[hsl(var(--sidebar-foreground))]" />
          )}
          {!collapsed && (
            <span className="text-sm text-[hsl(var(--sidebar-foreground))]">
              {theme === "dark" ? "Modo Noturno" : "Modo Diurno"}
            </span>
          )}
        </button>

        {/* Logout */}
        <button className="sidebar-item w-full text-red-500 hover:bg-red-500/20">
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="text-sm">Sair</span>}
        </button>
      </div>
    </aside>
  )
}
