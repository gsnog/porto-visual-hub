import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockUnidades = [
  { id: 1, nome: "Almoxarifado SP" },
  { id: 2, nome: "Almoxarifado RJ" },
];

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

  const filteredUnidades = mockUnidades.filter(unidade =>
    unidade.nome.toLowerCase().includes(searchUnidade.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/unidades/nova")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Unidade
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredUnidades.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Unidade</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnidades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                    Nenhuma unidade encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUnidades.map((unidade) => (
                  <TableRow key={unidade.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{unidade.nome}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', unidade.id)}
                        onEdit={() => console.log('Edit', unidade.id)}
                        onDelete={() => console.log('Delete', unidade.id)}
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

export default Unidades;