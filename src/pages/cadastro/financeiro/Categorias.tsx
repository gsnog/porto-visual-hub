import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const Categorias = () => {
  const navigate = useNavigate();
  const [searchCategoria, setSearchCategoria] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Categoria",
      placeholder: "Buscar categoria...",
      value: searchCategoria,
      onChange: setSearchCategoria,
      width: "flex-1 min-w-[200px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/categorias/nova")}
            className="btn-action"
          >
            Nova Categoria
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar categorias")}
          resultsCount={0}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Categoria</TableHead>
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

export default Categorias;
