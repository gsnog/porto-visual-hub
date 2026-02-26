import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { PackagePlus, Trash2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { DropdownWithAdd } from "@/components/DropdownWithAdd";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface ItemEntrada {
  id: number;
  item: string;
  marca: string;
  quantidade: string;
  especificacoes: string;
}

export default function NovaEntrada() {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/estoque/entradas",
    successMessage: "Entrada salva!",
    successDescription: "O registro foi salvo com sucesso.",
  });

  const handleCancelar = () => navigate("/estoque/entradas");

  const [itens, setItens] = useState<ItemEntrada[]>([]);
  const [itemForm, setItemForm] = useState({ item: "", marca: "", quantidade: "", especificacoes: "" });

  const [estoqueOrigem, setEstoqueOrigem] = useState("");
  const [estoqueOrigemOptions, setEstoqueOrigemOptions] = useState([
    { value: "origem1", label: "Estoque 1" },
    { value: "origem2", label: "Estoque 2" },
  ]);

  const [estoqueDestino, setEstoqueDestino] = useState("");
  const [estoqueDestinoOptions, setEstoqueDestinoOptions] = useState([
    { value: "destino1", label: "Estoque 1" },
    { value: "destino2", label: "Estoque 2" },
  ]);

  const [operacao, setOperacao] = useState("");
  const [operacaoOptions, setOperacaoOptions] = useState([
    { value: "compra", label: "Compra" },
    { value: "transferencia", label: "Transferência" },
  ]);

  const addOption = (setter: React.Dispatch<React.SetStateAction<{value:string;label:string}[]>>, valueSetter: React.Dispatch<React.SetStateAction<string>>) => (name: string) => {
    const newValue = name.toLowerCase().replace(/\s+/g, "-");
    setter(prev => [...prev, { value: newValue, label: name }]);
    valueSetter(newValue);
  };

  const handleAddItem = () => {
    if (!itemForm.item || !itemForm.quantidade) {
      toast({ title: "Campos obrigatórios", description: "Informe o item e a quantidade.", variant: "destructive" });
      return;
    }
    setItens([...itens, { id: Date.now(), ...itemForm }]);
    setItemForm({ item: "", marca: "", quantidade: "", especificacoes: "" });
  };

  const handleRemoveItem = (id: number) => setItens(itens.filter(i => i.id !== id));

  return (
    <SimpleFormWizard title="Nova Entrada">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <PackagePlus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Entrada</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data</Label>
                <Input type="date" className="form-input" />
              </div>
              <DropdownWithAdd label="Operação" value={operacao} onChange={setOperacao} options={operacaoOptions} onAddNew={addOption(setOperacaoOptions, setOperacao)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownWithAdd label="Estoque de Origem" value={estoqueOrigem} onChange={setEstoqueOrigem} options={estoqueOrigemOptions} onAddNew={addOption(setEstoqueOrigemOptions, setEstoqueOrigem)} />
              <DropdownWithAdd label="Estoque de Destino" required value={estoqueDestino} onChange={setEstoqueDestino} options={estoqueDestinoOptions} onAddNew={addOption(setEstoqueDestinoOptions, setEstoqueDestino)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nota Fiscal <span className="text-destructive">*</span></Label>
                <Input type="text" className="form-input" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Validade</Label>
                <Input type="date" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Observação</Label>
                <Textarea className="form-input min-h-[80px]" />
              </div>
            </div>

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
                <Button type="button" onClick={handleAddItem}>Adicionar Item</Button>
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
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Nenhum item adicionado</TableCell></TableRow>
                ) : (
                  itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{item.item}</TableCell>
                      <TableCell className="text-center">{item.marca}</TableCell>
                      <TableCell className="text-center">{item.quantidade}</TableCell>
                      <TableCell className="text-center">{item.especificacoes}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)} className="text-destructive hover:text-destructive"><Trash2 size={16} /></Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <FormActionBar onSave={handleSalvar} onCancel={handleCancelar} isSaving={isSaving} />
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
