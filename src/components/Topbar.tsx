import { useNavigate, useLocation } from "react-router-dom";
import { Bell, ChevronDown, Eye, Pencil, Trash2, Calendar, MessageSquare, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePermissions } from "@/contexts/PermissionsContext";
import { getTotalNaoLidas } from "@/data/chat-mock";
import { getKanbanNotifications } from "@/data/kanban-mock";

interface TopbarProps {
  sidebarCollapsed: boolean;
  pageTitle?: string;
  pageDescription?: string;
}

// Store previous route outside component to persist across renders
let previousRoute: string = "/";

export function Topbar({ 
  sidebarCollapsed, 
  pageTitle = "Dashboard",
  pageDescription = "Visão geral do sistema",
}: TopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasPermission } = usePermissions();
  const notificationCount = 3;
  const chatNaoLidas = getTotalNaoLidas('9'); // Mock: Pedro Piaes
  const kanbanNotifications = getKanbanNotifications('9'); // Mock: Pedro Piaes
  
  const hasCalendarAccess = hasPermission('calendario', 'all', 'view');
  const hasChatAccess = hasPermission('chat', 'all', 'view');
  const hasKanbanAccess = hasPermission('kanban', 'all', 'view');

  const handleBellClick = () => {
    if (location.pathname === "/notificacoes") {
      navigate(previousRoute);
    } else {
      previousRoute = location.pathname;
      navigate("/notificacoes");
    }
  };
  
  const handleCalendarClick = () => {
    navigate("/calendario");
  };
  
  const handleChatClick = () => {
    navigate("/chat");
  };
  
  const handleKanbanClick = () => {
    navigate("/kanban");
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 flex h-20 items-center justify-between px-6 border-b border-white/10 transition-all duration-300",
        "bg-[#0B0D0F] text-white"
      )}
    >
      {/* Left side - Title and description */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-white">{pageTitle}</h1>
        <p className="text-sm text-white/60">{pageDescription}</p>
      </div>

      {/* Right side - Kanban, Calendar, Chat, Notifications, divider, user info */}
      <div className="flex items-center gap-2">
        {/* Kanban */}
        {hasKanbanAccess && (
          <button 
            onClick={handleKanbanClick}
            className={cn(
              "relative p-2 rounded hover:bg-white/10 transition-colors",
              location.pathname === "/kanban" && "bg-white/10"
            )}
            title="Kanban"
          >
            <LayoutGrid className="h-5 w-5 text-white/70" />
            {kanbanNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {kanbanNotifications > 9 ? '9+' : kanbanNotifications}
              </span>
            )}
          </button>
        )}
        
        {/* Calendar */}
        {hasCalendarAccess && (
          <button 
            onClick={handleCalendarClick}
            className={cn(
              "relative p-2 rounded hover:bg-white/10 transition-colors",
              location.pathname === "/calendario" && "bg-white/10"
            )}
            title="Calendário"
          >
            <Calendar className="h-5 w-5 text-white/70" />
          </button>
        )}
        
        {/* Chat */}
        {hasChatAccess && (
          <button 
            onClick={handleChatClick}
            className={cn(
              "relative p-2 rounded hover:bg-white/10 transition-colors",
              location.pathname === "/chat" && "bg-white/10"
            )}
            title="Chat"
          >
            <MessageSquare className="h-5 w-5 text-white/70" />
            {chatNaoLidas > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {chatNaoLidas > 9 ? '9+' : chatNaoLidas}
              </span>
            )}
          </button>
        )}
        
        {/* Notifications */}
        <button 
          onClick={handleBellClick}
          className={cn(
              "relative p-2 rounded hover:bg-white/10 transition-colors",
              location.pathname === "/notificacoes" && "bg-white/10"
          )}
          title="Notificações"
        >
          <Bell className="h-5 w-5 text-white/70" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-white/20 ml-2" />

        {/* User info with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm">
                PP
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold text-white">Pedro Piaes</span>
                <span className="text-xs text-white/60">Desenvolvedor</span>
              </div>
              <ChevronDown className="h-4 w-4 text-white/60" />
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
              className="cursor-pointer gap-2"
              onClick={() => navigate("/usuario/editar")}
            >
              <Pencil className="h-4 w-4" />
              Editar
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