import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, FileSpreadsheet, ChevronDown } from "lucide-react";
import { exportData, type ExportFormat } from "@/lib/exportData";
import { HelpTooltip } from "@/components/HelpTooltip";

interface ExportButtonProps {
  getData: () => Record<string, unknown>[];
  fileName: string;
  sheetName?: string;
}

export function ExportButton({ getData, fileName, sheetName }: ExportButtonProps) {
  const handleExport = (format: ExportFormat) => {
    const data = getData();
    exportData(data, fileName, format, sheetName);
  };

  return (
    <div className="inline-flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 border-border">
            <FileText className="h-4 w-4" />
            Exportar
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border border-border z-50">
          <DropdownMenuItem onClick={() => handleExport('excel')} className="gap-2 cursor-pointer">
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            Exportar Excel (.xlsx)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2 cursor-pointer">
            <FileText className="h-4 w-4 text-red-600" />
            Exportar PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <HelpTooltip text="Exportar os dados filtrados em formato Excel (.xlsx) ou PDF." size={13} />
    </div>
  );
}