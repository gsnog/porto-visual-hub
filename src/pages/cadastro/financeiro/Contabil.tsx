import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockContabil = [
  { id: 1, nome: "Ativo Circulante" },
  { id: 2, nome: "Passivo Circulante" },
  { id: 3, nome: "Patrimônio Líquido" },
];

const Contabil = () => {
  const navigate = useNavigate();
  const [searchContabil, setSearchContabil] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Contábil",
      placeholder: "Buscar contábil...",
      value: searchContabil,
      onChange: setSearchContabil,
      width: "flex-1 min-w-[200px]"
    }
  ];

  const filteredContabil = mockContabil.filter(c =>
    c.nome.toLowerCase().includes(searchContabil.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/contabil/novo")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Contábil
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredContabil.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Contábil</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContabil.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                    Nenhum registro contábil encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContabil.map((c) => (
                  <TableRow key={c.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{c.nome}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', c.id)}
                        onEdit={() => console.log('Edit', c.id)}
                        onDelete={() => console.log('Delete', c.id)}
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

export default Contabil;