import { Search, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FilterCardProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  startDate?: string
  onStartDateChange?: (value: string) => void
  endDate?: string
  onEndDateChange?: (value: string) => void
  onFilter?: () => void
  resultsCount?: number
  searchPlaceholder?: string
}

export function FilterCard({
  searchValue = "",
  onSearchChange,
  startDate = "",
  onStartDateChange,
  endDate = "",
  onEndDateChange,
  onFilter,
  resultsCount,
  searchPlaceholder = "Buscar..."
}: FilterCardProps) {
  return (
    <div className="filter-card mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search field */}
        <div className="flex-1 min-w-[200px]">
          <label className="filter-label">Buscar</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-9 filter-input"
            />
          </div>
        </div>

        {/* Start date */}
        <div className="min-w-[160px]">
          <label className="filter-label">Data Início</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange?.(e.target.value)}
              className="pl-9 filter-input"
            />
          </div>
        </div>

        {/* End date */}
        <div className="min-w-[160px]">
          <label className="filter-label">Data Fim</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange?.(e.target.value)}
              className="pl-9 filter-input"
            />
          </div>
        </div>

        {/* Filter button */}
        <Button onClick={onFilter} className="gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </div>

      {resultsCount !== undefined && (
        <p className="text-sm text-muted-foreground mt-4">
          {resultsCount} resultado{resultsCount !== 1 ? "s" : ""} encontrado{resultsCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  )
}
