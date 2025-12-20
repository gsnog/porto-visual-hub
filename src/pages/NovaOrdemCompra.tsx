import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface ItemOrdem {
  id: number;
  item: string;
  marca: string;
  quantidade: string;
  especificacoes: string;
}

export default function NovaOrdemCompra() {
  const navigate = useNavigate();
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
  const handleSalvar = () => navigate("/estoque/ordem-compra");
  const handleCancelar = () => navigate("/estoque/ordem-compra");

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Nova Ordem de Compra</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="unidade">Unidade</Label>
            <Input id="unidade" value={formData.unidade} onChange={(e) => setFormData({ ...formData, unidade: e.target.value })} placeholder="Digite a unidade" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="setor">Setor</Label>
            <Input id="setor" value={formData.setor} onChange={(e) => setFormData({ ...formData, setor: e.target.value })} placeholder="Digite o setor" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea id="descricao" value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} placeholder="Digite a descrição" rows={3} className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 px-3 rounded-lg" />
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item">Item</Label>
              <Input id="item" value={formData.item} onChange={(e) => setFormData({ ...formData, item: e.target.value })} placeholder="Nome do item" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input id="marca" value={formData.marca} onChange={(e) => setFormData({ ...formData, marca: e.target.value })} placeholder="Marca" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input id="quantidade" type="number" value={formData.quantidade} onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })} placeholder="Qtd" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="especificacoes">Especificações</Label>
              <Input id="especificacoes" value={formData.especificacoes} onChange={(e) => setFormData({ ...formData, especificacoes: e.target.value })} placeholder="Specs" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 rounded-lg" />
            </div>
          </div>
          <Button type="button" onClick={handleAddItem} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Adicionar</Button>
        </div>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#3a3f5c] hover:bg-[#3a3f5c] cursor-default select-none">
                <TableHead className="!text-white font-medium text-center">Item</TableHead>
                <TableHead className="!text-white font-medium text-center">Marca</TableHead>
                <TableHead className="!text-white font-medium text-center">Quantidade</TableHead>
                <TableHead className="!text-white font-medium text-center">Especificações</TableHead>
                <TableHead className="!text-white font-medium text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itens.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Nenhum item adicionado</TableCell></TableRow>
              ) : (
                itens.map((item) => (
                  <TableRow key={item.id} className="bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white">
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
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleSalvar} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">Salvar</Button>
          <Button variant="outline" onClick={handleCancelar} className="rounded-lg border-primary text-primary hover:bg-primary/10">Cancelar</Button>
        </div>
      </div>
    </div>
  );
}