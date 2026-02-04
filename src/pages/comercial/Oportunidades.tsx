import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { TableActions } from "@/components/TableActions";
import { 
  Plus, Search, LayoutGrid, List, Filter, GripVertical, Calendar, DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { oportunidadesMock, etapasFunil, getContaById } from "@/data/comercial-mock";
import { pessoasMock } from "@/data/pessoas-mock";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export default function Oportunidades() {
  const navigate = useNavigate();
  const [view, setView] = useState<"kanban" | "lista">("kanban");
  const [searchTerm, setSearchTerm] = useState("");
  const [etapaFilter, setEtapaFilter] = useState("__all__");
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [oportunidades, setOportunidades] = useState(oportunidadesMock);

  const filteredOps = oportunidades.filter(op => {
    const conta = getContaById(op.contaId);
    const matchSearch = op.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       conta?.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEtapa = etapaFilter === "__all__" || op.etapa === etapaFilter;
    return matchSearch && matchEtapa;
  });

  const etapasAtivas = etapasFunil.filter(e => !['ganho', 'perdido'].includes(e.id));

  const getOwnerName = (ownerId: string) => {
    const pessoa = pessoasMock.find(p => p.id === ownerId);
    return pessoa?.nome.split(' ')[0] || 'N/A';
  };

  const handleDragStart = (e: React.DragEvent, opId: string) => {
    setDraggedCard(opId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, etapaId: string) => {
    e.preventDefault();
    if (draggedCard) {
      setOportunidades(prev => 
        prev.map(op => 
          op.id === draggedCard 
            ? { ...op, etapa: etapaId, probabilidade: etapasFunil.find(e => e.id === etapaId)?.probabilidade || op.probabilidade }
            : op
        )
      );
      setDraggedCard(null);
    }
  };

  const getEtapaBgColor = (etapaId: string) => {
    const colors: Record<string, string> = {
      'prospeccao': 'bg-slate-100 dark:bg-slate-800',
      'qualificacao': 'bg-blue-50 dark:bg-blue-900/30',
      'diagnostico': 'bg-indigo-50 dark:bg-indigo-900/30',
      'proposta': 'bg-purple-50 dark:bg-purple-900/30',
      'negociacao': 'bg-amber-50 dark:bg-amber-900/30',
      'aprovacao': 'bg-emerald-50 dark:bg-emerald-900/30',
    };
    return colors[etapaId] || 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar oportunidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[300px]"
            />
          </div>
          
          <div className="flex items-center border border-border rounded overflow-hidden">
            <Button
              variant={view === "kanban" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("kanban")}
              className="rounded-none"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "lista" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("lista")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button onClick={() => navigate('/comercial/oportunidades/nova')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Oportunidade
        </Button>
      </div>

      {view === "kanban" ? (
        /* Visão Kanban */
        <div className="flex gap-4 overflow-x-auto pb-4">
          {etapasAtivas.map(etapa => {
            const opsEtapa = filteredOps.filter(op => op.etapa === etapa.id);
            const totalEtapa = opsEtapa.reduce((sum, op) => sum + op.valorEstimado, 0);
            
            return (
              <div 
                key={etapa.id}
                className="flex-shrink-0 w-[300px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, etapa.id)}
              >
                <div className={`rounded p-3 ${getEtapaBgColor(etapa.id)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm">{etapa.nome}</h3>
                      <p className="text-xs text-muted-foreground">
                        {opsEtapa.length} ops • {formatCurrency(totalEtapa)}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {etapa.probabilidade}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 min-h-[200px]">
                    {opsEtapa.map(op => {
                      const conta = getContaById(op.contaId);
                      return (
                        <Card 
                          key={op.id}
                          className={`border border-border rounded cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
                            draggedCard === op.id ? 'opacity-50' : ''
                          }`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, op.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{op.titulo}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {conta?.nomeFantasia}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-sm font-semibold text-primary">
                                    {formatCurrency(op.valorEstimado)}
                                  </span>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(op.dataPrevisao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {getOwnerName(op.proprietarioId)}
                                  </span>
                                  {op.proximaAcao && (
                                    <Badge variant="secondary" className="text-xs truncate max-w-[120px]">
                                      {op.proximaAcao}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Colunas de fechamento */}
          <div className="flex-shrink-0 w-[300px]">
            <div className="rounded p-3 bg-emerald-50 dark:bg-emerald-900/30">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm text-success">Fechado Ganho</h3>
                  <p className="text-xs text-muted-foreground">
                    {filteredOps.filter(op => op.etapa === 'ganho').length} ops
                  </p>
                </div>
                <Badge variant="outline" className="text-xs bg-success/10 text-success border-success">
                  100%
                </Badge>
              </div>
              <div 
                className="min-h-[200px] border-2 border-dashed border-success/30 rounded flex items-center justify-center"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'ganho')}
              >
                <p className="text-xs text-muted-foreground">Arraste para ganhar</p>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-[300px]">
            <div className="rounded p-3 bg-rose-50 dark:bg-rose-900/30">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm text-destructive">Fechado Perdido</h3>
                  <p className="text-xs text-muted-foreground">
                    {filteredOps.filter(op => op.etapa === 'perdido').length} ops
                  </p>
                </div>
                <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive">
                  0%
                </Badge>
              </div>
              <div 
                className="min-h-[200px] border-2 border-dashed border-destructive/30 rounded flex items-center justify-center"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'perdido')}
              >
                <p className="text-xs text-muted-foreground">Arraste para perder</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Visão Lista */
        <div className="space-y-4">
          <Card className="border border-border rounded p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Etapa:</span>
                <Select value={etapaFilter} onValueChange={setEtapaFilter}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todas</SelectItem>
                    {etapasFunil.map(etapa => (
                      <SelectItem key={etapa.id} value={etapa.id}>{etapa.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <span className="ml-auto text-sm text-muted-foreground">
                {filteredOps.length} resultado(s)
              </span>
            </div>
          </Card>

          <div className="rounded border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-table-header">
                  <TableHead>Oportunidade</TableHead>
                  <TableHead>Conta</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Probabilidade</TableHead>
                  <TableHead>Previsão</TableHead>
                  <TableHead>Proprietário</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOps.map((op) => {
                  const conta = getContaById(op.contaId);
                  const etapa = etapasFunil.find(e => e.id === op.etapa);
                  return (
                    <TableRow key={op.id} className="hover:bg-muted/50 cursor-pointer">
                      <TableCell className="font-medium">{op.titulo}</TableCell>
                      <TableCell>{conta?.nomeFantasia}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(op.valorEstimado)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{etapa?.nome}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${op.probabilidade}%` }}
                            />
                          </div>
                          <span className="text-sm">{op.probabilidade}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(op.dataPrevisao).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{getOwnerName(op.proprietarioId)}</TableCell>
                      <TableCell>
                        <TableActions 
                          onView={() => {}}
                          onEdit={() => {}}
                          onDelete={() => {}}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
