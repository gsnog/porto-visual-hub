import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Cadastro() {
  // classes reutilizáveis
  const inputClass =
    "bg-[#efefef] placeholder:text-[#22265B] placeholder:opacity-100"
  const selectTriggerClass = "bg-[#efefef]"
  const selectValueClass = "data-[placeholder]:text-[#22265B]"

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeCompleto">Nome Completo (igual no RG)</Label>
                <Input id="nomeCompleto" placeholder="Nome Completo (igual no RG)" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input id="dataNascimento" type="date" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomePai">Nome do Pai</Label>
                <Input id="nomePai" placeholder="Nome do Pai" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomeMae">Nome da Mãe</Label>
                <Input id="nomeMae" placeholder="Nome da Mãe" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Sexo</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado Civil</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                    <SelectItem value="casado">Casado(a)</SelectItem>
                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                    <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="identidade">Identidade de Gênero</Label>
                <Input id="identidade" placeholder="Identidade de Gênero" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Raça/Cor</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branca">Branca</SelectItem>
                    <SelectItem value="preta">Preta</SelectItem>
                    <SelectItem value="parda">Parda</SelectItem>
                    <SelectItem value="amarela">Amarela</SelectItem>
                    <SelectItem value="indigena">Indígena</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grau de Instrução</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                    <SelectItem value="medio">Ensino Médio</SelectItem>
                    <SelectItem value="superior">Ensino Superior</SelectItem>
                    <SelectItem value="pos">Pós-graduação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Nacionalidade</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brasileira">Brasileira</SelectItem>
                    <SelectItem value="estrangeira">Estrangeira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Aposentado</Label>
                <RadioGroup defaultValue="nao" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="aposentado-sim" />
                    <Label htmlFor="aposentado-sim">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="aposentado-nao" />
                    <Label htmlFor="aposentado-nao">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Você é uma pessoa com deficiência?</Label>
                <RadioGroup defaultValue="nao" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="deficiencia-sim" />
                    <Label htmlFor="deficiencia-sim">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="deficiencia-nao" />
                    <Label htmlFor="deficiencia-nao">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sao-paulo">São Paulo</SelectItem>
                    <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Residência no Exterior?</Label>
                <RadioGroup defaultValue="nao" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="exterior-sim" />
                    <Label htmlFor="exterior-sim">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="exterior-nao" />
                    <Label htmlFor="exterior-nao">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações de Diversidade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Informações de Diversidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Autodeclaração de Uso de Dados</Label>
              <Select>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Selecionar" className={selectValueClass} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aceito">Aceito</SelectItem>
                  <SelectItem value="nao-aceito">Não Aceito</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Você pertence à comunidade LGBTQIA+?</Label>
              <RadioGroup defaultValue="nao" className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="lgbtqia-sim" />
                  <Label htmlFor="lgbtqia-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="lgbtqia-nao" />
                  <Label htmlFor="lgbtqia-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Você é uma pessoa neuro divergente?</Label>
              <RadioGroup defaultValue="nao" className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="neuro-sim" />
                  <Label htmlFor="neuro-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="neuro-nao" />
                  <Label htmlFor="neuro-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Você tem filho(s)?</Label>
              <RadioGroup defaultValue="nao" className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="filhos-sim" />
                  <Label htmlFor="filhos-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="filhos-nao" />
                  <Label htmlFor="filhos-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="celular">Celular</Label>
                <Input id="celular" placeholder="Celular" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="E-mail" className={inputClass} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" placeholder="Endereço" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input id="numero" placeholder="Número" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input id="complemento" placeholder="Complemento" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="CEP" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sao-paulo">São Paulo</SelectItem>
                    <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input id="bairro" placeholder="Bairro" className={inputClass} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados bancários */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Dados bancários</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Banco</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">Banco do Brasil</SelectItem>
                    <SelectItem value="104">Caixa Econômica</SelectItem>
                    <SelectItem value="237">Bradesco</SelectItem>
                    <SelectItem value="341">Itaú</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo da Conta</Label>
                <Select>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Selecionar" className={selectValueClass} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Conta Corrente</SelectItem>
                    <SelectItem value="poupanca">Conta Poupança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agencia">Agência</Label>
                <Input id="agencia" placeholder="Agência" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conta">Conta</Label>
                <Input id="conta" placeholder="Conta" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="digito">Dígito</Label>
                <Input id="digito" placeholder="Dígito" className={inputClass} />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Caso não possua conta bancária na sua região, será direcionado(a)
              para banco mais perto para abertura da conta.
            </p>
          </CardContent>
        </Card>

        {/* Botões */}
        <div className="flex gap-4 justify-end">
          <Button variant="outline" className="px-8">
            Cancelar
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
