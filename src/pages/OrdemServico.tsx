import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";
import { Plus } from "lucide-react";

const mockOrdens = [
  { id: 1, tipo: "Serviços Gerais", data: "19/12/2024", descricao: "Limpeza geral", responsavel: "João Silva", status: "Concluído" },
  { id: 2, tipo: "Patrimônio", data: "18/12/2024", descricao: "Manutenção de ar-condicionado", responsavel: "Maria Santos", status: "Em Andamento" },
  { id: 3, tipo: "Suporte", data: "17/12/2024", descricao: "Instalação de software", responsavel: "Carlos Pereira", status: "Pendente" },
]

export default function OrdemServico() {
  const navigate = useNavigate();
  const [filterTipo, setFilterTipo] = useState("");
  const [filterDataInicio, setFilterDataInicio] = useState("");
  const [filterDataFim, setFilterDataFim] = useState("");

  const filteredOrdens = useMemo(() => {
    return mockOrdens.filter(ordem => {
      const matchTipo = filterTipo && filterTipo !== "todos" 
        ? ordem.tipo.toLowerCase().includes(filterTipo.replace("_", " ")) 
        : true
      const matchDataInicio = filterDataInicio ? ordem.data.includes(filterDataInicio.split("-").reverse().join("/")) : true
      const matchDataFim = filterDataFim ? ordem.data.includes(filterDataFim.split("-").reverse().join("/")) : true
      return matchTipo && matchDataInicio && matchDataFim
    })
  }, [filterTipo, filterDataInicio, filterDataFim])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'text-green-600 font-medium';
      case 'Em Andamento':
        return 'text-blue-600 font-medium';
      case 'Pendente':
        return 'text-yellow-600 font-medium';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button
            className="gap-2"
            onClick={() => navigate("/estoque/ordem-servico/nova")}
          >
            <Plus className="w-4 h-4" />
            Nova Ordem
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "select",
              label: "Tipo de Ordem",
              placeholder: "Selecione...",
              value: filterTipo,
              onChange: setFilterTipo,
              options: [
                { value: "todos", label: "Todos" },
                { value: "serviços gerais", label: "Serviços Gerais" },
                { value: "patrimônio", label: "Patrimônio" },
                { value: "suporte", label: "Suporte" }
              ],
              width: "min-w-[180px]"
            },
            {
              type: "date",
              label: "Data Início",
              value: filterDataInicio,
              onChange: setFilterDataInicio,
              width: "min-w-[160px]"
            },
            {
              type: "date",
              label: "Data Fim",
              value: filterDataFim,
              onChange: setFilterDataFim,
              width: "min-w-[160px]"
            }
          ]}
          resultsCount={filteredOrdens.length}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Descrição</TableHead>
                <TableHead className="text-center">Responsável</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrdens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma ordem encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrdens.map((ordem) => (
                  <TableRow key={ordem.id}>
                    <TableCell className="text-center">{ordem.id}</TableCell>
                    <TableCell className="text-center">{ordem.tipo}</TableCell>
                    <TableCell className="text-center">{ordem.data}</TableCell>
                    <TableCell className="text-center">{ordem.descricao}</TableCell>
                    <TableCell className="text-center">{ordem.responsavel}</TableCell>
                    <TableCell className="text-center">
                      <span className={getStatusColor(ordem.status)}>{ordem.status}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                        Ações
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}