import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const mockOperacoes = [
  { id: 1, dataEntrada: "02/06/2025", barco: "Marlin Azul", custoAproximado: "R$ 15.000,00", valorPago: "R$ 15.000,00", previsaoEntrega: "15/06/2025", dataEntrega: "15/06/2025" },
  { id: 2, dataEntrada: "01/06/2025", barco: "Veleiro Norte", custoAproximado: "R$ 8.500,00", valorPago: "R$ 4.250,00", previsaoEntrega: "20/06/2025", dataEntrega: "-" },
  { id: 3, dataEntrada: "28/05/2025", barco: "Lancha Sul", custoAproximado: "R$ 22.000,00", valorPago: "R$ 0,00", previsaoEntrega: "10/07/2025", dataEntrega: "-" },
]

const Operacao = () => {
  const navigate = useNavigate();
  const [filterNome, setFilterNome] = useState("");
  const [filterData, setFilterData] = useState("");

  const filteredOperacoes = useMemo(() => {
    return mockOperacoes.filter(op => {
      const matchNome = op.barco.toLowerCase().includes(filterNome.toLowerCase())
      const matchData = filterData ? op.dataEntrada.includes(filterData.split("-").reverse().join("/")) : true
      return matchNome && matchData
    })
  }, [filterNome, filterData])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Lista de Operações</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/operacional/operacao/nova")}
          >
            Adicionar
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Nome do Barco" 
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />
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
          {filteredOperacoes.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Data de Entrada</TableHead>
                <TableHead className="!text-white font-medium text-center">Barco</TableHead>
                <TableHead className="!text-white font-medium text-center">Custo Aproximado</TableHead>
                <TableHead className="!text-white font-medium text-center">Valor Pago</TableHead>
                <TableHead className="!text-white font-medium text-center">Previsão de Entrega</TableHead>
                <TableHead className="!text-white font-medium text-center">Data de Entrega</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOperacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma operação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOperacoes.map((op) => (
                  <TableRow key={op.id} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                    <TableCell className="text-center">{op.dataEntrada}</TableCell>
                    <TableCell className="text-center">{op.barco}</TableCell>
                    <TableCell className="text-center">{op.custoAproximado}</TableCell>
                    <TableCell className="text-center">{op.valorPago}</TableCell>
                    <TableCell className="text-center">{op.previsaoEntrega}</TableCell>
                    <TableCell className="text-center">{op.dataEntrega}</TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">Ações</Button>
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
};

export default Operacao;
