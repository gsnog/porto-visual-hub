import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from '@/hooks/use-toast';

export type ExportFormat = 'excel' | 'csv' | 'pdf';

/**
 * Exporta dados para Excel (.xlsx), CSV (.csv) ou PDF
 */
export function exportData(
  data: Record<string, unknown>[],
  fileName: string,
  format: ExportFormat = 'excel',
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

  if (format === 'excel') {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    toast({
      title: 'Exportado com sucesso!',
      description: `Arquivo "${fileName}.xlsx" gerado com ${data.length} registro(s).`,
    });
  } else if (format === 'csv') {
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Exportado com sucesso!',
      description: `Arquivo "${fileName}.csv" gerado com ${data.length} registro(s).`,
    });
  } else {
    const doc = new jsPDF({ orientation: data.length > 0 && Object.keys(data[0]).length > 5 ? 'landscape' : 'portrait' });
    const columns = Object.keys(data[0]);
    const rows = data.map(row => columns.map(col => String(row[col] ?? '')));

    doc.setFontSize(14);
    doc.text(fileName, 14, 15);
    doc.setFontSize(9);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 22);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 28,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [41, 65, 122], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save(`${fileName}.pdf`);
    toast({
      title: 'Exportado com sucesso!',
      description: `Arquivo "${fileName}.pdf" gerado com ${data.length} registro(s).`,
    });
  }
}
