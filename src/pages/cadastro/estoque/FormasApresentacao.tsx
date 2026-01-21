import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockApresentacoes = [
  { id: 1, nome: "Caixa" },
  { id: 2, nome: "Unidade" },
  { id: 3, nome: "Pacote" },
];

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

  const filteredApresentacoes = mockApresentacoes.filter(ap =>
    ap.nome.toLowerCase().includes(searchApresentacao.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/formas-apresentacao/nova")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Apresentação
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredApresentacoes.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Apresentação</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApresentacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                    Nenhuma forma de apresentação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApresentacoes.map((ap) => (
                  <TableRow key={ap.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{ap.nome}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', ap.id)}
                        onEdit={() => console.log('Edit', ap.id)}
                        onDelete={() => console.log('Delete', ap.id)}
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

export default FormasApresentacao;