import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { ClipboardList, Loader2, Trash2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ValidatedSelect } from "@/components/ui/validated-select";
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

  const {
    formData,
    setFieldValue,
    setFieldTouched,
    validateAll,
    getFieldError,
    touched,
  } = useFormValidation({ setor: "", projeto: "", observacoes: "" }, validationFields);

  const handleAddItem = () => {
    if (!selectedItem || !quantidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione um item e informe a quantidade",
        variant: "destructive",
      });
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
        toast({
          title: "Itens obrigatórios",
          description: "Adicione pelo menos um item à requisição",
          variant: "destructive",
        });
        return;
      }
      await handleSave("/estoque/requisicoes", "Requisição salva com sucesso!");
    }
  };

  const handleCancelar = () => {
    navigate("/estoque/requisicoes");
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
              <ValidatedSelect
                label="Setor"
                required
                placeholder="Selecionar"
                options={[
                  { value: "setor1", label: "Setor 1" },
                  { value: "setor2", label: "Setor 2" },
                ]}
                value={formData.setor}
                onValueChange={(value) => setFieldValue("setor", value)}
                onBlur={() => setFieldTouched("setor")}
                error={getFieldError("setor")}
                touched={touched.setor}
              />

              <ValidatedSelect
                label="Projeto"
                placeholder="Selecionar"
                options={[
                  { value: "projeto1", label: "Projeto 1" },
                  { value: "projeto2", label: "Projeto 2" },
                ]}
                value={formData.projeto}
                onValueChange={(value) => setFieldValue("projeto", value)}
                onBlur={() => setFieldTouched("projeto")}
                error={getFieldError("projeto")}
                touched={touched.projeto}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ValidatedTextarea
                label="Observações"
                className="min-h-[150px]"
                value={formData.observacoes}
                onChange={(e) => setFieldValue("observacoes", e.target.value)}
                onBlur={() => setFieldTouched("observacoes")}
                error={getFieldError("observacoes")}
                touched={touched.observacoes}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Item</Label>
                <Select value={selectedItem} onValueChange={setSelectedItem}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="Item 1">Item 1</SelectItem>
                    <SelectItem value="Item 2">Item 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Quantidade</Label>
                <Input
                  type="number"
                  className="form-input"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="btn-outline" onClick={handleAddItem}>
                Adicionar Item
              </Button>
            </div>

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
                  <TableRow>
                    <TableCell className="text-center text-muted-foreground" colSpan={3}>
                      Nenhum item adicionado
                    </TableCell>
                  </TableRow>
                ) : (
                  itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{item.item}</TableCell>
                      <TableCell className="text-center">{item.quantidade}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSalvar} disabled={isSaving} className="btn-action px-6">
                {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Salvando...</> : "Salvar"}
              </Button>
              <Button onClick={handleCancelar} disabled={isSaving} variant="destructive" className="btn-destructive px-6">Cancelar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
