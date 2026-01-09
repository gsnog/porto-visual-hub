import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const PlanoContas = () => {
  const navigate = useNavigate();
  const [searchCategoria, setSearchCategoria] = useState("");
  const [searchSubcategoria, setSearchSubcategoria] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Categoria",
      placeholder: "Buscar categoria...",
      value: searchCategoria,
      onChange: setSearchCategoria,
      width: "min-w-[200px]"
    },
    {
      type: "text" as const,
      label: "Subcategoria",
      placeholder: "Buscar subcategoria...",
      value: searchSubcategoria,
      onChange: setSearchSubcategoria,
      width: "min-w-[200px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/plano-contas/novo")}
            className="btn-action"
          >
            Novo Plano de Contas
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar planos de contas")}
          resultsCount={0}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID do Plano</TableHead>
                <TableHead className="text-center">Categoria</TableHead>
                <TableHead className="text-center">Subcategoria</TableHead>
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

export default PlanoContas;
