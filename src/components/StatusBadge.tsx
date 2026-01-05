import { cn } from "@/lib/utils"

type StatusType = "em-andamento" | "finalizado" | "pendente" | string

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusStyles: Record<string, string> = {
  "em-andamento": "bg-primary/20 text-primary",
  "em andamento": "bg-primary/20 text-primary",
  "finalizado": "bg-success/20 text-success",
  "concluido": "bg-success/20 text-success",
  "concluído": "bg-success/20 text-success",
  "pendente": "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500",
  "aguardando": "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500",
  "cancelado": "bg-destructive/20 text-destructive",
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase()
  const styleClass = statusStyles[normalizedStatus] || "bg-muted text-muted-foreground"

  return (
    <span className={cn("badge-status", styleClass, className)}>
      {status}
    </span>
  )
}
