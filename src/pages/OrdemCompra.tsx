import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Trash2 } from "lucide-react";

interface ItemOrdem {
  id: number;
  item: string;
  marca: string;
  quantidade: string;
  especificacoes: string;
}

export default function OrdemCompra() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itens, setItens] = useState<ItemOrdem[]>([]);
  const [formData, setFormData] = useState({
    unidade: "",
    setor: "",
    descricao: "",
    justificativa: "",
    item: "",
    marca: "",
    quantidade: "",
    especificacoes: "",
  });

  const handleAddItem = () => {
    if (!formData.item || !formData.quantidade) return;
    
    const novoItem: ItemOrdem = {
      id: Date.now(),
      item: formData.item,
      marca: formData.marca,
      quantidade: formData.quantidade,
      especificacoes: formData.especificacoes,
    };
    
    setItens([...itens, novoItem]);
    setFormData({
      ...formData,
      item: "",
      marca: "",
      quantidade: "",
      especificacoes: "",
    });
  };

  const handleRemoveItem = (id: number) => {
    setItens(itens.filter((item) => item.id !== id));
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setItens([]);
    setFormData({
      unidade: "",
      setor: "",
      descricao: "",
      justificativa: "",
      item: "",
      marca: "",
      quantidade: "",
      especificacoes: "",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ordem de Compra</h1>

      {/* Botões de ação */}
      <div className="flex flex-wrap items-center gap-3">
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsDialogOpen(true)}
        >
          Nova Ordem
        </Button>
        <Button variant="outline">Relatório</Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-48">
          <Select>
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Input type="date" className="w-40 rounded-lg" />
        </div>

        <Button className="gap-2">
          <Search size={16} />
          Filtrar
        </Button>
      </div>

      {/* Paginação info */}
      <p className="text-sm text-muted-foreground">Página 1 de 1.</p>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Data de Compra</TableHead>
              <TableHead>Data de Entrega</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Requisitante</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Gestor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Status da Compra</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>19/12/2024</TableCell>
              <TableCell>20/12/2024</TableCell>
              <TableCell>25/12/2024</TableCell>
              <TableCell>Papel A4</TableCell>
              <TableCell>Chamex</TableCell>
              <TableCell>100</TableCell>
              <TableCell>João Silva</TableCell>
              <TableCell>Resma</TableCell>
              <TableCell>Administrativo</TableCell>
              <TableCell>Maria Santos</TableCell>
              <TableCell>Aprovado</TableCell>
              <TableCell>Em Processo</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Ações
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Dialog Nova Ordem */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nova Ordem de Compra</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Campos do formulário */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unidade">Unidade</Label>
                <Input
                  id="unidade"
                  value={formData.unidade}
                  onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                  placeholder="Digite a unidade"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="setor">Setor</Label>
                <Input
                  id="setor"
                  value={formData.setor}
                  onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                  placeholder="Digite o setor"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Digite a descrição"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="justificativa">Justificativa</Label>
              <Textarea
                id="justificativa"
                value={formData.justificativa}
                onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
                placeholder="Digite a justificativa"
                rows={3}
              />
            </div>

            {/* Seção de adicionar itens */}
            <div className="border-t pt-4 space-y-4">
              <h3 className="font-semibold">Adicionar Item</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item">Item</Label>
                  <Input
                    id="item"
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                    placeholder="Nome do item"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marca">Marca</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    placeholder="Marca do item"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={formData.quantidade}
                    onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                    placeholder="Quantidade"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="especificacoes">Especificações</Label>
                  <Input
                    id="especificacoes"
                    value={formData.especificacoes}
                    onChange={(e) => setFormData({ ...formData, especificacoes: e.target.value })}
                    placeholder="Especificações do item"
                  />
                </div>
              </div>

              <Button 
                type="button" 
                onClick={handleAddItem}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Adicionar
              </Button>
            </div>

            {/* Tabela de itens adicionados */}
            <div className="space-y-2">
              <h3 className="font-semibold">Itens</h3>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Marca</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Especificações</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          Nenhum item adicionado
                        </TableCell>
                      </TableRow>
                    ) : (
                      itens.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.item}</TableCell>
                          <TableCell>{item.marca}</TableCell>
                          <TableCell>{item.quantidade}</TableCell>
                          <TableCell>{item.especificacoes}</TableCell>
                          <TableCell>
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
              </div>
            </div>

            {/* Botões de ação do dialog */}
            <div className="flex gap-3 pt-4 border-t">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Salvar
              </Button>
              <Button variant="secondary" onClick={handleCloseDialog}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
