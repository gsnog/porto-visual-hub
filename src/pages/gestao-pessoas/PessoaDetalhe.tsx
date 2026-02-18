import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, User, Phone, MapPin, Landmark, FileText, Briefcase, Users, Pencil } from "lucide-react";
import { pessoasMock, setoresMock, getSubordinados, getCadeiaGestores } from "@/data/pessoas-mock";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "@/hooks/use-toast";

export default function PessoaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pessoa = pessoasMock.find(p => p.id === id);

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    nome: pessoa?.nome || "",
    email: pessoa?.email || "",
    telefone: pessoa?.telefone || "",
    cargo: pessoa?.cargo || "",
    endereco: pessoa?.endereco || "",
    cidade: pessoa?.cidade || "",
    estado: pessoa?.estado || "",
    cep: pessoa?.cep || "",
  });

  if (!pessoa) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Pessoa não encontrada.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );
  }

  const subordinados = getSubordinados(pessoa.id);
  const cadeiaGestores = getCadeiaGestores(pessoa.id);
  const setor = setoresMock.find(s => s.id === pessoa.setorId);

  const handleSaveEdit = () => {
    setEditOpen(false);
    toast({ title: "Perfil atualizado", description: `Dados de "${editData.nome}" foram salvos.` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-4 flex-1">
          <div className="flex h-16 w-16 items-center justify-center rounded bg-primary text-primary-foreground text-2xl font-bold">
            {pessoa.iniciais}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{pessoa.nome}</h1>
            <p className="text-muted-foreground">{pessoa.cargo} · {pessoa.setor}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={() => setEditOpen(true)}>
              <Pencil className="h-4 w-4" />
              Editar Perfil
            </Button>
            <StatusBadge status={pessoa.status} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="pessoal">
        <TabsList>
          <TabsTrigger value="pessoal" className="gap-2"><User className="h-4 w-4" />Dados Pessoais</TabsTrigger>
          <TabsTrigger value="profissional" className="gap-2"><Briefcase className="h-4 w-4" />Profissional</TabsTrigger>
          <TabsTrigger value="equipe" className="gap-2"><Users className="h-4 w-4" />Equipe</TabsTrigger>
        </TabsList>

        <TabsContent value="pessoal" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Phone className="h-5 w-5 text-primary" />Contato</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="E-mail" value={pessoa.email} />
                <InfoRow label="Telefone" value={pessoa.telefone} />
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><MapPin className="h-5 w-5 text-primary" />Endereço</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Endereço" value={pessoa.endereco || "—"} />
                <InfoRow label="Cidade/UF" value={pessoa.cidade && pessoa.estado ? `${pessoa.cidade}/${pessoa.estado}` : "—"} />
                <InfoRow label="CEP" value={pessoa.cep || "—"} />
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><FileText className="h-5 w-5 text-primary" />Documentos</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="CPF" value={pessoa.cpf || "—"} />
                <InfoRow label="RG" value={pessoa.rg || "—"} />
                <InfoRow label="Data de Nascimento" value={pessoa.dataNascimento || "—"} />
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Landmark className="h-5 w-5 text-primary" />Dados Bancários</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Dados bancários não disponíveis nesta visualização.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profissional" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader><CardTitle className="text-lg">Informações Profissionais</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Cargo" value={pessoa.cargo} />
                <InfoRow label="Setor/Área" value={pessoa.setor} />
                <InfoRow label="Tipo de Vínculo" value={pessoa.tipoVinculo} />
                <InfoRow label="Data de Admissão" value={pessoa.dataAdmissao} />
                <InfoRow label="Gestor Direto" value={pessoa.gestorNome || "—"} />
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader><CardTitle className="text-lg">Cadeia Hierárquica</CardTitle></CardHeader>
              <CardContent>
                {cadeiaGestores.length > 0 ? (
                  <div className="space-y-2">
                    {cadeiaGestores.map((g, i) => (
                      <div key={g.id} className="flex items-center gap-2" style={{ paddingLeft: `${i * 16}px` }}>
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-muted text-muted-foreground text-xs font-bold">
                          {g.iniciais}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{g.nome}</p>
                          <p className="text-xs text-muted-foreground">{g.cargo}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2" style={{ paddingLeft: `${cadeiaGestores.length * 16}px` }}>
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

        <TabsContent value="equipe" className="mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Subordinados Diretos ({subordinados.length})</CardTitle>
            </CardHeader>
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
                        <p className="text-sm text-muted-foreground">{sub.cargo}</p>
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

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Editar Perfil 360</DialogTitle></DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>Nome</Label><Input value={editData.nome} onChange={e => setEditData(p => ({ ...p, nome: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Cargo</Label><Input value={editData.cargo} onChange={e => setEditData(p => ({ ...p, cargo: e.target.value }))} /></div>
            <div className="space-y-2"><Label>E-mail</Label><Input value={editData.email} onChange={e => setEditData(p => ({ ...p, email: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Telefone</Label><Input value={editData.telefone} onChange={e => setEditData(p => ({ ...p, telefone: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Endereço</Label><Input value={editData.endereco} onChange={e => setEditData(p => ({ ...p, endereco: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Cidade</Label><Input value={editData.cidade} onChange={e => setEditData(p => ({ ...p, cidade: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Estado</Label><Input value={editData.estado} onChange={e => setEditData(p => ({ ...p, estado: e.target.value }))} /></div>
            <div className="space-y-2"><Label>CEP</Label><Input value={editData.cep} onChange={e => setEditData(p => ({ ...p, cep: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Salvar</Button>
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
