import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { Plus } from "lucide-react";

const mockClientes = [
  { id: 1, nome: "Cliente ABC", razaoSocial: "ABC Comércio Ltda", cnpj: "12.345.678/0001-90", email: "contato@abc.com", telefone: "(11) 1234-5678" },
  { id: 2, nome: "Cliente XYZ", razaoSocial: "XYZ Serviços S.A.", cnpj: "98.765.432/0001-10", email: "contato@xyz.com", telefone: "(21) 9876-5432" },
];

const Clientes = () => {
  const navigate = useNavigate();
  const [searchNome, setSearchNome] = useState("");
  const [searchCnpj, setSearchCnpj] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Nome do Cliente",
      placeholder: "Buscar cliente...",
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

  const filteredClientes = mockClientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchNome.toLowerCase()) &&
    cliente.cnpj.includes(searchCnpj)
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/clientes/novo")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredClientes.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Nome</TableHead>
                <TableHead className="text-center font-semibold">Razão Social</TableHead>
                <TableHead className="text-center font-semibold">CNPJ</TableHead>
                <TableHead className="text-center font-semibold">Email</TableHead>
                <TableHead className="text-center font-semibold">Telefone</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center font-medium">{cliente.nome}</TableCell>
                    <TableCell className="text-center">{cliente.razaoSocial}</TableCell>
                    <TableCell className="text-center">{cliente.cnpj}</TableCell>
                    <TableCell className="text-center">{cliente.email}</TableCell>
                    <TableCell className="text-center">{cliente.telefone}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', cliente.id)}
                        onEdit={() => console.log('Edit', cliente.id)}
                        onDelete={() => console.log('Delete', cliente.id)}
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

export default Clientes;