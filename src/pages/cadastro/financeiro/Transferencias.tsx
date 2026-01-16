import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

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

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/transferencias/nova")}
            className="btn-action"
          >
            Nova Transferência
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar transferências")}
          resultsCount={0}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Data</TableHead>
              <TableHead className="text-center">Conta Origem</TableHead>
              <TableHead className="text-center">Conta Destino</TableHead>
              <TableHead className="text-center">Valor</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Empty state - data will be added later */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Transferencias;
