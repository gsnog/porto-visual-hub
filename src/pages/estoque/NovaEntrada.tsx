import { useState, useMemo } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface ItemEntrada {
  id: number;
  item: string;
  marca: string;
  quantidade: string;
  custoUnitario: string;
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
  const [itemForm, setItemForm] = useState({ item: "", marca: "", quantidade: "", custoUnitario: "", especificacoes: "" });

  const [estoqueOrigem, setEstoqueOrigem] = useState("");
  const unidadeOptions = [
    { value: "almoxarifado-sp", label: "Almoxarifado SP" },
    { value: "ti-central", label: "TI Central" },
    { value: "deposito-rj", label: "Depósito RJ" },
  ];

  const [estoqueDestino, setEstoqueDestino] = useState("");

  const [operacao, setOperacao] = useState("");
  const operacaoOptions = [
    { value: "compra", label: "Compra" },
    { value: "transferencia", label: "Transferência" },
  ];

  const handleAddItem = () => {
    if (!itemForm.item || !itemForm.quantidade) {
      toast({ title: "Campos obrigatórios", description: "Informe o item e a quantidade.", variant: "destructive" });
      return;
    }
    setItens([...itens, { id: Date.now(), ...itemForm }]);
    setItemForm({ item: "", marca: "", quantidade: "", custoUnitario: "", especificacoes: "" });
  };

  const handleRemoveItem = (id: number) => setItens(itens.filter(i => i.id !== id));

  const valorTotal = useMemo(() => {
    return itens.reduce((acc, item) => {
      const qty = parseFloat(item.quantidade) || 0;
      const cost = parseFloat(item.custoUnitario.replace("R$", "").replace(",", ".").trim()) || 0;
      return acc + qty * cost;
    }, 0);
  }, [itens]);

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
                <Label className="text-sm font-medium">Data <span className="text-destructive">*</span></Label>
                <Input type="date" className="form-input" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Operação <span className="text-destructive">*</span></Label>
                <Select value={operacao} onValueChange={setOperacao}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Selecione a operação" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {operacaoOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {operacao === "transferencia" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DropdownWithAdd label="Estoque de Origem" value={estoqueOrigem} onChange={setEstoqueOrigem} options={unidadeOptions} onAddNew={(name) => { setEstoqueOrigem(name.toLowerCase().replace(/\s+/g, "-")); }} />
                <DropdownWithAdd label="Estoque de Destino" required value={estoqueDestino} onChange={setEstoqueDestino} options={unidadeOptions} onAddNew={(name) => { setEstoqueDestino(name.toLowerCase().replace(/\s+/g, "-")); }} />
              </div>
            )}

            {operacao === "compra" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DropdownWithAdd label="Estoque de Destino" required value={estoqueDestino} onChange={setEstoqueDestino} options={unidadeOptions} onAddNew={(name) => { setEstoqueDestino(name.toLowerCase().replace(/\s+/g, "-")); }} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nota Fiscal <span className="text-destructive">*</span></Label>
                <Input type="text" placeholder="Número da NF" className="form-input" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Emissão</Label>
                <Input type="date" className="form-input" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data de Vencimento</Label>
                <Input type="date" className="form-input" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Valor Total</Label>
                <Input type="text" value={valorTotal > 0 ? `R$ ${valorTotal.toFixed(2).replace(".", ",")}` : ""} placeholder="Calculado automaticamente a partir dos itens" className="form-input" readOnly disabled />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">PDF da Nota Fiscal</Label>
                <Input type="file" accept=".pdf" className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">PDF do Boleto</Label>
                <Input type="file" accept=".pdf" className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Observação</Label>
                <Textarea className="form-input min-h-[80px]" placeholder="Observações sobre a entrada..." />
              </div>
            </div>

            {/* Lista de Itens */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Itens da Nota Fiscal</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Item</Label>
                  <Input value={itemForm.item} onChange={(e) => setItemForm(p => ({ ...p, item: e.target.value }))} placeholder="Nome do item" className="form-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Marca</Label>
                  <Input value={itemForm.marca} onChange={(e) => setItemForm(p => ({ ...p, marca: e.target.value }))} placeholder="Marca" className="form-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Custo Unitário</Label>
                  <Input value={itemForm.custoUnitario} onChange={(e) => setItemForm(p => ({ ...p, custoUnitario: e.target.value }))} placeholder="R$ 0,00" className="form-input" />
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
                  <TableHead className="text-center">Custo Unitário</TableHead>
                  <TableHead className="text-center">Especificações</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Nenhum item adicionado</TableCell></TableRow>
                ) : (
                  itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{item.item}</TableCell>
                      <TableCell className="text-center">{item.marca}</TableCell>
                      <TableCell className="text-center">{item.quantidade}</TableCell>
                      <TableCell className="text-center">{item.custoUnitario}</TableCell>
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
