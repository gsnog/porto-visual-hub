interface SimpleFormWizardProps {
  currentStep?: string
  steps?: string[]
  title?: string
  children: React.ReactNode
}

export function SimpleFormWizard({ children }: SimpleFormWizardProps) {
  return (
    <div className="flex flex-col h-full bg-background items-center">
      <div className="max-w-5xl w-full">
        {children}
      </div>
    </div>
  )
}

export default SimpleFormWizard