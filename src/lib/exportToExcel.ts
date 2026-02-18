import * as XLSX from 'xlsx';
import { toast } from '@/hooks/use-toast';

/**
 * Exporta dados para arquivo Excel (.xlsx)
 * @param data - Array de objetos com os dados
 * @param fileName - Nome do arquivo (sem extensão)
 * @param sheetName - Nome da aba (padrão: "Dados")
 */
export function exportToExcel(
  data: Record<string, unknown>[],
  fileName: string,
  sheetName = 'Dados'
) {
  if (data.length === 0) {
    toast({
      title: 'Sem dados',
      description: 'Não há dados para exportar.',
      variant: 'destructive',
    });
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);

  toast({
    title: 'Exportado com sucesso!',
    description: `Arquivo "${fileName}.xlsx" gerado com ${data.length} registro(s).`,
  });
}
