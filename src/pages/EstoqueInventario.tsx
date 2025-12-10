import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EstoqueInventario() {
  const inputClass =
    "bg-[#efefef] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg"
  const selectTriggerClass = "bg-[#efefef] text-black placeholder:text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg"
  const selectValueClass =
    "data-[placeholder]:!text-[#22265B] data-[placeholder]:opacity-100"

  const rowBase =
    "bg-white text-black transition-colors hover:bg-[#22265B] hover:text-white"

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Inventário</h1>
        </div>

        <div className="flex gap-4 items-center">
          <Input placeholder="Nome do Item" className="bg-[#efefef] !text-[#22265B] placeholder:!text-[#22265B] placeholder:opacity-100 h-10 px-3 w-64 rounded-lg" />

          <Select>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Cidade" className="!text-[#22265B]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sao-paulo">São Paulo</SelectItem>
              <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
            </SelectContent>
          </Select>

          <Button className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
            Filtrar
          </Button>
        </div>

        <div className="rounded-lg overflow-hidden border border-[#E3E3E3]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E3E3E3] hover:bg-[#E3E3E3] hover:text-black cursor-default select-none">
                <TableHead className="!text-black font-medium">Item</TableHead>
                <TableHead className="!text-black font-medium">Quantidade</TableHead>
                <TableHead className="!text-black font-medium">Unidade</TableHead>
                <TableHead className="!text-black font-medium">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className={rowBase}>
                <TableCell>999</TableCell>
                <TableCell>1</TableCell>
                <TableCell>xxxxxxxxxx</TableCell>
                <TableCell>
                  <Button size="sm" className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs">
                    Ações
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow className={rowBase}>
                <TableCell>Cabo HDMI</TableCell>
                <TableCell>3</TableCell>
                <TableCell>un</TableCell>
                <TableCell>
                  <Button size="sm" className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs">
                    Ações
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}