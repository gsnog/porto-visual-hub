import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";

const mockContas = [
  { id: 1, codigoBanco: "001", banco: "Banco do Brasil", agencia: "1234-5", numeroConta: "12345-6", tipo: "Corrente", saldo: "R$ 50.000,00" },
  { id: 2, codigoBanco: "341", banco: "Itaú", agencia: "0987-6", numeroConta: "98765-4", tipo: "Poupança", saldo: "R$ 25.000,00" },
];

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

  const filteredContas = mockContas.filter(conta =>
    conta.banco.toLowerCase().includes(searchBanco.toLowerCase()) &&
    conta.numeroConta.includes(searchConta)
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/conta-bancaria/nova")}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Conta
          </Button>
          <Button 
            onClick={() => navigate("/cadastro/financeiro/conciliacao-bancaria")}
            variant="outline"
            className="gap-2 border-border"
          >
            Conciliação Bancária
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border">
                Transferências
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border border-border z-50">
              <DropdownMenuItem onClick={() => navigate("/cadastro/financeiro/transferencias")}>
                Ver Transferências
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/cadastro/financeiro/transferencias/nova")}>
                Nova Transferência
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredContas.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Código do Banco</TableHead>
                <TableHead className="text-center font-semibold">Banco</TableHead>
                <TableHead className="text-center font-semibold">Agência</TableHead>
                <TableHead className="text-center font-semibold">Número da Conta</TableHead>
                <TableHead className="text-center font-semibold">Tipo</TableHead>
                <TableHead className="text-center font-semibold">Saldo</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma conta bancária encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContas.map((conta) => (
                  <TableRow key={conta.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center">{conta.codigoBanco}</TableCell>
                    <TableCell className="text-center font-medium">{conta.banco}</TableCell>
                    <TableCell className="text-center">{conta.agencia}</TableCell>
                    <TableCell className="text-center">{conta.numeroConta}</TableCell>
                    <TableCell className="text-center">{conta.tipo}</TableCell>
                    <TableCell className="text-center font-semibold">{conta.saldo}</TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', conta.id)}
                        onEdit={() => console.log('Edit', conta.id)}
                        onDelete={() => console.log('Delete', conta.id)}
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

export default ContaBancaria;