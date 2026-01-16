import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const FormasApresentacao = () => {
  const navigate = useNavigate();
  const [searchApresentacao, setSearchApresentacao] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Apresentação",
      placeholder: "Buscar apresentação...",
      value: searchApresentacao,
      onChange: setSearchApresentacao,
      width: "flex-1 min-w-[200px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/formas-apresentacao/nova")}
            className="btn-action"
          >
            Nova Apresentação
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar apresentações")}
          resultsCount={0}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Apresentação</TableHead>
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

export default FormasApresentacao;
