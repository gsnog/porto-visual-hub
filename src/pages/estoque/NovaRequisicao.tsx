import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import { ClipboardList, Trash2, ExternalLink } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface ItemRequisicao {
  id: number;
  item: string;
  marca: string;
  quantidade: string;
  especificacoes: string;
}

const validationFields = [
  { name: "setor", label: "Setor", required: true },
  { name: "projeto", label: "Projeto", required: false },
  { name: "observacoes", label: "Observações", required: false },
];

const itensCadastradosBase = [
  { value: "parafuso-m8", label: "Parafuso M8" },
  { value: "parafuso-m10", label: "Parafuso M10" },
  { value: "cabo-hdmi", label: "Cabo HDMI" },
  { value: "oleo-lubrificante", label: "Óleo Lubrificante" },
  { value: "papel-a4", label: "Papel A4" },
  { value: "toner-hp", label: "Toner HP" },
];

function loadItensCadastrados() {
  const novos = JSON.parse(sessionStorage.getItem("novos_itens_cadastrados") || "[]");
  const extras = novos.map((n: any) => ({ value: n.value, label: n.label }));
  const allValues = new Set(itensCadastradosBase.map(i => i.value));
  const merged = [...itensCadastradosBase];
  for (const e of extras) {
    if (!allValues.has(e.value)) {
      merged.push(e);
      allValues.add(e.value);
    }
  }
  return merged;
}

