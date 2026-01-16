import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";
import { Plus } from "lucide-react";

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
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            className="gap-2"
            onClick={() => navigate("/operacional/servicos/novo")}
          >
            <Plus className="w-4 h-4" />
            Novo Serviço
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Nome do Serviço",
              placeholder: "Buscar serviço...",
              value: filterNome,
              onChange: setFilterNome,
              width: "flex-1 min-w-[200px]"
            }
          ]}
          resultsCount={filteredServicos.length}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nome do Serviço</TableHead>
                <TableHead className="text-center">Descrição</TableHead>
                <TableHead className="text-center">Custo</TableHead>
                <TableHead className="text-center">Ações</TableHead>
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
                  <TableRow key={servico.id}>
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