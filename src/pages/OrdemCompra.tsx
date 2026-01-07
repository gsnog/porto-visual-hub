import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

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
      <div className="p-6 space-y-6">
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

        <div className="flex flex-wrap gap-4 items-center">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-48 rounded-lg">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="análise">Análise</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="negado">Negado</SelectItem>
            </SelectContent>
          </Select>

          <Input 
            type="date" 
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] h-10 px-3 w-44 rounded-lg" 
          />

          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredOrdens.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">ID</TableHead>
                <TableHead className="!text-white font-medium text-center">Data</TableHead>
                <TableHead className="!text-white font-medium text-center">Data Compra</TableHead>
                <TableHead className="!text-white font-medium text-center">Data Entrega</TableHead>
                <TableHead className="!text-white font-medium text-center">Item</TableHead>
                <TableHead className="!text-white font-medium text-center">Marca</TableHead>
                <TableHead className="!text-white font-medium text-center">Qtd</TableHead>
                <TableHead className="!text-white font-medium text-center">Requisitante</TableHead>
                <TableHead className="!text-white font-medium text-center">Setor</TableHead>
                <TableHead className="!text-white font-medium text-center">Status</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
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
                  <TableRow key={ordem.id} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
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
