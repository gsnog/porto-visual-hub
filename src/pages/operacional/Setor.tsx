import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

const Setor = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Setores</h1>

      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
        Novo Setor
      </Button>

      <div className="flex flex-wrap gap-4 items-end">
        <Input
          placeholder="Setor"
          className="w-64 bg-background border-input text-foreground placeholder:text-muted-foreground"
        />
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
          <Search className="w-4 h-4 mr-2" />
          Filtrar
        </Button>
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-foreground font-semibold text-center">Setor</TableHead>
              <TableHead className="text-foreground font-semibold text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                Nenhum setor encontrado.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Setor;
