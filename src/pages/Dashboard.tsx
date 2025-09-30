import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Package, Users } from "lucide-react"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Visão geral do seu sistema</p>
      </div>

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Total Receitas</h3>
            <DollarSign className={styles.cardIcon} />
          </div>
          <div className={styles.cardValue}>R$ 87.939,88</div>
          <p className={styles.subtitle}>+20.1% em relação ao mês passado</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>NF-e Emitidas</h3>
            <Package className={styles.cardIcon} />
          </div>
          <div className={styles.cardValue}>234</div>
          <p className={styles.subtitle}>+15% em relação ao mês passado</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Clientes Ativos</h3>
            <Users className={styles.cardIcon} />
          </div>
          <div className={styles.cardValue}>89</div>
          <p className={styles.subtitle}>+8% em relação ao mês passado</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Crescimento</h3>
            <TrendingUp className={styles.cardIcon} />
          </div>
          <div className={styles.cardValue}>12.5%</div>
          <p className={styles.subtitle}>+2.5% em relação ao mês passado</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={styles.chartSection}>
          <h2 className={styles.chartTitle}>Atividades Recentes</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">NF-e #99999 emitida</p>
                <p className="text-sm text-muted-foreground">Cliente: ABEEMAR</p>
              </div>
              <span className="text-sm text-muted-foreground">há 2 horas</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pagamento recebido</p>
                <p className="text-sm text-muted-foreground">R$ 5.430,00</p>
              </div>
              <span className="text-sm text-muted-foreground">há 4 horas</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Novo produto cadastrado</p>
                <p className="text-sm text-muted-foreground">Automóvel - Código 0001</p>
              </div>
              <span className="text-sm text-muted-foreground">ontem</span>
            </div>
          </div>
        </div>

        <div className={styles.chartSection}>
          <h2 className={styles.chartTitle}>Resumo Financeiro</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Contas a Receber</span>
              <span className="font-medium text-success">R$ 25.430,00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Contas a Pagar</span>
              <span className="font-medium text-destructive">R$ 8.234,00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Saldo Atual</span>
              <span className="font-bold text-primary">R$ 87.939,88</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard