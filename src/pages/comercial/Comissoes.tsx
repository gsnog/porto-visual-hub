import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { GradientCard } from "@/components/financeiro/GradientCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, TrendingUp, Clock, CheckCircle, XCircle, Calendar, Download
} from "lucide-react";
import { comissoesMock, oportunidadesMock, getContaById } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export default function Comissoes() {
  const [periodo, setPeriodo] = useState("2026-02");
  const [vendedor, setVendedor] = useState("__all__");
  const [view, setView] = useState<"extrato" | "regras">("extrato");

  // Filtrar comissões
  const filteredComissoes = comissoesMock.filter(c => {
    const matchVendedor = vendedor === "__all__" || c.vendedorId === vendedor;
    return matchVendedor;
  });

  // Métricas
  const comissoesPrevistas = filteredComissoes.filter(c => c.status === 'prevista').reduce((sum, c) => sum + c.valor, 0);
  const comissoesAprovadas = filteredComissoes.filter(c => c.status === 'aprovada').reduce((sum, c) => sum + c.valor, 0);
  const comissoesPagas = filteredComissoes.filter(c => c.status === 'paga').reduce((sum, c) => sum + c.valor, 0);
  const comissoesEstornadas = filteredComissoes.filter(c => c.status === 'estornada').reduce((sum, c) => sum + c.valor, 0);

  const getVendedorName = (id: string) => {
    const pessoa = pessoasMock.find(p => p.id === id);
    return pessoa?.nome || 'N/A';
  };

  const getOportunidadeInfo = (opId: string) => {
    const op = oportunidadesMock.find(o => o.id === opId);
    if (!op) return { titulo: 'N/A', conta: 'N/A', valor: 0 };
    const conta = getContaById(op.contaId);
    return { titulo: op.titulo, conta: conta?.nomeFantasia || 'N/A', valor: op.valorEstimado };
  };

  const getStatusBadgeStatus = (status: string): string => {
    switch (status) {
      case 'prevista': return 'Em andamento';
      case 'aprovada': return 'Processando';
      case 'paga': return 'Entrada';
      case 'estornada': return 'Vencida';
      default: return 'Em aberto';
    }
  };

  // Extrato por vendedor
  const extratoVendedores = pessoasMock.slice(0, 5).map(p => {
    const comissoes = comissoesMock.filter(c => c.vendedorId === p.id);
    return {
      id: p.id,
      nome: p.nome,
      previstas: comissoes.filter(c => c.status === 'prevista').reduce((sum, c) => sum + c.valor, 0),
      aprovadas: comissoes.filter(c => c.status === 'aprovada').reduce((sum, c) => sum + c.valor, 0),
      pagas: comissoes.filter(c => c.status === 'paga').reduce((sum, c) => sum + c.valor, 0),
      estornadas: comissoes.filter(c => c.status === 'estornada').reduce((sum, c) => sum + c.valor, 0),
    };
  });

  // Regras de comissão (mock)
  const regrasComissao = [
    { id: 1, descricao: 'Comissão padrão sobre vendas', percentual: 5, tipo: 'Sobre faturamento', condicao: 'Todas as vendas' },
    { id: 2, descricao: 'Bônus por meta atingida', percentual: 2, tipo: 'Adicional', condicao: 'Meta >= 100%' },
    { id: 3, descricao: 'Desconto inadimplência', percentual: -100, tipo: 'Estorno', condicao: 'Atraso > 90 dias' },
  ];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Período:</span>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="w-[150px] h-9">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-01">Janeiro 2026</SelectItem>
                  <SelectItem value="2026-02">Fevereiro 2026</SelectItem>
                  <SelectItem value="2026-03">Março 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Vendedor:</span>
              <Select value={vendedor} onValueChange={setVendedor}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">Todos</SelectItem>
                  {pessoasMock.slice(0, 5).map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </Card>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard
          title="Comissões Previstas"
          value={formatCurrency(comissoesPrevistas)}
          icon={Clock}
          variant="warning"
        />
        <GradientCard
          title="Comissões Aprovadas"
          value={formatCurrency(comissoesAprovadas)}
          icon={CheckCircle}
          variant="info"
        />
        <GradientCard
          title="Comissões Pagas"
          value={formatCurrency(comissoesPagas)}
          icon={DollarSign}
          variant="success"
        />
        <GradientCard
          title="Comissões Estornadas"
          value={formatCurrency(comissoesEstornadas)}
          icon={XCircle}
          variant="danger"
        />
      </div>

      {/* Tabs */}
      <Tabs value={view} onValueChange={(v) => setView(v as any)}>
        <TabsList>
          <TabsTrigger value="extrato">Extrato</TabsTrigger>
          <TabsTrigger value="regras">Regras de Comissão</TabsTrigger>
        </TabsList>

        <TabsContent value="extrato" className="mt-4 space-y-6">
          {/* Extrato por vendedor */}
          <Card className="border border-border rounded">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Resumo por Vendedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-table-header">
                      <TableHead>Vendedor</TableHead>
                      <TableHead className="text-right">Previstas</TableHead>
                      <TableHead className="text-right">Aprovadas</TableHead>
                      <TableHead className="text-right">Pagas</TableHead>
                      <TableHead className="text-right">Estornadas</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extratoVendedores.map((v) => (
                      <TableRow key={v.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{v.nome}</TableCell>
                        <TableCell className="text-right text-warning">{formatCurrency(v.previstas)}</TableCell>
                        <TableCell className="text-right text-primary">{formatCurrency(v.aprovadas)}</TableCell>
                        <TableCell className="text-right text-success">{formatCurrency(v.pagas)}</TableCell>
                        <TableCell className="text-right text-destructive">{formatCurrency(v.estornadas)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(v.previstas + v.aprovadas - v.estornadas)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Detalhamento */}
          <Card className="border border-border rounded">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Detalhamento das Comissões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-table-header">
                      <TableHead>Vendedor</TableHead>
                      <TableHead>Oportunidade</TableHead>
                      <TableHead>Conta</TableHead>
                      <TableHead className="text-right">Valor Venda</TableHead>
                      <TableHead className="text-right">%</TableHead>
                      <TableHead className="text-right">Comissão</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data Base</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComissoes.map((c) => {
                      const opInfo = getOportunidadeInfo(c.oportunidadeId);
                      return (
                        <TableRow key={c.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{getVendedorName(c.vendedorId)}</TableCell>
                          <TableCell>{opInfo.titulo}</TableCell>
                          <TableCell>{opInfo.conta}</TableCell>
                          <TableCell className="text-right">{formatCurrency(opInfo.valor)}</TableCell>
                          <TableCell className="text-right">{c.percentual}%</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(c.valor)}</TableCell>
                          <TableCell>
                            <StatusBadge status={getStatusBadgeStatus(c.status)} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(c.dataBase).toLocaleDateString('pt-BR')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regras" className="mt-4">
          <Card className="border border-border rounded">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Regras de Comissionamento</CardTitle>
              <Button size="sm">Nova Regra</Button>
            </CardHeader>
            <CardContent>
              <div className="rounded border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-table-header">
                      <TableHead>Descrição</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Condição</TableHead>
                      <TableHead className="text-right">Percentual</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {regrasComissao.map((regra) => (
                      <TableRow key={regra.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{regra.descricao}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{regra.tipo}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{regra.condicao}</TableCell>
                        <TableCell className={`text-right font-semibold ${regra.percentual < 0 ? 'text-destructive' : ''}`}>
                          {regra.percentual > 0 ? '+' : ''}{regra.percentual}%
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Ativa</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
