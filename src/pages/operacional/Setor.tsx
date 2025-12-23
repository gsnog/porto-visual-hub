import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

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
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Setores</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/operacional/setor/novo")}
          >
            Novo Setor
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Setor" 
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
          {filteredSetores.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Setor</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
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
                  <TableRow key={setor.id} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
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
