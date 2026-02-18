import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Shield, Users, Edit } from "lucide-react";
import { systemRoles } from "@/contexts/PermissionsContext";
import { pessoasMock } from "@/data/pessoas-mock";

// Módulos do sistema
const modulosSistema = [
  { id: 'dashboard', nome: 'Dashboard', acoes: ['view'] },
  { id: 'cadastro_estoque', nome: 'Cadastro - Estoque', acoes: ['view', 'create', 'edit', 'delete'] },
  { id: 'cadastro_financeiro', nome: 'Cadastro - Financeiro', acoes: ['view', 'create', 'edit', 'delete'] },
  { id: 'cadastro_pessoas', nome: 'Cadastro - Pessoas', acoes: ['view', 'create', 'edit', 'delete'] },
  { id: 'estoque', nome: 'Estoque', acoes: ['view', 'create', 'edit', 'delete', 'approve'] },
  { id: 'financeiro', nome: 'Financeiro', acoes: ['view', 'create', 'edit', 'delete', 'approve', 'export'] },
  { id: 'operacional', nome: 'Operacional', acoes: ['view', 'create', 'edit', 'delete'] },
  { id: 'patrimonio', nome: 'Patrimônio', acoes: ['view', 'create', 'edit', 'delete'] },
  { id: 'gestao_pessoas', nome: 'Gestão de Pessoas', acoes: ['view', 'create', 'edit', 'delete'] },
  { id: 'calendario', nome: 'Calendário', acoes: ['view', 'create', 'edit', 'delete'] },
  { id: 'chat', nome: 'Chat', acoes: ['view', 'create'] },
];

const acoesLabels: Record<string, string> = {
  view: 'Ver',
  create: 'Criar',
  edit: 'Editar',
  delete: 'Excluir',
  approve: 'Aprovar',
  export: 'Exportar'
};

export default function Acessos() {
  const [activeTab, setActiveTab] = useState("perfis");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const filteredPessoas = pessoasMock.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="perfis" className="gap-2">
            <Shield className="h-4 w-4" />
            Perfis de Acesso
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="gap-2">
            <Users className="h-4 w-4" />
            Usuários e Atribuições
          </TabsTrigger>
        </TabsList>

        {/* Tab Perfis de Acesso */}
        <TabsContent value="perfis" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Perfis */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Perfis</CardTitle>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Novo
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {systemRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full p-3 rounded border text-left transition-colors ${
                      selectedRole === role.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="font-medium text-foreground">{role.name}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Permissões do Perfil */}
            <Card className="border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  Permissões do Perfil: {systemRoles.find(r => r.id === selectedRole)?.name || "Selecione um perfil"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRole ? (
                  <div className="rounded border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Módulo</TableHead>
                          {Object.entries(acoesLabels).map(([key, label]) => (
                            <TableHead key={key} className="text-center w-20">
                              {label}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {modulosSistema.map((modulo) => (
                          <TableRow key={modulo.id}>
                            <TableCell className="font-medium">{modulo.nome}</TableCell>
                            {Object.keys(acoesLabels).map((acao) => (
                              <TableCell key={acao} className="text-center">
                                {modulo.acoes.includes(acao) && (
                                  <Checkbox 
                                    checked={selectedRole === 'admin'} 
                                    disabled={selectedRole === 'admin'}
                                  />
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Selecione um perfil para ver suas permissões
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Usuários */}
        <TabsContent value="usuarios" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Atribuição de Perfis</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar pessoa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pessoa</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Perfil Atual</TableHead>
                      <TableHead>Status Acesso</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPessoas.map((pessoa) => (
                      <TableRow key={pessoa.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                              {pessoa.iniciais}
                            </div>
                            <span className="font-medium">{pessoa.nome}</span>
                          </div>
                        </TableCell>
                        <TableCell>{pessoa.setor}</TableCell>
                        <TableCell>{pessoa.cargo}</TableCell>
                        <TableCell>
                          <Select defaultValue="usuario">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {systemRoles.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary">
                            Ativo
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Edit className="h-4 w-4" />
                            Exceções
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
