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
    <div className="space-y-6">
      <div className="space-y-4 max-w-2xl">
        <div className="form-row">
          <label className="form-label">Unidade</label>
          <Select>
            <SelectTrigger className="form-input w-40">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="unidade1">Unidade 1</SelectItem>
              <SelectItem value="unidade2">Unidade 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Projeto</label>
          <Select>
            <SelectTrigger className="form-input w-40">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="projeto1">Projeto 1</SelectItem>
              <SelectItem value="projeto2">Projeto 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-row">
          <label className="form-label">Selecione o PDF da NF</label>
          <Input type="file" accept=".pdf" className="form-input w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </div>

        <div className="form-row">
          <label className="form-label">Selecione o PDF dos boletos</label>
          <Input type="file" accept=".pdf" className="form-input w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </div>

        <div className="form-row">
          <label className="form-label">Selecione o arquivo XML</label>
          <Input type="file" accept=".xml" className="form-input w-64 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleEnviar} className="btn-action px-6">Enviar XML</Button>
          <Button onClick={() => navigate("/estoque/entradas")} variant="destructive" className="btn-destructive px-6">Voltar</Button>
        </div>
      </div>
    </div>
  )
}
