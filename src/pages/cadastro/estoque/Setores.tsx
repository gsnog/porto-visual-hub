import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockSetores = [
  { id: 1, nome: "Produção" },
  { id: 2, nome: "Manutenção" },
];

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

  const filteredSetores = mockSetores.filter(setor =>
    setor.nome.toLowerCase().includes(searchSetor.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/setores/novo")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Setor
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredSetores.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Setor</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSetores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                    Nenhum setor encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSetores.map((setor) => (
                  <TableRow key={setor.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{setor.nome}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', setor.id)}
                        onEdit={() => console.log('Edit', setor.id)}
                        onDelete={() => console.log('Delete', setor.id)}
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

export default Setores;