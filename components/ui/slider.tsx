import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex w-full items-center gap-4">
        <input
          type="range"
          className={cn(
            "w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-100",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="w-8 text-center text-sm font-medium text-zinc-300">
          {props.value || props.defaultValue || 0}
        </span>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
