import { Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-border" />

        {/* User info */}
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
      </div>
    </header>
  );
}
