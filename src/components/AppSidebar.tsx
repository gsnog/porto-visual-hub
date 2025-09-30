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
import styles from "./AppSidebar.module.css"

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
    `${styles.navLink} ${isActive ? styles.active : ''}`

  return (
    <Sidebar
      collapsible="offcanvas"
      className={styles.sidebar}
    >
      <SidebarRail />

      <SidebarContent className={styles.sidebarContent}>
        {/* User Profile Section */}
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            PP
          </div>
          {open && (
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>Pedro Piaes</h3>
              <p className={styles.userRole}>Desenvolvedor</p>
            </div>
          )}
        </div>

        <Separator className={styles.separator} />

        {/* Main Menu */}
        <div className={styles.mainMenu}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className={styles.menuList}>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title} className={styles.menuItem}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className={styles.navIcon} />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <Separator className={styles.separator} />

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          {/* Day Mode Toggle */}
          <div className={styles.themeToggle}>
            <div className={styles.themeIcon}>
              <div className={`${styles.themeDot} ${isDayMode ? styles.themeDotLight : styles.themeDotDark}`} />
            </div>
            {open && (
              <div className={styles.themeContent}>
                <span className={styles.themeLabel}>
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
            <button className={styles.exitButton}>
              <LogOut className={styles.navIcon} />
              <span>Sair</span>
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
