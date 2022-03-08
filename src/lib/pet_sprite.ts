import React from "react"
import PetData from "../pet_data"
import { useTick } from "./tick"

const MOD = 500
const SPEED = 40
const SPRITE_SIZE = 24
const PADDING = 16
const FRAME_COUNT = 2

export function usePetSprite({
  canvas,
  pet,
  width,
  height,
}: {
  canvas: HTMLCanvasElement
  pet: PetData
  width: number
  height: number
}) {
  const { frame } = useTick()

  const sliceNum = React.useMemo(
    () => (Math.floor(frame / SPEED) % MOD) % FRAME_COUNT,
    [frame % MOD]
  )

  const draw = React.useCallback(() => {
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext("2d")
    // setup canvas
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, width, height)
    // draw correct sliced frame
    ctx.drawImage(
      pet.spriteImage,
      sliceNum * SPRITE_SIZE, // source x
      0, // source y
      SPRITE_SIZE, // source w
      SPRITE_SIZE, // source h
      PADDING, // dest x
      PADDING, // dest y
      width - PADDING * 2, // dest w
      height - PADDING * 2 // dest h
    )
  }, [frame])

  React.useEffect(() => {
    if (!canvas) {
      return
    }

    let animationFrameId: number

    const render = () => {
      draw()
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [canvas, frame])
}