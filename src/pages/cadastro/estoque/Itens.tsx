import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const Itens = () => {
  const navigate = useNavigate();
  const [searchNome, setSearchNome] = useState("");
  const [searchData, setSearchData] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Nome",
      placeholder: "Buscar por nome...",
      value: searchNome,
      onChange: setSearchNome,
      width: "flex-1 min-w-[200px]"
    },
    {
      type: "date" as const,
      label: "Data de Cadastro",
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
            onClick={() => navigate("/cadastro/estoque/itens/novo")}
            className="btn-action"
          >
            Novo Item
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar itens")}
          resultsCount={0}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Id Item</TableHead>
                <TableHead className="text-center">Data de Cadastro</TableHead>
                <TableHead className="text-center">Item</TableHead>
                <TableHead className="text-center">Forma de Apresentação</TableHead>
                <TableHead className="text-center">Setores</TableHead>
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

export default Itens;
