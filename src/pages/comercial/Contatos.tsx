import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "@/components/TableActions";
import { FilterSection } from "@/components/FilterSection";
import { Plus, Download, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contatosMock, getContaById } from "@/data/comercial-mock";
import { toast } from "@/hooks/use-toast";
import { ExportButton } from "@/components/ExportButton";

export default function Contatos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [papelFilter, setPapelFilter] = useState("");

  const filteredContatos = contatosMock.filter(contato => {
    const matchSearch = !searchTerm || contato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       contato.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       contato.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPapel = !papelFilter || contato.papel === papelFilter;
    return matchSearch && matchPapel;
  });

  const getPapelLabel = (papel: string) => {
    const labels: Record<string, string> = { 'decisor': 'Decisor', 'influenciador': 'Influenciador', 'usuario': 'Usuário', 'compras': 'Compras' };
    return labels[papel] || papel;
  };

  const getPapelVariant = (papel: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (papel) {
      case 'decisor': return 'default';
      case 'influenciador': return 'secondary';
      default: return 'outline';
    }
  };

  const getExportData = () => filteredContatos.map(c => {
    const conta = getContaById(c.contaId);
    return {
      Nome: c.nome, Cargo: c.cargo, Email: c.email, Telefone: c.telefone,
      Papel: getPapelLabel(c.papel), Empresa: conta?.nomeFantasia || 'N/A', Tags: c.tags.join(', ')
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <Button onClick={() => navigate('/comercial/contatos/novo')} className="gap-2">
          <Plus className="w-4 h-4" /> Novo Contato
        </Button>
        <ExportButton getData={getExportData} fileName="contatos" sheetName="Contatos" />
      </div>

      <FilterSection
        fields={[
          { type: "text", label: "Buscar", placeholder: "Nome, email ou cargo...", value: searchTerm, onChange: setSearchTerm, width: "flex-1 min-w-[200px]" },
          { type: "select", label: "Papel", placeholder: "Todos", value: papelFilter, onChange: setPapelFilter, options: [
            { value: "decisor", label: "Decisor" }, { value: "influenciador", label: "Influenciador" },
            { value: "usuario", label: "Usuário" }, { value: "compras", label: "Compras" }
          ], width: "min-w-[160px]" }
        ]}
        resultsCount={filteredContatos.length}
      />

      <div className="rounded border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-table-header">
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContatos.map((contato) => {
              const conta = getContaById(contato.contaId);
              return (
                <TableRow key={contato.id} className="hover:bg-muted/50 cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{contato.nome}</span>
                    </div>
                  </TableCell>
                  <TableCell>{contato.cargo}</TableCell>
                  <TableCell>{contato.email}</TableCell>
                  <TableCell>{contato.telefone}</TableCell>
                  <TableCell>
                    <Badge variant={getPapelVariant(contato.papel)}>{getPapelLabel(contato.papel)}</Badge>
                  </TableCell>
                  <TableCell>{conta?.nomeFantasia || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {contato.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <TableActions onView={() => {}} onEdit={() => {}} onDelete={() => {}} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
