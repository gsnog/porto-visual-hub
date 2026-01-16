import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const Unidades = () => {
  const navigate = useNavigate();
  const [searchUnidade, setSearchUnidade] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Unidade",
      placeholder: "Buscar unidade...",
      value: searchUnidade,
      onChange: setSearchUnidade,
      width: "flex-1 min-w-[200px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/unidades/nova")}
            className="btn-action"
          >
            Nova Unidade
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar unidades")}
          resultsCount={1}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Unidade</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">jdcnsdlkcsl</TableCell>
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
  );
};

export default Unidades;
