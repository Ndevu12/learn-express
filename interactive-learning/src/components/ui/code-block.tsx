import * as React from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  language?: string
  title?: string
  code: string
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ language = "javascript", title, code, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn("rounded-lg border border-slate-200 overflow-hidden", className)}
        {...props}
      >
        {title && (
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
            <p className="text-sm font-mono text-slate-700">{title}</p>
          </div>
        )}
        <pre className="bg-slate-900 text-slate-50 p-4 overflow-x-auto">
          <code className="font-mono text-sm">
            {code}
          </code>
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
