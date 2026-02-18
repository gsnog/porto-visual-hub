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
  quantidade: string;
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
  const [selectedItem, setSelectedItem] = useState("");
  const [quantidade, setQuantidade] = useState("");

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
  const [itemOptions, setItemOptions] = useState([
    { value: "Item 1", label: "Item 1" }, { value: "Item 2", label: "Item 2" }
  ]);

  const handleAddItem = () => {
    if (!selectedItem || !quantidade) {
      toast({ title: "Campos obrigatórios", description: "Selecione um item e informe a quantidade", variant: "destructive" });
      return;
    }
    setItens([...itens, { id: Date.now(), item: selectedItem, quantidade }]);
    setSelectedItem("");
    setQuantidade("");
  };

  const handleRemoveItem = (id: number) => {
    setItens(itens.filter((item) => item.id !== id));
  };

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

            <ValidatedTextarea label="Observações" className="min-h-[150px]" value={formData.observacoes}
              onChange={(e) => setFieldValue("observacoes", e.target.value)} onBlur={() => setFieldTouched("observacoes")}
              error={getFieldError("observacoes")} touched={touched.observacoes} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Item" value={selectedItem} onChange={setSelectedItem}
                options={itemOptions} onAddNew={(item) => setItemOptions(prev => [...prev, { value: item, label: item }])} />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Quantidade</Label>
                <Input type="number" className="form-input" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
              </div>
            </div>

            <Button variant="outline" onClick={handleAddItem}>Adicionar Item</Button>

            <h2 className="text-xl font-semibold text-foreground pt-4">Itens</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Item</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens.length === 0 ? (
                  <TableRow><TableCell className="text-center text-muted-foreground" colSpan={3}>Nenhum item adicionado</TableCell></TableRow>
                ) : (
                  itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{item.item}</TableCell>
                      <TableCell className="text-center">{item.quantidade}</TableCell>
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
