import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "@/components/FilterSection";
import { TableActions } from "@/components/TableActions";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft } from "lucide-react";

const mockConciliacoes = [
  { id: 1, data: "15/01/2026", conta: "Banco do Brasil - 12345-6", descricao: "Pagamento Fornecedor", valor: "R$ 5.000,00", status: "Pendente" },
  { id: 2, data: "18/01/2026", conta: "Itaú - 98765-4", descricao: "Recebimento Cliente", valor: "R$ 12.000,00", status: "Conciliado" },
];

const ConciliacaoBancaria = () => {
  const navigate = useNavigate();
  const [searchConta, setSearchConta] = useState("");
  const [searchData, setSearchData] = useState("");

  const filterFields = [
    {
      type: "text" as const,
      label: "Conta",
      placeholder: "Buscar conta...",
      value: searchConta,
      onChange: setSearchConta,
      width: "flex-1 min-w-[200px]"
    },
    {
      type: "date" as const,
      label: "Data",
      value: searchData,
      onChange: setSearchData,
      width: "min-w-[160px]"
    }
  ];

  const filteredConciliacoes = mockConciliacoes.filter(c =>
    c.conta.toLowerCase().includes(searchConta.toLowerCase())
  );

  const pendingCount = mockConciliacoes.filter(c => c.status === "Pendente").length;

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/conta-bancaria")}
            variant="outline"
            className="gap-2 border-border"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="ml-auto">
            <span className="px-4 py-2 rounded bg-warning/20 text-warning font-medium text-sm">
              Conciliações Pendentes: {pendingCount}
            </span>
          </div>
        </div>

        <FilterSection 
          fields={filterFields}
          resultsCount={filteredConciliacoes.length}
        />

        <div className="rounded border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header">
                <TableHead className="text-center font-semibold">Data</TableHead>
                <TableHead className="text-center font-semibold">Conta</TableHead>
                <TableHead className="text-center font-semibold">Descrição</TableHead>
                <TableHead className="text-center font-semibold">Valor</TableHead>
                <TableHead className="text-center font-semibold">Status</TableHead>
                <TableHead className="text-center font-semibold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConciliacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhuma conciliação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredConciliacoes.map((c) => (
                  <TableRow key={c.id} className="hover:bg-table-hover transition-colors">
                    <TableCell className="text-center">{c.data}</TableCell>
                    <TableCell className="text-center font-medium">{c.conta}</TableCell>
                    <TableCell className="text-center">{c.descricao}</TableCell>
                    <TableCell className="text-center font-semibold">{c.valor}</TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={c.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      <TableActions 
                        onView={() => console.log('View', c.id)}
                        onEdit={() => console.log('Conciliar', c.id)}
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

export default ConciliacaoBancaria;