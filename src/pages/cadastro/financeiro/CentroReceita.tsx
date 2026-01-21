import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockCentrosReceita = [
  { id: 1, nome: "Centro de Receita A", diretoria: "Diretoria Comercial", gerencia: "Gerência de Vendas", departamento: "Vendas" },
  { id: 2, nome: "Centro de Receita B", diretoria: "Diretoria de Serviços", gerencia: "Gerência de Projetos", departamento: "Consultoria" },
];

const CentroReceita = () => {
  const navigate = useNavigate();
  const [searchCentro, setSearchCentro] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Centro de Receita",
      placeholder: "Buscar centro de receita...",
      value: searchCentro,
      onChange: setSearchCentro,
      width: "flex-1 min-w-[200px]"
    }
  ];

  const filteredCentros = mockCentrosReceita.filter(centro =>
    centro.nome.toLowerCase().includes(searchCentro.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/centro-receita/novo")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Centro de Receita
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredCentros.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Centro de Receita</TableHead>
                <TableHead className="text-center font-semibold">Diretoria</TableHead>
                <TableHead className="text-center font-semibold">Gerência</TableHead>
                <TableHead className="text-center font-semibold">Departamento</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCentros.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum centro de receita encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCentros.map((centro) => (
                  <TableRow key={centro.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{centro.nome}</TableCell>
                    <TableCell className="text-center">{centro.diretoria}</TableCell>
                    <TableCell className="text-center">{centro.gerencia}</TableCell>
                    <TableCell className="text-center">{centro.departamento}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', centro.id)}
                        onEdit={() => console.log('Edit', centro.id)}
                        onDelete={() => console.log('Delete', centro.id)}
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

export default CentroReceita;