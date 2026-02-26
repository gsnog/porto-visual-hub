import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Search, Shield, Users, Edit, Lock, ChevronDown, ChevronRight } from "lucide-react";
import { systemRoles } from "@/contexts/PermissionsContext";
import { usePermissions } from "@/contexts/PermissionsContext";
import { pessoasMock } from "@/data/pessoas-mock";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Módulos com features granulares
const modulosSistema = [
  {
    id: 'dashboard', nome: 'Dashboard',
    features: [
      { id: 'dashboard_geral', nome: 'Dashboard Geral', acoes: ['view'] },
      { id: 'dashboard_financeiro', nome: 'Dashboard Financeiro', acoes: ['view'] },
      { id: 'dashboard_estoque', nome: 'Dashboard Estoque', acoes: ['view'] },
      { id: 'dashboard_patrimonio', nome: 'Dashboard Patrimônio', acoes: ['view'] },
      { id: 'dashboard_comercial', nome: 'Dashboard Comercial', acoes: ['view'] },
      { id: 'dashboard_gestao_pessoas', nome: 'Dashboard Gestão de Pessoas', acoes: ['view'] },
    ]
  },
  {
    id: 'cadastro_estoque', nome: 'Cadastro - Estoque',
    features: [
      { id: 'cad_est_formas', nome: 'Formas de Apresentação', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_est_fornecedores', nome: 'Fornecedores', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_est_itens', nome: 'Itens', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_est_setores', nome: 'Setores', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_est_unidades', nome: 'Unidades', acoes: ['view', 'create', 'edit', 'delete'] },
    ]
  },
  {
    id: 'cadastro_financeiro', nome: 'Cadastro - Financeiro',
    features: [
      { id: 'cad_fin_conta_bancaria', nome: 'Conta Bancária', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_fin_clientes', nome: 'Clientes', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_fin_centro_custo', nome: 'Centro de Custo', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_fin_centro_receita', nome: 'Centro de Receita', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_fin_contabil', nome: 'Contábil', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_fin_categorias', nome: 'Categorias', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_fin_fornecedores', nome: 'Fornecedores', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_fin_subcategorias', nome: 'Subcategorias', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_fin_plano_contas', nome: 'Plano de Contas', acoes: ['view', 'create', 'edit', 'delete'] },
    ]
  },
  {
    id: 'cadastro_pessoas', nome: 'Cadastro - Pessoas',
    features: [
      { id: 'cad_pes_pessoas', nome: 'Pessoas', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_pes_setores', nome: 'Setores/Áreas', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'cad_pes_cargos', nome: 'Cargos', acoes: ['view', 'create', 'edit', 'delete'] },
    ]
  },
  {
    id: 'comercial', nome: 'Comercial',
    features: [
      
      { id: 'com_leads', nome: 'Leads', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'com_contas', nome: 'Contas', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'com_contatos', nome: 'Contatos', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'com_oportunidades', nome: 'Oportunidades', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'com_propostas', nome: 'Propostas', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'com_atividades', nome: 'Atividades', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'com_metas', nome: 'Metas e Forecast', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'com_comissoes', nome: 'Comissões', acoes: ['view', 'create', 'edit', 'delete', 'export'] },
    ]
  },
  {
    id: 'estoque', nome: 'Estoque',
    features: [
      { id: 'est_entradas', nome: 'Entradas', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'est_inventario', nome: 'Inventário', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'est_locacoes', nome: 'Locações', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'est_ordem_compra', nome: 'Ordem de Compra', acoes: ['view', 'create', 'edit', 'delete', 'approve'] },
      { id: 'est_ordem_servico', nome: 'Ordem de Serviço', acoes: ['view', 'create', 'edit', 'delete', 'approve'] },
      { id: 'est_requisicoes', nome: 'Requisições', acoes: ['view', 'create', 'edit', 'delete', 'approve'] },
      { id: 'est_saidas', nome: 'Saídas', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'est_patrimonio', nome: 'Patrimônio', acoes: ['view', 'create', 'edit', 'delete'] },
    ]
  },
  {
    id: 'financeiro', nome: 'Financeiro',
    features: [
      { id: 'fin_contas_receber', nome: 'Contas a Receber', acoes: ['view', 'create', 'edit', 'delete', 'approve', 'export'] },
      { id: 'fin_contas_pagar', nome: 'Contas a Pagar', acoes: ['view', 'create', 'edit', 'delete', 'approve', 'export'] },
      { id: 'fin_fluxo_caixa', nome: 'Fluxo de Caixa', acoes: ['view', 'create', 'edit', 'delete', 'export'] },
      { id: 'fin_xml', nome: 'XML', acoes: ['view', 'create', 'edit', 'delete'] },
    ]
  },
  {
    id: 'operacional', nome: 'Operacional',
    features: [
      { id: 'oper_setor', nome: 'Setor', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'oper_embarcacoes', nome: 'Embarcações', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'oper_operacao', nome: 'Operação', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'oper_servicos', nome: 'Serviços', acoes: ['view', 'create', 'edit', 'delete'] },
    ]
  },
  {
    id: 'gestao_pessoas', nome: 'Gestão de Pessoas',
    features: [
      
      { id: 'gp_pessoas', nome: 'Pessoas (360º)', acoes: ['view', 'create', 'edit', 'delete', 'edit_360'] },
      { id: 'gp_hierarquia', nome: 'Hierarquia', acoes: ['view'] },
      { id: 'gp_permissoes', nome: 'Permissões', acoes: ['view', 'create', 'edit', 'delete'] },
      { id: 'gp_dashboards', nome: 'Dashboards', acoes: ['view', 'edit'] },
      { id: 'gp_auditoria', nome: 'Auditoria', acoes: ['view'] },
    ]
  },
  {
    id: 'calendario', nome: 'Calendário',
    features: [
      { id: 'cal_geral', nome: 'Calendário', acoes: ['view', 'create', 'edit', 'delete'] },
    ]
  },
  {
    id: 'chat', nome: 'Chat',
    features: [
      { id: 'chat_geral', nome: 'Chat', acoes: ['view', 'create'] },
    ]
  },
];

const acoesLabels: Record<string, string> = {
  view: 'Ver',
  create: 'Criar',
  edit: 'Editar',
  delete: 'Excluir',
  approve: 'Aprovar',
  export: 'Exportar',
  edit_360: 'Editar 360'
};

const allAcoes = Object.keys(acoesLabels);

// Tipo para permissões por feature
type PermissionsMap = Record<string, Set<string>>; // featureId -> Set<acao>

export default function Acessos() {
  const { hasPermission } = usePermissions();
  const isAdmin = hasPermission('all', 'all', 'delete');

  const [activeTab, setActiveTab] = useState("perfis");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // Permissions state per role
  const [rolePermissions, setRolePermissions] = useState<Record<string, PermissionsMap>>(() => {
    const map: Record<string, PermissionsMap> = {};
    // Initialize admin with all permissions
    const adminPerms: PermissionsMap = {};
    modulosSistema.forEach(mod => {
      mod.features.forEach(feat => {
        adminPerms[feat.id] = new Set(feat.acoes);
      });
    });
    map['admin'] = adminPerms;
    // Others start empty
    systemRoles.filter(r => r.id !== 'admin').forEach(r => {
      map[r.id] = {};
    });
    return map;
  });

  // User role assignments
  const [userRoles, setUserRoles] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    pessoasMock.forEach(p => { map[p.id] = 'usuario'; });
    return map;
  });

  // User exceptions
  const [userExceptions, setUserExceptions] = useState<Record<string, PermissionsMap>>({});

  // New profile dialog
  const [newProfileDialog, setNewProfileDialog] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileDesc, setNewProfileDesc] = useState("");
  const [customRoles, setCustomRoles] = useState<Array<{ id: string; name: string; description: string }>>([]);

  // Exception dialog
  const [exceptionDialog, setExceptionDialog] = useState(false);
  const [exceptionUserId, setExceptionUserId] = useState<string | null>(null);
  const [exceptionExpanded, setExceptionExpanded] = useState<Set<string>>(new Set());

  const allRoles = [...systemRoles, ...customRoles];

  const filteredPessoas = pessoasMock.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleModuleExpand = (modId: string) => {
    setExpandedModules(prev => {
      const n = new Set(prev);
      n.has(modId) ? n.delete(modId) : n.add(modId);
      return n;
    });
  };

  const togglePermission = (featureId: string, acao: string) => {
    if (!selectedRole || selectedRole === 'admin' || !isAdmin) return;
    setRolePermissions(prev => {
      const roleCopy = { ...prev };
      const perms = { ...roleCopy[selectedRole] };
      const current = perms[featureId] ? new Set(perms[featureId]) : new Set<string>();
      current.has(acao) ? current.delete(acao) : current.add(acao);
      perms[featureId] = current;
      roleCopy[selectedRole] = perms;
      return roleCopy;
    });
  };

  const isChecked = (featureId: string, acao: string): boolean => {
    if (!selectedRole) return false;
    if (selectedRole === 'admin') return true;
    return rolePermissions[selectedRole]?.[featureId]?.has(acao) ?? false;
  };

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) return;
    const id = newProfileName.toLowerCase().replace(/\s+/g, '_');
    setCustomRoles(prev => [...prev, { id, name: newProfileName.trim(), description: newProfileDesc.trim() }]);
    setRolePermissions(prev => ({ ...prev, [id]: {} }));
    setNewProfileName("");
    setNewProfileDesc("");
    setNewProfileDialog(false);
    toast({ title: "Perfil criado", description: `Perfil "${newProfileName}" criado com sucesso.` });
  };

  // Exception helpers
  const toggleException = (featureId: string, acao: string) => {
    if (!exceptionUserId) return;
    setUserExceptions(prev => {
      const copy = { ...prev };
      const userPerms = { ...(copy[exceptionUserId] || {}) };
      const current = userPerms[featureId] ? new Set(userPerms[featureId]) : new Set<string>();
      current.has(acao) ? current.delete(acao) : current.add(acao);
      userPerms[featureId] = current;
      copy[exceptionUserId] = userPerms;
      return copy;
    });
  };

  const isExceptionChecked = (featureId: string, acao: string): boolean => {
    if (!exceptionUserId) return false;
    // Base: role permissions
    const role = userRoles[exceptionUserId] || 'usuario';
    const baseChecked = role === 'admin' ? true : (rolePermissions[role]?.[featureId]?.has(acao) ?? false);
    // Override with exception
    const exception = userExceptions[exceptionUserId]?.[featureId];
    if (exception !== undefined) {
      return exception.has(acao);
    }
    return baseChecked;
  };

  const hasUserException = (userId: string): boolean => {
    const excs = userExceptions[userId];
    if (!excs) return false;
    return Object.values(excs).some(s => s.size > 0);
  };

  const toggleExceptionExpand = (modId: string) => {
    setExceptionExpanded(prev => {
      const n = new Set(prev);
      n.has(modId) ? n.delete(modId) : n.add(modId);
      return n;
    });
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Lock className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Acesso Restrito</h2>
        <p className="text-muted-foreground">Apenas administradores podem gerenciar acessos.</p>
      </div>
    );
  }

  const exceptionUser = pessoasMock.find(p => p.id === exceptionUserId);

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

        {/* Tab Perfis */}
        <TabsContent value="perfis" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Perfis</CardTitle>
                  <Button size="sm" className="gap-1" onClick={() => setNewProfileDialog(true)}>
                    <Plus className="h-4 w-4" />
                    Novo
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {allRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setExpandedModules(new Set());
                    }}
                    className={cn(
                      "w-full p-3 rounded border text-left transition-colors",
                      selectedRole === role.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <div className="font-medium text-foreground">{role.name}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  Permissões: {allRoles.find(r => r.id === selectedRole)?.name || "Selecione um perfil"}
                  {selectedRole === 'admin' && (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">(acesso total - não editável)</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRole ? (
                  <div className="space-y-1">
                    {modulosSistema.map(modulo => (
                      <div key={modulo.id} className="border border-border rounded overflow-hidden">
                        <button
                          onClick={() => toggleModuleExpand(modulo.id)}
                          className="w-full flex items-center gap-2 p-3 hover:bg-muted/50 transition-colors"
                        >
                          {expandedModules.has(modulo.id) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-medium text-foreground text-sm">{modulo.nome}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {modulo.features.length} {modulo.features.length === 1 ? 'feature' : 'features'}
                          </span>
                        </button>
                        {expandedModules.has(modulo.id) && (
                          <div className="border-t border-border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-xs">Feature</TableHead>
                                  {allAcoes.map(a => (
                                    <TableHead key={a} className="text-center w-16 text-xs">{acoesLabels[a]}</TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {modulo.features.map(feat => (
                                  <TableRow key={feat.id}>
                                    <TableCell className="text-sm">{feat.nome}</TableCell>
                                    {allAcoes.map(acao => (
                                      <TableCell key={acao} className="text-center">
                                        {feat.acoes.includes(acao) ? (
                                          <Checkbox
                                            checked={isChecked(feat.id, acao)}
                                            onCheckedChange={() => togglePermission(feat.id, acao)}
                                            disabled={selectedRole === 'admin'}
                                          />
                                        ) : (
                                          <span className="text-muted-foreground/30">—</span>
                                        )}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    ))}
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
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Exceções</TableHead>
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
                          <Select
                            value={userRoles[pessoa.id] || 'usuario'}
                            onValueChange={(v) => setUserRoles(prev => ({ ...prev, [pessoa.id]: v }))}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {allRoles.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
                            hasUserException(pessoa.id)
                              ? "bg-accent/20 text-accent-foreground"
                              : "bg-primary/20 text-primary"
                          )}>
                            {hasUserException(pessoa.id) ? "Com Exceções" : "Padrão"}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              setExceptionUserId(pessoa.id);
                              setExceptionExpanded(new Set());
                              setExceptionDialog(true);
                            }}
                          >
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

      {/* Dialog Novo Perfil */}
      <Dialog open={newProfileDialog} onOpenChange={setNewProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Perfil de Acesso</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome do Perfil <span className="text-destructive">*</span></Label>
              <Input
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                placeholder="Ex: Supervisor de Estoque"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateProfile()}
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input
                value={newProfileDesc}
                onChange={(e) => setNewProfileDesc(e.target.value)}
                placeholder="Descreva as responsabilidades deste perfil"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewProfileDialog(false)}>Cancelar</Button>
            <Button onClick={handleCreateProfile}>Criar Perfil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Exceções */}
      <Dialog open={exceptionDialog} onOpenChange={setExceptionDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {exceptionUser && (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                    {exceptionUser.iniciais}
                  </div>
                  Exceções - {exceptionUser.nome}
                </>
              )}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Marque/desmarque permissões específicas que diferem do perfil base ({allRoles.find(r => r.id === (exceptionUserId ? userRoles[exceptionUserId] : ''))?.name || 'Usuário'}).
            </p>
          </DialogHeader>
          <div className="space-y-1 py-4">
            {modulosSistema.map(modulo => (
              <div key={modulo.id} className="border border-border rounded overflow-hidden">
                <button
                  onClick={() => toggleExceptionExpand(modulo.id)}
                  className="w-full flex items-center gap-2 p-3 hover:bg-muted/50 transition-colors"
                >
                  {exceptionExpanded.has(modulo.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium text-foreground text-sm">{modulo.nome}</span>
                </button>
                {exceptionExpanded.has(modulo.id) && (
                  <div className="border-t border-border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Feature</TableHead>
                          {allAcoes.map(a => (
                            <TableHead key={a} className="text-center w-16 text-xs">{acoesLabels[a]}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {modulo.features.map(feat => (
                          <TableRow key={feat.id}>
                            <TableCell className="text-sm">{feat.nome}</TableCell>
                            {allAcoes.map(acao => (
                              <TableCell key={acao} className="text-center">
                                {feat.acoes.includes(acao) ? (
                                  <Checkbox
                                    checked={isExceptionChecked(feat.id, acao)}
                                    onCheckedChange={() => toggleException(feat.id, acao)}
                                  />
                                ) : (
                                  <span className="text-muted-foreground/30">—</span>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              if (exceptionUserId) {
                setUserExceptions(prev => {
                  const copy = { ...prev };
                  delete copy[exceptionUserId];
                  return copy;
                });
              }
              toast({ title: "Exceções limpas", description: "Permissões resetadas para o perfil base." });
            }}>
              Limpar Exceções
            </Button>
            <Button onClick={() => {
              setExceptionDialog(false);
              toast({ title: "Exceções salvas", description: "As exceções foram aplicadas com sucesso." });
            }}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
