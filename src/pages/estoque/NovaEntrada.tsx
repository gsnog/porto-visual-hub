import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SimpleFormWizard } from "@/components/SimpleFormWizard";
import { FormActionBar } from "@/components/FormActionBar";
import { PackagePlus, Trash2, Upload, FileText, ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useSaveWithDelay } from "@/hooks/useSaveWithDelay";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

interface ItemEntrada {
  id: number;
  item: string;
  marca: string;
  quantidade: string;
  custoUnitario: string;
  especificacoes: string;
  tipoItem: "novo" | "existente";
  itemExistenteId?: string;
}

const unidadeOptions = [
  { value: "almoxarifado-sp", label: "Almoxarifado SP" },
  { value: "ti-central", label: "TI Central" },
  { value: "deposito-rj", label: "Depósito RJ" },
];

const operacaoOptions = [
  { value: "compra", label: "Compra" },
  { value: "transferencia", label: "Transferência" },
];

const itensEstoqueMock = [
  { value: "parafuso-m8", label: "Parafuso M8" },
  { value: "parafuso-m10", label: "Parafuso M10" },
  { value: "cabo-hdmi", label: "Cabo HDMI" },
  { value: "oleo-lubrificante", label: "Óleo Lubrificante" },
  { value: "papel-a4", label: "Papel A4" },
];

// Mock fornecedores cadastrados
const fornecedoresCadastrados = [
  "Distribuidora ABC Ltda",
  "Tech Solutions S.A.",
  "Papelaria Express",
];

