import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockCategorias = [
  { id: 1, nome: "Despesas Operacionais" },
  { id: 2, nome: "Receitas de Serviços" },
  { id: 3, nome: "Investimentos" },
];

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

  const filteredCategorias = mockCategorias.filter(cat =>
    cat.nome.toLowerCase().includes(searchCategoria.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/categorias/nova")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Categoria
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredCategorias.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Categoria</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategorias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                    Nenhuma categoria encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategorias.map((cat) => (
                  <TableRow key={cat.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{cat.nome}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', cat.id)}
                        onEdit={() => console.log('Edit', cat.id)}
                        onDelete={() => console.log('Delete', cat.id)}
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

export default Categorias;