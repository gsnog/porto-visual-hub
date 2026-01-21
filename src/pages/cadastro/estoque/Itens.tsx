import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockItens = [
  { id: 1, dataCadastro: "10/01/2026", item: "Parafuso M8", formaApresentacao: "Caixa", setores: "Produção" },
  { id: 2, dataCadastro: "12/01/2026", item: "Cabo HDMI", formaApresentacao: "Unidade", setores: "TI" },
];

const Itens = () => {
  const navigate = useNavigate();
  const [searchNome, setSearchNome] = useState("");
  const [searchData, setSearchData] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Nome",
      placeholder: "Buscar por nome...",
      value: searchNome,
      onChange: setSearchNome,
      width: "flex-1 min-w-[200px]"
    },
    {
      type: "date" as const,
      label: "Data de Cadastro",
      value: searchData,
      onChange: setSearchData,
      width: "min-w-[160px]"
    }
  ];

  const filteredItens = mockItens.filter(item =>
    item.item.toLowerCase().includes(searchNome.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/itens/novo")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Item
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredItens.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Id Item</TableHead>
                <TableHead className="text-center font-semibold">Data de Cadastro</TableHead>
                <TableHead className="text-center font-semibold">Item</TableHead>
                <TableHead className="text-center font-semibold">Forma de Apresentação</TableHead>
                <TableHead className="text-center font-semibold">Setores</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum item encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItens.map((item) => (
                  <TableRow key={item.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{item.id}</TableCell>
                    <TableCell className="text-center">{item.dataCadastro}</TableCell>
                    <TableCell className="text-center font-medium">{item.item}</TableCell>
                    <TableCell className="text-center">{item.formaApresentacao}</TableCell>
                    <TableCell className="text-center">{item.setores}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', item.id)}
                        onEdit={() => console.log('Edit', item.id)}
                        onDelete={() => console.log('Delete', item.id)}
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

export default Itens;