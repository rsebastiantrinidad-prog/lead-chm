import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900] disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
