import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockTransferencias = [
  { id: 1, data: "15/01/2026", contaOrigem: "Banco do Brasil - 12345-6", contaDestino: "Itaú - 98765-4", valor: "R$ 10.000,00" },
  { id: 2, data: "18/01/2026", contaOrigem: "Itaú - 98765-4", contaDestino: "Bradesco - 54321-0", valor: "R$ 5.000,00" },
];

const Transferencias = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [searchContaOrigem, setSearchContaOrigem] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Conta Origem",
      placeholder: "Buscar conta origem...",
      value: searchContaOrigem,
      onChange: setSearchContaOrigem,
      width: "flex-1 min-w-[200px]"
    },
    {
      type: "date" as const,
      label: "Data",
      value: searchData,
      onChange: setSearchData,
      width: "min-w-[160px]"
    }
  ];

  const filteredTransferencias = mockTransferencias.filter(t =>
    t.contaOrigem.toLowerCase().includes(searchContaOrigem.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/transferencias/nova")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Transferência
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredTransferencias.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Data</TableHead>
                <TableHead className="text-center font-semibold">Conta Origem</TableHead>
                <TableHead className="text-center font-semibold">Conta Destino</TableHead>
                <TableHead className="text-center font-semibold">Valor</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransferencias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhuma transferência encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransferencias.map((t) => (
                  <TableRow key={t.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center">{t.data}</TableCell>
                    <TableCell className="text-center font-medium">{t.contaOrigem}</TableCell>
                    <TableCell className="text-center">{t.contaDestino}</TableCell>
                    <TableCell className="text-center font-semibold">{t.valor}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', t.id)}
                        onEdit={() => console.log('Edit', t.id)}
                        onDelete={() => console.log('Delete', t.id)}
                      />
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

export default Transferencias;