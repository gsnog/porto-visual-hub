// src/components/AppSidebar.tsx
import { useEffect, useMemo, useState } from "react"
import { 
  LayoutDashboard, 
  UserPlus, 
  Package, 
  CreditCard,
  Users, 
  FileText,
  Building,
  LogOut,
  ChevronRight,
  ChevronDown,
  Sun
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
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const mainMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Cadastro", url: "/cadastro", icon: UserPlus },
]

const estoqueItems = [
  { title: "Entradas", url: "/estoque/entradas" },
  { title: "Inventário", url: "/estoque/inventario" },
  { title: "Saídas", url: "/estoque/saidas" },
  { title: "Locações", url: "/estoque/locacoes" },
  { title: "Requisições", url: "/estoque/requisicoes" },
  { title: "XML", url: "/estoque/xml" },
]

const financeiroItems = [
  { title: "Contas a Receber", url: "/financeiro/contas-receber" },
  { title: "Contas a Pagar", url: "/financeiro/contas-pagar" },
  { title: "Fluxo de Caixa", url: "/financeiro/fluxo-caixa" },
  { title: "XML", url: "/financeiro/xml" },
]

const bottomMenuItems = [
  { title: "Patrimônio", url: "/patrimonio", icon: Building },
  { title: "Novo Usuário", url: "/novo-usuario", icon: Users },
  { title: "Planos", url: "/planos", icon: FileText },
]

// utilidade: aplica o tema no <html>
function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
    root.setAttribute("data-theme", "dark")
    root.style.colorScheme = "dark"
  } else {
    root.classList.remove("dark")
    root.setAttribute("data-theme", "light")
    root.style.colorScheme = "light"
  }
}

export function AppSidebar() {
  useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  
  const [estoqueOpen, setEstoqueOpen] = useState(currentPath.startsWith("/estoque"))
  const [financeiroOpen, setFinanceiroOpen] = useState(currentPath.startsWith("/financeiro"))

  // tema: inicializa de localStorage > prefers-color-scheme > "light"
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
      className="bg-sidebar text-sidebar-foreground"
      style={
        {
          ["--sidebar-width" as any]: "20rem",
        } as React.CSSProperties
      }
    >
      {/* Rail para reabrir quando estiver fechado no desktop */}
      <SidebarRail />

      <SidebarContent className="bg-sidebar-background">
        {/* User Profile Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg">
              PP
            </div>
            <div>
              <h3 className="font-semibold text-sidebar-foreground">Pedro Piaes</h3>
              <p className="text-sm text-muted-foreground">Desenvolvedor</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                {/* Estoque Group */}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setEstoqueOpen(!estoqueOpen)}
                    className={currentPath.startsWith("/estoque") ? "bg-sidebar-accent text-sidebar-primary font-medium" : "hover:bg-sidebar-accent/50"}
                  >
                    <Package className="h-5 w-5" />
                    <span>Estoque</span>
                    {estoqueOpen ? <ChevronDown className="h-4 w-4 ml-auto" /> : <ChevronRight className="h-4 w-4 ml-auto" />}
                  </SidebarMenuButton>
                  
                  {estoqueOpen && (
                    <div className="ml-6 mt-2 space-y-1">
                      {estoqueItems.map((subItem) => (
                        <SidebarMenuButton key={subItem.title} asChild size="sm">
                          <NavLink 
                            to={subItem.url} 
                            className={({ isActive }) => 
                              isActive 
                                ? "text-primary font-medium" 
                                : "text-muted-foreground hover:text-sidebar-foreground"
                            }
                          >
                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>

                {/* Financeiro Group */}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setFinanceiroOpen(!financeiroOpen)}
                    className={currentPath.startsWith("/financeiro") ? "bg-sidebar-accent text-sidebar-primary font-medium" : "hover:bg-sidebar-accent/50"}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Financeiro</span>
                    {financeiroOpen ? <ChevronDown className="h-4 w-4 ml-auto" /> : <ChevronRight className="h-4 w-4 ml-auto" />}
                  </SidebarMenuButton>
                  
                  {financeiroOpen && (
                    <div className="ml-6 mt-2 space-y-1">
                      {financeiroItems.map((subItem) => (
                        <SidebarMenuButton key={subItem.title} asChild size="sm">
                          <NavLink 
                            to={subItem.url} 
                            className={({ isActive }) => 
                              isActive 
                                ? "text-primary font-medium" 
                                : "text-muted-foreground hover:text-sidebar-foreground"
                            }
                          >
                            <span>{subItem.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>

                {bottomMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-sidebar-border space-y-4">
          {/* Day Mode Toggle */}
          <div className="flex items-center gap-3">
            <Sun className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-sidebar-foreground">
                {isDayMode ? "Modo Diurno" : "Modo Noturno"}
              </span>
              <Switch
                checked={isDayMode}
                onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
                aria-label="Alternar modo claro/escuro"
              />
            </div>
          </div>

          {/* Exit Button */}
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-sidebar-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
