import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";

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
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/operacional/operacao/nova")}
          >
            Adicionar
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Nome do Barco",
              placeholder: "Buscar barco...",
              value: filterNome,
              onChange: setFilterNome,
              width: "flex-1 min-w-[200px]"
            },
            {
              type: "date",
              label: "Data de Entrada",
              value: filterData,
              onChange: setFilterData,
              width: "min-w-[160px]"
            }
          ]}
          resultsCount={filteredOperacoes.length}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Data de Entrada</TableHead>
                <TableHead className="text-center">Barco</TableHead>
                <TableHead className="text-center">Custo Aproximado</TableHead>
                <TableHead className="text-center">Valor Pago</TableHead>
                <TableHead className="text-center">Previsão de Entrega</TableHead>
                <TableHead className="text-center">Data de Entrega</TableHead>
                <TableHead className="text-center">Ações</TableHead>
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
                  <TableRow key={op.id}>
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