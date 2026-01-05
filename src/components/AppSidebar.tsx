import { useEffect, useMemo, useState } from "react"
import { 
  LayoutGrid, 
  ClipboardList, 
  Package, 
  TrendingUp,
  Building2,
  UserRoundPlus,
  MapPinned,
  LogOut,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Sun,
  Moon
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

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

const MenuToggleIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 74 74" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isOpen ? "none" : "scaleX(-1)", transition: "transform .3s ease-in-out" }}
    className="shrink-0"
  >
    <circle cx="37" cy="37" r="33" fill="hsl(30, 100%, 50%)"/>
    <path d="M38.3714 50L46 50L35.6286 37.5L46 25L38.3714 25L28 37.5L38.3714 50Z" fill="white" />
  </svg>
)

function ThemeToggleSvg({
  checked,
  onChange,
  className = "",
}: {
  checked: boolean
  onChange: (next: boolean) => void
  className?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Alternar modo claro/escuro"
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onChange(!checked)
        }
      }}
      className={`inline-flex items-center ${className}`}
    >
      <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="8" width="47" height="3" fill="#DEDEDE"/>
        <g style={{ transform: `translateX(${checked ? 0 : 30}px)`, transition: "transform 200ms ease-in-out" }}>
          <circle cx="9" cy="9" r="9" fill="#4F4F4F"/>
        </g>
      </svg>
    </button>
  )
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export function AppSidebar() {
  const { open } = useSidebar()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const [activeMainItem, setActiveMainItem] = useState<string | null>(null)

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }))
    setActiveMainItem(title)
  }
  
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {}
    let foundActive: string | null = null
    
    for (const item of menuItems) {
      if (item.url && location.pathname === item.url) {
        foundActive = item.title
      } else if (item.basePath && location.pathname.startsWith(item.basePath)) {
        newOpenMenus[item.title] = true
        foundActive = item.title
      }
    }
    
    setOpenMenus(prev => ({ ...prev, ...newOpenMenus }))
    if (foundActive) {
      setActiveMainItem(foundActive)
    }
  }, [location.pathname])

  const initialTheme = useMemo<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"
    const saved = localStorage.getItem("theme")
    if (saved === "light" || saved === "dark") return saved
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches
    return prefersDark ? "dark" : "light"
  }, [])

  const [theme, setTheme] = useState<"light" | "dark">(initialTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const isDayMode = theme === "light"
  
  const isMainItemActive = (item: typeof menuItems[0]) => {
    return activeMainItem === item.title
  }
  
  const getMainItemBorderClass = (item: typeof menuItems[0]) => {
    return isMainItemActive(item) ? "border-l-4 border-primary" : "border-l-4 border-transparent"
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border z-50 [--sidebar-width:18rem] [--sidebar-width-icon:95px] transition-[width] duration-300 ease-in-out"
    >
      <style>{`
        [data-sidebar="resizer"] { display:none!important; cursor:default!important; }
        [data-sidebar="sidebar"], [data-sidebar="panel"] { cursor:default!important; }
      `}</style>

      <SidebarRail />

      {!open && (
        <div
          className="absolute z-[60]"
          style={{
            bottom: "3.5rem",
            left: "calc(var(--sidebar-width-icon) / 2 - 24px)",
          }}
        >
          <ThemeToggleSvg
            checked={isDayMode}
            onChange={(next) => setTheme(next ? "light" : "dark")}
          />
        </div>
      )}

      <SidebarContent className="bg-sidebar text-[--sidebar-text] relative overflow-visible">
        <div className="p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
            PP
          </div>
          <div className={`min-w-0 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <h3 className="font-semibold truncate text-[--sidebar-text]">Pedro Piaes</h3>
            <p className="text-sm truncate text-[--sidebar-text-muted]">Desenvolvedor</p>
          </div>
        </div>

        <button
          onClick={() => document.querySelector<HTMLButtonElement>('[data-sidebar="rail"]')?.click()}
          style={{ left: `calc(${open ? "var(--sidebar-width)" : "var(--sidebar-width-icon)"} - 20px)` }}
          className="fixed top-16 z-[50] transition-[left,transform] duration-300 ease-in-out hover:scale-110"
          aria-label="Toggle Sidebar"
        >
          <MenuToggleIcon isOpen={open} />
        </button>

        <Separator className="bg-sidebar-border" />

        <div className="flex-1 p-4 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-4">
                {menuItems.map((item) => (
                  item.subItems ? (
                    <SidebarMenuItem key={item.title} className={getMainItemBorderClass(item)}>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.title)}
                        className={`w-full justify-between px-3 py-2.5 ${location.pathname.startsWith(item.basePath || "") ? "bg-sidebar-accent/70" : ""}`}
                        tooltip={item.title}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 shrink-0 text-sidebar-foreground" />
                          {open && <span className="text-base text-sidebar-foreground">{item.title}</span>}
                        </div>
                        {open && (openMenus[item.title] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
                      </SidebarMenuButton>
                      
                      {open && openMenus[item.title] && (
                        <div className="mt-2 space-y-1">
                          {item.subItems.map(subItem => (
                            'subItems' in subItem && subItem.subItems ? (
                              <div key={subItem.title}>
                                <SidebarMenuButton
                                  onClick={() => toggleMenu(`${item.title}-${subItem.title}`)}
                                  className="pl-9 pr-3 py-2 w-full justify-between"
                                  tooltip={subItem.title}
                                >
                                  <span className="text-sm font-medium text-sidebar-foreground">{subItem.title}</span>
                                  {openMenus[`${item.title}-${subItem.title}`] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </SidebarMenuButton>
                                
                                {openMenus[`${item.title}-${subItem.title}`] && (
                                  <div className="mt-1 space-y-1">
                                    {subItem.subItems.map(nestedItem => (
                                      <SidebarMenuButton key={nestedItem.title} asChild tooltip={nestedItem.title} className="h-auto">
                                        <NavLink
                                          to={nestedItem.url}
                                          className={({isActive}) =>
                                            `pl-14 pr-3 py-1.5 text-sm ${
                                              isActive ? "font-semibold text-sidebar-primary" : "text-sidebar-muted hover:text-sidebar-foreground"
                                            }`
                                          }
                                        >
                                          <span>{nestedItem.title}</span>
                                        </NavLink>
                                      </SidebarMenuButton>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <SidebarMenuButton key={subItem.title} asChild tooltip={subItem.title} className="h-auto">
                                <NavLink
                                  to={'url' in subItem ? subItem.url : '#'}
                                  className={({isActive}) =>
                                    `pl-9 pr-3 py-1.5 text-sm ${
                                      isActive ? "font-semibold text-sidebar-primary" : "text-sidebar-muted hover:text-sidebar-foreground"
                                    }`
                                  }
                                >
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            )
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  ) : (
                    <SidebarMenuItem key={item.title} className={getMainItemBorderClass(item)}>
                      <SidebarMenuButton asChild tooltip={item.title} onClick={() => setActiveMainItem(item.title)} className="px-3 py-2.5">
                        <NavLink to={item.url} className="hover:bg-sidebar-accent/50">
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 shrink-0 text-sidebar-foreground" />
                            {open && <span className="text-base text-sidebar-foreground">{item.title}</span>}
                          </div>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <Separator className="bg-sidebar-border" />
        
        <div className="p-4 space-y-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-5 h-5">
              {isDayMode ? (
                <Sun className="h-5 w-5 text-sidebar-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-sidebar-foreground" />
              )}
            </div>
            <div className={`flex items-center justify-between w-full transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <span className="text-sm">
                {isDayMode ? "Modo Diurno" : "Modo Noturno"}
              </span>
              <ThemeToggleSvg
                className="ml-4"
                checked={isDayMode}
                onChange={(next) => setTheme(next ? "light" : "dark")}
              />
            </div>
          </div>

          <SidebarMenuButton asChild tooltip="Sair">
            <button className="w-full justify-start hover:bg-red-500/20 text-red-500 hover:text-red-400">
              <LogOut className="h-5 w-5 text-red-500" />
              <span>Sair</span>
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}