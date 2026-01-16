import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";
import { Plus } from "lucide-react";

const mockSetores = [
  { id: 1, nome: "Motor" },
  { id: 2, nome: "Pintura" },
  { id: 3, nome: "Elétrica" },
  { id: 4, nome: "Fibra" },
  { id: 5, nome: "Acabamento" },
]

const Setor = () => {
  const navigate = useNavigate();
  const [filterNome, setFilterNome] = useState("");

  const filteredSetores = useMemo(() => {
    return mockSetores.filter(setor => 
      setor.nome.toLowerCase().includes(filterNome.toLowerCase())
    )
  }, [filterNome])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            className="gap-2"
            onClick={() => navigate("/operacional/setor/novo")}
          >
            <Plus className="w-4 h-4" />
            Novo Setor
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Setor",
              placeholder: "Buscar setor...",
              value: filterNome,
              onChange: setFilterNome,
              width: "flex-1 min-w-[200px]"
            }
          ]}
          resultsCount={filteredSetores.length}
        />

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Setor</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSetores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                    Nenhum setor encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSetores.map((setor) => (
                  <TableRow key={setor.id}>
                    <TableCell className="text-center">{setor.nome}</TableCell>
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

export default Setor;