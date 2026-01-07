import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const mockServicos = [
  { id: 1, nome: "Pintura", descricao: "Pintura completa de casco", custo: "R$ 5.000,00" },
  { id: 2, nome: "Manutenção Motor", descricao: "Revisão completa do motor", custo: "R$ 3.500,00" },
  { id: 3, nome: "Elétrica", descricao: "Instalação de sistema elétrico", custo: "R$ 2.000,00" },
  { id: 4, nome: "Fibra", descricao: "Reparo em fibra de vidro", custo: "R$ 1.500,00" },
]

const Servicos = () => {
  const navigate = useNavigate();
  const [filterNome, setFilterNome] = useState("");

  const filteredServicos = useMemo(() => {
    return mockServicos.filter(servico => 
      servico.nome.toLowerCase().includes(filterNome.toLowerCase())
    )
  }, [filterNome])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/operacional/servicos/novo")}
          >
            Novo Serviço
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Nome do Serviço" 
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredServicos.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Nome do Serviço</TableHead>
                <TableHead className="!text-white font-medium text-center">Descrição</TableHead>
                <TableHead className="!text-white font-medium text-center">Custo</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServicos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Nenhum serviço encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredServicos.map((servico) => (
                  <TableRow key={servico.id} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
                    <TableCell className="text-center">{servico.nome}</TableCell>
                    <TableCell className="text-center">{servico.descricao}</TableCell>
                    <TableCell className="text-center">{servico.custo}</TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs">Ações</Button>
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

export default Servicos;
