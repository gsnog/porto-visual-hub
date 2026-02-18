import { cn } from "@/lib/utils"
import { HelpTooltip } from "@/components/HelpTooltip"

type StatusType = "em-aberto" | "vencida" | "recebida" | "em-andamento" | "finalizado" | "pendente" | string

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusStyles: Record<string, { bg: string; text: string; help: string }> = {
  "em aberto": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Registro em aberto, aguardando ação." },
  "em-aberto": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Registro em aberto, aguardando ação." },
  "aberto": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Registro em aberto." },
  "pendente": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Aguardando processamento ou aprovação." },
  "aguardando": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Aguardando resposta ou aprovação." },
  "em processamento": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Em processamento no sistema." },
  "processando": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Sendo processado." },
  "análise": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Em análise pela equipe." },
  "analise": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Em análise pela equipe." },
  
  "vencida": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Prazo de vencimento ultrapassado." },
  "vencido": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Prazo de vencimento ultrapassado." },
  "cancelado": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Registro cancelado." },
  "cancelada": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Registro cancelado." },
  "rejeitada": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Rejeitado pela aprovação." },
  "negado": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Solicitação negada." },
  "negada": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Solicitação negada." },
  
  "recebida": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Valor recebido com sucesso." },
  "recebido": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Valor recebido com sucesso." },
  "paga": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Pagamento efetuado." },
  "pago": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Pagamento efetuado." },
  "efetuado": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Operação realizada com sucesso." },
  "finalizado": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Processo concluído." },
  "concluido": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Processo concluído." },
  "concluído": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Processo concluído." },
  "aprovada": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Aprovado pela gerência." },
  "aprovado": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Aprovado pela gerência." },
  "processada": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Processamento concluído." },
  "autorizada": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Autorizado para prosseguir." },
  "entrada": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Registro de entrada." },
  
  "em-andamento": { bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-500", help: "Em andamento, ainda não concluído." },
  "em andamento": { bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-500", help: "Em andamento, ainda não concluído." },
  "pago parcial": { bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-500", help: "Pagamento parcial realizado." },
  "saída": { bg: "bg-orange-500/20", text: "text-orange-600 dark:text-orange-500", help: "Registro de saída de estoque." },
  "saida": { bg: "bg-orange-500/20", text: "text-orange-600 dark:text-orange-500", help: "Registro de saída de estoque." },
  
  "normal": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Nível de estoque normal." },
  "crítico": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Nível de estoque crítico, reabastecer." },
  "critico": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Nível de estoque crítico, reabastecer." },
  
  "ativo": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Registro ativo no sistema." },
  "inativo": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Registro inativo/desabilitado." },
  "afastado": { bg: "bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", help: "Pessoa temporariamente afastada." },
  "desligado": { bg: "bg-red-500/20", text: "text-red-600 dark:text-red-500", help: "Pessoa desligada da empresa." },
  
  "nf-e": { bg: "bg-primary/20", text: "text-primary", help: "Nota Fiscal Eletrônica." },
  "xml": { bg: "bg-primary/20", text: "text-primary dark:text-primary", help: "Arquivo XML da nota fiscal." },
  "ni": { bg: "bg-muted", text: "text-muted-foreground", help: "Não informado." },
}

const defaultStyle = { bg: "bg-muted", text: "text-muted-foreground", help: "Status do registro." }

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase()
  const style = statusStyles[normalizedStatus] || defaultStyle

  return (
    <span className="inline-flex items-center gap-1">
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
      <HelpTooltip text={style.help} size={12} />
    </span>
  )
}