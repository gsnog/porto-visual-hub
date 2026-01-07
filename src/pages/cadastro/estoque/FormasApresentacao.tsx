import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FormasApresentacao = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">

        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            onClick={() => navigate("/cadastro/estoque/formas-apresentacao/nova")}
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Novo Apresentação
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Apresentação" 
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Apresentação</TableHead>
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

export default FormasApresentacao;
