import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Phone, Briefcase, Users, Pencil, Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPessoa,
  fetchPessoas,
  fetchSetores,
  updatePessoa,
  pessoasQueryKey,
  setoresQueryKey,
  type Pessoa,
} from "@/services/pessoas";

const CARGO_OPTIONS = [
  { value: "estagiario", label: "Estagiário" },
  { value: "auxiliar", label: "Auxiliar" },
  { value: "assistente", label: "Assistente" },
  { value: "analista", label: "Analista" },
  { value: "gestor", label: "Gestor" },
  { value: "diretor", label: "Diretor" },
];

export default function PessoaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const numericId = Number(id);

  const { data: pessoa, isLoading } = useQuery<Pessoa>({
    queryKey: ['pessoa', numericId],
    queryFn: () => fetchPessoa(numericId),
    enabled: !!numericId,
  });

  // Get all pessoas to find subordinates and for supervisor dropdown
  const { data: todas = [] } = useQuery<Pessoa[]>({
    queryKey: pessoasQueryKey,
    queryFn: fetchPessoas,
    enabled: !!pessoa,
  });

  // Sectors for the dropdown
  const { data: setores = [] } = useQuery({
    queryKey: setoresQueryKey,
    queryFn: fetchSetores,
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    cargo: "",
    setor_id: "" as string | number,
    supervisor_id: "" as string | number,
  });

  const openEdit = () => {
    if (!pessoa) return;
    setEditData({
      first_name: pessoa.first_name || "",
      last_name: pessoa.last_name || "",
      email: pessoa.email || "",
      cargo: pessoa.cargo || "",
      setor_id: pessoa.setor_id ?? "",
      supervisor_id: pessoa.supervisor_id ?? "",
    });
    setEditOpen(true);
  };

  const updateMutation = useMutation({
    mutationFn: (data: any) => updatePessoa(numericId, data),
    onSuccess: (updated) => {
      toast({ title: "Perfil atualizado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['pessoa', numericId] });
      queryClient.invalidateQueries({ queryKey: pessoasQueryKey });
      setEditOpen(false);
    },
    onError: (err: any) => {
      const msg = err?.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      toast({ title: "Erro ao atualizar", description: msg, variant: "destructive" });
    },
  });

  const handleSaveEdit = () => {
    const payload: any = {
      first_name: editData.first_name,
      last_name: editData.last_name,
      email: editData.email,
      cargo: editData.cargo || "",
    };
    if (editData.setor_id !== "") payload.setor_id = Number(editData.setor_id);
    if (editData.supervisor_id !== "") {
      payload.supervisor_id = Number(editData.supervisor_id);
    } else {
      payload.supervisor_id = null;
    }
    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!pessoa) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Pessoa não encontrada.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );
  }

  const subordinados = todas.filter(p => p.supervisor_id === pessoa.id);
  const supervisor = pessoa.supervisor_id ? todas.find(p => p.id === pessoa.supervisor_id) : null;

  // Possible supervisors = everyone except the person themselves
  const supervisorOptions = todas.filter(p => p.id !== pessoa.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-4 flex-1">
          {pessoa.profile_image ? (
            <img src={pessoa.profile_image} alt={pessoa.iniciais} className="h-16 w-16 rounded object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded bg-primary text-primary-foreground text-2xl font-bold">
              {pessoa.iniciais}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{pessoa.nome}</h1>
            <p className="text-muted-foreground">{pessoa.cargo || "—"} · {pessoa.setor || "—"}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={openEdit}>
              <Pencil className="h-4 w-4" /> Editar Perfil
            </Button>
            <StatusBadge status={pessoa.role} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="profissional">
        <TabsList>
          <TabsTrigger value="profissional" className="gap-2"><Briefcase className="h-4 w-4" />Profissional</TabsTrigger>
          <TabsTrigger value="contato" className="gap-2"><User className="h-4 w-4" />Contato</TabsTrigger>
          <TabsTrigger value="equipe" className="gap-2"><Users className="h-4 w-4" />Equipe</TabsTrigger>
        </TabsList>

        <TabsContent value="profissional" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader><CardTitle className="text-lg">Informações Profissionais</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Cargo" value={pessoa.cargo || "—"} />
                <InfoRow label="Setor/Área" value={pessoa.setor || "—"} />
                <InfoRow label="Role" value={pessoa.role} />
                <InfoRow label="Supervisor Direto" value={pessoa.supervisor_nome || "—"} />
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader><CardTitle className="text-lg">Cadeia Hierárquica</CardTitle></CardHeader>
              <CardContent>
                {supervisor ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-muted text-muted-foreground text-xs font-bold">
                        {supervisor.iniciais}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{supervisor.nome}</p>
                        <p className="text-xs text-muted-foreground">{supervisor.cargo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                        {pessoa.iniciais}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">{pessoa.nome}</p>
                        <p className="text-xs text-muted-foreground">{pessoa.cargo}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nível mais alto da hierarquia.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contato" className="mt-6">
          <Card className="border-border">
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Phone className="h-5 w-5 text-primary" />Contato</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="E-mail" value={pessoa.email} />
              <InfoRow label="Username" value={pessoa.username} />
              {pessoa.telefone && <InfoRow label="Telefone" value={pessoa.telefone} />}
              {pessoa.endereco && <InfoRow label="Endereço" value={pessoa.endereco} />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipe" className="mt-6">
          <Card className="border-border">
            <CardHeader><CardTitle className="text-lg">Subordinados Diretos ({subordinados.length})</CardTitle></CardHeader>
            <CardContent>
              {subordinados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subordinados.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => navigate(`/gestao-pessoas/pessoas/${sub.id}`)}
                      className="flex items-center gap-3 p-3 rounded border border-border hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-bold">
                        {sub.iniciais}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{sub.nome}</p>
                        <p className="text-sm text-muted-foreground">{sub.cargo || "—"}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum subordinado direto.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Modal — Full hierarchy edit */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Editar Perfil</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={editData.first_name}
                onChange={e => setEditData(p => ({ ...p, first_name: e.target.value }))}
                placeholder="Primeiro nome"
              />
            </div>
            <div className="space-y-2">
              <Label>Sobrenome</Label>
              <Input
                value={editData.last_name}
                onChange={e => setEditData(p => ({ ...p, last_name: e.target.value }))}
                placeholder="Sobrenome"
              />
            </div>
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input
                type="email"
                value={editData.email}
                onChange={e => setEditData(p => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Cargo</Label>
              <Select
                value={editData.cargo}
                onValueChange={v => setEditData(p => ({ ...p, cargo: v }))}
              >
                <SelectTrigger><SelectValue placeholder="Selecionar cargo" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  {CARGO_OPTIONS.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Setor / Área</Label>
              <Select
                value={editData.setor_id ? String(editData.setor_id) : "__none__"}
                onValueChange={v => setEditData(p => ({ ...p, setor_id: v === "__none__" ? "" : v }))}
              >
                <SelectTrigger><SelectValue placeholder="Selecionar setor" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="__none__">— Sem setor —</SelectItem>
                  {setores.map(s => (
                    <SelectItem key={s.id} value={String(s.id)}>{s.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Supervisor / Gestor</Label>
              <Select
                value={editData.supervisor_id ? String(editData.supervisor_id) : "__none__"}
                onValueChange={v => setEditData(p => ({ ...p, supervisor_id: v === "__none__" ? "" : v }))}
              >
                <SelectTrigger><SelectValue placeholder="Selecionar supervisor" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="__none__">— Sem supervisor —</SelectItem>
                  {supervisorOptions.map(sup => (
                    <SelectItem key={sup.id} value={String(sup.id)}>
                      {sup.nome} {sup.cargo ? `· ${sup.cargo}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={updateMutation.isPending}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Salvando...</>
              ) : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
