import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, ChevronDown, Eye, Trash2, Calendar, MessageSquare, LayoutGrid, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePermissions } from "@/contexts/PermissionsContext";
import { getTotalNaoLidas } from "@/data/chat-mock";


interface TopbarProps {
  sidebarCollapsed: boolean;
  pageTitle?: string;
  pageDescription?: string;
}

// Store previous route outside component to persist across renders
let previousRoute: string = "/";

type AppId = "kanban" | "calendario" | "chat";

interface AppItem {
  id: AppId;
  icon: typeof LayoutGrid;
  title: string;
  path: string;
  badge?: number;
}

const APPS_ORDER_KEY = "topbar-apps-order";

function getStoredOrder(): AppId[] {
  try {
    const stored = localStorage.getItem(APPS_ORDER_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return ["kanban", "calendario", "chat"];
}

export function Topbar({ 
  sidebarCollapsed, 
  pageTitle = "Dashboard",
  pageDescription = "Visão geral do sistema",
}: TopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasPermission } = usePermissions();
  const notificationCount = 3;
  const chatNaoLidas = getTotalNaoLidas('9');
  const kanbanNotifications = 0;
  
  const hasCalendarAccess = hasPermission('calendario', 'all', 'view');
  const hasChatAccess = hasPermission('chat', 'all', 'view');
  const hasKanbanAccess = hasPermission('kanban', 'all', 'view');

  const [appsOrder, setAppsOrder] = useState<AppId[]>(getStoredOrder);
  const [draggedApp, setDraggedApp] = useState<AppId | null>(null);
  const [dragOverApp, setDragOverApp] = useState<AppId | null>(null);

  const handleBellClick = () => {
    if (location.pathname === "/notificacoes") {
      navigate(previousRoute);
    } else {
      previousRoute = location.pathname;
      navigate("/notificacoes");
    }
  };

  const appItems: AppItem[] = [
    { id: "kanban", icon: LayoutGrid, title: "Kanban", path: "/kanban", badge: kanbanNotifications },
    { id: "calendario", icon: Calendar, title: "Calendário", path: "/calendario" },
    { id: "chat", icon: MessageSquare, title: "Chat", path: "/chat", badge: chatNaoLidas },
  ];

  const accessMap: Record<AppId, boolean> = {
    kanban: hasKanbanAccess,
    calendario: hasCalendarAccess,
    chat: hasChatAccess,
  };

  const orderedApps = appsOrder
    .map(id => appItems.find(a => a.id === id)!)
    .filter(a => a && accessMap[a.id]);

  const handleDragStart = (appId: AppId) => {
    setDraggedApp(appId);
  };

  const handleDragOver = (e: React.DragEvent, appId: AppId) => {
    e.preventDefault();
    setDragOverApp(appId);
  };

  const handleDrop = (targetId: AppId) => {
    if (!draggedApp || draggedApp === targetId) {
      setDraggedApp(null);
      setDragOverApp(null);
      return;
    }
    const newOrder = [...appsOrder];
    const fromIdx = newOrder.indexOf(draggedApp);
    const toIdx = newOrder.indexOf(targetId);
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, draggedApp);
    setAppsOrder(newOrder);
    localStorage.setItem(APPS_ORDER_KEY, JSON.stringify(newOrder));
    setDraggedApp(null);
    setDragOverApp(null);
  };

  const handleDragEnd = () => {
    setDraggedApp(null);
    setDragOverApp(null);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 flex h-20 items-center justify-between px-6 border-b transition-all duration-300 shrink-0",
        "bg-background text-foreground border-border",
        "dark:bg-[hsl(var(--sidebar-bg))] dark:text-white dark:border-[hsl(220_6%_16%)]"
      )}
    >
      {/* Left side - Title and description */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">{pageTitle}</h1>
        <p className="text-sm text-muted-foreground dark:text-white/60">{pageDescription}</p>
      </div>

      {/* Right side - Apps (draggable), Notifications, divider, user info */}
      <div className="flex items-center gap-2">
        {/* Draggable Apps */}
        {orderedApps.map((app) => (
          <button
            key={app.id}
            draggable
            onDragStart={() => handleDragStart(app.id)}
            onDragOver={(e) => handleDragOver(e, app.id)}
            onDrop={() => handleDrop(app.id)}
            onDragEnd={handleDragEnd}
            onClick={() => navigate(app.path)}
            className={cn(
              "relative p-2 rounded hover:bg-muted dark:hover:bg-white/10 transition-colors cursor-grab active:cursor-grabbing",
              location.pathname === app.path && "bg-muted dark:bg-white/10",
              dragOverApp === app.id && draggedApp !== app.id && "ring-2 ring-primary/50"
            )}
            title={app.title}
          >
            <app.icon className="h-5 w-5 text-foreground dark:text-white/70" />
            {app.badge && app.badge > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {app.badge > 9 ? '9+' : app.badge}
              </span>
            )}
          </button>
        ))}
        
        {/* Notifications */}
        <button 
          onClick={handleBellClick}
          className={cn(
            "relative p-2 rounded hover:bg-muted dark:hover:bg-white/10 transition-colors",
            location.pathname === "/notificacoes" && "bg-muted dark:bg-white/10"
          )}
          title="Notificações"
        >
          <Bell className="h-5 w-5 text-foreground dark:text-white/70" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-border dark:bg-white/20 ml-2" />

        {/* User info with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm">
                PP
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold">Pedro Piaes</span>
                <span className="text-xs text-muted-foreground dark:text-white/60">Desenvolvedor</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground dark:text-white/60" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border border-border">
            <DropdownMenuItem 
              className="cursor-pointer gap-2"
              onClick={() => navigate("/usuario/visualizar")}
            >
              <Eye className="h-4 w-4" />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer gap-2 text-destructive hover:!text-white hover:!bg-destructive focus:!text-white focus:!bg-destructive"
              onClick={() => navigate("/usuario/excluir")}
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}