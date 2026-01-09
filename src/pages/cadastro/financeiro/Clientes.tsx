import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

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
      width: "min-w-[250px]"
    },
    {
      type: "text" as const,
      label: "CNPJ",
      placeholder: "Buscar por CNPJ...",
      value: searchCnpj,
      onChange: setSearchCnpj,
      width: "min-w-[200px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/clientes/novo")}
            className="btn-action"
          >
            Novo Cliente
          </Button>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar clientes")}
          resultsCount={0}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">Razão Social</TableHead>
                <TableHead className="text-center">CNPJ</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Telefone</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Empty state - data will be added later */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
