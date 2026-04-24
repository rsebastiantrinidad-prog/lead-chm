import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
          {
            "bg-zinc-50 text-zinc-900 hover:bg-zinc-200 shadow-sm": variant === "default",
            "border border-zinc-800 bg-transparent shadow-sm hover:bg-zinc-800 hover:text-zinc-50": variant === "outline",
            "hover:bg-zinc-800 hover:text-zinc-50": variant === "ghost",
            "bg-zinc-800 text-zinc-50 hover:bg-zinc-700": variant === "secondary",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
