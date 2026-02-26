import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { MapPin, Trash2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface ItemLocacao {
  id: number;
  item: string;
  marca: string;
  quantidade: string;
  especificacoes: string;
}

export default function NovaLocacao() {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/estoque/locacoes",
    successMessage: "Locação salva!",
    successDescription: "O registro foi salvo com sucesso.",
  });

  const handleCancelar = () => navigate("/estoque/locacoes");

  const [locador, setLocador] = useState("");
  const fornecedorOptions = [
    { value: "forn1", label: "Fornecedor 1" },
    { value: "forn2", label: "Fornecedor 2" },
    { value: "forn3", label: "João Silva" },
    { value: "forn4", label: "Maria Santos" },
  ];

  const [unidade, setUnidade] = useState("");
  const unidadeOptions = [
    { value: "almoxarifado-sp", label: "Almoxarifado SP" },
    { value: "ti-central", label: "TI Central" },
    { value: "deposito-rj", label: "Depósito RJ" },
  ];

  const [itens, setItens] = useState<ItemLocacao[]>([]);
  const [itemForm, setItemForm] = useState({ item: "", marca: "", quantidade: "", especificacoes: "" });

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
    <SimpleFormWizard title="Nova Locação">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Locação</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Locador <span className="text-destructive">*</span></Label>
                <Select value={locador} onValueChange={setLocador}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione o locador" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {fornecedorOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Unidade <span className="text-destructive">*</span></Label>
                <Select value={unidade} onValueChange={setUnidade}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a unidade" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {unidadeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Início <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Previsão de Entrega <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contrato</Label>
                <Input type="file" className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor</Label>
                <Input type="text" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Adicional</Label>
                <Input type="number" defaultValue="0" className="form-input" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Desconto</Label>
                <Input type="number" defaultValue="0" className="form-input" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor Total</Label>
                <Input type="text" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Descrição</Label>
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
