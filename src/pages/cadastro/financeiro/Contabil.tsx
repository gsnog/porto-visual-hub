import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const Contabil = () => {
  const navigate = useNavigate();
  const [searchContabil, setSearchContabil] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Contábil",
      placeholder: "Buscar contábil...",
      value: searchContabil,
      onChange: setSearchContabil,
      width: "min-w-[250px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/contabil/novo")}
            className="btn-action"
          >
            Adicionar
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar contábil")}
          resultsCount={0}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Contábil</TableHead>
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

export default Contabil;
