import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockFornecedores = [
  { id: 1, fornecedor: "Fornecedor ABC", cnpj: "12.345.678/0001-90", razaoSocial: "ABC Ltda", vendedor: "João", email: "contato@abc.com", telefone: "(11) 1234-5678" },
  { id: 2, fornecedor: "Fornecedor XYZ", cnpj: "98.765.432/0001-10", razaoSocial: "XYZ S.A.", vendedor: "Maria", email: "contato@xyz.com", telefone: "(21) 9876-5432" },
];

const FornecedoresEstoque = () => {
  const navigate = useNavigate();
  const [searchNome, setSearchNome] = useState("");
  const [searchCnpj, setSearchCnpj] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Nome do Fornecedor",
      placeholder: "Buscar fornecedor...",
      value: searchNome,
      onChange: setSearchNome,
      width: "flex-1 min-w-[200px]"
    },
    {
      type: "text" as const,
      label: "CNPJ",
      placeholder: "Buscar por CNPJ...",
      value: searchCnpj,
      onChange: setSearchCnpj,
      width: "min-w-[180px]"
    }
  ];

  const filteredFornecedores = mockFornecedores.filter(f =>
    f.fornecedor.toLowerCase().includes(searchNome.toLowerCase()) &&
    f.cnpj.includes(searchCnpj)
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/fornecedores/novo")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Fornecedor
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredFornecedores.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Fornecedor</TableHead>
                <TableHead className="text-center font-semibold">CNPJ/CPF</TableHead>
                <TableHead className="text-center font-semibold">Razão Social</TableHead>
                <TableHead className="text-center font-semibold">Vendedor</TableHead>
                <TableHead className="text-center font-semibold">Email</TableHead>
                <TableHead className="text-center font-semibold">Telefone</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFornecedores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum fornecedor encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFornecedores.map((f) => (
                  <TableRow key={f.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{f.fornecedor}</TableCell>
                    <TableCell className="text-center">{f.cnpj}</TableCell>
                    <TableCell className="text-center">{f.razaoSocial}</TableCell>
                    <TableCell className="text-center">{f.vendedor}</TableCell>
                    <TableCell className="text-center">{f.email}</TableCell>
                    <TableCell className="text-center">{f.telefone}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', f.id)}
                        onEdit={() => console.log('Edit', f.id)}
                        onDelete={() => console.log('Delete', f.id)}
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

export default FornecedoresEstoque;