export default function NovaEntrada() {
  const navigate = useNavigate();
  const { handleSalvar, isSaving } = useSaveWithDelay({
    redirectTo: "/estoque/entradas",
    successMessage: "Entrada enviada para aprovação!",
    successDescription: "A entrada ficará em pré-cadastro até a aprovação do gerente.",
  });

  const handleCancelar = () => navigate("/estoque/entradas");

  const [step, setStep] = useState(1);
  const [modoEntrada, setModoEntrada] = useState<"manual" | "xml">("manual");
  const [itens, setItens] = useState<ItemEntrada[]>([]);
  const [itemForm, setItemForm] = useState({ item: "", marca: "", quantidade: "", custoUnitario: "", especificacoes: "" });

  const [estoqueOrigem, setEstoqueOrigem] = useState("");
  const [estoqueDestino, setEstoqueDestino] = useState("");
  const [operacao, setOperacao] = useState("");
  const [nfNumero, setNfNumero] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [fornecedorXml, setFornecedorXml] = useState("");
  const [xmlImported, setXmlImported] = useState(false);

  const handleAddItem = () => {
    if (!itemForm.item || !itemForm.quantidade) {
      toast({ title: "Campos obrigatórios", description: "Informe o item e a quantidade.", variant: "destructive" });
      return;
    }
    setItens([...itens, { id: Date.now(), ...itemForm, tipoItem: "novo" }]);
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

  const handleNextStep = () => {
    if (itens.length === 0) {
      toast({ title: "Adicione itens", description: "Adicione pelo menos um item antes de prosseguir.", variant: "destructive" });
      return;
    }
    setStep(2);
  };

  const updateItemType = (id: number, tipo: "novo" | "existente") => {
    setItens(prev => prev.map(i => i.id === id ? { ...i, tipoItem: tipo, itemExistenteId: tipo === "novo" ? undefined : i.itemExistenteId } : i));
  };

  const updateItemExistente = (id: number, existenteId: string) => {
    setItens(prev => prev.map(i => i.id === id ? { ...i, itemExistenteId: existenteId } : i));
  };

  const handleXmlUpload = () => {
    if (!xmlFile) {
      toast({ title: "Selecione um arquivo", description: "Escolha um arquivo XML para importar.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const parseError = xmlDoc.querySelector("parsererror");
        if (parseError) {
          toast({ title: "Erro no XML", description: "O arquivo XML não é válido.", variant: "destructive" });
          return;
        }

        const ns = "http://www.portalfiscal.inf.br/nfe";
        let infNFe = xmlDoc.getElementsByTagNameNS(ns, "infNFe")[0];
        if (!infNFe) infNFe = xmlDoc.querySelector("infNFe");

        if (!infNFe) {
          toast({ title: "XML não reconhecido", description: "Não foi possível encontrar dados de NF-e no arquivo.", variant: "destructive" });
          return;
        }

        const ide = infNFe.getElementsByTagNameNS(ns, "ide")[0] || infNFe.querySelector("ide");
        const emit = infNFe.getElementsByTagNameNS(ns, "emit")[0] || infNFe.querySelector("emit");
        const cobr = infNFe.getElementsByTagNameNS(ns, "cobr")[0] || infNFe.querySelector("cobr");

        if (ide) {
          const nNF = (ide.getElementsByTagNameNS(ns, "nNF")[0] || ide.querySelector("nNF"))?.textContent || "";
          const dhEmi = (ide.getElementsByTagNameNS(ns, "dhEmi")[0] || ide.querySelector("dhEmi"))?.textContent || "";
          if (nNF) setNfNumero(nNF);
          if (dhEmi) {
            const dateStr = dhEmi.substring(0, 10);
            setDataEmissao(dateStr);
            setDataEntrada(dateStr);
          }
        }

        if (emit) {
          const xNome = (emit.getElementsByTagNameNS(ns, "xNome")[0] || emit.querySelector("xNome"))?.textContent || "";
          if (xNome) {
            setFornecedorXml(xNome);
            // Auto-register supplier if not found
            const found = fornecedoresCadastrados.some(
              f => f.toLowerCase() === xNome.toLowerCase()
            );
            if (!found) {
              fornecedoresCadastrados.push(xNome);
              toast({ title: "Fornecedor cadastrado", description: `"${xNome}" foi adicionado automaticamente ao cadastro de fornecedores.` });
            }
          }
        }

        if (cobr) {
          const dup = cobr.getElementsByTagNameNS(ns, "dup")[0] || cobr.querySelector("dup");
          if (dup) {
            const dVenc = (dup.getElementsByTagNameNS(ns, "dVenc")[0] || dup.querySelector("dVenc"))?.textContent || "";
            if (dVenc) setDataVencimento(dVenc);
          }
        }

        setOperacao("compra");

        const detElements = infNFe.getElementsByTagNameNS(ns, "det");
        const detFallback = detElements.length > 0 ? detElements : infNFe.querySelectorAll("det");
        const parsedItens: ItemEntrada[] = [];

        for (let i = 0; i < detFallback.length; i++) {
          const det = detFallback[i];
          const prod = det.getElementsByTagNameNS(ns, "prod")[0] || det.querySelector("prod");
          if (!prod) continue;

          const getVal = (tag: string) => (prod.getElementsByTagNameNS(ns, tag)[0] || prod.querySelector(tag))?.textContent || "";

          const xProd = getVal("xProd");
          const qCom = getVal("qCom");
          const vUnCom = getVal("vUnCom");
          const cProd = getVal("cProd");
          const uCom = getVal("uCom");

          parsedItens.push({
            id: Date.now() + i,
            item: xProd,
            marca: "",
            quantidade: qCom ? parseFloat(qCom).toString() : "0",
            custoUnitario: vUnCom ? `R$ ${parseFloat(vUnCom).toFixed(2).replace(".", ",")}` : "R$ 0,00",
            especificacoes: [cProd ? `Cód: ${cProd}` : "", uCom ? `Un: ${uCom}` : ""].filter(Boolean).join(" • "),
            tipoItem: "novo",
          });
        }

        if (parsedItens.length > 0) {
          setItens(parsedItens);
          setXmlImported(true);
          toast({ title: "XML importado com sucesso", description: `${parsedItens.length} iten(s) e dados da nota preenchidos automaticamente.` });
        } else {
          toast({ title: "Nenhum item encontrado", description: "O XML foi lido mas não contém itens (det/prod).", variant: "destructive" });
        }
      } catch (err) {
        console.error("Erro ao parsear XML:", err);
        toast({ title: "Erro ao processar XML", description: "Não foi possível ler o arquivo.", variant: "destructive" });
      }
    };
    reader.readAsText(xmlFile);
  };

  const isFieldLocked = xmlImported && modoEntrada === "xml";

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
                <h2 className="text-xl font-semibold text-foreground">
                  {step === 1 ? "Dados da Entrada" : "Classificação de Itens"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {step === 1 ? "Passo 1: Preencha os dados e adicione os itens" : "Passo 2: Classifique cada item como novo ou existente no estoque"}
                </p>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${step === 1 ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}>1</div>
              <div className="flex-1 h-0.5 bg-border" />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${step === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
            </div>

            {step === 1 && (
              <>
                {/* Modo de Entrada */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Modo de Cadastro da Nota</Label>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant={modoEntrada === "manual" ? "default" : "outline"}
                      className="gap-2 flex-1"
                      onClick={() => setModoEntrada("manual")}
                    >
                      <FileText className="w-4 h-4" /> Cadastrar Manualmente
                    </Button>
                    <Button
                      type="button"
                      variant={modoEntrada === "xml" ? "default" : "outline"}
                      className="gap-2 flex-1"
                      onClick={() => setModoEntrada("xml")}
                    >
                      <Upload className="w-4 h-4" /> Importar XML
                    </Button>
                  </div>
                </div>

                {modoEntrada === "xml" && (
                  <div className="space-y-3 p-4 border border-dashed border-border rounded bg-muted/30">
                    <Label className="text-sm font-medium">Arquivo XML da Nota Fiscal</Label>
                    <div className="flex gap-3 items-end">
                      <Input type="file" accept=".xml" onChange={(e) => setXmlFile(e.target.files?.[0] || null)} className="form-input file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                      <Button type="button" onClick={handleXmlUpload} className="gap-2">
                        <Upload className="w-4 h-4" /> Importar
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Os campos e itens serão preenchidos automaticamente a partir do XML</p>
                    {fornecedorXml && (
                      <p className="text-sm text-foreground mt-2">Fornecedor: <strong>{fornecedorXml}</strong></p>
                    )}
                    {isFieldLocked && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Campos preenchidos pelo XML estão bloqueados para edição</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Data <span className="text-destructive">*</span></Label>
                    <Input type="date" value={dataEntrada} onChange={(e) => setDataEntrada(e.target.value)} className="form-input" readOnly={isFieldLocked && !!dataEntrada} disabled={isFieldLocked && !!dataEntrada} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Operação <span className="text-destructive">*</span></Label>
                    <Select value={operacao} onValueChange={setOperacao} disabled={isFieldLocked && !!operacao}>
                      <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a operação" /></SelectTrigger>
                      <SelectContent className="bg-popover">
                        {operacaoOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {operacao === "transferencia" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Estoque de Origem</Label>
                      <Select value={estoqueOrigem} onValueChange={setEstoqueOrigem}>
                        <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a unidade" /></SelectTrigger>
                        <SelectContent className="bg-popover">
                          {unidadeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Estoque de Destino <span className="text-destructive">*</span></Label>
                      <Select value={estoqueDestino} onValueChange={setEstoqueDestino}>
                        <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a unidade" /></SelectTrigger>
                        <SelectContent className="bg-popover">
                          {unidadeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {operacao === "compra" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Estoque de Destino <span className="text-destructive">*</span></Label>
                      <Select value={estoqueDestino} onValueChange={setEstoqueDestino}>
                        <SelectTrigger className="form-input"><SelectValue placeholder="Selecione a unidade" /></SelectTrigger>
                        <SelectContent className="bg-popover">
                          {unidadeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nota Fiscal <span className="text-destructive">*</span></Label>
                    <Input type="text" value={nfNumero} onChange={(e) => setNfNumero(e.target.value)} placeholder="Número da NF" className="form-input" readOnly={isFieldLocked && !!nfNumero} disabled={isFieldLocked && !!nfNumero} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Data de Emissão</Label>
                    <Input type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} className="form-input" readOnly={isFieldLocked && !!dataEmissao} disabled={isFieldLocked && !!dataEmissao} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Data de Vencimento</Label>
                    <Input type="date" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} className="form-input" readOnly={isFieldLocked && !!dataVencimento} disabled={isFieldLocked && !!dataVencimento} />
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
                    <Textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} className="form-input min-h-[80px]" placeholder="Observações sobre a entrada..." />
                  </div>
                </div>

                {modoEntrada === "manual" && (
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
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Item</TableHead>
                      <TableHead className="text-center">Marca</TableHead>
                      <TableHead className="text-center">Quantidade</TableHead>
                      <TableHead className="text-center">Custo Unitário</TableHead>
                      <TableHead className="text-center">Especificações</TableHead>
                      {!isFieldLocked && <TableHead className="text-center">Ações</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itens.length === 0 ? (
                      <TableRow><TableCell colSpan={isFieldLocked ? 5 : 6} className="text-center text-muted-foreground">Nenhum item adicionado</TableCell></TableRow>
                    ) : (
                      itens.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="text-center">{item.item}</TableCell>
                          <TableCell className="text-center">{item.marca}</TableCell>
                          <TableCell className="text-center">{item.quantidade}</TableCell>
                          <TableCell className="text-center">{item.custoUnitario}</TableCell>
                          <TableCell className="text-center">{item.especificacoes}</TableCell>
                          {!isFieldLocked && (
                            <TableCell className="text-center">
                              <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)} className="text-destructive hover:text-destructive"><Trash2 size={16} /></Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={handleCancelar}>Cancelar</Button>
                  <Button onClick={handleNextStep} className="gap-2">Próximo <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-sm text-muted-foreground">Para cada item, indique se é um <strong>item novo</strong> no estoque ou se deseja <strong>conciliar com um item existente</strong>.</p>
                <div className="space-y-4">
                  {itens.map((item) => (
                    <Card key={item.id} className="border-border">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{item.item}</p>
                            <p className="text-xs text-muted-foreground">{item.marca} • Qtd: {item.quantidade} • {item.custoUnitario}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <RadioGroup value={item.tipoItem} onValueChange={(v) => updateItemType(item.id, v as "novo" | "existente")} className="flex gap-4">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="novo" id={`novo-${item.id}`} />
                                <Label htmlFor={`novo-${item.id}`} className="text-sm cursor-pointer">Item Novo</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="existente" id={`existente-${item.id}`} />
                                <Label htmlFor={`existente-${item.id}`} className="text-sm cursor-pointer">Item Existente</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          {item.tipoItem === "existente" && (
                            <div className="min-w-[200px]">
                              <Select value={item.itemExistenteId || ""} onValueChange={(v) => updateItemExistente(item.id, v)}>
                                <SelectTrigger><SelectValue placeholder="Selecione o item" /></SelectTrigger>
                                <SelectContent className="bg-popover">
                                  {itensEstoqueMock.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</Button>
                  <FormActionBar onSave={handleSalvar} onCancel={handleCancelar} isSaving={isSaving} saveLabel="Enviar para Aprovação" />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </SimpleFormWizard>
  );
}
