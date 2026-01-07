import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const mockEmbarcacoes = [
  { id: 1, nome: "Marlin Azul", cliente: "João Silva", dimensao: "15m x 4m", setores: "Motor, Pintura" },
  { id: 2, nome: "Veleiro Norte", cliente: "Maria Santos", dimensao: "12m x 3.5m", setores: "Elétrica, Fibra" },
  { id: 3, nome: "Lancha Sul", cliente: "Carlos Pereira", dimensao: "8m x 2.5m", setores: "Motor" },
]

const Embarcacoes = () => {
  const navigate = useNavigate();
  const [filterNome, setFilterNome] = useState("");
  const [filterCliente, setFilterCliente] = useState("");

  const filteredEmbarcacoes = useMemo(() => {
    return mockEmbarcacoes.filter(emb => {
      const matchNome = emb.nome.toLowerCase().includes(filterNome.toLowerCase())
      const matchCliente = emb.cliente.toLowerCase().includes(filterCliente.toLowerCase())
      return matchNome && matchCliente
    })
  }, [filterNome, filterCliente])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <Button 
            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/operacional/embarcacoes/nova")}
          >
            Nova Embarcação
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input 
            placeholder="Nome da Embarcação" 
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />
          <Input 
            placeholder="Cliente" 
            value={filterCliente}
            onChange={(e) => setFilterCliente(e.target.value)}
            className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" 
          />
          <Button className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredEmbarcacoes.length} resultado(s) encontrado(s).
        </p>

        <div className="rounded-xl overflow-hidden shadow-sm">
          <Table className="table-professional">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">Cliente</TableHead>
                <TableHead className="text-center">Dimensão</TableHead>
                <TableHead className="text-center">Setores</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmbarcacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhuma embarcação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmbarcacoes.map((emb) => (
                  <TableRow key={emb.id}>
                    <TableCell className="text-center">{emb.nome}</TableCell>
                    <TableCell className="text-center">{emb.cliente}</TableCell>
                    <TableCell className="text-center">{emb.dimensao}</TableCell>
                    <TableCell className="text-center">{emb.setores}</TableCell>
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

export default Embarcacoes;
