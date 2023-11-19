"use client"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

const SPEED = 0.01

export function Canvas(props: { className: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const renderCanvas = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      let time = 0
      const loop = () => {
        for (let x = 0; x <= 32; x++) {
          for (let y = 0; y <= 32; y++) {
            color(ctx, {
              x,
              y,
              r: R(x, y, time),
              g: G(x, y, time),
              b: B(x, y, time),
            })
          }
        }
        time = time + SPEED
        window.requestAnimationFrame(loop)
      }
      loop()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    renderCanvas(canvas)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute -z-10 inset-0 w-full aspect-square rounded-full transform-gpu mx-auto my-auto -translate-y-[15%]  lg:h-[650px] lg:max-w-[650px] xl:h-[800px] xl:max-w-[800px]",
        props.className
      )}
      width="32px"
      height="32px"
    />
  )
}

const C1 = 191
const C2 = 64

export const color = (
  context: CanvasRenderingContext2D,
  { x, y, r, g, b }: any
) => {
  context.fillStyle = `rgb(${r}, ${g}, ${b})`
  context.fillRect(x, y, 1, 1)
}

export const R = (x: number, y: number, time: number) => {
  return Math.floor(C1 + C2 * Math.cos((x * x - y * y) / 300 + time))
}

export const G = (x: number, y: number, time: number) => {
  return Math.floor(
    C1 +
      C2 *
        Math.sin(
          (x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300
        )
  )
}

export const B = (x: number, y: number, time: number) => {
  return Math.floor(
    C1 +
      C2 *
        Math.sin(
          5 * Math.sin(time / 9) +
            ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
        )
  )
}
