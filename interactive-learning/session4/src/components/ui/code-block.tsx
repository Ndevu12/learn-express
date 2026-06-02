import * as React from "react"
import { codeToHtml } from "shiki"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  language?: string
  title?: string
  code: string
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  async ({ language = "javascript", title, code, className, ...props }, ref) => {
    let highlightedCode = code

    try {
      highlightedCode = await codeToHtml(code, {
        lang: language,
        theme: "github-dark",
        transformers: [
          {
            line(node) {
              this.addClassToHNode(node, "line")
            },
            pre(node) {
              this.addClassToHNode(node, "shiki-pre")
            },
            code(node) {
              this.addClassToHNode(node, "shiki-code")
            }
          }
        ]
      })
    } catch (error) {
      // Fallback to plain code if highlighting fails
      highlightedCode = `<pre><code>${code}</code></pre>`
    }

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
        <div
          className="shiki-wrapper"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
