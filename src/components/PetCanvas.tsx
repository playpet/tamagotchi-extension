import React from "react"
import { usePetSprite } from "../lib/pet_sprite"
import { WithTick, withTick } from "../lib/tick"
import PetData from "../pet_data"
import { useCombinedRefs } from "../lib/combined_refs"

interface PetCanvasProps
  extends WithTick<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
  > {
  pet: PetData
  width: number
  height: number
}

export const PetCanvas = withTick(
  React.forwardRef<HTMLCanvasElement, PetCanvasProps>(
    ({ pet, frame, delta, width, height, ...props }, ref) => {
      const innerRef = React.useRef(ref)
      const canvasRef = useCombinedRefs(ref, innerRef)

      usePetSprite({ canvas: canvasRef.current, pet, width, height })

      return <canvas ref={canvasRef} {...props} width={width} height={height} />
    }
  )
)