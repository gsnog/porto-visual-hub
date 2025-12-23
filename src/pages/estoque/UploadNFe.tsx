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

        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium text-foreground">Unidade:</label>
            <Select>
              <SelectTrigger className="bg-muted text-foreground h-10 rounded-lg w-40">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unidade1">Unidade 1</SelectItem>
                <SelectItem value="unidade2">Unidade 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium text-foreground">Projeto:</label>
            <Select>
              <SelectTrigger className="bg-muted text-foreground h-10 rounded-lg w-40">
                <SelectValue placeholder="---------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="projeto1">Projeto 1</SelectItem>
                <SelectItem value="projeto2">Projeto 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium text-foreground">Selecione o PDF da NF:</label>
            <Input type="file" accept=".pdf" className="bg-muted text-foreground h-10 px-3 flex-1 rounded-lg file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium text-foreground">Selecione o PDF dos boletos:</label>
            <Input type="file" accept=".pdf" className="bg-muted text-foreground h-10 px-3 flex-1 rounded-lg file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-52 text-sm font-medium text-foreground">Selecione o arquivo XML:</label>
            <Input type="file" accept=".xml" className="bg-muted text-foreground h-10 px-3 flex-1 rounded-lg file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
          </div>

          <div className="pt-4">
            <Button onClick={handleEnviar} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
              Enviar XML
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
