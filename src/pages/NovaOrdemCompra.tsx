import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";

interface ItemOrdem {
  id: number;
  item: string;
  marca: string;
  quantidade: string;
  especificacoes: string;
}

export default function NovaOrdemCompra() {
  const navigate = useNavigate();
  const { isSaving, handleSave } = useSaveWithDelay();
  const [itens, setItens] = useState<ItemOrdem[]>([]);
  const [formData, setFormData] = useState({
    unidade: "", setor: "", descricao: "", justificativa: "", item: "", marca: "", quantidade: "", especificacoes: "",
  });

  const handleAddItem = () => {
    if (!formData.item || !formData.quantidade) return;
    const novoItem: ItemOrdem = { id: Date.now(), item: formData.item, marca: formData.marca, quantidade: formData.quantidade, especificacoes: formData.especificacoes };
    setItens([...itens, novoItem]);
    setFormData({ ...formData, item: "", marca: "", quantidade: "", especificacoes: "" });
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
                <Input 
                  value={formData.unidade} 
                  onChange={(e) => setFormData({ ...formData, unidade: e.target.value })} 
                  placeholder="Digite a unidade" 
                  className="form-input" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Setor</Label>
                <Input 
                  value={formData.setor} 
                  onChange={(e) => setFormData({ ...formData, setor: e.target.value })} 
                  placeholder="Digite o setor" 
                  className="form-input" 
                />
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

            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Item</Label>
                  <Input 
                    value={formData.item} 
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })} 
                    placeholder="Nome do item" 
                    className="form-input" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Marca</Label>
                  <Input 
                    value={formData.marca} 
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })} 
                    placeholder="Marca" 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantidade</Label>
                  <Input 
                    type="number" 
                    value={formData.quantidade} 
                    onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })} 
                    placeholder="Qtd" 
                    className="form-input" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Especificações</Label>
                  <Input 
                    value={formData.especificacoes} 
                    onChange={(e) => setFormData({ ...formData, especificacoes: e.target.value })} 
                    placeholder="Specs" 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button type="button" onClick={handleAddItem} className="btn-action">
                  Adicionar Item
                </Button>
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

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSalvar} className="btn-action px-6" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
              </Button>
              <Button onClick={handleCancelar} variant="destructive" className="btn-destructive px-6" disabled={isSaving}>Cancelar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
