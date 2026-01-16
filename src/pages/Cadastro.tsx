import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export default function Cadastro() {
  const navigate = useNavigate()

  const handleSalvar = () => {
    // Logic to save user
    navigate("/")
  }

  const handleCancelar = () => {
    navigate("/")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="space-y-6 max-w-4xl">
        {/* Dados Pessoais */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Nome Completo</Label>
                <Input placeholder="Nome Completo (igual no RG)" className="form-input flex-1" />
              </div>
              <div className="form-row">
                <Label className="form-label">Data de Nascimento</Label>
                <Input type="date" className="form-input flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Nome do Pai</Label>
                <Input placeholder="Nome do Pai" className="form-input flex-1" />
              </div>
              <div className="form-row">
                <Label className="form-label">Nome da Mãe</Label>
                <Input placeholder="Nome da Mãe" className="form-input flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-row">
                <Label className="form-label">Sexo</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-row">
                <Label className="form-label">Estado Civil</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                    <SelectItem value="casado">Casado(a)</SelectItem>
                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                    <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-row">
                <Label className="form-label">Identidade de Gênero</Label>
                <Input placeholder="Identidade de Gênero" className="form-input flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Raça/Cor</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="branca">Branca</SelectItem>
                    <SelectItem value="preta">Preta</SelectItem>
                    <SelectItem value="parda">Parda</SelectItem>
                    <SelectItem value="amarela">Amarela</SelectItem>
                    <SelectItem value="indigena">Indígena</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-row">
                <Label className="form-label">Grau de Instrução</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                    <SelectItem value="medio">Ensino Médio</SelectItem>
                    <SelectItem value="superior">Ensino Superior</SelectItem>
                    <SelectItem value="pos">Pós-graduação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-row">
                <Label className="form-label">Nacionalidade</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="brasileira">Brasileira</SelectItem>
                    <SelectItem value="estrangeira">Estrangeira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Label className="form-label">Aposentado</Label>
                <RadioGroup defaultValue="nao" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="aposentado-sim" />
                    <Label htmlFor="aposentado-sim" className="text-sm">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="aposentado-nao" />
                    <Label htmlFor="aposentado-nao" className="text-sm">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-row">
                <Label className="form-label">Estado</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Label className="form-label text-xs">Pessoa com deficiência?</Label>
                <RadioGroup defaultValue="nao" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="deficiencia-sim" />
                    <Label htmlFor="deficiencia-sim" className="text-sm">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="deficiencia-nao" />
                    <Label htmlFor="deficiencia-nao" className="text-sm">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Cidade</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="sao-paulo">São Paulo</SelectItem>
                    <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Label className="form-label">Residência no Exterior?</Label>
                <RadioGroup defaultValue="nao" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="exterior-sim" />
                    <Label htmlFor="exterior-sim" className="text-sm">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="exterior-nao" />
                    <Label htmlFor="exterior-nao" className="text-sm">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações de Diversidade */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">Informações de Diversidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="form-row">
              <Label className="form-label">Autodeclaração de Uso de Dados</Label>
              <Select>
                <SelectTrigger className="form-input w-48">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="aceito">Aceito</SelectItem>
                  <SelectItem value="nao-aceito">Não Aceito</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="form-label">Você pertence à comunidade LGBTQIA+?</Label>
              <RadioGroup defaultValue="nao" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="lgbtqia-sim" />
                  <Label htmlFor="lgbtqia-sim" className="text-sm">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="lgbtqia-nao" />
                  <Label htmlFor="lgbtqia-nao" className="text-sm">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center gap-4">
              <Label className="form-label">Você é uma pessoa neurodivergente?</Label>
              <RadioGroup defaultValue="nao" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="neuro-sim" />
                  <Label htmlFor="neuro-sim" className="text-sm">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="neuro-nao" />
                  <Label htmlFor="neuro-nao" className="text-sm">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center gap-4">
              <Label className="form-label">Você tem filho(s)?</Label>
              <RadioGroup defaultValue="nao" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="filhos-sim" />
                  <Label htmlFor="filhos-sim" className="text-sm">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="filhos-nao" />
                  <Label htmlFor="filhos-nao" className="text-sm">Não</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Celular</Label>
                <Input placeholder="(00) 00000-0000" className="form-input flex-1" />
              </div>
              <div className="form-row">
                <Label className="form-label">E-mail</Label>
                <Input type="email" placeholder="email@exemplo.com" className="form-input flex-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Endereço</Label>
                <Input placeholder="Rua, Avenida..." className="form-input flex-1" />
              </div>
              <div className="form-row">
                <Label className="form-label">Número</Label>
                <Input placeholder="Nº" className="form-input w-24" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Complemento</Label>
                <Input placeholder="Apto, Bloco..." className="form-input flex-1" />
              </div>
              <div className="form-row">
                <Label className="form-label">CEP</Label>
                <Input placeholder="00000-000" className="form-input w-32" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-row">
                <Label className="form-label">Estado</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-row">
                <Label className="form-label">Cidade</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="sao-paulo">São Paulo</SelectItem>
                    <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-row">
                <Label className="form-label">Bairro</Label>
                <Input placeholder="Bairro" className="form-input flex-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados bancários */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">Dados Bancários</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Banco</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="001">Banco do Brasil</SelectItem>
                    <SelectItem value="104">Caixa Econômica</SelectItem>
                    <SelectItem value="237">Bradesco</SelectItem>
                    <SelectItem value="341">Itaú</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-row">
                <Label className="form-label">Tipo da Conta</Label>
                <Select>
                  <SelectTrigger className="form-input flex-1">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="corrente">Conta Corrente</SelectItem>
                    <SelectItem value="poupanca">Conta Poupança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-row">
                <Label className="form-label">Agência</Label>
                <Input placeholder="0000" className="form-input w-24" />
              </div>
              <div className="form-row">
                <Label className="form-label">Conta</Label>
                <Input placeholder="00000-0" className="form-input w-32" />
              </div>
              <div className="form-row">
                <Label className="form-label">Dígito</Label>
                <Input placeholder="0" className="form-input w-16" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Caso não possua conta bancária na sua região, será direcionado(a)
              para o banco mais perto para abertura da conta.
            </p>
          </CardContent>
        </Card>

        {/* Documentos */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">Documentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">CPF</Label>
                <Input placeholder="000.000.000-00" className="form-input flex-1" />
              </div>
              <div className="form-row">
                <Label className="form-label">RG</Label>
                <Input placeholder="00.000.000-0" className="form-input flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Órgão Expedidor</Label>
                <Input placeholder="SSP" className="form-input w-24" />
              </div>
              <div className="form-row">
                <Label className="form-label">UF Expedidor</Label>
                <Select>
                  <SelectTrigger className="form-input w-24">
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="sp">SP</SelectItem>
                    <SelectItem value="rj">RJ</SelectItem>
                    <SelectItem value="mg">MG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Data de Expedição</Label>
                <Input type="date" className="form-input w-40" />
              </div>
              <div className="form-row">
                <Label className="form-label">PIS/PASEP</Label>
                <Input placeholder="000.00000.00-0" className="form-input flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">CTPS</Label>
                <Input placeholder="Número CTPS" className="form-input flex-1" />
              </div>
              <div className="form-row">
                <Label className="form-label">Série CTPS</Label>
                <Input placeholder="Série" className="form-input w-24" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">UF CTPS</Label>
                <Select>
                  <SelectTrigger className="form-input w-24">
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="sp">SP</SelectItem>
                    <SelectItem value="rj">RJ</SelectItem>
                    <SelectItem value="mg">MG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-row">
                <Label className="form-label">Data de Expedição CTPS</Label>
                <Input type="date" className="form-input w-40" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Título de Eleitor</Label>
                <Input placeholder="Número do Título" className="form-input flex-1" />
              </div>
              <div className="form-row">
                <Label className="form-label">Zona Eleitoral</Label>
                <Input placeholder="Zona" className="form-input w-24" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Seção Eleitoral</Label>
                <Input placeholder="Seção" className="form-input w-24" />
              </div>
              <div className="form-row">
                <Label className="form-label">CNH</Label>
                <Input placeholder="Número CNH" className="form-input flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-row">
                <Label className="form-label">Categoria CNH</Label>
                <Select>
                  <SelectTrigger className="form-input w-24">
                    <SelectValue placeholder="Cat." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="a">A</SelectItem>
                    <SelectItem value="b">B</SelectItem>
                    <SelectItem value="ab">AB</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="d">D</SelectItem>
                    <SelectItem value="e">E</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-row">
                <Label className="form-label">Validade CNH</Label>
                <Input type="date" className="form-input w-40" />
              </div>
            </div>

            <div className="form-row">
              <Label className="form-label">Reservista</Label>
              <Input placeholder="Número do Certificado" className="form-input w-64" />
            </div>
          </CardContent>
        </Card>

        {/* Botões */}
        <div className="flex gap-3 pt-2 pb-6">
          <Button 
            onClick={handleSalvar}
            className="btn-action px-8"
          >
            Salvar
          </Button>
          <Button 
            onClick={handleCancelar}
            variant="destructive"
            className="btn-destructive px-8"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
