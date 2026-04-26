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
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00205B] disabled:pointer-events-none disabled:opacity-50 h-12 px-6 py-2",
          {
            "bg-[#F2A900] text-[#00205B] hover:bg-[#E09D00] shadow-md hover:scale-[1.02] active:scale-95": variant === "default",
            "border border-[#F2A900] text-[#F2A900] bg-transparent shadow-sm hover:bg-[#F2A900] hover:text-[#00205B]": variant === "outline",
            "hover:bg-white/10 hover:text-white": variant === "ghost",
            "bg-white/10 text-white hover:bg-white/20": variant === "secondary",
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
