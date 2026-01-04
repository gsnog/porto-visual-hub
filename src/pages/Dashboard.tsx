import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Package, Users } from "lucide-react"
import { PortfolioChart } from "@/components/PortfolioChart"

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu sistema</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border border-border rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Receitas</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 87.939,88</div>
              <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card className="border border-border rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NF-e Emitidas</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">+15% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card className="border border-border rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+8% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card className="border border-border rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-muted-foreground">+2.5% em relação ao mês passado</p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Chart */}
        <PortfolioChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-border rounded-lg">
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card className="border border-border rounded-lg">
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard