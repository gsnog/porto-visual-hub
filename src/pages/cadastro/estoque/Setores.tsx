import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const Setores = () => {
  const navigate = useNavigate();
  const [searchSetor, setSearchSetor] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Setor",
      placeholder: "Buscar setor...",
      value: searchSetor,
      onChange: setSearchSetor,
      width: "flex-1 min-w-[200px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/setores/novo")}
            className="btn-action"
          >
            Novo Setor
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar setores")}
          resultsCount={1}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Setor</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">QualquerCoisa</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" className="rounded-md bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs">
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Setores;
