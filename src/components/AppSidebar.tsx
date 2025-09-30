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
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Cadastro", url: "/cadastro", icon: FileText },
  { title: "Estoque", url: "/estoque/entradas", icon: Package },
  { title: "Financeiro", url: "/financeiro/contas-receber", icon: TrendingUp },
  { title: "Patrimônio", url: "/patrimonio", icon: Building },
  { title: "Novo Usuário", url: "/novo-usuario", icon: UserPlus },
  { title: "Planos", url: "/planos", icon: Map },
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
  const { open } = useSidebar()

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
      collapsible="icon"
      className="border-r border-sidebar-border"
    >
      <SidebarRail />

      <SidebarContent className="bg-sidebar">
        {/* User Profile Section */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
            PP
          </div>
          {open && (
            <div className="min-w-0">
              <h3 className="font-semibold text-sidebar-foreground truncate">Pedro Piaes</h3>
              <p className="text-sm text-sidebar-foreground/60 truncate">Desenvolvedor</p>
            </div>
          )}
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Main Menu */}
        <div className="flex-1 p-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
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

        <Separator className="bg-sidebar-border" />

        {/* Bottom Section */}
        <div className="p-4 space-y-4">
          {/* Day Mode Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-5 h-5">
              <div className={`w-4 h-4 rounded-full ${isDayMode ? 'bg-sidebar-foreground' : 'bg-sidebar-foreground/60'}`} />
            </div>
            {open && (
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
            )}
          </div>

          {/* Exit Button */}
          <SidebarMenuButton asChild tooltip="Sair">
            <button className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent">
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
