import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FileDown, BarChart3, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ExportacoesRelatorios = () => {
  const [xmlDe, setXmlDe] = useState("");
  const [xmlAte, setXmlAte] = useState("");
  const [xmlTipo, setXmlTipo] = useState("todos");
  const [relDe, setRelDe] = useState("");
  const [relAte, setRelAte] = useState("");
  const [showResult, setShowResult] = useState(false);

  return (
    <SimpleFormWizard title="Exportações e Relatórios Fiscais">
      <div className="space-y-6">
        {/* Export XMLs */}
        <Card className="border-border shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <FileDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Exportar XMLs</h2>
                  <p className="text-sm text-muted-foreground">Baixar arquivos XML por período e tipo de nota</p>
                </div>
              </div>

              <div className="flex flex-wrap items-end gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">De</Label>
                  <Input type="date" className="form-input w-[160px]" value={xmlDe} onChange={(e) => setXmlDe(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Até</Label>
                  <Input type="date" className="form-input w-[160px]" value={xmlAte} onChange={(e) => setXmlAte(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tipo</Label>
                  <Select value={xmlTipo} onValueChange={setXmlTipo}>
                    <SelectTrigger className="form-input w-[130px]"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="nfe">NF-e</SelectItem>
                      <SelectItem value="nfse">NFS-e</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="gap-2" onClick={() => toast({ title: "Exportando XMLs...", description: "O download iniciará em instantes." })}>
                  <FileDown className="h-4 w-4" />Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report */}
        <Card className="border-border shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Relatório de Notas Emitidas</h2>
                  <p className="text-sm text-muted-foreground">Resumo de notas emitidas por período</p>
                </div>
              </div>

              <div className="flex flex-wrap items-end gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">De</Label>
                  <Input type="date" className="form-input w-[160px]" value={relDe} onChange={(e) => setRelDe(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Até</Label>
                  <Input type="date" className="form-input w-[160px]" value={relAte} onChange={(e) => setRelAte(e.target.value)} />
                </div>
                <Button className="gap-2" onClick={() => setShowResult(true)}>
                  <FileText className="h-4 w-4" />Gerar
                </Button>
              </div>

              {showResult && (
                <div className="mt-6 p-6 rounded border border-border bg-muted/30 space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-sm font-semibold text-foreground">Resultado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded bg-card border border-border">
                      <p className="text-xs text-muted-foreground font-medium">Total de Notas</p>
                      <p className="text-2xl font-bold text-foreground">48</p>
                    </div>
                    <div className="p-4 rounded bg-card border border-border">
                      <p className="text-xs text-muted-foreground font-medium">Total Faturado</p>
                      <p className="text-2xl font-bold text-foreground">R$ 245.800,00</p>
                    </div>
                    <div className="p-4 rounded bg-card border border-border">
                      <p className="text-xs text-muted-foreground font-medium">Total Tributos (Valor Final)</p>
                      <p className="text-2xl font-bold text-foreground">R$ 38.420,00</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => toast({ title: "Exportando CSV..." })}><FileDown className="h-4 w-4" />CSV</Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => toast({ title: "Exportando PDF..." })}><FileDown className="h-4 w-4" />PDF</Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => toast({ title: "Exportando Excel..." })}><FileDown className="h-4 w-4" />Excel</Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SimpleFormWizard>
  );
};

export default ExportacoesRelatorios;