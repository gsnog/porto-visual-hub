import { Check, CheckCircle2 } from "lucide-react"

interface SimpleFormWizardProps {
  currentStep?: string
  steps?: string[]
  title?: string
  children: React.ReactNode
}

export function SimpleFormWizard({ currentStep, steps, title, children }: SimpleFormWizardProps) {
  const displayTitle = currentStep || title || "Dados"
  
  return (
    <div className="flex flex-col h-full bg-background items-center">
      <div className="max-w-5xl w-full">
        {/* Progress Steps - Simple version with just current and Finalizado */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {/* Current Step */}
            <div className="flex items-center">
              <button className="flex flex-col items-center gap-2 transition-all duration-200 group cursor-pointer">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md bg-primary text-primary-foreground scale-110">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium transition-colors text-primary hidden md:block">
                  {displayTitle}
                </span>
              </button>
              <div className="w-12 h-1 mx-2 rounded-full transition-colors duration-300 bg-muted" />
            </div>

            {/* Finalizado Step */}
            <div className="flex items-center">
              <button className="flex flex-col items-center gap-2 transition-all duration-200 group cursor-pointer opacity-60">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md bg-muted text-muted-foreground group-hover:bg-muted/80">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium transition-colors text-muted-foreground hidden md:block">
                  Finalizado
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        {children}
      </div>
    </div>
  )
}

export default SimpleFormWizard