import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";

const ContaBancaria = () => {
  const navigate = useNavigate();
  const [searchBanco, setSearchBanco] = useState("");
  const [searchConta, setSearchConta] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Nome do Banco",
      placeholder: "Buscar banco...",
      value: searchBanco,
      onChange: setSearchBanco,
      width: "flex-1 min-w-[200px]"
    },
    {
      type: "text" as const,
      label: "Número da Conta",
      placeholder: "Buscar por conta...",
      value: searchConta,
      onChange: setSearchConta,
      width: "min-w-[180px]"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/conta-bancaria/nova")}
            className="btn-action"
          >
            Nova Conta
          </Button>
          <Button 
            onClick={() => navigate("/cadastro/financeiro/conciliacao-bancaria")}
            className="btn-action"
          >
            Conciliação Bancária
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="btn-action">
                Transferências
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border border-border">
              <DropdownMenuItem onClick={() => navigate("/cadastro/financeiro/transferencias")}>
                Transferências
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/cadastro/financeiro/transferencias/nova")}>
                Nova Transferência
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <FilterSection 
          fields={filterFields}
          onFilter={() => console.log("Filtrar contas")}
          resultsCount={0}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Código do Banco</TableHead>
                <TableHead className="text-center">Banco</TableHead>
                <TableHead className="text-center">Agência</TableHead>
                <TableHead className="text-center">Numero da Conta</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Saldo</TableHead>
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

export default ContaBancaria;
