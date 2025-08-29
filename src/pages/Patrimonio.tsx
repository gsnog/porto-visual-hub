import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Patrimonio = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Detalhes do Patrimônio</h1>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data:</label>
                  <p className="text-lg font-semibold">30/01/2025</p>
                </div>
              </div>

              <hr className="border-muted" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Código:</label>
                  <p className="text-lg font-semibold">0001</p>
                </div>
              </div>

              <hr className="border-muted" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Produto:</label>
                  <p className="text-lg font-semibold">Automóvel</p>
                </div>
              </div>

              <hr className="border-muted" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Valor:</label>
                  <p className="text-lg font-semibold">R$ 1.000,00</p>
                </div>
              </div>

              <hr className="border-muted" />

              <div className="flex gap-4 justify-center mt-8">
                <Button variant="default">Editar</Button>
                <Button variant="default">Voltar</Button>
                <Button variant="destructive">Excluir</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Patrimonio