import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";

const mockOrdens = [
  { id: 1, data: "19/12/2024", dataCompra: "20/12/2024", dataEntrega: "25/12/2024", item: "Papel A4", marca: "Chamex", quantidade: 100, requisitante: "João Silva", setor: "Administrativo", status: "Aprovado" },
  { id: 2, data: "18/12/2024", dataCompra: "19/12/2024", dataEntrega: "24/12/2024", item: "Toner HP", marca: "HP Original", quantidade: 5, requisitante: "Maria Santos", setor: "TI", status: "Análise" },
  { id: 3, data: "17/12/2024", dataCompra: "-", dataEntrega: "-", item: "Parafusos M8", marca: "Ciser", quantidade: 500, requisitante: "Carlos Pereira", setor: "Produção", status: "Negado" },
]

export default function OrdemCompra() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("");
  const [filterData, setFilterData] = useState("");

  const filteredOrdens = useMemo(() => {
    return mockOrdens.filter(ordem => {
      const matchStatus = filterStatus && filterStatus !== "todos" 
        ? ordem.status.toLowerCase() === filterStatus 
        : true
      const matchData = filterData ? ordem.data.includes(filterData.split("-").reverse().join("/")) : true
      return matchStatus && matchData
    })
  }, [filterStatus, filterData])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'text-green-600 font-medium';
      case 'Análise':
        return 'text-yellow-600 font-medium';
      case 'Negado':
        return 'text-red-600 font-medium';
      default:
        return 'text-gray-600';
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/estoque/ordem-compra/nova")}
          >
            Nova Ordem
          </Button>
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            Relatório
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "select",
              label: "Status",
              placeholder: "Selecione...",
              value: filterStatus,
              onChange: setFilterStatus,
              options: [
                { value: "todos", label: "Todos" },
                { value: "análise", label: "Análise" },
                { value: "aprovado", label: "Aprovado" },
                { value: "negado", label: "Negado" }
              ],
              width: "min-w-[180px]"
            },
            {
              type: "date",
              label: "Data",
              value: filterData,
              onChange: setFilterData,
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
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Data Compra</TableHead>
                <TableHead className="text-center">Data Entrega</TableHead>
                <TableHead className="text-center">Item</TableHead>
                <TableHead className="text-center">Marca</TableHead>
                <TableHead className="text-center">Qtd</TableHead>
                <TableHead className="text-center">Requisitante</TableHead>
                <TableHead className="text-center">Setor</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrdens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                    Nenhuma ordem encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrdens.map((ordem) => (
                  <TableRow key={ordem.id}>
                    <TableCell className="text-center">{ordem.id}</TableCell>
                    <TableCell className="text-center">{ordem.data}</TableCell>
                    <TableCell className="text-center">{ordem.dataCompra}</TableCell>
                    <TableCell className="text-center">{ordem.dataEntrega}</TableCell>
                    <TableCell className="text-center">{ordem.item}</TableCell>
                    <TableCell className="text-center">{ordem.marca}</TableCell>
                    <TableCell className="text-center">{ordem.quantidade}</TableCell>
                    <TableCell className="text-center">{ordem.requisitante}</TableCell>
                    <TableCell className="text-center">{ordem.setor}</TableCell>
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