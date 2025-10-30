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
import { Separator } from "@/components/ui/separator"

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
    <circle cx="37" cy="37" r="33" fill="#FF8000"/>
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
    root.setAttribute("data-theme", "dark")
    root.style.colorScheme = "dark"
    root.style.setProperty("--sidebar-text", "#ffffff")
    root.style.setProperty("--sidebar-text-muted", "rgba(255, 255, 255, 0.6)")
  } else {
    root.classList.remove("dark")
    root.setAttribute("data-theme", "light")
    root.style.colorScheme = "light"
    root.style.setProperty("--sidebar-text", "#000000")
    root.style.setProperty("--sidebar-text-muted", "rgba(0, 0, 0, 0.6)")
  }
}

export function AppSidebar() {
  const { open } = useSidebar()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }))
  }
  
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {}
    for (const item of menuItems) {
      if (item.basePath && location.pathname.startsWith(item.basePath)) {
        newOpenMenus[item.title] = true
      }
    }
    setOpenMenus(prev => ({ ...prev, ...newOpenMenus }))
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
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : "hover:bg-sidebar-accent/50"

  const ICON_SIZE = 22

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
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
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
              <SidebarMenu className="space-y-6">
                {menuItems.map((item) => (
                  item.subItems ? (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.title)}
                        className={`w-full justify-between ${location.pathname.startsWith(item.basePath || "") ? "bg-sidebar-accent/70" : ""}`}
                        tooltip={item.title}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={ICON_SIZE} className="text-[--sidebar-text]" />
                          <span className="text-lg">{item.title}</span>
                        </div>
                        {openMenus[item.title] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </SidebarMenuButton>
                      
                      {openMenus[item.title] && (
                        <div className="mt-3 space-y-3">
                          {item.subItems.map(subItem => (
                            <SidebarMenuButton key={subItem.title} asChild tooltip={subItem.title} className="h-auto">
                              <NavLink
                                to={subItem.url}
                                className={({isActive}) =>
                                  `pl-9 pr-3 py-2 !text-base ${
                                    isActive ? "font-semibold text-sidebar-primary" : "text-[--sidebar-text-muted] hover:text-[--sidebar-text]"
                                  }`
                                }
                              >
                                <span>{subItem.title}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <NavLink to={item.url} className={getNavCls}>
                          <item.icon size={ICON_SIZE} className="text-[--sidebar-text]" />
                          <span className="text-[--sidebar-text] text-lg">{item.title}</span>
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
            <button className="w-full justify-start hover:bg-sidebar-accent text-[--sidebar-text-muted] hover:text-[--sidebar-text]">
              <LogOut className="h-5 w-5 text-[--sidebar-text-muted]" />
              <span>Sair</span>
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
