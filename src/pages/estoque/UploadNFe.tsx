import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

export default function UploadNFe() {
  const navigate = useNavigate()

  const handleEnviar = () => {
    navigate("/estoque/entradas")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Upload de Nota Fiscal Eletrônica (XML)</h1>

        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-52">Unidade</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-40 border border-[#22265B]">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unidade1">Unidade 1</SelectItem>
                <SelectItem value="unidade2">Unidade 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-52">Projeto</label>
            <Select>
              <SelectTrigger className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg w-40 border border-[#22265B]">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="projeto1">Projeto 1</SelectItem>
                <SelectItem value="projeto2">Projeto 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-52">Selecione o PDF da NF</label>
            <Input type="file" accept=".pdf" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-52">Selecione o PDF dos boletos</label>
            <Input type="file" accept=".pdf" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
          </div>

          <div className="flex items-center gap-8">
            <label className="text-foreground font-medium w-52">Selecione o arquivo XML</label>
            <Input type="file" accept=".xml" className="bg-[#efefef] !text-[#22265B] h-10 px-3 rounded-lg border border-[#22265B] w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleEnviar}
              className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              Enviar XML
            </Button>
            <Button 
              onClick={() => navigate("/estoque/entradas")}
              variant="destructive"
              className="rounded-lg px-6"
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
