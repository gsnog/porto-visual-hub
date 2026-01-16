import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const CentroCusto = () => {
  const navigate = useNavigate();
  const [searchCentro, setSearchCentro] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Centro de Custo",
      placeholder: "Buscar centro de custo...",
      value: searchCentro,
      onChange: setSearchCentro,
      width: "flex-1 min-w-[200px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/centro-custo/novo")}
            className="btn-action"
          >
            Novo Centro de Custo
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar centros de custo")}
          resultsCount={0}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Centro de Custo</TableHead>
                <TableHead className="text-center">Diretoria</TableHead>
                <TableHead className="text-center">Gerência</TableHead>
                <TableHead className="text-center">Departamento</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Empty state - data will be added later */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CentroCusto;
