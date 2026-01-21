import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockPlanos = [
  { id: 1, idPlano: "PC001", categoria: "Despesas Operacionais", subcategoria: "Energia Elétrica", contabil: "Ativo Circulante" },
  { id: 2, idPlano: "PC002", categoria: "Receitas de Serviços", subcategoria: "Consultoria", contabil: "Patrimônio Líquido" },
];

const PlanoContas = () => {
  const navigate = useNavigate();
  const [searchCategoria, setSearchCategoria] = useState("");
  const [searchSubcategoria, setSearchSubcategoria] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Categoria",
      placeholder: "Buscar categoria...",
      value: searchCategoria,
      onChange: setSearchCategoria,
      width: "flex-1 min-w-[200px]"
    },
    {
      type: "text" as const,
      label: "Subcategoria",
      placeholder: "Buscar subcategoria...",
      value: searchSubcategoria,
      onChange: setSearchSubcategoria,
      width: "min-w-[180px]"
    }
  ];

  const filteredPlanos = mockPlanos.filter(plano =>
    plano.categoria.toLowerCase().includes(searchCategoria.toLowerCase()) &&
    plano.subcategoria.toLowerCase().includes(searchSubcategoria.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/plano-contas/novo")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Plano de Contas
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredPlanos.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">ID do Plano</TableHead>
                <TableHead className="text-center font-semibold">Categoria</TableHead>
                <TableHead className="text-center font-semibold">Subcategoria</TableHead>
                <TableHead className="text-center font-semibold">Contábil</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlanos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum plano de contas encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlanos.map((plano) => (
                  <TableRow key={plano.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{plano.idPlano}</TableCell>
                    <TableCell className="text-center">{plano.categoria}</TableCell>
                    <TableCell className="text-center">{plano.subcategoria}</TableCell>
                    <TableCell className="text-center">{plano.contabil}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', plano.id)}
                        onEdit={() => console.log('Edit', plano.id)}
                        onDelete={() => console.log('Delete', plano.id)}
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

export default PlanoContas;