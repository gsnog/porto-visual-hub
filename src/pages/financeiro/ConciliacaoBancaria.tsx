import React, { useState, useEffect } from "react";
import { 
  fetchContasPagar, 
  fetchContasReceber, 
  importarOfxNovo, 
  conciliarLancamento,
  TransacaoBancaria,
  ContaPagar,
  ContaReceber
} from "@/services/financeiro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRightLeft,
  Loader2,
  Calendar,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ConciliacaoBancaria = () => {
  const [ofxTransactions, setOfxTransactions] = useState<TransacaoBancaria[]>([]);
  const [payableAccounts, setPayableAccounts] = useState<any[]>([]);
  const [receivableAccounts, setReceivableAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [selectedOfx, setSelectedOfx] = useState<number | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<{ id: number, type: 'contas_pagar' | 'contas_receber' } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pagar, receber] = await Promise.all([
        fetchContasPagar(),
        fetchContasReceber()
      ]);
      
      setPayableAccounts(pagar.filter(p => p.status !== "Efetuado").map(p => ({ ...p, type: 'contas_pagar' as const })));
      setReceivableAccounts(receber.filter(r => r.status !== "Efetuado").map(r => ({ ...r, type: 'contas_receber' as const })));
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar as contas do sistema.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const data = await importarOfxNovo(file);
      setOfxTransactions(data);
      toast({
        title: "OFX Importado",
        description: `${data.length} transações pendentes carregadas.`,
      });
    } catch (error) {
      toast({
        title: "Erro na importação",
        description: "Verifique o arquivo OFX e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const handleConciliar = async () => {
    if (selectedOfx === null || selectedSystem === null) return;

    setLoading(true);
    try {
      await conciliarLancamento(
        selectedOfx,
        selectedSystem.id,
        selectedSystem.type
      );

      toast({
        title: "Conciliação realizada",
        description: "O lançamento foi marcado como efetuado com sucesso.",
      });

      // Refresh lists
      setOfxTransactions(prev => prev.filter(t => t.id !== selectedOfx));
      if (selectedSystem.type === 'contas_pagar') {
        setPayableAccounts(prev => prev.filter(s => s.id !== selectedSystem.id));
      } else {
        setReceivableAccounts(prev => prev.filter(s => s.id !== selectedSystem.id));
      }
      setSelectedOfx(null);
      setSelectedSystem(null);
    } catch (error) {
      toast({
        title: "Erro na conciliação",
        description: "Não foi possível realizar a conciliação.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden p-6 gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Search className="w-8 h-8 text-primary" />
            Conciliação Bancária
          </h1>
          <p className="text-muted-foreground mt-1">Importe seu extrato OFX e concilie com os lançamentos do sistema.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Input
            id="ofx-upload"
            type="file"
            accept=".ofx"
            className="hidden"
            onChange={handleFileUpload}
            disabled={importing}
          />
          <Button 
            onClick={() => document.getElementById('ofx-upload')?.click()}
            disabled={importing}
            variant="outline"
            className="gap-2 border-border"
          >
            {importing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
            Importar OFX
          </Button>

          <Button 
            onClick={handleConciliar}
            disabled={selectedOfx === null || selectedSystem === null || loading}
            className="gap-2"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Conciliar Selecionados
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow overflow-hidden min-h-0">
        {/* Lado Esquerdo: OFX */}
        <Card className="flex flex-col min-h-0 shadow-sm border-border overflow-hidden">
          <CardHeader className="border-b bg-muted/30 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Transações do Banco (OFX)
                </CardTitle>
                <CardDescription>Selecione uma transação</CardDescription>
              </div>
              <Badge variant="secondary" className="font-medium text-xs">
                {ofxTransactions.length} Pendentes
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {ofxTransactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground italic">
                    <AlertCircle className="h-8 w-8 mb-2 opacity-20" />
                    <p>Nenhuma transação importada ou pendente.</p>
                  </div>
                ) : (
                  ofxTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => setSelectedOfx(selectedOfx === tx.id ? null : tx.id)}
                      className={`group p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedOfx === tx.id 
                        ? "bg-primary/5 border-primary" 
                        : "bg-card border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                            selectedOfx === tx.id 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "bg-background border-border group-hover:border-primary/50 text-transparent"
                          }`}>
                            <Check size={14} className={selectedOfx === tx.id ? "opacity-100" : "opacity-0"} />
                          </div>
                          <div>
                            <span className="font-semibold text-sm block">{tx.descricao}</span>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {format(new Date(tx.data_transacao), "dd/MM/yyyy", { locale: ptBR })}
                              </span>
                              <span className={`flex items-center gap-1 ${tx.tipo === 'credito' ? 'text-green-600' : 'text-red-600'}`}>
                                {tx.tipo === 'credito' ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />}
                                {tx.tipo === 'credito' ? 'Crédito' : 'Débito'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className={`font-bold text-sm ${tx.tipo === 'credito' ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(Number(tx.valor))}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Lado Direito: Sistema */}
        <Card className="flex flex-col min-h-0 shadow-sm border-border overflow-hidden">
          <CardHeader className="border-b bg-muted/30 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                  Lançamentos do Sistema
                </CardTitle>
                <CardDescription>Contas a Pagar e Receber</CardDescription>
              </div>
              <Badge variant="outline" className="font-medium text-xs">
                {payableAccounts.length + receivableAccounts.length} Pendentes
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-6">
                {payableAccounts.length === 0 && receivableAccounts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground italic">
                    <AlertCircle className="h-8 w-8 mb-2 opacity-20" />
                    <p>Nenhum lançamento pendente encontrado.</p>
                  </div>
                ) : (
                  <>
                    {payableAccounts.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 border-b pb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-red-600">Contas a Pagar</h3>
                          <Badge variant="outline" className="text-[10px] py-0 border-red-200 text-red-600">{payableAccounts.length}</Badge>
                        </div>
                        {payableAccounts.map((acc) => (
                          <div
                            key={`pagar-${acc.id}`}
                            onClick={() => setSelectedSystem(selectedSystem?.id === acc.id && selectedSystem?.type === 'contas_pagar' ? null : { id: acc.id, type: 'contas_pagar' })}
                            className={`group p-4 rounded-lg border transition-all cursor-pointer ${
                              selectedSystem?.id === acc.id && selectedSystem?.type === 'contas_pagar'
                              ? "bg-primary/5 border-primary" 
                              : "bg-card border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                                  selectedSystem?.id === acc.id && selectedSystem?.type === 'contas_pagar'
                                  ? "bg-primary border-primary text-primary-foreground" 
                                  : "bg-background border-border group-hover:border-primary/50 text-transparent"
                                }`}>
                                  <Check size={14} className={selectedSystem?.id === acc.id && selectedSystem?.type === 'contas_pagar' ? "opacity-100" : "opacity-0"} />
                                </div>
                                <div>
                                  <span className="font-semibold text-sm block">{acc.fornecedor_nome}</span>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      Venc: {format(new Date(acc.data_de_vencimento), "dd/MM/yyyy", { locale: ptBR })}
                                    </span>
                                    {acc.documento && <span className="italic">Doc: {acc.documento}</span>}
                                  </div>
                                </div>
                              </div>
                              <span className="font-bold text-sm">
                                {formatCurrency(acc.valor_total || acc.valor_do_titulo)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {receivableAccounts.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 border-b pb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-green-600">Contas a Receber</h3>
                          <Badge variant="outline" className="text-[10px] py-0 border-green-200 text-green-600">{receivableAccounts.length}</Badge>
                        </div>
                        {receivableAccounts.map((acc) => (
                          <div
                            key={`receber-${acc.id}`}
                            onClick={() => setSelectedSystem(selectedSystem?.id === acc.id && selectedSystem?.type === 'contas_receber' ? null : { id: acc.id, type: 'contas_receber' })}
                            className={`group p-4 rounded-lg border transition-all cursor-pointer ${
                              selectedSystem?.id === acc.id && selectedSystem?.type === 'contas_receber'
                              ? "bg-primary/5 border-primary" 
                              : "bg-card border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                                  selectedSystem?.id === acc.id && selectedSystem?.type === 'contas_receber'
                                  ? "bg-primary border-primary text-primary-foreground" 
                                  : "bg-background border-border group-hover:border-primary/50 text-transparent"
                                }`}>
                                  <Check size={14} className={selectedSystem?.id === acc.id && selectedSystem?.type === 'contas_receber' ? "opacity-100" : "opacity-0"} />
                                </div>
                                <div>
                                  <span className="font-semibold text-sm block">{acc.cliente_nome}</span>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      Venc: {format(new Date(acc.data_de_vencimento), "dd/MM/yyyy", { locale: ptBR })}
                                    </span>
                                    {acc.documento && <span className="italic">Doc: {acc.documento}</span>}
                                  </div>
                                </div>
                              </div>
                              <span className="font-bold text-sm">
                                {formatCurrency(acc.valor_total || acc.valor_do_titulo)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConciliacaoBancaria;
