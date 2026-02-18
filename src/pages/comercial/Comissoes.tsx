import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { GradientCard } from "@/components/financeiro/GradientCard";
import { FilterSection } from "@/components/FilterSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Clock, CheckCircle, XCircle, Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { comissoesMock, oportunidadesMock, getContaById } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function Comissoes() {
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [view, setView] = useState<"extrato" | "regras">("extrato");

  const filteredComissoes = comissoesMock.filter(c => {
    const matchVendedor = !vendedor || c.vendedorId === vendedor;
    return matchVendedor;
  });

  const comissoesPrevistas = filteredComissoes.filter(c => c.status === 'prevista').reduce((sum, c) => sum + c.valor, 0);
  const comissoesAprovadas = filteredComissoes.filter(c => c.status === 'aprovada').reduce((sum, c) => sum + c.valor, 0);
  const comissoesPagas = filteredComissoes.filter(c => c.status === 'paga').reduce((sum, c) => sum + c.valor, 0);
  const comissoesEstornadas = filteredComissoes.filter(c => c.status === 'estornada').reduce((sum, c) => sum + c.valor, 0);

  const getVendedorName = (id: string) => pessoasMock.find(p => p.id === id)?.nome || 'N/A';

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

  const extratoVendedores = pessoasMock.slice(0, 5).map(p => {
    const comissoes = comissoesMock.filter(c => c.vendedorId === p.id);
    return {
      id: p.id, nome: p.nome,
      previstas: comissoes.filter(c => c.status === 'prevista').reduce((sum, c) => sum + c.valor, 0),
      aprovadas: comissoes.filter(c => c.status === 'aprovada').reduce((sum, c) => sum + c.valor, 0),
      pagas: comissoes.filter(c => c.status === 'paga').reduce((sum, c) => sum + c.valor, 0),
      estornadas: comissoes.filter(c => c.status === 'estornada').reduce((sum, c) => sum + c.valor, 0),
    };
  });

  const regrasComissao = [
    { id: 1, descricao: 'Comissão padrão sobre vendas', percentual: 5, tipo: 'Sobre faturamento', condicao: 'Todas as vendas' },
    { id: 2, descricao: 'Bônus por meta atingida', percentual: 2, tipo: 'Adicional', condicao: 'Meta >= 100%' },
    { id: 3, descricao: 'Desconto inadimplência', percentual: -100, tipo: 'Estorno', condicao: 'Atraso > 90 dias' },
  ];

  const handleExport = () => {
    const exportData = filteredComissoes.map(c => {
      const opInfo = getOportunidadeInfo(c.oportunidadeId);
      return { Vendedor: getVendedorName(c.vendedorId), Oportunidade: opInfo.titulo, Conta: opInfo.conta,
        "Valor Venda": opInfo.valor, "%": c.percentual, Comissão: c.valor, Status: c.status, "Data Base": c.dataBase };
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Comissões");
    XLSX.writeFile(wb, "comissoes.xlsx");
    toast({ title: "Exportação concluída" });
  };

  return (
    <div className="space-y-6">
      <FilterSection
        fields={[
          { type: "select", label: "Período", placeholder: "Selecione", value: periodo, onChange: setPeriodo, options: [
            { value: "2026-01", label: "Janeiro 2026" }, { value: "2026-02", label: "Fevereiro 2026" }, { value: "2026-03", label: "Março 2026" }
          ], width: "min-w-[160px]" },
          { type: "select", label: "Vendedor", placeholder: "Todos", value: vendedor, onChange: setVendedor,
            options: pessoasMock.slice(0, 5).map(p => ({ value: p.id, label: p.nome })), width: "min-w-[200px]" }
        ]}
      >
        <Button variant="outline" onClick={handleExport} className="gap-2 border-border h-10">
          <Download className="w-4 h-4" /> Exportar
        </Button>
      </FilterSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard title="Comissões Previstas" value={formatCurrency(comissoesPrevistas)} icon={Clock} variant="warning" />
        <GradientCard title="Comissões Aprovadas" value={formatCurrency(comissoesAprovadas)} icon={CheckCircle} variant="info" />
        <GradientCard title="Comissões Pagas" value={formatCurrency(comissoesPagas)} icon={DollarSign} variant="success" />
        <GradientCard title="Comissões Estornadas" value={formatCurrency(comissoesEstornadas)} icon={XCircle} variant="danger" />
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as any)}>
        <TabsList>
          <TabsTrigger value="extrato">Extrato</TabsTrigger>
          <TabsTrigger value="regras">Regras de Comissão</TabsTrigger>
        </TabsList>

        <TabsContent value="extrato" className="mt-4 space-y-6">
          <Card className="border border-border rounded">
            <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Resumo por Vendedor</CardTitle></CardHeader>
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
                        <TableCell className="text-right font-semibold">{formatCurrency(v.previstas + v.aprovadas - v.estornadas)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border rounded">
            <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Detalhamento das Comissões</CardTitle></CardHeader>
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
                          <TableCell><StatusBadge status={getStatusBadgeStatus(c.status)} /></TableCell>
                          <TableCell className="text-muted-foreground">{new Date(c.dataBase).toLocaleDateString('pt-BR')}</TableCell>
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
              <Button size="sm" onClick={() => navigate('/comercial/comissoes/nova-regra')} className="gap-2">
                <Plus className="h-4 w-4" /> Nova Regra
              </Button>
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
                        <TableCell><Badge variant="outline">{regra.tipo}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{regra.condicao}</TableCell>
                        <TableCell className={`text-right font-semibold ${regra.percentual < 0 ? 'text-destructive' : ''}`}>
                          {regra.percentual > 0 ? '+' : ''}{regra.percentual}%
                        </TableCell>
                        <TableCell><Badge variant="secondary">Ativa</Badge></TableCell>
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
