import { useEffect, useMemo, useState } from "react"
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  TrendingUp,
  Building,
  UserPlus,
  Map,
  LogOut,
  ChevronDown,
  ChevronRight
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
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Estrutura do menu atualizada para Estoque e Financeiro
const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Cadastro", url: "/cadastro", icon: FileText },
  { 
    title: "Estoque", 
    icon: Package,
    basePath: "/estoque",
    subItems: [
      { title: "Entradas", url: "/estoque/entradas" },
      { title: "Inventário", url: "/estoque/inventario" },
      { title: "Locações", url: "/estoque/locacoes" },
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
  { title: "Patrimônio", url: "/patrimonio", icon: Building },
  { title: "Novo Usuário", url: "/novo-usuario", icon: UserPlus },
  { title: "Planos", url: "/planos", icon: Map },
]

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
    root.setAttribute("data-theme", "dark")
    root.style.colorScheme = "dark"
    root.style.setProperty('--sidebar-text', '#ffffff');
    root.style.setProperty('--sidebar-text-muted', 'rgba(255, 255, 255, 0.6)');
  } else {
    root.classList.remove("dark")
    root.setAttribute("data-theme", "light")
    root.style.colorScheme = "light"
    root.style.setProperty('--sidebar-text', '#000000');
    root.style.setProperty('--sidebar-text-muted', 'rgba(0, 0, 0, 0.6)');
  }
}

export function AppSidebar() {
  const { open } = useSidebar()
  const location = useLocation()

  // Estado genérico para controlar todos os submenus
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };
  
  // Efeito para abrir o menu correspondente à página atual
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};
    for (const item of menuItems) {
      if (item.basePath && location.pathname.startsWith(item.basePath)) {
        newOpenMenus[item.title] = true;
      }
    }
    setOpenMenus(prev => ({ ...prev, ...newOpenMenus }));
  }, [location.pathname]);


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

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : "hover:bg-sidebar-accent/50"

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-sidebar-border"
    >
      <SidebarRail />

      <SidebarContent className="bg-sidebar text-[--sidebar-text]">
        <div className="p-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
            PP
          </div>
          {open && (
            <div className="min-w-0">
              <h3 className="font-semibold truncate text-[--sidebar-text]">Pedro Piaes</h3>
              <p className="text-sm truncate text-[--sidebar-text-muted]">Desenvolvedor</p>
            </div>
          )}
        </div>

        <Separator className="bg-sidebar-border" />

        <div className="flex-1 p-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  // Lógica genérica para itens com submenu
                  item.subItems ? (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.title)}
                        className={`w-full justify-between ${location.pathname.startsWith(item.basePath || '') ? "bg-sidebar-accent/70" : ""}`}
                        tooltip={item.title}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                        {openMenus[item.title] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </SidebarMenuButton>
                      
                      {openMenus[item.title] && (
                        <div className="mt-2 space-y-1">
                          {item.subItems.map(subItem => (
                            <SidebarMenuButton key={subItem.title} asChild tooltip={subItem.title} className="h-auto">
                              <NavLink to={subItem.url} className={({isActive}) => `pl-9 pr-3 py-2 text-sm ${isActive ? "font-semibold text-sidebar-primary" : "text-[--sidebar-text-muted] hover:text-[--sidebar-text]"}`}>
                                <span>{subItem.title}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  ) : (
                    // Lógica para itens normais
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <NavLink to={item.url} className={getNavCls}>
                          <item.icon className="h-5 w-5" />
                          <span className="text-[--sidebar-text]">{item.title}</span>
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
        
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-5 h-5">
              <div className={`w-4 h-4 rounded-full ${isDayMode ? 'bg-black' : 'bg-white/60'}`} />
            </div>
            {open && (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm">
                  {isDayMode ? "Modo Diurno" : "Modo Noturno"}
                </span>
                <Switch
                  checked={isDayMode}
                  onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
                  aria-label="Alternar modo claro/escuro"
                />
              </div>
            )}
          </div>

          <SidebarMenuButton asChild tooltip="Sair">
            <button className="w-full justify-start hover:bg-sidebar-accent text-[--sidebar-text-muted] hover:text-[--sidebar-text]">
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}