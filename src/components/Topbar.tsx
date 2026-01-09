import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  sidebarCollapsed: boolean;
  pageTitle?: string;
  pageDescription?: string;
}

export function Topbar({ 
  sidebarCollapsed, 
  pageTitle = "Dashboard",
  pageDescription = "Visão geral do sistema",
}: TopbarProps) {
  const navigate = useNavigate();
  const notificationCount = 3;

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center justify-between bg-card px-6 shadow-sm transition-all duration-300"
      )}
    >
      {/* Left side - Title and description */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-foreground">{pageTitle}</h1>
        <p className="text-sm text-muted-foreground">{pageDescription}</p>
      </div>

      {/* Right side - Notifications, divider, user info */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button 
          onClick={() => navigate("/notificacoes")}
          className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-border" />

        {/* User info with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                PP
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold text-foreground">Pedro Piaes</span>
                <span className="text-xs text-muted-foreground">Desenvolvedor</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
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