export default function NovaRequisicao() {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();
  const [itens, setItens] = useState<ItemRequisicao[]>([]);
  const [itensCadastrados, setItensCadastrados] = useState(loadItensCadastrados);
  const [itemForm, setItemForm] = useState({ itemCadastrado: "", marca: "", quantidade: "", especificacoes: "" });
  const [showNoItemDialog, setShowNoItemDialog] = useState(false);

  const { formData, setFieldValue, setFieldTouched, validateAll, getFieldError, touched } = useFormValidation(
    { setor: "", projeto: "", observacoes: "" },
    validationFields
  );

  const [setorOptions, setSetorOptions] = useState([
    { value: "setor1", label: "Setor 1" }, { value: "setor2", label: "Setor 2" }
  ]);
  const [projetoOptions, setProjetoOptions] = useState([
    { value: "projeto1", label: "Projeto 1" }, { value: "projeto2", label: "Projeto 2" }
  ]);

  const handleAddItem = () => {
    const itemName = itensCadastrados.find(i => i.value === itemForm.itemCadastrado)?.label || "";

    if (!itemName || !itemForm.quantidade) {
      toast({ title: "Campos obrigatórios", description: "Selecione um item e informe a quantidade.", variant: "destructive" });
      return;
    }
    setItens([...itens, { id: Date.now(), item: itemName, marca: itemForm.marca, quantidade: itemForm.quantidade, especificacoes: itemForm.especificacoes }]);
    setItemForm({ itemCadastrado: "", marca: "", quantidade: "", especificacoes: "" });
  };

  const handleRemoveItem = (id: number) => setItens(itens.filter((item) => item.id !== id));

  const handleSalvar = async () => {
    if (validateAll()) {
      if (itens.length === 0) {
        toast({ title: "Itens obrigatórios", description: "Adicione pelo menos um item ao pedido", variant: "destructive" });
        return;
      }
      await handleSave("/estoque/pedidos-internos", "Pedido interno salvo com sucesso!");
    }
  };

  const handleGoToCadastroItem = () => {
    const stateToSave = {
      formData,
      itens,
      itemForm,
      setorOptions,
      projetoOptions,
    };
    sessionStorage.setItem("novaRequisicao_state", JSON.stringify(stateToSave));
    setShowNoItemDialog(false);
    navigate("/cadastro/estoque/itens/novo?returnTo=/estoque/pedidos-internos/nova");
  };

  // Restore state from sessionStorage on mount
  useState(() => {
    const saved = sessionStorage.getItem("novaRequisicao_state");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.itens) setItens(state.itens);
        if (state.itemForm) setItemForm(state.itemForm);
        if (state.formData) {
          const fd = state.formData as Record<string, string>;
          if (fd.setor) setFieldValue("setor", fd.setor);
          if (fd.projeto) setFieldValue("projeto", fd.projeto);
          if (fd.observacoes) setFieldValue("observacoes", fd.observacoes);
        }
        if (state.setorOptions) setSetorOptions(state.setorOptions);
        if (state.projetoOptions) setProjetoOptions(state.projetoOptions);
        sessionStorage.removeItem("novaRequisicao_state");
      } catch (e) {
        console.error("Erro ao restaurar estado:", e);
      }
    }
  });

  // Reload items list when window regains focus
  useEffect(() => {
    const handleFocus = () => {
      setItensCadastrados(loadItensCadastrados());
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <SimpleFormWizard title="Novo Pedido Interno">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados do Pedido Interno</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Setor" required value={formData.setor} onChange={(v) => setFieldValue("setor", v)}
                options={setorOptions} onAddNew={(item) => setSetorOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
              <DropdownWithAdd label="Projeto" value={formData.projeto} onChange={(v) => setFieldValue("projeto", v)}
                options={projetoOptions} onAddNew={(item) => setProjetoOptions(prev => [...prev, { value: item.toLowerCase().replace(/\s+/g, '_'), label: item }])} />
            </div>

            <ValidatedTextarea label="Observações" className="min-h-[100px]" value={formData.observacoes}
              onChange={(e) => setFieldValue("observacoes", e.target.value)} onBlur={() => setFieldTouched("observacoes")}
              error={getFieldError("observacoes")} touched={touched.observacoes} />

            {/* Lista de Itens */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Itens</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Item</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Select value={itemForm.itemCadastrado} onValueChange={(v) => setItemForm(p => ({ ...p, itemCadastrado: v }))}>
                        <SelectTrigger className="form-input"><SelectValue placeholder="Selecione um item cadastrado" /></SelectTrigger>
                        <SelectContent className="bg-popover">
                          {itensCadastrados.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="button" variant="outline" size="icon" className="shrink-0" onClick={() => setShowNoItemDialog(true)} title="Item não encontrado? Cadastre um novo">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Marca</Label>
                  <Input value={itemForm.marca} onChange={(e) => setItemForm(p => ({ ...p, marca: e.target.value }))} placeholder="Marca" className="form-input" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantidade</Label>
                  <Input type="number" value={itemForm.quantidade} onChange={(e) => setItemForm(p => ({ ...p, quantidade: e.target.value }))} placeholder="Qtd" className="form-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Especificações</Label>
                  <Input value={itemForm.especificacoes} onChange={(e) => setItemForm(p => ({ ...p, especificacoes: e.target.value }))} placeholder="Specs" className="form-input" />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button type="button" variant="outline" onClick={handleAddItem}>Adicionar Item</Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Item</TableHead>
                  <TableHead className="text-center">Marca</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">Especificações</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens.length === 0 ? (
                  <TableRow><TableCell className="text-center text-muted-foreground" colSpan={5}>Nenhum item adicionado</TableCell></TableRow>
                ) : (
                  itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{item.item}</TableCell>
                      <TableCell className="text-center">{item.marca}</TableCell>
                      <TableCell className="text-center">{item.quantidade}</TableCell>
                      <TableCell className="text-center">{item.especificacoes}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)} className="text-destructive hover:text-destructive">
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/estoque/pedidos-internos")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>

      {/* Dialog: Item não encontrado */}
      <Dialog open={showNoItemDialog} onOpenChange={setShowNoItemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Item não encontrado?</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              O item que você precisa não está cadastrado no sistema. Deseja ir para a página de cadastro de itens?
            </p>
            <p className="text-sm text-muted-foreground">
              Suas informações preenchidas neste formulário serão <strong>salvas automaticamente</strong> e restauradas quando você voltar.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowNoItemDialog(false)}>Cancelar</Button>
            <Button onClick={handleGoToCadastroItem} className="gap-2">
              <ExternalLink className="w-4 h-4" /> Ir para Cadastro de Itens
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SimpleFormWizard>
  );
}
