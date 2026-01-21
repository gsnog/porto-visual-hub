import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockSubcategorias = [
  { id: 1, nome: "Energia Elétrica", categoria: "Despesas Operacionais" },
  { id: 2, nome: "Água e Esgoto", categoria: "Despesas Operacionais" },
  { id: 3, nome: "Consultoria", categoria: "Receitas de Serviços" },
];

const Subcategorias = () => {
  const navigate = useNavigate();
  const [searchSubcategoria, setSearchSubcategoria] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Subcategoria",
      placeholder: "Buscar subcategoria...",
      value: searchSubcategoria,
      onChange: setSearchSubcategoria,
      width: "flex-1 min-w-[200px]"
    }
  ];

  const filteredSubcategorias = mockSubcategorias.filter(sub =>
    sub.nome.toLowerCase().includes(searchSubcategoria.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/subcategorias/nova")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Subcategoria
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredSubcategorias.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Subcategoria</TableHead>
                <TableHead className="text-center font-semibold">Categoria</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubcategorias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    Nenhuma subcategoria encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubcategorias.map((sub) => (
                  <TableRow key={sub.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{sub.nome}</TableCell>
                    <TableCell className="text-center">{sub.categoria}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', sub.id)}
                        onEdit={() => console.log('Edit', sub.id)}
                        onDelete={() => console.log('Delete', sub.id)}
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

export default Subcategorias;