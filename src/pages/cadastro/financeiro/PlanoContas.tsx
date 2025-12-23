import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const PlanoContas = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Plano de Contas</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/financeiro/plano-contas/novo")}
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Novo Plano de Contas
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">ID do Plano</TableHead>
                <TableHead className="!text-white font-medium text-center">Categoria</TableHead>
                <TableHead className="!text-white font-medium text-center">Subcategoria</TableHead>
                <TableHead className="!text-white font-medium text-center">Contábil</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
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

export default PlanoContas;