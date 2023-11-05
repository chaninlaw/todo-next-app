"use client"
import { useEffect, useRef } from "react"

const SPEED = 0.01

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      let time = 0
      const loop = function () {
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
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute h-[600px] w-full max-w-[600px] aspect-square rounded-full -top-0 -translate-y-40 -z-10 transform-gpu md:max-w-[800px] md:h-[800px] md:-translate-y-[300px] lg:max-w-[1000px] lg:h-[1000px] lg:-translate-y-[600px]  xl:max-w-[1350px] xl:h-[1350px] xl:-translate-y-[700px] xl:translate-x-[300px]"
      width="32px"
      height="32px"
    />
  )
}

const C1 = 200 // 191
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
