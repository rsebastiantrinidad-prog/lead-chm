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
            "w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F2A900]",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="w-8 text-center text-base font-semibold text-[#F2A900]">
          {props.value || props.defaultValue || 0}
        </span>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
