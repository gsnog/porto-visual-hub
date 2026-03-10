import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { Trash2, ShoppingCart } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ItemOrdem {
  id: number;
  item: string;
  itemSource: "cadastrado" | "manual";
  marca: string;
  quantidade: string;
  especificacoes: string;
}

const unidadeOptions = [
  { value: "almoxarifado-sp", label: "Almoxarifado SP" },
  { value: "ti-central", label: "TI Central" },
  { value: "deposito-rj", label: "Depósito RJ" },
];

const setorOptions = [
  { value: "setor1", label: "Setor 1" },
  { value: "setor2", label: "Setor 2" },
  { value: "administrativo", label: "Administrativo" },
  { value: "operacional", label: "Operacional" },
];

const itensCadastrados = [
  { value: "parafuso-m8", label: "Parafuso M8" },
  { value: "parafuso-m10", label: "Parafuso M10" },
  { value: "cabo-hdmi", label: "Cabo HDMI" },
  { value: "oleo-lubrificante", label: "Óleo Lubrificante" },
  { value: "papel-a4", label: "Papel A4" },
  { value: "toner-hp", label: "Toner HP" },
];

export default function NovaOrdemCompra() {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();
  const [itens, setItens] = useState<ItemOrdem[]>([]);
  const [formData, setFormData] = useState({
    unidade: "", setor: "", descricao: "", justificativa: "",
    itemCadastrado: "", itemManual: "", marca: "", quantidade: "", especificacoes: "",
  });
  const [itemMode, setItemMode] = useState<"cadastrado" | "manual">("cadastrado");

  const handleAddItem = () => {
    const itemName = itemMode === "cadastrado"
      ? itensCadastrados.find(i => i.value === formData.itemCadastrado)?.label || ""
      : formData.itemManual;
    if (!itemName || !formData.quantidade) return;
    const novoItem: ItemOrdem = {
      id: Date.now(),
      item: itemName,
      itemSource: itemMode,
      marca: formData.marca,
      quantidade: formData.quantidade,
      especificacoes: formData.especificacoes,
    };
    setItens([...itens, novoItem]);
    setFormData({ ...formData, itemCadastrado: "", itemManual: "", marca: "", quantidade: "", especificacoes: "" });
  };

  const handleRemoveItem = (id: number) => setItens(itens.filter((item) => item.id !== id));
  const handleSalvar = () => handleSave("/estoque/ordem-compra", "Ordem de compra salva com sucesso!");
  const handleCancelar = () => navigate("/estoque/ordem-compra");

  return (
    <SimpleFormWizard title="Nova Ordem de Compra">
      <Card className="border-border shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Dados da Ordem de Compra</h2>
                <p className="text-sm text-muted-foreground">Preencha as informações abaixo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Unidade</Label>
                <Select value={formData.unidade} onValueChange={(v) => setFormData({ ...formData, unidade: v })}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a unidade" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {unidadeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Setor</Label>
                <Select value={formData.setor} onValueChange={(v) => setFormData({ ...formData, setor: v })}>
                  <SelectTrigger className="form-input"><SelectValue placeholder="Selecione o setor" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    {setorOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Descrição</Label>
                <Textarea 
                  value={formData.descricao} 
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} 
                  placeholder="Digite a descrição" 
                  className="form-input min-h-[100px]" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Justificativa</Label>
                <Textarea 
                  value={formData.justificativa} 
                  onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })} 
                  placeholder="Digite a justificativa da ordem de compra" 
                  className="form-input min-h-[100px]" 
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Adicionar Item</h3>

              <div className="flex gap-3 mb-4">
                <Button
                  type="button"
                  variant={itemMode === "cadastrado" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setItemMode("cadastrado")}
                >
                  Item Cadastrado
                </Button>
                <Button
                  type="button"
                  variant={itemMode === "manual" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setItemMode("manual")}
                >
                  Digitar Manualmente
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Item</Label>
                  {itemMode === "cadastrado" ? (
                    <Select value={formData.itemCadastrado} onValueChange={(v) => setFormData({ ...formData, itemCadastrado: v })}>
                      <SelectTrigger className="form-input"><SelectValue placeholder="Selecione um item cadastrado" /></SelectTrigger>
                      <SelectContent className="bg-popover">
                        {itensCadastrados.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input value={formData.itemManual} onChange={(e) => setFormData({ ...formData, itemManual: e.target.value })} placeholder="Digite o nome do item" className="form-input" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Marca</Label>
                  <Input value={formData.marca} onChange={(e) => setFormData({ ...formData, marca: e.target.value })} placeholder="Marca" className="form-input" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantidade</Label>
                  <Input type="number" value={formData.quantidade} onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })} placeholder="Qtd" className="form-input" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Especificações</Label>
                  <Input value={formData.especificacoes} onChange={(e) => setFormData({ ...formData, especificacoes: e.target.value })} placeholder="Specs" className="form-input" />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button type="button" onClick={handleAddItem} className="btn-action">Adicionar Item</Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Item</TableHead>
                  <TableHead className="text-center">Origem</TableHead>
                  <TableHead className="text-center">Marca</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
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
                      <TableCell className="text-center">
                        <span className={`text-xs px-2 py-0.5 rounded ${item.itemSource === "cadastrado" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {item.itemSource === "cadastrado" ? "Cadastrado" : "Manual"}
                        </span>
                      </TableCell>
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
