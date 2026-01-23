import { cn } from "@/lib/utils"

type StatusType = "em-aberto" | "vencida" | "recebida" | "em-andamento" | "finalizado" | "pendente" | string

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  // Status padrão financeiro
  "em aberto": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500" },
  "em-aberto": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500" },
  "aberto": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500" },
  "pendente": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500" },
  "aguardando": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500" },
  "em processamento": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500" },
  "processando": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500" },
  
  "vencida": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500" },
  "vencido": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500" },
  "cancelado": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500" },
  "cancelada": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500" },
  "rejeitada": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500" },
  
  "recebida": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "recebido": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "paga": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "pago": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "efetuado": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "finalizado": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "concluido": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "concluído": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "aprovada": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "aprovado": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "processada": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "autorizada": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "entrada": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  
  // Status intermediários
  "em-andamento": { bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-500" },
  "em andamento": { bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-500" },
  "pago parcial": { bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-500" },
  "saída": { bg: "bg-orange-500/20", text: "text-orange-600 dark:text-orange-500" },
  "saida": { bg: "bg-orange-500/20", text: "text-orange-600 dark:text-orange-500" },
  
  // Estoque
  "normal": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "crítico": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500" },
  "critico": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500" },
  
  // Patrimônio
  "ativo": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "inativo": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500" },
  
  // Tipos de documentos
  "nf-e": { bg: "bg-primary/20", text: "text-primary" },
  "xml": { bg: "bg-green-500/20", text: "text-green-600 dark:text-green-500" },
  "ni": { bg: "bg-muted", text: "text-muted-foreground" },
}

const defaultStyle = { bg: "bg-muted", text: "text-muted-foreground" }

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase()
  const style = statusStyles[normalizedStatus] || defaultStyle

  return (
    <span 
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 rounded text-xs font-semibold min-w-[100px]",
        style.bg,
        style.text,
        className
      )}
    >
      {status}
    </span>
  )
}
