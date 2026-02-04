import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "@/components/TableActions";
import { Plus, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contatosMock, getContaById } from "@/data/comercial-mock";

export default function Contatos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [papelFilter, setPapelFilter] = useState("__all__");

  const filteredContatos = contatosMock.filter(contato => {
    const matchSearch = contato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       contato.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       contato.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPapel = papelFilter === "__all__" || contato.papel === papelFilter;
    return matchSearch && matchPapel;
  });

  const getPapelLabel = (papel: string) => {
    const labels: Record<string, string> = {
      'decisor': 'Decisor',
      'influenciador': 'Influenciador',
      'usuario': 'Usuário',
      'compras': 'Compras'
    };
    return labels[papel] || papel;
  };

  const getPapelVariant = (papel: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (papel) {
      case 'decisor': return 'default';
      case 'influenciador': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contatos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-[300px]"
          />
        </div>
        <Button onClick={() => navigate('/comercial/contatos/novo')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Contato
        </Button>
      </div>

      {/* Filtros */}
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Papel:</span>
            <Select value={papelFilter} onValueChange={setPapelFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Todos</SelectItem>
                <SelectItem value="decisor">Decisor</SelectItem>
                <SelectItem value="influenciador">Influenciador</SelectItem>
                <SelectItem value="usuario">Usuário</SelectItem>
                <SelectItem value="compras">Compras</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setPapelFilter("__all__");
              setSearchTerm("");
            }}
          >
            Limpar Filtros
          </Button>

          <span className="ml-auto text-sm text-muted-foreground">
            {filteredContatos.length} resultado(s)
          </span>
        </div>
      </Card>

      {/* Tabela */}
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
                    <Badge variant={getPapelVariant(contato.papel)}>
                      {getPapelLabel(contato.papel)}
                    </Badge>
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
                    <TableActions 
                      onView={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
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
