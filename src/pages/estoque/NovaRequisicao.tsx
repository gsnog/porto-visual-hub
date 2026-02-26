import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import { ClipboardList, Trash2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedTextarea } from "@/components/ui/validated-textarea";
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

export default function NovaRequisicao() {
  const navigate = useNavigate();
  const { handleSave, isSaving } = useSaveWithDelay();
  const [itens, setItens] = useState<ItemRequisicao[]>([]);
  const [itemForm, setItemForm] = useState({ item: "", marca: "", quantidade: "", especificacoes: "" });

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
    if (!itemForm.item || !itemForm.quantidade) {
      toast({ title: "Campos obrigatórios", description: "Informe o item e a quantidade.", variant: "destructive" });
      return;
    }
    setItens([...itens, { id: Date.now(), ...itemForm }]);
    setItemForm({ item: "", marca: "", quantidade: "", especificacoes: "" });
  };

  const handleRemoveItem = (id: number) => setItens(itens.filter((item) => item.id !== id));

  const handleSalvar = async () => {
    if (validateAll()) {
      if (itens.length === 0) {
        toast({ title: "Itens obrigatórios", description: "Adicione pelo menos um item à requisição", variant: "destructive" });
        return;
      }
      await handleSave("/estoque/requisicoes", "Requisição salva com sucesso!");
    }
  };

  return (
    <SimpleFormWizard title="Nova Requisição">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Requisição</h2>
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
                  <Input value={itemForm.item} onChange={(e) => setItemForm(p => ({ ...p, item: e.target.value }))} placeholder="Nome do item" className="form-input" />
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

            <FormActionBar onSave={handleSalvar} onCancel={() => navigate("/estoque/requisicoes")} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
