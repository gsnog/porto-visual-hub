import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FilterSection } from "@/components/FilterSection";
import { Plus } from "lucide-react";
import { TableActions } from "@/components/TableActions";

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
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            className="gap-2"
            onClick={() => navigate("/operacional/embarcacoes/nova")}
          >
            <Plus className="w-4 h-4" />
            Nova Embarcação
          </Button>
        </div>

        <FilterSection
          fields={[
            {
              type: "text",
              label: "Nome da Embarcação",
              placeholder: "Buscar embarcação...",
              value: filterNome,
              onChange: setFilterNome,
              width: "flex-1 min-w-[200px]"
            },
            {
              type: "text",
              label: "Cliente",
              placeholder: "Buscar cliente...",
              value: filterCliente,
              onChange: setFilterCliente,
              width: "min-w-[200px]"
            }
          ]}
          resultsCount={filteredEmbarcacoes.length}
        />

        <div className="rounded overflow-hidden">
          <Table>
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
                      <TableActions 
                        onView={() => console.log('View', emb.id)}
                        onEdit={() => console.log('Edit', emb.id)}
                        onDelete={() => console.log('Delete', emb.id)}
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

export default Embarcacoes;